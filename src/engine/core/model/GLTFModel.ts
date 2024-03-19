import * as THREE from "three";
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast,MeshBVHHelper} from 'three-mesh-bvh';
import { Member } from "../Member";
import { Manager } from "../Manager";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BoxCollider } from "../../physics/colliders/BoxCollider";
import { TrimeshCollider } from "../../physics/colliders/TrimeshCollider";
import { CharacterCollider } from "../../physics/colliders/CharacterCollider";
import Sphere from "../../../components/basic/Sphere.vue";


export class GLTFModel extends Member {
    animations: THREE.AnimationAction[] = []
    animationIndex = -1
    mass = 0
    colliderMeshVisible = false
    constructor(props: Record<string, any>, manager: Manager, animationIndex: number) {
        super(null, null)
        this.colliderMeshVisible = props.colliderMeshVisible
        const gltfLoader = new GLTFLoader();
        const that = this
        gltfLoader.load(props.src, function (gltf) {
            let element = gltf.scene;
            that.object3D = element;

            //初始化
            element.scale.set(props.scale, props.scale, props.scale);
            element.position.set(props.x, props.y, props.z);
            element.rotation.set(props.rx, props.ry, props.rz)
            element.updateMatrixWorld(true);
            manager.scene.add(element);
            //console.log(element)

            //处理动画
            if (gltf.animations.length > 0) {
                const animationMixer = new THREE.AnimationMixer(element)
                manager.animationMixers.push(animationMixer)
                for (let i = 0; i < gltf.animations.length; i++) {
                    const action = animationMixer.clipAction(gltf.animations[i]);
                    action.clampWhenFinished = true;
                    that.animations.push(action);
                }
                if (animationIndex >= 0) {
                    that.animationIndex = animationIndex;
                    that.animations[animationIndex].play()
                }
            }

            //处理阴影
            if (manager.settings.pbr) {
                gltf.scene.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true; // 设置网格投射阴影
                        child.receiveShadow = true;
                    }
                });
            }

            that.setters = {
                ...that.setters,
                animationIndex: that.setAnimationIndex,
            };

            //物理部分
            //碰撞体物理
            if (manager.settings.physics === "collider" && props.type !== "none") {
                //地图碰撞体
                if (props.type == "map") {
                    that.type = "map"
                    gltf.scene.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            //地图内立方体碰撞体   
                            if (child.userData.type) {
                                child.visible = that.colliderMeshVisible;
                                if (child.userData.type === 'box') {
                                    let phys = new BoxCollider(child.scale.x * props.scale, child.scale.y * props.scale, child.scale.z * props.scale);
                                    phys.body.position.set(child.position.x * props.scale, child.position.y * props.scale, child.position.z * props.scale)
                                    phys.body.quaternion.set(child.quaternion.x, child.quaternion.y, child.quaternion.z, child.quaternion.w)
                                    manager.cannonWorld.addBody(phys.body);
                                }
                                //地图内trimesh碰撞体
                                else if (child.userData.type === 'trimesh') {
                                    let phys = new TrimeshCollider(child)
                                    phys.body.quaternion.setFromEuler(props.rx, props.ry, props.rz);
                                    manager.cannonWorld.addBody(phys.body);
                                }
                            }
                        }
                    }
                    );
                }
                //角色碰撞体
                else if (props.type == "character") {
                    that.type = "character"
                    let phys = new CharacterCollider(element)
                    phys.body.quaternion.setFromEuler(props.rx, props.ry, props.rz);
                    phys.body.position.set(props.x, props.y, props.z)
                    that.physicsBody = phys.body
                    manager.cannonWorld.addBody(phys.body);
                }
                //trimesh碰撞体
                else if (props.type == "trimesh") {
                    that.type = "trimesh"
                    let phys = new TrimeshCollider(element)
                    phys.body.quaternion.setFromEuler(props.rx, props.ry, props.rz);
                    that.physicsBody = phys.body
                    manager.cannonWorld.addBody(phys.body);
                }
            } else if (manager.settings.physics === "raycaster"&& props.type !== "none") {                           
                THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
                THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
                THREE.Mesh.prototype.raycast = acceleratedRaycast;

                if(props.type == "character"){                 
                    const shape=new THREE.Box3()
                    shape.expandByObject ( element )
                    const size=new THREE.Vector3
                    shape.getSize(size)
                    const c=new THREE.Vector3
                    shape.getCenter(c)
                    console.log(c)
                    const geometry = new THREE.BoxGeometry(size.x,size.y,size.z );
                    const material = manager.settings?.pbr
                        ? new THREE.MeshStandardMaterial({ color: "white" })
                        : new THREE.MeshBasicMaterial({ color: "white" });
                    const e = new THREE.Mesh(geometry, material);
                    e.position.set(c.x,c.y,c.z)
                    //manager.scene.add( e );
                    e.geometry.computeBoundsTree()
                    const boundsViz = new MeshBVHHelper( e );
                    manager.scene.add( boundsViz );
                    that.raycasterBody=shape.clone()
                    console.log(shape)
                    that.raycasterBodyMesh=e
                }else{
                //     gltf.scene.traverse((child) => {
                //     if (child instanceof THREE.Mesh) {
                //       child.geometry.computeBoundsTree()
                //       const boundsViz = new MeshBVHHelper( child );
                //       manager.scene.add( boundsViz );
                //       //console.log(boundsViz)
                //     }
                // })
                }
               
                //geom.computeBoundsTree();
            }else if (manager.settings.physics === "octee"&& props.type !== "none") {  

            }
        });
    }

    //设置播放的动画索引
    setAnimationIndex(index: number) {
        if (index >= 0 && index < this.animations.length) {
            const nextAnimation = this.animations[index];
            const currentAnimation = this.animations[this.animationIndex];
            nextAnimation.reset();
            nextAnimation.play();
            if (currentAnimation) {
                currentAnimation.crossFadeTo(nextAnimation, 0.5, true);
            }
            this.animationIndex = index;
        } else {
            console.error('Invalid animationIndex');
        }
    }
}
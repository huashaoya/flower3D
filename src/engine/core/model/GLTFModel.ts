import { Member } from "../Member";
import { Manager } from "../Manager";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { threeToCannon, ShapeType } from "../../utils/cannon-to-three/src/index"

export class GLTFModel extends Member {
    animations: THREE.AnimationAction[] = []
    animationIndex = -1
    constructor(props: Record<string, any>, manager: Manager, animationIndex: number) {
        super(null, null)
        let element = null
        const gltfLoader = new GLTFLoader();
        const that = this
        gltfLoader.load(props.src, function (gltf) {
            element = gltf.scene;
            that.object3D = element;
            element.scale.set(props.scale, props.scale, props.scale);
            element.position.set(props.x, props.y, props.z);
            element.rotation.set(props.rx, props.ry, props.rz)
            manager.scene.add(element);
            console.log(element)
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
            if (manager.settings.pbr) {
                gltf.scene.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true; // 设置网格投射阴影
                        
                    }
                });
            }
            that.setters = {
                ...that.setters,
                animationIndex: that.setAnimationIndex,
            };
            const shape = threeToCannon(element, {
                type: ShapeType.HULL,
                cylinderAxis: 'x',
                sphereRadius: 0,
            })?.shape
          
            // 如果模型使用 BufferGeometry
            // const vertices = element.children[0].geometry.attributes.position.array;
            // const scale = element.children[0].scale; // 获取模型的缩放比例

            // // 缩放后的顶点数据
            // const scaledVertices = [];
            // for (let i = 0; i < vertices.length; i += 3) {
            //     const x = vertices[i] * scale.x;
            //     const y = vertices[i + 1] * scale.y;
            //     const z = vertices[i + 2] * scale.z;
            //     scaledVertices.push(x, y, z);
            // }

            // const shape2 = new CANNON.Trimesh(scaledVertices, element.children[0].geometry.index.array);
            // console.log(element.children[0].geometry.index.array)
            // console.log( shape2)
            //物理部分
            if (manager.settings.physics&&props.type!=="none") {
                const material = new CANNON.Material();
                const body = new CANNON.Body({
                    //@ts-ignore
                    shape: shape,
                    position: new CANNON.Vec3(props.x, props.y, props.z),
                    mass: 0,
                    material: material,
                });
                body.quaternion.setFromEuler(props.rx, props.ry, props.rz);
                that.physicsBody = body
                manager.cannonWorld.addBody(body);
            }
        });

    }
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
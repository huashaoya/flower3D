import { Member } from "../Member";
import { Manager } from "../Manager";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

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
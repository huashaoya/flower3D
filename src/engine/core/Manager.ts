//一个世界的全局管理对象

import { Member } from "./Member"
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Manager {
    //动画管理器
    animationMixer:THREE.AnimationMixer;
    //时钟
    clock: THREE.Clock = new THREE.Clock();
    //相机组
    cameras: THREE.PerspectiveCamera[] = [new THREE.PerspectiveCamera(75, 1, 0.1, 1000)];
    cameraActiveIndex: number = 0
    // 控制器
    controls: OrbitControls | null = null;
    //物理世界
    cannonWorld: CANNON.World = new CANNON.World()
    //成员数组
    members: Member[] = []
    //渲染器
    renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    //场景
    scene: THREE.Scene = new THREE.Scene()
    //配置对象
    settings: Record<string, any> = {
        pbr: false,
        physics: false,
        id: 1
    }

    constructor() {
        this.cannonWorld.gravity.set(0, -9.8, 0)
        this.animationMixer = new THREE.AnimationMixer(this.scene)
    }

    update(): void {
        let deltaTime = this.clock.getDelta();
        //如果开启了物理
        if (this.settings.physics) {
            this.cannonWorld.step(1 / 120, deltaTime, 3);
            this.members.forEach(item => {
                item.updateFromPhysics()
            })
        }
        this.members.forEach(item => {
            item.update()
        })
        this.animationMixer.update(deltaTime);
        this.renderer.render(this.scene, this.cameras[this.cameraActiveIndex]);
    }

    setSettings(setting: Record<string, any>): void {
        this.settings = setting
    }

    updateCamaras(width: number, height: number): void {
        this.cameras.forEach(item => {
            item.aspect = width / height
            item.updateProjectionMatrix()
        })
        this.cameras[0].position.z = 10
        //渲染器相关
        this.renderer.setSize(width, height)
        this.controls = new OrbitControls(this.cameras[0], this.renderer.domElement);
        this.controls.enableDamping = true;

        this.renderer.shadowMap.enabled = this.settings.pbr;
    }

}

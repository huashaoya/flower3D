//一个世界的全局管理对象

import { Member } from "./Member"
import { ISettings } from "../../interface/ISettings";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Manager {
    //场景
    scene: THREE.Scene = new THREE.Scene()
    //时钟
    clock: THREE.Clock = new THREE.Clock();
    //相机
    camera: THREE.PerspectiveCamera=new THREE.PerspectiveCamera;
    //渲染器
    renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    // 控制器
    controls: OrbitControls | null = null;
    //物理世界
    cannonWorld: CANNON.World = new CANNON.World()
    //成员数组
    members: Member[] = []
    //配置对象
    settings: ISettings = {
        pbr: false,
        physics: false,
        id: 1
    }

    constructor() {
        this.cannonWorld.gravity.set(0, -9.8, 0)
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
        this.renderer.render(this.scene, this.camera);
       
    }
    setSettings(setting: ISettings): void {
        this.settings = setting
    }
    setCamara(width: number, height: number): void {
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        this.camera.position.z = 10

        this.renderer.setSize(width, height)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        this.renderer.shadowMap.enabled = this.settings.pbr;
    }
}
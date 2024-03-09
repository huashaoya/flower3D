//一个世界的全局管理对象
import { Member } from "./Member"
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import cannonDebugger from "cannon-es-debugger"

export class Manager {
    //动画管理器
    animationMixers:THREE.AnimationMixer[]=[];
    //时钟
    clock: THREE.Clock = new THREE.Clock();
    //相机组
    cameras: THREE.PerspectiveCamera[] = [new THREE.PerspectiveCamera(75, 1, 0.1, 1000)];
    cameraActiveIndex: number = 0
    cannonDebuggerRenderer:any=null
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
        id: 1,
        physicsDebug:false
    }
    constructor() {
        this.cannonWorld.gravity.set(0, -9.8, 0)
    }

    update(): void {
        if(this.cannonDebuggerRenderer) this.cannonDebuggerRenderer.update()
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

        this.animationMixers.forEach(item=>{
            item.update(deltaTime);
        })
        this.renderer.render(this.scene, this.cameras[this.cameraActiveIndex]);
    }

    setSettings(setting: Record<string, any>): void {
        this.settings = setting
        if(setting.physicsDebug){
            this.cannonDebuggerRenderer = cannonDebugger(this.scene, this.cannonWorld)
        }
    }

    updateCamarasAndRenderer(width: number, height: number): void {
        //相机相关
        this.cameras.forEach(item => {
            item.aspect = width / height
            item.updateProjectionMatrix()
        })
        this.cameras[0].position.z = 10
        this.cameras[0].near = 0.1; // 避免设置得太小
        this.cameras[0].far = 1000; // 根据场景大小调整
        this.cameras[0].updateProjectionMatrix();

        //渲染器相关
        this.renderer.setSize(width, height)
        this.renderer.shadowMap.enabled = this.settings.pbr;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1.0;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //控制器相关
        this.controls = new OrbitControls(this.cameras[0], this.renderer.domElement);
        this.controls.enableDamping = true;
    }
    //移除member
    remove(member:Member){
        let index=this.members.indexOf(member)
        this.members.splice(index,1)
        if(member.object3D)this.scene.remove(member.object3D)
        if(member.physicsBody)this.cannonWorld.removeBody(member.physicsBody)
    }
}

import * as THREE from "three";
import { MemberWrapper } from "../MemberWrapper";
import { Manager } from "../Manager";

export class DirectionalLight extends MemberWrapper {
    constructor(props: Record<string, any>, manager: Manager) {

        const light = new THREE.DirectionalLight(props.color, props.intensity)
        //将范围调大
        light.shadow.camera.top = 20
        light.shadow.camera.right = 20
        light.shadow.camera.left = -20
        light.shadow.camera.bottom = -20
        light.castShadow = true;

        super(props, manager, light, null)
        this.setters = {
            ...this.setters,
            color: this.setColor,
            intensity: this.setIntensity
        }
    }
    setColor(color: string) {
        //@ts-ignore
        this.object3D?.color.set(color);
    }
    setIntensity(i: number) {
        //@ts-ignore
        this.object3D.intensity = i
    }
}
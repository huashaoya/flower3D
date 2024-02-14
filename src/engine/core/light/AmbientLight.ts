import * as THREE from "three";
import { MemberWrapper } from "../MemberWrapper";
import { Manager } from "../Manager";

export class AmbientLight extends MemberWrapper {
    constructor(props: Record<string, any>, manager: Manager) {

        const light=new THREE.AmbientLight(props.color, props.intensity)
    
        super(props, manager, light, null)
        this.setters={
            ...this.setters,
            color:this.setColor,
            intensity:this.setIntensity
        }
    }
    setColor(color:string){
        //@ts-ignore
        this.object3D?.color.set(color);     
    }
    setIntensity(i:number){
        //@ts-ignore
        this.object3D.intensity=i
    }
}
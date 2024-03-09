import * as THREE from "three";
import * as CANNON from "cannon-es"
import { MemberWrapper } from "../MemberWrapper";
import { Manager } from "../Manager";

export class Plane extends MemberWrapper {
    constructor(props: Record<string, any>, manager: Manager) {

        const geometry = new THREE.PlaneGeometry(props.w, props.h);
        const material = manager.settings?.pbr
            ? new THREE.MeshStandardMaterial({ color: "white" })
            : new THREE.MeshBasicMaterial({ color: "white" });
        const element = new THREE.Mesh(geometry, material);
    
        const shape= new CANNON.Plane();
        super(props, manager, element, shape)
        this.setters={
            ...this.setters,
            color:this.setColor
        }
    }
    setColor(color:string){
        //@ts-ignore
        this.object3D?.material.color.set(color); 
    }
}
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { MemberWrapper } from "../MemberWrapper";
import { Manager } from "../Manager";
import { threeToCannon, ShapeType } from 'three-to-cannon';

export class Cube extends MemberWrapper {
    constructor(props: Record<string, any>, manager: Manager) {

        const geometry = new THREE.BoxGeometry(props.w, props.h, props.d);
        const material = manager.settings?.pbr
            ? new THREE.MeshStandardMaterial({ color: "white" })
            : new THREE.MeshBasicMaterial({ color: "white" });
        const element = new THREE.Mesh(geometry, material);
        
        const shape = new CANNON.Box(
            new CANNON.Vec3(props.w*props.scale / 2, props.h*props.scale / 2, props.scale / 2)
        );
        const shape2= threeToCannon(element, {type: ShapeType.BOX});
            //@ts-ignore
        super(props, manager, element, shape2?.shape)
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
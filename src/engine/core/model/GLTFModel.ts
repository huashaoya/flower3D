import * as THREE from "three";
import * as CANNON from "cannon-es"
import { Member } from "../Member";
import { Manager } from "../Manager";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class GLTFModel extends Member{
    constructor(props: Record<string, any>, manager: Manager) {
        super(null,null) 

        let element = null
        const gltfLoader = new GLTFLoader();
        const that=this
        gltfLoader.load(props.src, function (gltf) {
            element = gltf.scene
            that.object3D=element
            element.scale.set(props.scale,props.scale,props.scale)
            element.position.set(props.x,props.y,props.z)
            //console.log(element)
            manager.scene.add(element)
        });
       
           
    }
   
}
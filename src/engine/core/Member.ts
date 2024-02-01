import * as THREE from "three";
import * as CANNON from "cannon-es"

export class Member{
    object3D:THREE.Object3D|null
    physicsBody:CANNON.Body|null
    constructor(){
        //this.object3D=new THREE.Object3D()
        //this.physicsBody=new CANNON.Body()
        this.object3D=null
        this.physicsBody=null
    }
    updateFromPhysics() {
        if (this.object3D && this.physicsBody) {
            const position = new THREE.Vector3(this.physicsBody.position.x, this.physicsBody.position.y, this.physicsBody.position.z);
            const quaternion = new THREE.Quaternion(this.physicsBody.quaternion.x, this.physicsBody.quaternion.y, this.physicsBody.quaternion.z, this.physicsBody.quaternion.w);
            this.object3D.position.copy(position);
            this.object3D.quaternion.copy(quaternion);
        }
    }
}
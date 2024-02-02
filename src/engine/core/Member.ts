//被管理的成员对象

import * as THREE from "three";
import * as CANNON from "cannon-es"

export class Member{
    object3D:THREE.Object3D|null
    physicsBody:CANNON.Body|null
    constructor(object3D:THREE.Object3D|null,physicsBody:CANNON.Body|null){     
        this.object3D=object3D
        this.physicsBody=physicsBody
    }
    updateFromPhysics() {
        if (this.object3D && this.physicsBody) {
            const position = new THREE.Vector3(this.physicsBody.position.x, this.physicsBody.position.y, this.physicsBody.position.z);
            const quaternion = new THREE.Quaternion(this.physicsBody.quaternion.x, this.physicsBody.quaternion.y, this.physicsBody.quaternion.z, this.physicsBody.quaternion.w);
            this.object3D.position.copy(position);
            this.object3D.quaternion.copy(quaternion);
        }
    }
    setPosition(x:number,y:number,z:number){
        this.object3D?.position.set(x,y,z)
    }
    setX(x:number){
        this.object3D?.position.setX(x)
    }
    setY(y:number){
        this.object3D?.position.setY(y)
    }
    setRotation(rx:number,ry:number,rz:number){
        this.object3D?.rotation.set(rx,ry,rz)
    }
}
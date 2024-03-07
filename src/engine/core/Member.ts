//被管理的成员对象

import * as THREE from "three";
import * as CANNON from "cannon-es"

export class Member {
    childrens: Member[] = []
    object3D: THREE.Mesh | THREE.Light | THREE.Group | null
    physicsBody: CANNON.Body | null
    forwardSpeed: number = 0
    rightSpeed: number = 0
    rxSpeed: number = 0
    rySpeed: number = 0
    rzSpeed: number = 0
    setters: Record<string, any> = {
        x: this.setX,
        y: this.setY,
        z: this.setZ,
        rx: this.setRx,
        ry: this.setRy,
        rz: this.setRz,
        scale: this.setScale,
        forwardSpeed: this.setForwardSpeed,
        rightSpeed: this.setRightSpeed,
        rxSpeed: this.setRxSpeed,
        rySpeed: this.setRySpeed,
        rzSpeed: this.setRzSpeed
    };

    constructor(object3D: THREE.Mesh | THREE.Light | null | THREE.Group, physicsBody: CANNON.Body | null = null) {
        this.object3D = object3D
        this.physicsBody = physicsBody
    }
    add(member: Member) {
        this.childrens.push(member)
        if (member.object3D) {
            this.object3D?.add(member.object3D)
        }
    }
    remove(member: Member) {
        let index = this.childrens.indexOf(member)
        this.childrens.splice(index, 1)
        if (member.object3D) {
            this.object3D?.remove(member.object3D)
        }
    }
    dispose() {
        if (this.object3D?.type === 'Mesh') {
            //@ts-ignore
            this.object3D.geometry.dispose()
            //@ts-ignore
            this.object3D.material.dispose()
        }


    }
    updateFromPhysics() {
       
        // this.childrens.forEach(item => {
        //     item.updateFromPhysics()
        // })
        if (this.object3D && this.physicsBody) {
            //console.log(this.object3D )
            const position = new THREE.Vector3(this.physicsBody.position.x, this.physicsBody.position.y, this.physicsBody.position.z);
            const quaternion = new THREE.Quaternion(this.physicsBody.quaternion.x, this.physicsBody.quaternion.y, this.physicsBody.quaternion.z, this.physicsBody.quaternion.w);
            this.object3D.position.copy(position);
            this.object3D.quaternion.copy(quaternion);
        }
    }
    // setPhysicsBody(physicsBody: CANNON.Body | null){

    // }
    update() {
        if ((this.forwardSpeed != 0 || this.rightSpeed != 0) && this.object3D) {
            const direction = new THREE.Vector3(); // 前进方向向量
            // 获取模型的朝向
            this.object3D.getWorldDirection(direction);
            direction.normalize(); // 标准化向量
            const right = new THREE.Vector3();
            right.crossVectors(direction, new THREE.Vector3(0, 1, 0));
            // 根据右侧向量和速度来计算移动增量
            const delta2 = right.multiplyScalar(this.rightSpeed);
            // 计算每个方向上的移动增量
            const delta = direction.clone().multiplyScalar(this.forwardSpeed);
            // 将增量加到模型的当前位置上
            this.object3D.position.add(delta).add(delta2);
        }
        if ((this.rxSpeed != 0 || this.rySpeed != 0 || this.rzSpeed != 0) && this.object3D) {
            const rotation = this.object3D.rotation
            const delta = new THREE.Vector3(this.rxSpeed / 100, this.rySpeed / 100, this.rzSpeed / 100)
            this.object3D.rotation.set(rotation.x + delta.x, rotation.y + delta.y, rotation.z + delta.z)
        }
        this.childrens.forEach(item => {
            item.update()
        })
    }
    change(key: any, value: any) {
        const setter = this.setters[key];
        setter?.call(this, value);

    }
    setForwardSpeed(speed: number) {
        this.forwardSpeed = speed / 100
    }
    setRightSpeed(speed: number) {
        this.rightSpeed = speed / 100
    }
    setPosition(x: number, y: number, z: number) {
        this.object3D?.position.set(x, y, z)
    }
    setX(x: number) {
        this.object3D?.position.setX(x)
    }
    setY(y: number) {
        this.object3D?.position.setY(y)
        // if (this.physicsBody) {
        //     const currentPosition = this.physicsBody.position;
        //     currentPosition.set(currentPosition.x, y, currentPosition.z);
        //     this.physicsBody.position.copy(currentPosition);
        // }
    }
    setZ(z: number) {
        this.object3D?.position.setZ(z)
    }
    setRotation(rx: number, ry: number, rz: number) {
        this.object3D?.rotation.set(rx, ry, rz)
    }
    setRx(rx: number) {
        const euler = new THREE.Euler(rx, 0, 0);
        this.object3D?.rotation.set(euler.x, euler.y, euler.z);
    }
    setRy(ry: number) {
        const euler = new THREE.Euler(0, ry, 0);
        this.object3D?.rotation.set(euler.x, euler.y, euler.z);
    }
    setRz(rz: number) {
        const euler = new THREE.Euler(0, 0, rz);
        this.object3D?.rotation.set(euler.x, euler.y, euler.z);
    }
    setScale(scale: number) {
        this.object3D?.scale.set(scale, scale, scale)
    }
    setRxSpeed(value: number) {
        this.rxSpeed = value
    }
    setRySpeed(value: number) {
        this.rySpeed = value
    }
    setRzSpeed(value: number) {
        this.rzSpeed = value
    }
}
import { Object3D } from "three";
import { threeToCannon, ShapeType } from "../../utils/cannon-to-three/src/index"

import * as CANNON from 'cannon-es';


export class CharacterCollider {
    public body: CANNON.Body;

    constructor(child: Object3D) {
        const shape = new CANNON.Sphere(0.2)
        const material = new CANNON.Material('capsuleMat');
        material.friction = 0.3
        const body = new CANNON.Body({
            position: new CANNON.Vec3(0, 0, 0),
            mass: 1,
            material: material,
        });
        body.addShape(shape, new CANNON.Vec3(0, 0.2, 0))
        body.addShape(shape, new CANNON.Vec3(0, 0.4, 0))
        body.addShape(shape, new CANNON.Vec3(0, 0.6, 0))
        // 禁用角色的物理旋转
        body.fixedRotation = true;
        body.updateMassProperties();
        this.body = body;
    }
}
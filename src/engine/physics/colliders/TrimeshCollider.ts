import { Object3D } from "three";
import { threeToCannon, ShapeType } from "../../utils/cannon-to-three/src/index"

import * as CANNON from 'cannon-es';


export class TrimeshCollider {
	public body: CANNON.Body;

	constructor(child:Object3D) {
        const shape = threeToCannon(child, {
            type: ShapeType.MESH,
        })?.shape
        const material = new CANNON.Material();
        const physBox = new CANNON.Body({
            position: new CANNON.Vec3(0, 0, 0),
            mass: 0,
            shape,
            material: material,
        });
		this.body = physBox;
	}
}
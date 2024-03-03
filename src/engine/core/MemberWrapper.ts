import * as THREE from "three";
import * as CANNON from "cannon-es"
import { Member } from "./Member";
import { Manager } from "./Manager";

export class MemberWrapper extends Member {
    constructor(props: Record<string, any>, manager: Manager, mesh: THREE.Mesh | THREE.Light | THREE.Group, shape: CANNON.Shape | null) {
        if (manager.settings?.pbr && shape && mesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }
        //manager.scene.add(mesh);

        let body = null;
        //如果开启了物理
        if (manager.settings.physics && shape) {
            const material = new CANNON.Material();
            body = new CANNON.Body({
                shape: shape,
                position: new CANNON.Vec3(props.x, props.y, props.z),
                mass: props.mass,
                material: material,
            });
            body.quaternion.setFromEuler(props.rx, props.ry, props.rz);
            manager.cannonWorld.addBody(body);
        }
        super(mesh, body)
    }
}
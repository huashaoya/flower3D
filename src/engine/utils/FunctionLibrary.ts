import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function threeVector(vec: CANNON.Vec3): THREE.Vector3 {
    return new THREE.Vector3(vec.x, vec.y, vec.z);
}

export function cannonVector(vec: THREE.Vector3): CANNON.Vec3 {
    return new CANNON.Vec3(vec.x, vec.y, vec.z);
}

export function threeQuat(quat: CANNON.Quaternion): THREE.Quaternion {
    return new THREE.Quaternion(quat.x, quat.y, quat.z, quat.w);
}

export function cannonQuat(quat: THREE.Quaternion): CANNON.Quaternion {
    return new CANNON.Quaternion(quat.x, quat.y, quat.z, quat.w);
}
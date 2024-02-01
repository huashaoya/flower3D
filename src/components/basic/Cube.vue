<script setup lang="ts">
import Scene from "../../engine/Scene";
import  basicPhysicsProps  from "../../props/basicPhysicsProps";
import { ISettings } from "../../interface/ISettings";
import cannonWorld from "../../engine/cannonWorld"
import manager from "../../engine/manager"
import { Member } from "../../engine/core/Member";

import * as THREE from "three";
import * as CANNON from 'cannon-es'

import { onMounted, inject ,watchEffect} from "vue";



const props = defineProps(basicPhysicsProps);
let Settings: ISettings  = inject("Settings",{pbr:false,physics:false});

onMounted(async () => {
  init();
});

function init() {
  const member=new Member()


  const geometry = new THREE.BoxGeometry(props.w, props.h, props.d);
  const material = Settings?.pbr
    ? new THREE.MeshStandardMaterial({ color: props.color })
    : new THREE.MeshBasicMaterial({ color: props.color });
  const element = new THREE.Mesh(geometry, material);
  element.position.set(props.x, props.y, props.z);
  element.rotation.set(props.rx, props.ry, props.rz);
  member.object3D=element
  Scene.add(element);
  if (Settings?.pbr) {
    element.castShadow = true;
    element.receiveShadow = true;
  }
  //如果开启了物理
      if (Settings.physics) {
        const shape = new CANNON.Box(new CANNON.Vec3(props.w/2, props.h/2, props.d/2));
        const material = new CANNON.Material();
        const body = new CANNON.Body({
          shape: shape,
          position: new CANNON.Vec3(props.x, props.y, props.z),
          mass: props.mass,
          material: material,
        });
        body.quaternion.setFromEuler(props.rx, props.ry, props.rz)      
        member.physicsBody=body
        cannonWorld.addBody(body);
        manager.members.push(member)       
      }
  watchEffect(() => {
   //console.log(props.color)
  })
}
</script>

<template></template>

<script setup lang="ts">
import basicPhysicsProps from "../../props/basicPhysicsProps";
import { ISettings } from "../../interface/ISettings";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { Member } from "../../engine/core/Member";
import useChange from "../../hooks/useChange";

import * as THREE from "three";
import * as CANNON from "cannon-es";

import { onMounted, inject, watchEffect, computed, toRaw } from "vue";

const props = defineProps(basicPhysicsProps);
let id: number = inject("id", 1);
//全局管理对象
const manager = ManagerBuilder.getManager(id);
onMounted(async () => {
  init();
});

function init() {
  const geometry = new THREE.BoxGeometry(props.w, props.h, props.d);
  const material = manager.settings?.pbr
    ? new THREE.MeshStandardMaterial({ color: props.color })
    : new THREE.MeshBasicMaterial({ color: props.color });
  const element = new THREE.Mesh(geometry, material);

  element.position.set(props.x, props.y, props.z);
  element.rotation.set(props.rx, props.ry, props.rz);

  if (manager.settings?.pbr) {
    element.castShadow = true;
    element.receiveShadow = true;
  }
  manager.scene.add(element);

  let body = null;
  //如果开启了物理
  if (manager.settings.physics) {
    const shape = new CANNON.Box(
      new CANNON.Vec3(props.w / 2, props.h / 2, props.d / 2)
    );
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

  const member = new Member(element, body);
  manager.members.push(member);
  
  let oldProps=JSON.parse(JSON.stringify(props))

  const  changedProperties  = useChange(props,oldProps)
  watchEffect(() => {
    oldProps=JSON.parse(JSON.stringify(props))
    for(const key of toRaw(changedProperties.value)){
      if(key=='y'){
        member.setY(oldProps.y)
      }
    }
  });
}
</script>

<template></template>

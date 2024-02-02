<script setup lang="ts">
import { worldProps } from "../props/worldProps";
import { PropType, onMounted, provide, ref, nextTick, inject } from "vue";

import * as THREE from "three";
import * as CANNON from "cannon-es";

import { ManagerBuilder } from "../engine/ManagerBuilder";

const worldRef = ref();
const props = defineProps(worldProps);
//全局管理对象
const manager = ManagerBuilder.getManager(props.id);

const settings = {
  pbr: props.pbr,
  physics: props.physics,
  id: props.id,
};
provide('id',props.id)
manager.setSettings(settings);

onMounted(() => {
  init();
  animate();
});

function init() {
  manager.scene.background =
    props.bg == "transparent" ? new THREE.Color() : new THREE.Color(props.bg);

  const worldDom = document.getElementById("flower3D-world");
  const width = worldDom?.offsetWidth || 4;
  const height = worldDom?.offsetHeight || 3;

  manager.setCamara(width, height);
  worldRef.value?.appendChild(manager.renderer.domElement);

}

function animate() {
  requestAnimationFrame(animate);
  manager.update();
}
</script>

<template>
  <div id="flower3D-world" ref="worldRef">
    <slot></slot>
  </div>
</template>

<style scoped>
#flower3D-world {
  width: 100%;
  height: 100%;
}
</style>

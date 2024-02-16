<script setup lang="ts">
import * as THREE from "three";

import { worldProps } from "../props/worldProps";
import { onMounted, provide, ref } from "vue";
import { ManagerBuilder } from "../engine/ManagerBuilder";

const worldRef = ref();
const props = defineProps(worldProps);
const manager = ManagerBuilder.getManager(props.id);

const settings = {
  pbr: props.pbr,
  physics: props.physics,
  id: props.id,
};
provide("id", props.id);
manager.setSettings(settings);

onMounted(() => {
  const style = document.createElement("style");
  style.innerHTML = `.flower3D-world {
    width: 100%;
    height: 100%;
  }`;
  document.head.appendChild(style);
  init();
  animate();
});

function init() {
  manager.scene.background =
    props.bg == "transparent" ? new THREE.Color() : new THREE.Color(props.bg);
  const width = worldRef.value.offsetWidth;
  const height = worldRef.value.offsetHeight;
  manager.updateCamaras(width, height);
  provide("width", width);
  provide("height", height);
  worldRef?.value.appendChild(manager.renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  manager.update();
}
</script>

<template>
  <div class="flower3D-world" ref="worldRef">
    <slot></slot>
  </div>
</template>


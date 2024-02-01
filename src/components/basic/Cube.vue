<script setup lang="ts">
import { basicProps } from "../../props/basicProps";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { PropType, ref, toRaw, watchEffect, onMounted } from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Scene from "../../engine/Scene";
import Setting from "../../engine/Settings";
const props = defineProps(basicProps);
onMounted(() => {
  init();
});
console.log(Setting)
function init() {
  const geometry = new THREE.BoxGeometry(props.w, props.h, props.d);
  const material = Setting.pbr?new THREE.MeshStandardMaterial({ color: props.color }):new THREE.MeshBasicMaterial({ color: props.color });
  const element = new THREE.Mesh(geometry, material);
  element.position.set(props.x, props.y, props.z);
  element.rotation.set(props.rx, props.ry, props.rz);
  Scene.add(element);
  // if(this.$parent.pbr){
  //   this.element.castShadow = true;
  //   this.element.receiveShadow = true;
  // }
}
</script>

<template></template>

<style scoped>
</style>

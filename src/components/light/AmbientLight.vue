<script setup lang="ts">
import { lightProps } from "../../props/lightProps";

import * as THREE from "three";

import { inject, onMounted } from "vue";
import { ManagerBuilder } from "../../engine/ManagerBuilder";

const props = defineProps(lightProps);
let id: number = inject("id", 1);
const manager = ManagerBuilder.getManager(id);

onMounted(async () => {
  init();
});

function init() {
  const light = new THREE.AmbientLight(props.color, props.intensity);
  manager.scene.add(light);
}
</script>

<template></template>
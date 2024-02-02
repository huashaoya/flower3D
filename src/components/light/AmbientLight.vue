<script setup lang="ts">
import Scene from "../../engine/Scene";
import { lightProps } from "../../props/lightProps";

import * as THREE from "three";

import { onMounted } from "vue";

const props = defineProps(lightProps);

onMounted(async () => {
  init();
});

function init() {
  const light = new THREE.AmbientLight(props.color, props.intensity);
  Scene.add(light);
}
</script>

<template></template>
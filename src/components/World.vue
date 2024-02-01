<script setup lang="ts">
import { worldProps } from "../props/worldProps";
import Scene from "../engine/Scene";
import cannonWorld from "../engine/cannonWorld"

import { PropType , onMounted , provide} from "vue";

import * as THREE from "three";
import * as CANNON from "cannon-es"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import manager from "../engine/manager";

const props = defineProps(worldProps);
const Settings={
  pbr:props.pbr,
  physics:props.physics
}
provide('Settings',Settings) 
//时钟
const clock = new THREE.Clock();
//场景
const scene = Scene;
//相机
let camera: THREE.PerspectiveCamera;
//渲染器
const renderer = new THREE.WebGLRenderer();
// 控制器
let controls: OrbitControls;
//物理世界
let physicsWorld:CANNON.World

onMounted(() => {
  init();
  animate();
});

function init() {
  scene.background =
    props.bg == "transparent"
      ? new THREE.Color()
      : new THREE.Color(props.bg);

  const worldDom = document.getElementById("flower3D-world");
  const width = worldDom?.offsetWidth || 4;
  const height = worldDom?.offsetHeight || 3;

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 10;

  renderer.setSize(width, height);
  worldDom?.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

 
  renderer.shadowMap.enabled = props.pbr;

  //如果开启了物理
  // if (props.physics) {
  //   physicsWorld = cannonWorld;
  //   Settings.physics=true
  // }

}

function animate() {
  let deltaTime = clock.getDelta();
  requestAnimationFrame(animate);
  //如果开启了物理
  if (props.physics) {
    cannonWorld.step(1 / 120, deltaTime, 3);
    manager.update()
    //同步所有与物理模拟相关的 Three.js 对象的位置和旋转
      // this.elements.forEach((elements) => {
      //   if (elements.updateFromPhysics) {
      //     elements.updateFromPhysics();
      //   }
      // });
  }
  renderer.render(scene, camera);
}
</script>

<template>
  <div ref="a" id="flower3D-world">
    <slot></slot>
  </div>
</template>

<style scoped>
#flower3D-world {
  width: 100%;
  height: 100%;
}
</style>

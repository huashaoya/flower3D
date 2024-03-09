<script setup lang="ts">
import * as THREE from "three";

import { worldProps } from "../props/worldProps";
import { onMounted, provide, ref ,onUnmounted} from "vue";
import { ManagerBuilder } from "../engine/ManagerBuilder";

const worldRef = ref();
const props = defineProps(worldProps);
const manager = ManagerBuilder.getManager(props.id);
let resizeObserver:ResizeObserver

const settings = {
  ...props
};
provide("id", props.id);
manager.setSettings(settings);

onMounted(() => {
  const style = document.createElement("style");
  style.innerHTML = `.flower3D-world {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
  }`;
  document.head.appendChild(style);
  init();
  animate();
});



function init() {
  if (props.bg == "transparent") {
    const texture = new THREE.Texture();
    manager.scene.background = texture
  } else {
    manager.scene.background = new THREE.Color(props.bg);
  }
  const width = worldRef.value.offsetWidth;
  const height = worldRef.value.offsetHeight;
  manager.updateCamarasAndRenderer(width, height);
  //provide("width", width);
  //provide("height", height);
  worldRef?.value.appendChild(manager.renderer.domElement);

  //响应世界窗口变化
  resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      manager.updateCamarasAndRenderer(width, height);
    }
  });
  resizeObserver.observe(worldRef.value);
}

function animate() {
  requestAnimationFrame(animate);
  manager.update();
}

onUnmounted(()=>{
  resizeObserver.disconnect();
})
</script>

<template>
  <div class="flower3D-world" ref="worldRef">
    <slot></slot>
  </div>
</template>

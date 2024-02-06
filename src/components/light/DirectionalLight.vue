<script setup lang="ts">
import { lightProps, lightPropsKV } from "../../props/light/lightProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { DirectionalLight } from "../../engine/core/light/DirectionalLight";
import useChange from "../../hooks/useChange";

import { onMounted, inject, watchEffect, computed, toRaw, ref } from "vue";

const props = defineProps(lightProps);
let id: number = inject("id", 1);
//全局管理对象
const manager = ManagerBuilder.getManager(id);
onMounted(async () => {
  init();
});

function init() {
  const member = new DirectionalLight(props, manager);
  manager.members.push(member);

  let oldProps = ref(lightPropsKV);
  const changedProps = useChange(props, oldProps);

  watchEffect(() => {
    oldProps.value = JSON.parse(JSON.stringify(props));
    for (const key of toRaw(changedProps.value)) {
      member.change(key, toRaw(oldProps.value)[key.toString()]);
    }
  });
}
</script>

<template></template>

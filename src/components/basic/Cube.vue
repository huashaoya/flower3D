<script setup lang="ts">
import { cubeProps, cubePropsKV } from "../../props/basic/cubeProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { Cube } from "../../engine/core/basic/Cube";
import useChange from "../../hooks/useChange";

import { onMounted, inject, watchEffect, computed, toRaw, ref } from "vue";

const props = defineProps(cubeProps);
let id: number = inject("id", 1);
//全局管理对象
const manager = ManagerBuilder.getManager(id);
onMounted(async () => {
  init();
});

function init() {
  const member = new Cube(props, manager);
  manager.members.push(member);

  let oldProps = ref(cubePropsKV);
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

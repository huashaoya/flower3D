<script setup lang="ts">
import { circleProps, circlePropsKV } from "../../props/basic/circleProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { Sphere } from "../../engine/core/basic/Sphere";
import useChange from "../../hooks/useChange";

import { onMounted, inject, watchEffect, computed, toRaw, ref } from "vue";

const props = defineProps(circleProps);
let id: number = inject("id", 1);
//全局管理对象
const manager = ManagerBuilder.getManager(id);
onMounted(async () => {
  init();
});

function init() {
  const member = new Sphere(props, manager);
  manager.members.push(member);

  let oldProps = ref(circlePropsKV);
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

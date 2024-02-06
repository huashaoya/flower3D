<script setup lang="ts">
import { modelProps, modelPropsKV } from "../../props/model/modelProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { GLTFModel } from "../../engine/core/model/GLTFModel";
import useChange from "../../hooks/useChange";

import { onMounted, inject, watchEffect, computed, toRaw, ref } from "vue";

const props = defineProps(modelProps);
let id: number = inject("id", 1);
//全局管理对象
const manager = ManagerBuilder.getManager(id);
onMounted(async () => {
  init();
});

function init() {
  const member = new GLTFModel(props, manager);
  manager.members.push(member);

  let oldProps = ref(modelPropsKV);
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

<script setup lang="ts">
import { inject, ref } from "vue";

import { skyBoxProps, skyBoxPropsKV } from "../../props/display/skyBoxProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { SkyBox } from "../../engine/core/display/SkyBox";
import useChange from "../../hooks/useChange";

const props = defineProps(skyBoxProps);
let id: number = inject("id", 1);

const manager = ManagerBuilder.getManager(id);
const member = new SkyBox(props, manager);

let oldProps = ref(skyBoxPropsKV);
useChange(props, oldProps, member, manager);
defineExpose(member)
</script>

<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { Ref, inject, ref, toRaw } from "vue";

import { thirdPersonCameraProps,thirdPersonCameraPropsKV } from "../../props/camera/thirdPersonCameraProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { ThirdPersonCamera } from "../../engine/core/camera/ThirdPersonCamera";
import useChange from "../../hooks/useChange";

const props = defineProps(thirdPersonCameraProps);
let id: number = inject("id", 1);
const parentRef = inject<Ref | undefined>("parent", undefined)

const manager = ManagerBuilder.getManager(id);
const member = new ThirdPersonCamera(manager, toRaw(parentRef?.value));

let oldProps = ref(thirdPersonCameraPropsKV);
useChange(props, oldProps, member,manager);
defineExpose(member)
</script>

<template>
  <slot></slot>
</template>

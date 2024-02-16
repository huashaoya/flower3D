<script setup lang="ts">
import { Ref, inject, toRaw } from "vue";

import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { ThirdPersonCamera } from "../../engine/core/camera/ThirdPersonCamera";
import useChange from "../../hooks/useChange";

let id: number = inject("id", 1);
const parentRef = inject<Ref | undefined>("parent", undefined)

const manager = ManagerBuilder.getManager(id);
const member = new ThirdPersonCamera(manager, toRaw(parentRef?.value));

useChange({}, {}, member, manager);
defineExpose(member)
</script>

<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { inject,ref } from "vue";

import { cubeProps, cubePropsKV } from "../../props/basic/cubeProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { Cube } from "../../engine/core/basic/Cube";
import useChange from "../../hooks/useChange";

const props = defineProps(cubeProps);
let id: number = inject("id", 1);
const manager = ManagerBuilder.getManager(id);
const member = new Cube(props, manager);
//manager.members.push(member);

let oldProps = ref(cubePropsKV);
useChange(props, oldProps,member,manager);
defineExpose(member)
</script>

<template>
    <slot></slot>
</template>

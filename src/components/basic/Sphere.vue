<script setup lang="ts">
import { inject, ref } from "vue";

import { circleProps, circlePropsKV } from "../../props/basic/circleProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { Sphere } from "../../engine/core/basic/Sphere";
import useChange from "../../hooks/useChange";

const props = defineProps(circleProps);
let id: number = inject("id", 1);
const manager = ManagerBuilder.getManager(id);
const member = new Sphere(props, manager);
//manager.members.push(member);

let oldProps = ref(circlePropsKV);
useChange(props, oldProps, member,manager);
defineExpose(member)
</script>

<template>
    <slot></slot>
</template>

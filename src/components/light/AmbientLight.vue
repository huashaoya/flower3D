<script setup lang="ts">
import { inject, ref } from "vue";

import { lightProps, lightPropsKV } from "../../props/light/lightProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { AmbientLight } from "../../engine/core/light/AmbientLight";
import useChange from "../../hooks/useChange";

const props = defineProps(lightProps);
let id: number = inject("id", 1);
const manager = ManagerBuilder.getManager(id);
const member = new AmbientLight(props, manager);
manager.members.push(member);

let oldProps = ref(lightPropsKV);
useChange(props, oldProps, member);
defineExpose(member)
</script>

<template></template>

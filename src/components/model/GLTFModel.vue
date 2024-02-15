<script setup lang="ts">
import { inject, ref } from "vue";

import { modelProps, modelPropsKV } from "../../props/model/modelProps";
import { ManagerBuilder } from "../../engine/ManagerBuilder";
import { GLTFModel } from "../../engine/core/model/GLTFModel";
import useChange from "../../hooks/useChange";

const props = defineProps(modelProps);
let id: number = inject("id", 1);
const manager = ManagerBuilder.getManager(id);
const member = new GLTFModel(props, manager,props.animationIndex);
manager.members.push(member);

let oldProps = ref(modelPropsKV);
useChange(props, oldProps, member);
defineExpose(member)
</script>

<template></template>

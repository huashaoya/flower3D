<script setup lang="ts">
const emit = defineEmits(['keyUp', 'KeyDown'])

window.addEventListener('keyup', handleKeyUp);
window.addEventListener('keydown', handleKeyDown);

function handleKeyUp(e:KeyboardEvent) {
    emit('keyUp',e)
}
function handleKeyDown(e:KeyboardEvent) {
    emit('KeyDown',e)
}
</script>
<template></template>
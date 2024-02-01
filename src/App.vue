<script setup lang="ts">
import World from "./components/World.vue";
import Cube from "./components/basic/Cube.vue";
</script>

<template>
  <div class="wrapper">
    <div class="box">
      <World bg="black" pbr>
        <Cube :x="2" color="red"/>
        <Cube :x="1" color="yellow"/>
        <Cube :x="0" color="green"/>
      </World>
    </div>
  </div>
  
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  display: flex;
}
.box {
  margin: 80px;
  border: 2px solid black;
  width: 800px;
  height: 500px;
}
</style>

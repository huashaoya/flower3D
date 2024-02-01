<script setup lang="ts">
import World from "./components/World.vue";
import Cube from "./components/basic/Cube.vue";
import AmbientLight from "./components/light/AmbientLight.vue"
</script>

<template>
  <div class="wrapper">
    <div class="box">
      <World bg="black" pbr physics>
        <AmbientLight :intensity="10"/>
        <Cube :x="0.8" :y="-3" v-bind="{color:'blue'}" :mass="0"/>
        <Cube :x="-0.6" :y="-1" color="red" :mass="0"/>
        <Cube :x="0" color="#ffffff"  :mass="1"/>
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

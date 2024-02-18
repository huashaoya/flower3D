<script setup lang="ts">
import World from "./components/World.vue";
import Cube from "./components/basic/Cube.vue";
import AmbientLight from "./components/light/AmbientLight.vue";
import DirectionalLight from "./components/light/DirectionalLight.vue";
import Sphere from "./components/basic/Sphere.vue";
import GLTFModel from "./components/model/GLTFModel.vue";
import ThirdPersonCamera from "./components/camera/ThirdPersonCamera.vue"
import KeyBoard from "./components/api/KeyBoard.vue"
import SkyBox from "./components/display/SkyBox.vue"
import { onMounted, ref } from "vue";
let a = ref(11);
let aindex = ref(11);
const cube = ref()
const speed=ref(0)
onMounted(() => {
  //cube.value.setColor("green")
});

const handleKeyUp=(e)=>{
  let KEY=e.key
  if(KEY=='w'){
    speed.value=0
    aindex.value=11
  }
}

const handleKeyDown=(e)=>{
  let KEY=e.key
  if(KEY=='w'){
    speed.value=20
    aindex.value=19
  }
}
</script>

<template>
  <div class="wrapper">
    <!-- <div class="box">
      <button @click="a--">+</button>
      <button @click="a++">-</button>
      <World bg="black" :id="3" pbr>
       
        <cube v-bind="{ color: 'green', y: 2 }" />
        <AmbientLight :intensity="3" />
        <DirectionalLight v-bind="{ y: 5, x: 3 }" />
        <sphere v-bind="{ color: 'blue', x: -3, mass: 10 }"> </sphere>
        <sphere v-bind="{ color: 'yellow', x: a, r: 0.5 ,z:0}">
          <ThirdPersonCamera></ThirdPersonCamera>
        </sphere>
        <cube v-bind="{ color: 'brown', y: -2, w: 10 }" /> 
        <cube v-bind="{ color: 'green', y: -3, z: -5 }" />
        <Cube ref="cube" :x="0.8" :y="-5" v-bind="{ color: 'white', h: 0.2, w: 20, d: 5 }" :mass="0" />
      </World>
    </div> -->
    <div class="box2">
      <World bg="black" pbr>
        <SkyBox src="/textures/hdr/003.hdr"></SkyBox>
        <KeyBoard @key-up="handleKeyUp" @key-down="handleKeyDown"></KeyBoard>
        <AmbientLight :intensity="3" />
        <GLTFModel src="./boxman.glb" :y="-5" :scale="10" :animation-index="aindex" :z="-6" :forward-speed="speed">
          <ThirdPersonCamera locked></ThirdPersonCamera>
        </GLTFModel>

        <GLTFModel src="./m1.glb"  :scale="12" :x="-15" :y="0.5"/>
        <Cube ref="cube" :x="-15"  :y="-4.5" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m2.glb"  :scale="12" :x="15" :y="2" :ry="-Math.PI/2"/>
        <Cube ref="cube" :x="15"  :y="-4.5" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m3.glb"  :scale="12" :x="-15" :y="0.5" :z="15"/>
        <Cube ref="cube" :x="-15"  :y="-4.5" :z="15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m4.glb"  :scale="12" :x="15" :y="0.5" :z="15"/>
        <Cube ref="cube" :x="15"  :y="-4.5" :z="15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m5.glb"  :scale="12" :x="-15" :y="0.5" :z="-15"/>
        <Cube ref="cube" :x="-15"  :y="-4.5" :z="-15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m6.glb"  :scale="12" :x="15" :y="0.5" :z="-15"/>
        <Cube ref="cube" :x="15"  :y="-4.5" :z="-15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <Cube ref="cube" :x="0.8" :y="-5" v-bind="{ color: 'gray', h: 0.2, w: 40, d: 60 }" :mass="0" />
      </World>
    </div>

  </div>
  <!-- <button v-for="(item, index) in 34" @click="aindex = index">{{ item }}</button> -->
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

.box2 {
  border: 2px solid black;
  width: 900px;
  height: 600px;
}
</style>

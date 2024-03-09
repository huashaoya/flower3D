<script setup lang="ts">
import World from "./components/World.vue";
import Cube from "./components/basic/Cube.vue";
import AmbientLight from "./components/light/AmbientLight.vue";
import DirectionalLight from "./components/light/DirectionalLight.vue";
import Sphere from "./components/basic/Sphere.vue";
import Plane from "./components/basic/Plane.vue";
import GLTFModel from "./components/model/GLTFModel.vue";
import ThirdPersonCamera from "./components/camera/ThirdPersonCamera.vue"
import KeyBoard from "./components/api/KeyBoard.vue"
import SkyBox from "./components/display/SkyBox.vue"
import { onMounted, ref } from "vue";
let a = ref(11);
let aindex = ref(11);
const cube = ref()
const speed=ref(0)
const speedRight=ref(0)
const locked=ref(false)
onMounted(() => {
  //cube.value.setColor("green")
});

const handleKeyDown=(e:any)=>{
  let KEY=e.key
  if(KEY=='w'){
    speed.value=3
    aindex.value=19
    locked.value=true
  }else if(KEY=='d'){
    speedRight.value=2
    aindex.value=18
  }else if(KEY=='a'){
    speedRight.value=-2
    aindex.value=17
  }else if(KEY=='s'){
    speed.value=-3
    aindex.value=19
  }else if(KEY==' '){
    //speed.value=-20
    aindex.value=13
  }
}

const handleKeyUp=(e:any)=>{
  let KEY=e.key
  if(KEY=='w'||KEY=='s'){
    speed.value=0
    aindex.value=11
    locked.value=false
  }else if(KEY=='d'||KEY=='a'){
    speedRight.value=0
    aindex.value=11
  }else if(KEY==' '){
    //speed.value=-20
    aindex.value=11
  }
}


</script>

<template>
  <div class="wrapper">
    <div class="box2">
      <!-- <World bg="black" pbr>
        <SkyBox src="/textures/hdr/003.hdr"></SkyBox>
        <KeyBoard @key-up="handleKeyUp" @key-down="handleKeyDown"></KeyBoard>
        <DirectionalLight v-bind="{ y: 50, x: 50,z:50 }" :intensity="3"/>
        <AmbientLight :intensity="0" />
        <GLTFModel src="./test(1).glb" :y="-5" :scale="10" :animation-index="0" :z="-6">
         
        </GLTFModel>
        <GLTFModel src="./boxman.glb" :y="-5" :scale="10" :animation-index="aindex" :z="-6" :forward-speed="speed" :right-speed="speedRight">
          <ThirdPersonCamera :locked="locked" :offset-y="6"></ThirdPersonCamera>
        </GLTFModel>
       
        <GLTFModel src="./m1.glb"  :scale="12" :x="-15" :y="0.5" :ry-speed="1"/>
        <Cube ref="cube" :x="-15"  :y="-4.5" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m2.glb"  :scale="12" :x="15" :y="2" :ry="-Math.PI"/>
        <Cube ref="cube" :x="15"  :y="-4.5" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m3.glb"  :scale="12" :x="-15" :y="0.5" :z="15"/>
        <Cube ref="cube" :x="-15"  :y="-4.5" :z="15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m4.glb"  :scale="12" :x="15" :y="0.5" :z="15" :ry="-Math.PI"/>
        <Cube ref="cube" :x="15"  :y="-4.5" :z="15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m5.glb"  :scale="12" :x="-15" :y="0.5" :z="-15"/>
        <Cube ref="cube" :x="-15"  :y="-4.5" :z="-15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <GLTFModel src="./m6.glb"  :scale="12" :x="15" :y="0.5" :z="-15" :ry="-Math.PI"/>
        <Cube ref="cube" :x="15"  :y="-4.5" :z="-15" v-bind="{ color: 'white', h: 0.5, w: 4, d: 4 }" />

        <Cube ref="cube" :x="0.8" :y="-5" v-bind="{ color: 'gray', h: 0.2, w: 60, d: 80 }" :mass="0" />
      </World> -->
      <World bg="black" physics pbr physics-debug>
        <AmbientLight :intensity="0" />
        <KeyBoard @key-up="handleKeyUp" @key-down="handleKeyDown"></KeyBoard>
        <SkyBox src="/textures/hdr/003.hdr"></SkyBox>
        <DirectionalLight v-bind="{ y: 50, x: 50,z:50 }" :intensity="3"/>
        <Plane :mass="0" :rx="-Math.PI/2" :scale="100"></Plane>
        <!-- <GLTFModel src="./world.glb"  :scale="2" type="map">
         
        </GLTFModel> -->
        <GLTFModel src="./heshouwu.glb"  :scale="10" type="none" :y="30.5">
         
        </GLTFModel>
        <GLTFModel src="./2.glb"  :scale="3" type="trimesh"  :y="0" :z="0">
        

        </GLTFModel>
        <!-- <GLTFModel src="./trimesh-type.glb"  :scale="2" type="trimesh" :x="30" />
        <GLTFModel src="./trimesh-type.glb"  :scale="2" type="map" :x="-30" /> -->
        <GLTFModel src="./boxman.glb" type="character" :y="20" :scale="1" :animation-index="aindex"  :forward-speed="speed" :right-speed="speedRight">
          <ThirdPersonCamera :locked="true" :offset-y="0.9"></ThirdPersonCamera>
        </GLTFModel>
        <Sphere  :y="20"></Sphere>
        <Sphere  :y="20" :x="3"></Sphere>
        <Sphere  :y="20" :x="-3"></Sphere>
        <Sphere  :y="20" :x="3" :z="3"></Sphere>
        <Sphere  :y="20" :x="-3"  :z="3"></Sphere>
        <Sphere  :y="20" :x="3" :z="-3"></Sphere>
        <Sphere  :y="20" :x="-3"  :z="-3"></Sphere>
        <!-- <Cube ref="cube" :x="0.8" :y="-5" v-bind="{ color: 'gray', h: 0.2, w: 150, d: 200 }" :mass="0" /> -->
      </World>
    </div>
  </div>
  <button v-for="(item, index) in 34" @click="aindex = index">{{ item }}</button>
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
  background-color: red;
  position: relative;
}

.box2 {
  border: 2px solid black;
  width: 900px;
  height: 600px;
  position: relative;
}
</style>

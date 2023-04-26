<script setup lang="ts">
import { ref } from 'vue';
let container = ref<boolean>(true)
const change = () => {
  container.value = !container.value
}
</script>

<template>
  <div>
    <div :class="container ? 'container' : 'container_min'" @click="change">
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  position: relative;
  left: 0;
  transform-origin: right bottom;
  width: 1000px;
  height: 500px;
  background-color: rgb(20, 55, 86);
  transition: 1.2s;
}

.container_min {
  position: relative;
  left: calc(90vw - 1000px);
  bottom: 5px;
  transform-origin: right bottom;
  width: 1000px;
  height: 500px;
  background-color: rgb(20, 55, 86);
  transform: scale(0.2) translateX(1000px);
  transition: all 1.2s linear;
}
</style>

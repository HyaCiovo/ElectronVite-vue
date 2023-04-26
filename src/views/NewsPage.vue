<script setup lang="ts">

import axios from "@/utils/request";
import { onMounted } from "vue";
onMounted(()=>{
  axios.post("/user/simon/fuck",{})
})

</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>

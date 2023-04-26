<script setup lang="ts">
import PageHeader from "./components/PageHeader.vue";
import { RouterView } from "vue-router";
// import { createSocket } from "./hooks/useWebSocket";

// createSocket()

</script>

<template>
  <PageHeader />
  <RouterView class="context" />
</template>

<style>
.context {
  top: 102px;
}
</style>

<script setup lang="ts">
import PageHeader from "./components/PageHeader.vue";
import { RouterView } from "vue-router";
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

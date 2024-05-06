<script setup lang="ts">
import menuBar from './components/MenuBar.vue';
</script>

<template>
  <menuBar></menuBar>
  <div class="main">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.main {
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
}
</style>

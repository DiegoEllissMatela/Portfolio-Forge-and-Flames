<template>
  <div class="custom-cursor-follower"></div>
  <div class="custom-cursor-dot"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { initCustomCursor } from '@/logic/animations';

let cleanupCursor = null;

onMounted(() => {
  cleanupCursor = initCustomCursor();
});

onUnmounted(() => {
  if (typeof cleanupCursor === 'function') {
    cleanupCursor();
  }
});
</script>

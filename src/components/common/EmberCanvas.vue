<template>
  <canvas ref="canvasRef" id="ember-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { EmberParticleSystem } from '@/logic/embers';

const canvasRef = ref(null);
let system = null;

onMounted(() => {
  if (canvasRef.value) {
    system = new EmberParticleSystem(canvasRef.value);
  }
});

onUnmounted(() => {
  if (system) {
    system.destroy();
  }
});
</script>

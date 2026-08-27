<template>
  <div class="app-root selection:bg-fire selection:text-white">
    <CustomCursor />
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import CustomCursor from '@/components/common/CustomCursor.vue';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>

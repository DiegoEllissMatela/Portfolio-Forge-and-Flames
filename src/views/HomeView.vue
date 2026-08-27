<template>
  <main>
    <!-- Hero Section with GSAP Depth & Canvas Embers -->
    <section class="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      <!-- Background Parallax Image -->
      <div 
        class="hero-bg-layer absolute inset-0 bg-cover bg-center" 
        :style="{ backgroundImage: `url(${heroBg})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-pitch-black via-pitch-black/60 to-pitch-black/40"></div>
      
      <!-- Live Rising Embers Simulation Canvas -->
      <EmberCanvas />

      <div class="relative z-10 text-center container-custom flex flex-col items-center max-w-4xl py-20">
        <div class="hero-badge mb-6 flex items-center gap-2 border border-white/15 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-label-caps text-burnt">
          <span class="inline-block w-2 h-2 rounded-full bg-fire animate-ping"></span>
          <span>Exclusive Wood-Fired Experience</span>
        </div>

        <h1 class="hero-title text-display-lg text-white font-serif tracking-tight mb-6">
          THE ART OF <span class="text-fire italic font-normal">THE ROAST</span>
        </h1>

        <p class="hero-subtitle text-body-lg text-gray-300 max-w-2xl mb-10 font-light tracking-wide">
          Primal heat meets refined culinary craftsmanship. Savor 45-day dry-aged wagyu carved tableside over screaming cast-iron embers.
        </p>

        <div class="hero-cta flex flex-col sm:flex-row items-center gap-4">
          <router-link class="btn btn-primary magnetic-target" to="/reservations">
            <span>Reserve Your Evening</span>
          </router-link>
          <router-link class="btn btn-ghost magnetic-target" to="/menu">
            <span>Explore Full Menu</span>
          </router-link>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
        <span class="text-xs uppercase tracking-widest font-sans">Scroll</span>
        <span class="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </section>

    <!-- Stats / Philosophy Bar with GSAP Animated Counters -->
    <section class="border-y border-white/10 bg-[#0c0c0c] py-12">
      <div class="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div class="gsap-reveal flex flex-col items-center">
          <span class="font-serif text-3xl md:text-4xl text-burnt font-bold" data-counter-target="45" data-counter-suffix=" Days">0</span>
          <span class="text-label-caps text-gray-400 mt-2">Dry-Aging Process</span>
        </div>
        <div class="gsap-reveal flex flex-col items-center">
          <span class="font-serif text-3xl md:text-4xl text-fire font-bold" data-counter-target="1200" data-counter-suffix="°F">0</span>
          <span class="text-label-caps text-gray-400 mt-2">Live Wood Fire</span>
        </div>
        <div class="gsap-reveal flex flex-col items-center">
          <span class="font-serif text-3xl md:text-4xl text-burnt font-bold" data-counter-target="100" data-counter-suffix="%">0</span>
          <span class="text-label-caps text-gray-400 mt-2">A5 Japanese Wagyu</span>
        </div>
        <div class="gsap-reveal flex flex-col items-center">
          <span class="font-serif text-3xl md:text-4xl text-fire font-bold" data-counter-target="450" data-counter-prefix="" data-counter-suffix="+">0</span>
          <span class="text-label-caps text-gray-400 mt-2">Curated Wine Cellar</span>
        </div>
      </div>
    </section>

    <!-- Our Craftsmanship Section -->
    <section class="section-padding relative overflow-hidden bg-pitch-black" id="our-craft">
      <div class="container-custom grid lg:grid-cols-2 gap-16 items-center">
        <!-- Text Column -->
        <div class="gsap-section-header">
          <span class="header-tag text-label-caps text-burnt mb-3 block">Primal Mastery</span>
          <h2 class="text-display-md text-white font-serif mb-6">Forged by Iron, <br><span class="text-fire italic">Refined by Flame</span></h2>
          <p class="text-body-lg mb-6">
            At Forge &amp; Flame, we strip away culinary pretension to focus on what matters: the transformative alchemy of intense heat and exceptional butchery.
          </p>
          <p class="text-body-md mb-8">
            Our hearth burns exclusively seasoned white oak and hickory, infusing every cut with a rich, smoky profile that cannot be replicated by modern gas ranges.
          </p>
          <div class="flex items-center gap-6">
            <div class="border-l-2 border-fire pl-4">
              <span class="block text-xl font-serif text-white font-semibold">Chef Marcus Sterling</span>
              <span class="text-label-caps text-gray-400 text-xs">Master Pitmaster &amp; Founder</span>
            </div>
          </div>
        </div>

        <!-- Visual Collage with Parallax -->
        <div class="relative">
          <div class="gsap-image-reveal image-reveal-wrapper rounded ghost-border overflow-hidden h-[480px]">
            <img :src="aboutHearthImg" alt="Custom Blacksmith Grill Hearth" class="w-full h-full object-cover">
          </div>
          <!-- Floating Accent Card -->
          <div class="absolute -bottom-8 -left-8 bg-surface/90 backdrop-blur-md p-6 ghost-border border-fire/30 max-w-xs hidden sm:block" data-parallax-speed="0.2">
            <div class="flex items-center gap-3 mb-2">
              <span class="material-symbols-outlined text-fire">workspace_premium</span>
              <span class="text-label-caps text-white">White Oak Fuel</span>
            </div>
            <p class="text-xs text-gray-400">Slow-cured 18 months for clean, aromatic smoke at extreme temperatures.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Signature Cuts -->
    <section class="section-padding bg-[#0d0d0d] relative" id="the-grill">
      <div class="container-custom">
        <div class="gsap-section-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <span class="header-tag text-label-caps text-burnt mb-2 block">The Showcase</span>
            <h2 class="text-display-md text-white font-serif">Signature Cuts</h2>
          </div>
          <router-link to="/menu" class="btn btn-ghost text-xs mt-4 md:mt-0">View Complete Menu</router-link>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="cut in signatureCuts" 
            :key="cut.id"
            class="gsap-reveal glass-card overflow-hidden group flex flex-col"
            :class="{ 'border-fire/40': cut.featured }"
          >
            <div class="h-64 overflow-hidden relative">
              <img :src="cut.img" :alt="cut.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              <div class="absolute top-4 left-4">
                <span class="badge-tag highlight">{{ cut.highlightTag }}</span>
              </div>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-baseline mb-2">
                  <h3 class="font-serif text-xl text-white group-hover:text-burnt transition-colors">{{ cut.title }}</h3>
                  <span class="font-serif text-xl text-fire font-bold">{{ cut.price }}</span>
                </div>
                <p class="text-body-md text-sm mb-4">{{ cut.desc }}</p>
              </div>
              <div class="flex gap-2 pt-4 border-t border-white/5">
                <span v-for="tag in cut.bottomTags" :key="tag" class="badge-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Culinary Gallery Masonry -->
    <section class="section-padding bg-pitch-black">
      <div class="container-custom">
        <div class="gsap-section-header text-center max-w-2xl mx-auto mb-16">
          <span class="header-tag text-label-caps text-burnt mb-2 block">Atmosphere &amp; Fire</span>
          <h2 class="text-display-md text-white font-serif">Moments from the Forge</h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="gsap-reveal overflow-hidden rounded ghost-border h-60">
            <img :src="galleryPrepImg" alt="Steak prep" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
          <div class="gsap-reveal overflow-hidden rounded ghost-border h-60">
            <img :src="galleryFlameImg" alt="Live open flame" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
          <div class="gsap-reveal overflow-hidden rounded ghost-border h-60">
            <img :src="galleryWineImg" alt="Sommelier wine pouring" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
          <div class="gsap-reveal overflow-hidden rounded ghost-border h-60">
            <img :src="galleryDiningImg" alt="Atmospheric dining room" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="relative py-28 bg-[#111111] overflow-hidden border-t border-white/10">
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-30" 
        :style="{ backgroundImage: `url(${ctaBgImg})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-r from-pitch-black via-pitch-black/80 to-transparent"></div>

      <div class="container-custom relative z-10 max-w-3xl">
        <div class="gsap-reveal">
          <span class="text-label-caps text-fire mb-3 block">An Unforgettable Night</span>
          <h2 class="text-display-md text-white font-serif mb-6">Claim Your Seat Beside the Hearth</h2>
          <p class="text-body-lg mb-8 text-gray-300">
            Reservations open 30 days in advance. Private dining vaults and Chef's Tasting Counter seats are limited.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/reservations" class="btn btn-primary magnetic-target">Book Table Now</router-link>
            <router-link to="/contact" class="btn btn-ghost magnetic-target">Private Dining Inquiries</router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import EmberCanvas from '@/components/common/EmberCanvas.vue';
import { initPageAnimations, cleanupPageAnimations } from '@/logic/animations';

import heroBg from '@/design/images/hero-main-bg.jpg';
import aboutHearthImg from '@/design/images/about-hearth.jpg';
import dishRibeyeImg from '@/design/images/dish-ribeye.jpg';
import dishTomahawkImg from '@/design/images/dish-tomahawk.jpg';
import dishBrisketImg from '@/design/images/dish-brisket.jpg';
import galleryPrepImg from '@/design/images/gallery-prep.jpg';
import galleryFlameImg from '@/design/images/gallery-flame.jpg';
import galleryWineImg from '@/design/images/gallery-wine.jpg';
import galleryDiningImg from '@/design/images/gallery-dining.jpg';
import ctaBgImg from '@/design/images/cta-bg.jpg';

const signatureCuts = [
  {
    id: 'ribeye',
    title: 'Bone-In Ribeye',
    price: '₱4,850',
    desc: '24oz prime cut, heavily marbled, crusted in coarse sel gris and marrow tallow butter.',
    img: dishRibeyeImg,
    highlightTag: '45-Day Aged',
    bottomTags: ['GF', 'Cast Iron Finish'],
    featured: false
  },
  {
    id: 'tomahawk',
    title: 'The Grand Tomahawk',
    price: '₱9,500',
    desc: '40oz long-bone dry-aged ribeye, flamed with bourbon and carved tableside with chimichurri.',
    img: dishTomahawkImg,
    highlightTag: "Chef's Signature",
    bottomTags: ['For Two', 'Tableside Carved'],
    featured: true
  },
  {
    id: 'brisket',
    title: 'A5 Wagyu Brisket',
    price: '₱3,250',
    desc: 'Miyazaki wagyu flat, deeply barked with toasted peppercorn and brushed with honey gastrique.',
    img: dishBrisketImg,
    highlightTag: '14-Hour Smoked',
    bottomTags: ['GF', 'Cherry Wood'],
    featured: false
  }
];

onMounted(async () => {
  await nextTick();
  initPageAnimations();
});

onUnmounted(() => {
  cleanupPageAnimations();
});
</script>

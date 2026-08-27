<template>
  <div>
    <!-- Navigation Header -->
    <header 
      class="fixed top-0 w-full z-50 transition-all duration-300" 
      :class="{ 'scrolled': isScrolled }"
      id="mainNav"
    >
      <div class="container-custom flex justify-between items-center py-6">
        <router-link to="/" class="flex items-center gap-2 group text-decoration-none">
          <span class="material-symbols-outlined text-fire group-hover:rotate-12 transition-transform duration-300">local_fire_department</span>
          <span class="font-serif text-2xl tracking-tighter font-bold text-white group-hover:text-burnt transition-colors">Forge &amp; Flame</span>
        </router-link>

        <nav class="hidden md:flex items-center gap-10">
          <router-link 
            to="/" 
            class="nav-link text-label-caps" 
            :class="{ 'active': route.path === '/' }"
          >Our Craft</router-link>
          <router-link 
            to="/menu" 
            class="nav-link text-label-caps" 
            :class="{ 'active': route.path === '/menu' }"
          >The Grill Menu</router-link>
          <router-link 
            to="/reservations" 
            class="nav-link text-label-caps" 
            :class="{ 'active': route.path === '/reservations' }"
          >Reservations</router-link>
          <router-link 
            to="/contact" 
            class="nav-link text-label-caps" 
            :class="{ 'active': route.path === '/contact' }"
          >Contact Us</router-link>
        </nav>

        <div class="hidden md:flex items-center gap-4">
          <router-link to="/reservations" class="btn btn-primary magnetic-target">
            <span>Book a Table</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>

        <!-- Mobile Hamburger -->
        <button 
          class="md:hidden text-white p-2" 
          id="mobileMenuToggle" 
          aria-label="Open menu"
          @click="toggleMobileMenu(true)"
        >
          <span class="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </header>

    <!-- Mobile Menu Drawer -->
    <div id="mobileMenuDrawer" :class="{ 'active': isMobileOpen }">
      <button 
        class="absolute top-8 right-8 text-white p-2" 
        id="mobileMenuClose" 
        aria-label="Close menu"
        @click="toggleMobileMenu(false)"
      >
        <span class="material-symbols-outlined text-4xl">close</span>
      </button>
      <div class="flex flex-col items-center gap-8 text-center" ref="drawerLinksRef">
        <router-link 
          class="font-serif text-3xl text-white hover:text-fire transition-colors" 
          to="/" 
          @click="toggleMobileMenu(false)"
        >Our Craft</router-link>
        <router-link 
          class="font-serif text-3xl text-white hover:text-fire transition-colors" 
          to="/menu" 
          @click="toggleMobileMenu(false)"
        >The Grill Menu</router-link>
        <router-link 
          class="font-serif text-3xl text-white hover:text-fire transition-colors" 
          to="/reservations" 
          @click="toggleMobileMenu(false)"
        >Reservations</router-link>
        <router-link 
          class="font-serif text-3xl text-white hover:text-fire transition-colors" 
          to="/contact" 
          @click="toggleMobileMenu(false)"
        >Contact Us</router-link>
        <router-link 
          class="btn btn-primary mt-6" 
          to="/reservations" 
          @click="toggleMobileMenu(false)"
        >Book a Table</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';

const route = useRoute();
const isScrolled = ref(false);
const isMobileOpen = ref(false);
const drawerLinksRef = ref(null);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40;
};

const toggleMobileMenu = async (open) => {
  isMobileOpen.value = open;
  if (open) {
    document.body.style.overflow = 'hidden';
    await nextTick();
    if (drawerLinksRef.value) {
      const links = drawerLinksRef.value.querySelectorAll('a');
      gsap.fromTo(links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }
  } else {
    document.body.style.overflow = '';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<template>
  <main class="pt-28">
    <!-- Hero Header -->
    <header class="relative w-full h-[45vh] min-h-[340px] flex items-center justify-center overflow-hidden">
      <div 
        class="hero-bg-layer absolute inset-0 bg-cover bg-center" 
        :style="{ backgroundImage: `url(${menuHeroBg})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-pitch-black via-pitch-black/70 to-pitch-black/50"></div>

      <div class="relative z-10 text-center container-custom max-w-3xl">
        <span class="hero-badge text-label-caps text-burnt mb-3 block">Every Cut • Every Craft</span>
        <h1 class="hero-title text-display-lg text-white font-serif mb-4">The Full Grill</h1>
        <p class="hero-subtitle text-body-lg text-gray-300 font-light">
          Sourced from heritage ranches, dry-aged in-house, and grilled over pure white oak coals.
        </p>
      </div>
    </header>

    <!-- Filter & Search Controls -->
    <section class="container-custom pt-8 pb-24">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-6 mb-12">
        <!-- Interactive Category Tabs -->
        <div class="category-tabs-container mb-0 border-b-0 pb-0">
          <button 
            v-for="tab in categories" 
            :key="tab.id"
            class="tab-btn" 
            :class="{ 'active': activeCategory === tab.id }"
            @click="setCategory(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Dietary Filter Dropdown -->
        <div class="flex items-center gap-3">
          <label for="dietaryFilterSelect" class="text-xs text-gray-400 uppercase tracking-wider whitespace-nowrap">Filter Diet:</label>
          <select 
            id="dietaryFilterSelect" 
            v-model="activeDietFilter"
            class="bg-[#141414] text-gray-300 text-xs border border-white/15 px-3 py-2 rounded-none outline-none focus:border-fire"
          >
            <option value="ALL">All Selections</option>
            <option value="GF">Gluten-Free (GF)</option>
            <option value="DF">Dairy-Free (DF)</option>
            <option value="FOR TWO">Shareable (For Two)</option>
          </select>
        </div>
      </div>

      <!-- Bento Signature Highlight (The Grand Tomahawk) -->
      <div 
        v-if="(activeCategory === 'all' || activeCategory === 'cuts') && isDietMatch(featuredItem)"
        class="menu-category-section mb-20"
      >
        <div class="gsap-reveal glass-card overflow-hidden grid lg:grid-cols-12 gap-0 border-fire/30">
          <div class="lg:col-span-7 h-72 lg:h-auto overflow-hidden relative">
            <img :src="featuredItem.img" :alt="featuredItem.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute top-4 left-4">
              <span class="badge-tag highlight">Hearth Masterpiece</span>
            </div>
          </div>
          <div class="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-[#0e0e0e]">
            <div>
              <div class="flex justify-between items-baseline mb-3">
                <h3 class="font-serif text-2xl md:text-3xl text-white font-bold">{{ featuredItem.title }}</h3>
                <span class="font-serif text-2xl md:text-3xl text-fire font-bold">{{ featuredItem.price }}</span>
              </div>
              <p class="text-burnt text-sm uppercase tracking-widest font-semibold mb-4">{{ featuredItem.subtitle }}</p>
              <p class="text-gray-400 text-sm leading-relaxed mb-6">
                {{ featuredItem.desc }}
              </p>
            </div>
            <div class="flex items-center justify-between pt-6 border-t border-white/10">
              <div class="flex gap-2">
                <span v-for="b in featuredItem.badges" :key="b" class="badge-tag">{{ b }}</span>
              </div>
              <router-link to="/reservations" class="btn btn-primary text-xs py-2 px-4">Reserve for Table</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Sections -->
      <template v-for="cat in visibleCategories" :key="cat.id">
        <div 
          v-if="getItemsForCategory(cat.id).length > 0" 
          class="menu-category-section mb-20"
        >
          <div class="flex items-center gap-4 mb-8">
            <h2 class="font-serif text-2xl text-white font-bold">{{ cat.title }}</h2>
            <div class="flex-grow h-px bg-white/10"></div>
          </div>

          <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <div 
              v-for="item in getItemsForCategory(cat.id)" 
              :key="item.id"
              class="menu-item-row flex flex-col cursor-pointer p-4 rounded hover:bg-white/[0.02] transition-colors"
              @click="openModal(item)"
            >
              <div class="flex items-baseline justify-between mb-1">
                <h3 class="font-serif text-lg text-white font-semibold">{{ item.title }}</h3>
                <div class="leader-dots"></div>
                <span class="font-serif text-lg text-fire font-bold">{{ item.price }}</span>
              </div>
              <p class="text-xs text-gray-400 mb-2">{{ item.desc }}</p>
              <div class="flex gap-2">
                <span 
                  v-for="b in item.badges" 
                  :key="b" 
                  class="badge-tag"
                  :class="{ 'highlight': b === 'Chef Pick' || b === '45-Day Aged' }"
                >{{ b }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Item Details Modal (Teleported to Body) -->
    <teleport to="body">
      <div 
        class="custom-modal" 
        :class="{ 'active': isModalOpen }"
        id="menuItemModal"
        @click.self="closeModal"
      >
        <div class="glass-card max-w-lg w-full p-8 rounded relative border-fire/30">
          <button 
            class="absolute top-6 right-6 text-gray-400 hover:text-white"
            @click="closeModal"
          >
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>

          <div v-if="selectedItem?.img" class="h-48 rounded overflow-hidden mb-6">
            <img :src="selectedItem.img" :alt="selectedItem.title" class="w-full h-full object-cover">
          </div>

          <div class="flex justify-between items-baseline mb-2">
            <h3 class="font-serif text-2xl text-white font-bold">{{ selectedItem?.title }}</h3>
            <span class="font-serif text-2xl text-fire font-bold">{{ selectedItem?.price }}</span>
          </div>

          <div class="flex gap-2 mb-4">
            <span v-for="b in selectedItem?.badges || []" :key="b" class="badge-tag">{{ b }}</span>
          </div>

          <p class="text-sm text-gray-300 leading-relaxed mb-6">{{ selectedItem?.desc }}</p>

          <div class="bg-[#121212] p-4 rounded border border-white/5 mb-6 text-xs">
            <div class="text-burnt uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">wine_bar</span>
              <span>Sommelier Wine Pairing</span>
            </div>
            <p class="text-gray-300">{{ selectedItem?.pairing }}</p>
          </div>

          <div class="flex gap-4">
            <router-link to="/reservations" class="btn btn-primary w-full text-xs" @click="closeModal">Book Experience</router-link>
            <button type="button" class="btn btn-ghost w-full text-xs" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </teleport>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { MENU_ITEMS } from '@/logic/menuData';
import { initPageAnimations, cleanupPageAnimations } from '@/logic/animations';
import menuHeroBg from '@/design/images/menu-hero-bg.jpg';

const categories = [
  { id: 'all', label: 'All Dishes' },
  { id: 'starters', label: 'Starters', title: 'Starters & Small Plates' },
  { id: 'cuts', label: 'Signature Cuts', title: 'Prime & Dry-Aged Cuts' },
  { id: 'pit', label: 'From the Pit', title: 'Pitmaster Specialties' },
  { id: 'sides', label: 'Sides & Greens', title: 'Accompaniments & Greens' },
  { id: 'libations', label: 'Cellar & Cocktails', title: 'Cocktails & Rare Vintages' }
];

const activeCategory = ref('all');
const activeDietFilter = ref('ALL');
const isModalOpen = ref(false);
const selectedItem = ref(null);

const featuredItem = MENU_ITEMS.find(i => i.id === 'grand-tomahawk');

const visibleCategories = computed(() => {
  if (activeCategory.value === 'all') {
    return categories.filter(c => c.id !== 'all');
  }
  return categories.filter(c => c.id === activeCategory.value);
});

const isDietMatch = (item) => {
  if (!item) return false;
  if (activeDietFilter.value === 'ALL') return true;
  return item.badges?.some(b => b.toUpperCase() === activeDietFilter.value);
};

const getItemsForCategory = (catId) => {
  return MENU_ITEMS.filter(item => {
    if (item.featured) return false; // Handled in hero highlight
    if (item.category !== catId) return false;
    return isDietMatch(item);
  });
};

const setCategory = (catId) => {
  activeCategory.value = catId;
  nextTick(() => {
    initPageAnimations();
  });
};

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
};

onMounted(async () => {
  await nextTick();
  initPageAnimations();
});

onUnmounted(() => {
  cleanupPageAnimations();
});
</script>

<template>
  <main class="pt-28 pb-24">
    <!-- Hero Title -->
    <section class="container-custom py-12">
      <div class="text-center max-w-2xl mx-auto">
        <span class="hero-badge text-label-caps text-burnt mb-3 block">Bespoke Hospitality</span>
        <h1 class="hero-title text-display-md text-white font-serif mb-4">Table Reservations</h1>
        <p class="hero-subtitle text-body-lg text-gray-400 font-light">
          Join us for an unforgettable evening surrounded by the glow of the hearth.
        </p>
      </div>
    </section>

    <!-- Booking Layout -->
    <section class="container-custom">
      <div class="grid lg:grid-cols-12 gap-12">
        <!-- Left: Booking Form -->
        <div class="lg:col-span-8">
          <form @submit.prevent="handleSubmit" class="glass-card p-8 md:p-10 rounded">
            <!-- Step 1: Select Seating Experience -->
            <div class="mb-10">
              <label class="form-label text-sm text-burnt mb-4 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-fire text-white flex items-center justify-center text-xs">1</span>
                Select Dining Experience
              </label>
              <div class="grid md:grid-cols-3 gap-4">
                <div 
                  v-for="exp in experiences" 
                  :key="exp.name"
                  class="experience-card-select cursor-pointer"
                  :class="{ 'selected': selectedExperience === exp.name }"
                  @click="selectedExperience = exp.name"
                >
                  <div class="flex items-center gap-2 mb-2">
                    <span class="material-symbols-outlined" :class="exp.iconClass">{{ exp.icon }}</span>
                    <h4 class="font-serif text-base text-white font-semibold">{{ exp.title }}</h4>
                  </div>
                  <p class="text-xs text-gray-400 mb-3">{{ exp.desc }}</p>
                  <span class="badge-tag" :class="{ 'highlight': exp.highlight }">{{ exp.badge }}</span>
                </div>
              </div>
            </div>

            <!-- Step 2: Date, Time & Party Size -->
            <div class="mb-10 pt-8 border-t border-white/10">
              <label class="form-label text-sm text-burnt mb-6 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-fire text-white flex items-center justify-center text-xs">2</span>
                Date, Guests &amp; Time
              </label>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="form-label" for="resDate">Reservation Date</label>
                  <input 
                    type="date" 
                    id="resDate" 
                    v-model="bookingData.date" 
                    :min="minDate"
                    class="input-minimal text-sm" 
                    required
                  >
                </div>
                <div>
                  <label class="form-label" for="resGuests">Party Size (Guests)</label>
                  <input 
                    type="number" 
                    id="resGuests" 
                    v-model.number="bookingData.guests" 
                    min="1" 
                    max="14" 
                    class="input-minimal text-sm" 
                    required
                  >
                </div>
              </div>

              <div>
                <label class="form-label mb-3">Available Seatings</label>
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  <button 
                    v-for="time in timeslots" 
                    :key="time.value"
                    type="button" 
                    class="time-slot-pill" 
                    :class="{ 'active': bookingData.time === time.value }"
                    @click="bookingData.time = time.value"
                  >
                    {{ time.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 3: Contact & Special Requests -->
            <div class="pt-8 border-t border-white/10 mb-8">
              <label class="form-label text-sm text-burnt mb-6 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-fire text-white flex items-center justify-center text-xs">3</span>
                Guest Contact &amp; Details
              </label>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="form-label" for="resName">Full Name</label>
                  <input 
                    type="text" 
                    id="resName" 
                    v-model="bookingData.name"
                    placeholder="e.g. Sterling Archer" 
                    required 
                    class="input-minimal text-sm"
                  >
                </div>
                <div>
                  <label class="form-label" for="resEmail">Email Address</label>
                  <input 
                    type="email" 
                    id="resEmail" 
                    v-model="bookingData.email"
                    placeholder="e.g. sterling@domain.com" 
                    required 
                    class="input-minimal text-sm"
                  >
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="form-label" for="resPhone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="resPhone" 
                    v-model="bookingData.phone"
                    placeholder="e.g. (555) 234-5678" 
                    required 
                    class="input-minimal text-sm"
                  >
                </div>
                <div>
                  <label class="form-label" for="resOccasion">Occasion</label>
                  <select id="resOccasion" v-model="bookingData.occasion" class="input-minimal text-sm">
                    <option value="Casual Dinner">Casual Dinner / Date Night</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business Dining">Corporate / Business Dining</option>
                    <option value="Other">Special Occasion</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="form-label" for="resNotes">Dietary Restrictions or Special Requests</label>
                <textarea 
                  id="resNotes" 
                  v-model="bookingData.notes"
                  rows="2" 
                  placeholder="Let our culinary team know of any allergies, favorite wine preferences, or seating requests..." 
                  class="input-minimal text-sm"
                ></textarea>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary w-full py-4 text-sm font-bold tracking-widest magnetic-target">
              Confirm Reservation
            </button>
          </form>
        </div>

        <!-- Right: Dynamic Reservation Summary Card & Seating Visuals -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <!-- Live Summary Card -->
          <div class="glass-panel p-6 rounded sticky top-28">
            <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <span class="material-symbols-outlined text-fire">receipt_long</span>
              <h3 class="font-serif text-lg text-white font-bold">Booking Summary</h3>
            </div>

            <div class="space-y-4 text-xs">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Experience</span>
                <span class="text-white font-semibold">{{ selectedExperience }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Date</span>
                <span class="text-white font-semibold">{{ formattedDate }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Time</span>
                <span class="text-white font-semibold">{{ formattedTime }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Party Size</span>
                <span class="text-white font-semibold">{{ bookingData.guests }} {{ bookingData.guests === 1 ? 'Guest' : 'Guests' }}</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-white/10 bg-black/40 p-4 rounded text-xs text-gray-400">
              <div class="flex items-center gap-2 text-burnt font-semibold mb-1">
                <span class="material-symbols-outlined text-sm">shield</span>
                <span>Reservation Policy</span>
              </div>
              <span>We hold tables for 15 minutes past reservation time. Smart casual dress code requested. Cancellations accepted up to 24 hours prior without fee.</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Confirmation Modal (Teleported to Body) -->
    <teleport to="body">
      <div 
        class="custom-modal" 
        :class="{ 'active': isConfirmed }"
        id="reservationSuccessModal"
        @click.self="isConfirmed = false"
      >
        <div class="glass-card max-w-md w-full p-8 rounded text-center border-fire/40 relative">
          <div class="w-16 h-16 rounded-full bg-fire/20 border border-fire flex items-center justify-center mx-auto mb-6">
            <span class="material-symbols-outlined text-3xl text-fire">check</span>
          </div>

          <h3 class="font-serif text-2xl text-white font-bold mb-2">Reservation Confirmed</h3>
          <p class="text-sm text-gray-300 mb-6">
            Thank you, <strong class="text-white">{{ bookingData.name || 'Valued Guest' }}</strong>. Your seat at the hearth is secured.
          </p>

          <div class="bg-[#121212] p-4 rounded border border-white/5 text-xs text-left mb-6 space-y-2 text-gray-400">
            <div><strong class="text-white">Experience:</strong> {{ selectedExperience }}</div>
            <div><strong class="text-white">Seating:</strong> {{ formattedDate }} at {{ formattedTime }}</div>
            <div><strong class="text-white">Party:</strong> {{ bookingData.guests }} Guests</div>
            <div><strong class="text-white">Occasion:</strong> {{ bookingData.occasion }}</div>
          </div>

          <button 
            type="button" 
            class="btn btn-primary w-full text-xs" 
            @click="isConfirmed = false"
          >
            Done
          </button>
        </div>
      </div>
    </teleport>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { initPageAnimations, cleanupPageAnimations } from '@/logic/animations';

const experiences = [
  {
    name: 'Main Dining Room',
    title: 'Main Dining',
    desc: 'Atmospheric dark tables with views of the wood-fired hearth.',
    badge: 'Standard Booking',
    icon: 'table_restaurant',
    iconClass: 'text-fire',
    highlight: false
  },
  {
    name: "Chef's Tasting Counter",
    title: "Chef's Counter",
    desc: 'Front-row seats directly facing the pitmaster and grill line.',
    badge: 'Omakase Experience',
    icon: 'soup_kitchen',
    iconClass: 'text-burnt',
    highlight: true
  },
  {
    name: 'The Wine Vault (Private)',
    title: 'The Vault',
    desc: 'Private secluded room surrounded by rare cellar vintages (Up to 14 guests).',
    badge: 'VIP Private',
    icon: 'meeting_room',
    iconClass: 'text-ember',
    highlight: false
  }
];

const timeslots = [
  { value: '17:30', label: '5:30 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '19:30', label: '7:30 PM' },
  { value: '20:30', label: '8:30 PM' },
  { value: '21:00', label: '9:00 PM' }
];

const selectedExperience = ref('Main Dining Room');
const isConfirmed = ref(false);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const defaultDateStr = tomorrow.toISOString().split('T')[0];
const minDate = new Date().toISOString().split('T')[0];

const bookingData = ref({
  date: defaultDateStr,
  guests: 2,
  time: '19:00',
  name: '',
  email: '',
  phone: '',
  occasion: 'Casual Dinner',
  notes: ''
});

const formattedDate = computed(() => {
  if (!bookingData.value.date) return 'Not selected';
  const d = new Date(bookingData.value.date);
  return isNaN(d) ? bookingData.value.date : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
});

const formattedTime = computed(() => {
  const match = timeslots.find(t => t.value === bookingData.value.time);
  return match ? match.label : bookingData.value.time;
});

const handleSubmit = () => {
  isConfirmed.value = true;
};

onMounted(async () => {
  await nextTick();
  initPageAnimations();
});

onUnmounted(() => {
  cleanupPageAnimations();
});
</script>

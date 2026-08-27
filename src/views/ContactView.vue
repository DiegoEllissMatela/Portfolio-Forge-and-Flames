<template>
  <main class="pt-28 pb-24">
    <!-- Hero Header -->
    <section class="container-custom py-12">
      <div class="text-center max-w-2xl mx-auto">
        <span class="hero-badge text-label-caps text-burnt mb-3 block">Direct Concierge</span>
        <h1 class="hero-title text-display-md text-white font-serif mb-4">Connect With Our Team</h1>
        <p class="hero-subtitle text-body-lg text-gray-400 font-light">
          Whether organizing a private buyout, planning a corporate wine dinner, or seeking personalized assistance, we are at your service.
        </p>
      </div>
    </section>

    <!-- Contact & Form Section -->
    <section class="container-custom">
      <div class="grid lg:grid-cols-12 gap-12 items-start">
        <!-- Left: Contact Info & Address -->
        <div class="lg:col-span-5 space-y-8">
          <div class="glass-card p-8 rounded">
            <h3 class="font-serif text-2xl text-white font-bold mb-6">The Hearth Location</h3>
            
            <div class="space-y-6 text-sm">
              <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-fire text-2xl mt-0.5">location_on</span>
                <div>
                  <h4 class="text-label-caps text-white mb-1">Address</h4>
                  <p class="text-gray-400">123 Ironworks District<br>Culinary City, CC 90210</p>
                  <span class="text-xs text-burnt mt-1 block">Valet Parking Available at Main Entrance</span>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-burnt text-2xl mt-0.5">phone_in_talk</span>
                <div>
                  <h4 class="text-label-caps text-white mb-1">Telephone</h4>
                  <p class="text-gray-300 font-serif">+1 (555) 894-3473 (FORGE)</p>
                  <span class="text-xs text-gray-500">Concierge lines active daily from 12:00 PM</span>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-ember text-2xl mt-0.5">mail</span>
                <div>
                  <h4 class="text-label-caps text-white mb-1">Inquiries</h4>
                  <p class="text-gray-300">vip@forgeandflame.com</p>
                  <p class="text-gray-500 text-xs mt-0.5">events@forgeandflame.com</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Private Dining Image Spotlight -->
          <div class="ghost-border rounded overflow-hidden relative h-64 group">
            <img :src="contactVaultImg" alt="The Private Vault" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-pitch-black via-pitch-black/40 to-transparent flex flex-col justify-end p-6">
              <span class="badge-tag self-start mb-2">Private Buyouts</span>
              <h4 class="font-serif text-lg text-white font-bold">The Cellar Vault</h4>
              <p class="text-xs text-gray-300">Seating for up to 14 guests with dedicated sommelier and custom tasting menu.</p>
            </div>
          </div>
        </div>

        <!-- Right: Inquiry Form -->
        <div class="lg:col-span-7">
          <form @submit.prevent="handleSubmit" class="glass-card p-8 md:p-10 rounded">
            <h3 class="font-serif text-2xl text-white font-bold mb-2">Send an Inquiry</h3>
            <p class="text-xs text-gray-400 mb-8">Our guest relations manager will review your request and reply within 24 business hours.</p>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="form-label" for="contactName">Full Name</label>
                <input 
                  type="text" 
                  id="contactName" 
                  v-model="form.name"
                  placeholder="Your name" 
                  required 
                  class="input-minimal text-sm"
                >
              </div>
              <div>
                <label class="form-label" for="contactEmail">Email Address</label>
                <input 
                  type="email" 
                  id="contactEmail" 
                  v-model="form.email"
                  placeholder="your.email@company.com" 
                  required 
                  class="input-minimal text-sm"
                >
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="form-label" for="contactPhone">Phone</label>
                <input 
                  type="tel" 
                  id="contactPhone" 
                  v-model="form.phone"
                  placeholder="(555) 000-0000" 
                  class="input-minimal text-sm"
                >
              </div>
              <div>
                <label class="form-label" for="contactSubject">Subject</label>
                <select id="contactSubject" v-model="form.subject" class="input-minimal text-sm">
                  <option value="Private Dining Vault" class="bg-[#181818]">Private Dining Vault (Up to 14 Guests)</option>
                  <option value="Full Restaurant Buyout" class="bg-[#181818]">Full Restaurant Buyout</option>
                  <option value="Sommelier Wine Consultation" class="bg-[#181818]">Sommelier / Wine Cellar Consultation</option>
                  <option value="Press & Media" class="bg-[#181818]">Press &amp; Media Inquiries</option>
                  <option value="Other" class="bg-[#181818]">General Inquiry</option>
                </select>
              </div>
            </div>

            <div class="mb-8">
              <label class="form-label" for="contactMessage">Your Message</label>
              <textarea 
                id="contactMessage" 
                v-model="form.message"
                rows="5" 
                placeholder="Please provide details about your desired dates, estimated guest count, or any specific requirements..." 
                required 
                class="input-minimal text-sm"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary w-full py-4 text-sm font-bold tracking-widest magnetic-target">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion Section -->
    <section class="container-custom mt-24">
      <div class="max-w-3xl mx-auto">
        <div class="gsap-section-header text-center mb-12">
          <span class="header-tag text-label-caps text-burnt mb-2 block">Information</span>
          <h2 class="text-display-md text-white font-serif">Frequently Asked Questions</h2>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(faq, idx) in faqs" 
            :key="idx"
            class="faq-accordion-item"
            :class="{ 'active': activeFaq === idx }"
          >
            <button class="faq-header" type="button" @click="toggleFaq(idx)">
              <span>{{ faq.q }}</span>
              <span class="material-symbols-outlined faq-icon">
                {{ activeFaq === idx ? 'remove' : 'add' }}
              </span>
            </button>
            <div class="faq-body">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { initPageAnimations, cleanupPageAnimations } from '@/logic/animations';
import { showToast } from '@/logic/toast';
import contactVaultImg from '@/design/images/contact-vault.jpg';

const activeFaq = ref(null);

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: 'Private Dining Vault',
  message: ''
});

const faqs = [
  {
    q: 'What is the dress code policy?',
    a: 'We maintain an upscale smart-casual dress code. Athletic wear, beach attire, and distressed garments are politely discouraged. Collared shirts or elevated evening attire are recommended.'
  },
  {
    q: 'Can dietary accommodations and allergies be managed?',
    a: 'Absolutely. While our specialty is wood-fired steaks, our culinary team provides extensive Gluten-Free (GF) and Dairy-Free (DF) preparations. Please inform us at the time of reservation.'
  },
  {
    q: 'Can we bring our own wine (Corkage Policy)?',
    a: 'Guests may bring up to two 750ml bottles per party that are not currently featured on our wine list. A corkage fee of ₱2,500 per bottle applies.'
  },
  {
    q: 'How far in advance can reservations be made?',
    a: "Standard table reservations open 30 days in advance at midnight. For Private Vault buyouts or Chef's Tasting Counter buyouts, inquiries can be made up to 6 months in advance."
  }
];

const toggleFaq = (idx) => {
  activeFaq.value = activeFaq.value === idx ? null : idx;
};

const handleSubmit = () => {
  const guestName = form.value.name || 'Guest';
  showToast(`Thank you, ${guestName}. Our VIP concierge will contact you within 24 hours.`, 'success');
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: 'Private Dining Vault',
    message: ''
  };
};

onMounted(async () => {
  await nextTick();
  initPageAnimations();
});

onUnmounted(() => {
  cleanupPageAnimations();
});
</script>

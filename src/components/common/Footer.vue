<template>
  <footer class="bg-[#050505] border-t border-white/10 py-16 text-gray-400 text-sm">
    <div class="container-custom grid md:grid-cols-4 gap-12 mb-12">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="material-symbols-outlined text-fire">local_fire_department</span>
          <span class="font-serif text-xl font-bold text-white">Forge &amp; Flame</span>
        </div>
        <p class="text-xs text-gray-500 leading-relaxed mb-4">
          Sensory wood-fired gastronomy, dry-aged perfection, and immersive luxury dining.
        </p>
        <div class="text-xs text-burnt">123 Ironworks District, Culinary City</div>
      </div>

      <div>
        <h4 class="text-label-caps text-white mb-4">Navigation</h4>
        <ul class="space-y-2 text-xs">
          <li><router-link to="/" class="hover:text-burnt transition-colors">Our Craft</router-link></li>
          <li><router-link to="/menu" class="hover:text-burnt transition-colors">The Grill Menu</router-link></li>
          <li><router-link to="/reservations" class="hover:text-burnt transition-colors">Table Reservations</router-link></li>
          <li><router-link to="/contact" class="hover:text-burnt transition-colors">Contact &amp; VIP Dining</router-link></li>
        </ul>
      </div>

      <div>
        <h4 class="text-label-caps text-white mb-4">Hours of Fire</h4>
        <ul class="space-y-1 text-xs text-gray-400">
          <li><strong class="text-gray-200">Tue – Thu:</strong> 5:00 PM – 11:00 PM</li>
          <li><strong class="text-gray-200">Fri – Sat:</strong> 5:00 PM – 12:30 AM</li>
          <li><strong class="text-gray-200">Sunday:</strong> 4:30 PM – 10:00 PM</li>
          <li class="text-fire pt-1">Monday: Closed for Hearth Curing</li>
        </ul>
      </div>

      <div>
        <h4 class="text-label-caps text-white mb-4">Newsletter &amp; Vault Access</h4>
        <p class="text-xs text-gray-500 mb-3">Subscribe for rare vintage release announcements and priority reservations.</p>
        <form @submit.prevent="handleSubscribe" class="flex">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Enter your email" 
            required 
            class="input-minimal text-xs py-2"
          />
          <button type="submit" class="btn btn-primary text-xs py-2 px-4 ml-2">Join</button>
        </form>
      </div>
    </div>

    <div class="container-custom pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
      <div>&copy; 2026 Forge &amp; Flame. All rights reserved.</div>
      <div class="flex gap-6 mt-4 sm:mt-0">
        <a href="#" class="hover:text-gray-400">Privacy Policy</a>
        <a href="#" class="hover:text-gray-400">Terms of Service</a>
        <a href="#" class="hover:text-gray-400">Dress Code</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from '@/logic/toast';

const email = ref('');

const handleSubscribe = () => {
  if (email.value) {
    showToast('Subscribed to VIP Hearth Access!', 'success');
    email.value = '';
  }
};
</script>

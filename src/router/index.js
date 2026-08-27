import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MenuView from '@/views/MenuView.vue';
import ReservationsView from '@/views/ReservationsView.vue';
import ContactView from '@/views/ContactView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Forge & Flame | Luxury Wood-Fired Steakhouse' }
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,
    meta: { title: 'The Full Grill Menu | Forge & Flame' }
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: ReservationsView,
    meta: { title: 'Reservations & Private Dining | Forge & Flame' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact & Private Dining | Forge & Flame' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;

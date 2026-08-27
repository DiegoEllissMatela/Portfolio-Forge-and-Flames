import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Design styles and components CSS
import './design/styles.css';
import './design/components.css';

const app = createApp(App);
app.use(router);
app.mount('#app');

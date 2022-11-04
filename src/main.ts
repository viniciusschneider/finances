import './registerServiceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/styles.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { key } from './store';

createApp(App).use(store, key).use(router).mount('#app');

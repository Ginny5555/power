import { createApp } from 'vue';
import App from './App.vue';
import { World } from './world';

const app = createApp(App);
app.config.globalProperties.$world = new World();
app.mount('#app');


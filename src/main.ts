import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/styles/app.css'

createApp(App)
    .use(createPinia())
    .mount('#app')

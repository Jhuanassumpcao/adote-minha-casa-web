// src/main.js

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify' 
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, { position: POSITION.BOTTOM_RIGHT });
app.config.globalProperties.$toast = useToast();

app.use(vuetify) 

app.mount('#app')
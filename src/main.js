import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import router from "@/router";
import store from "@/vuex-store";
import './assets/style.css'
import VueAxios from "vue-axios";
import axios from "axios";

library.add(faUserSecret)

createApp(App)
    .use(VueAxios, axios)
    .use(router)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

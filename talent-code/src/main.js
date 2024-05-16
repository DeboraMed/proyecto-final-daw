import { createApp } from 'vue'
import './style.css'
import {createPinia} from "pinia";
import App from './App.vue'
import router from "./router/router.js";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faHeart,
    faPalette,
    faPenToSquare,
    faRightFromBracket,
    faStar,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

library.add(faHeart, faXmark, faPenToSquare, faPalette, faStar, faRightFromBracket);

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

// Obtener dinamicamente el nombre del host
axios.defaults.baseURL = "http://" + window.location.hostname + ":8000";
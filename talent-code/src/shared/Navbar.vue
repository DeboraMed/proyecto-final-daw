<script setup>
import {useThemeStore} from '../stores/ThemeStore';
import {useUserStore} from "../stores/UserStore.js";

const themeStore = useThemeStore();
const userStore = useUserStore();
</script>

<script>
import DarkMode from "../pages/DarkMode.vue";
export default {
  components: {},
  data(){
    return {
      isMenuOpen: false,
      openBurguerMenu: false,
      windowSmall: false,
    }
  },
  mounted(){
    // escucha el cambio de tamaño y llama al metodo
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowSmall = window.innerWidth <= 1200; // Cambia el tamaño
    },
    toggleMenu() {
      this.openBurgerMenu = !this.openBurgerMenu;
    },
  },
}
</script>

<template>
<section>
  <nav class="nav">
    <!-- Menu normal-->
    <div v-if="!windowSmall" class="navbar__content">
      <router-link to="/">
        <div v-if="themeStore.theme === 'dark'"><img src="../assets/logotipo-v2-negativo-horizontal.svg" class="nav__logo" alt="talent.code"></div>
        <div v-else><img src="../assets/logotipo-v2-positivo-horizontal.svg" alt="talent.code"></div>
      </router-link>
      <router-link class="nav__router__pri" to="/encuentra">Encuentra desarrolladores</router-link>
      <router-link class="nav__router__pri" to="/inspiracion">Inspiración</router-link>
      <router-link class="nav__router__pri" to="/empleo">Empleo</router-link>
      <router-link v-show="userStore.isLogged() && userStore.userType() ==='company'" class="nav__router__pri" to="/recluta">Recluta</router-link>
      <router-link v-show="userStore.isLogged() && userStore.userType() ==='developer'" class="nav__router__pri" to="/match">Match</router-link>
      <div class="nav__router__pri__button">
        <router-link v-show="!userStore.isLogged()" to="/login">
          <button class="navbar__button">Inicia Sesión</button>
        </router-link>
        <router-link v-show="!userStore.isLogged()" to="/registro">
          <button class="navbar__button">Regístrate</button>
        </router-link>
      </div>
      <!-- Parte de usuario logueado -->
      <div class="navbar__content">
        <router-link v-show="userStore.isLogged() && userStore.userType() ==='developer'" class="nav__router__pri" to="/portfolio">Portfolio</router-link>
        <router-link v-show="userStore.isLogged()" class="nav__router__pri" to="/perfil">Perfil</router-link>
        <router-link v-show="userStore.isLogged()" class="nav__router__pri" to="/" @click="userStore.logout()">Salir</router-link>
      </div>
      <dark-mode/>
    </div>
    <!-- TODO: Falta añadir el menu burguer aqui -->
  </nav>
</section>
</template>

<style scoped>
/* menu hamburguesa*/
.burger__menu {
  position: absolute;
  align-items: flex-start;
  display: flex;
  right: 5px;
  margin: 0 15px 0 0;
  font-weight: bold;
  background-color: #FFF8E8;
}

.burger__menu__items {
  padding: 1rem;
  display: none;
}

.burger__button {
  background: none;
  color: #2E2067;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.navbar__toggle {
  color: #000;
}
/* barra de navegacion */
.nav {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /*height: 5.5rem;*/
  background-color: #fff;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  border: solid 1px #cccccc;
  padding: 1rem 1rem;
  margin: 0 auto;
  align-items: flex-start;
}

.navbar__content {
  display: flex;
  text-align: right;
  font-weight: bold;
  justify-content: right;
  flex-grow: 0.85;
}

.nav__router {
  padding: 0.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav__logo {
  margin-top: 0.5rem;
  margin-right: 1rem;
  animation: palpito 2s ease 0s 1 normal forwards;
}

.nav__router__pri {
  padding: 0.8rem;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.nav__router__pri__button {
  padding: 0.8rem 0.8rem;
  align-items: center;

}
.navbar__button{
  margin-right: 1rem;
}

img {
  height: 4rem;
  /*margin-left: 1rem;*/
  margin-right: 1rem;
}
/*navbar medias*/
@media screen and (max-width: 1200px) {
  .burger__menu__items {
    display: block;
  }
}

@media only screen and (max-width: 29.8125rem /*477px*/
) {
  .nav__router {
    padding: 0.25rem 0.25rem;
  }

  img {
    height: 3rem;
    margin-left: 0.25rem;
  }
}
</style>
<script setup>
import {useThemeStore} from '../stores/ThemeStore';
import {useUserStore} from "../stores/UserStore.js";
import authGuard from "../router/guard.js";

const themeStore = useThemeStore();
const userStore = useUserStore();
</script>

<script>
import DarkMode from "../pages/DarkMode.vue";

export default {
  components: {DarkMode},
  data() {
    return {
      isMenuOpen: false,
      openBurgerMenu: false,
      windowSmall: false,
    }
  },
  mounted() {
    // escucha el cambio de tamaño y llama al metodo
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
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
      <router-link to="/">
        <div v-if="themeStore.theme === 'dark'"><img src="../assets/logotipo-v2-negativo-horizontal.svg"
                                                     class="nav__logo" alt="talent.code"></div>
        <div v-else><img src="../assets/logotipo-v2-positivo-horizontal.svg" alt="talent.code"></div>
      </router-link>
      <!-- Menu normal-->
      <div v-if="!windowSmall" class="navbar__content">
        <router-link v-show="!isMenuOpen" class="nav__router__pri" to="/encuentra">Encuentra desarrolladores</router-link>
        <router-link v-show="!isMenuOpen" class="nav__router__pri" to="/inspiracion">Inspiración</router-link>
        <router-link v-show="!isMenuOpen" class="nav__router__pri" to="/empleo">Empleo</router-link>
        <router-link v-show="!isMenuOpen && userStore.isLogged() && userStore.userType() ==='company'"
                     class="nav__router__pri" to="/recluta"
                     :before-enter="authGuard">Recluta
        </router-link>
        <router-link v-show="!isMenuOpen && userStore.isLogged() && userStore.userType() ==='developer'"
                     class="nav__router__pri" to="/match"
                     :before-enter="authGuard">Match
        </router-link>
        <div class="nav__router__pri__button">
          <router-link v-show="!isMenuOpen && !userStore.isLogged()" to="/login"
                       :before-enter="authGuard">
            <button class="navbar__button">Inicia Sesión</button>
          </router-link>
          <router-link v-show="!isMenuOpen && !userStore.isLogged()" to="/registro"
                       :before-enter="authGuard">
            <button class="navbar__button">Regístrate</button>
          </router-link>
        </div>
        <!-- Parte de usuario logueado -->
        <div class="navbar__content">
          <router-link v-show="!isMenuOpen && userStore.isLogged() && userStore.userType() ==='developer'"
                       class="nav__router__pri" to="/portfolio"
                       :before-enter="authGuard">Portfolio
          </router-link>
          <router-link v-show="!isMenuOpen && userStore.isLogged()" class="nav__router__pri" to="/perfil"
                       :before-enter="authGuard">Perfil
          </router-link>
          <router-link v-show="!isMenuOpen && userStore.isLogged()" class="nav__router__pri" to="/"
                       @click="userStore.logout()">Salir
          </router-link>
        </div>
        <dark-mode/>
      </div>
      <!-- Menu hamburguesa-->
      <ul v-else class="burger__menu">
        <li v-if="openBurgerMenu" class="burger__menu__items">
          <button v-show="isMenuOpen" class="navbar__toggle" @click="toggleMenu">☰</button>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/encuentra">Encuentra desarrolladores</router-link>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/inspiracion">Inspiración</router-link>
          <router-link v-show="!isMenuOpen" class="nav__router" to="/empleo">Empleo</router-link>
          <router-link v-show="!isMenuOpen && userStore.isLogged() && userStore.userType() ==='company'"
                       class="nav__router__pri" to="/recluta">Recluta
          </router-link>
          <router-link v-show="!isMenuOpen && userStore.isLogged() && userStore.userType() ==='developer'"
                       class="nav__router" to="/match">Match
          </router-link>
          <div class="nav__router__pri__button">
            <router-link v-show="!isMenuOpen && !userStore.isLogged()" to="/login">
              <button class="navbar__button">Inicia Sesión</button>
            </router-link>
            <router-link v-show="!isMenuOpen && !userStore.isLogged()" to="/registro">
              <button class="navbar__button">Regístrate</button>
            </router-link>
          </div>
          <!-- Parte de usuario logueado -->
          <div class="navbar__content">
            <router-link v-show="!isMenuOpen && userStore.isLogged() && userStore.userType() ==='developer'"
                         class="nav__router" to="/portfolio">Portfolio
            </router-link>
            <router-link v-show="!isMenuOpen && userStore.isLogged()" class="nav__router" to="/perfil">Perfil
            </router-link>
            <router-link v-show="!isMenuOpen && userStore.isLogged()" class="nav__router" to="/"
                         @click="userStore.logout()">Salir
            </router-link>
          </div>
        </li>
        <button @click="toggleMenu" class="burger__button">&#9776;</button>
      </ul>
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
  color: var(--burguer-bg-color);
}

.burger__menu__items {
  padding: 1rem;
  display: none;
  background-color: var(--bg-color-clear);
}

.burger__button {
  background: none;
  color: var(--a-color);
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.navbar__toggle {
  color: var(--font-color);
}

.nav {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--bg-color-clear);
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  border-bottom: solid 1px #cccccc;
  padding: 0.5rem 0.5rem;
  margin: 0 auto;
  transition: background 0.5s ease, color 0.5s ease;
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

a {
  color: var(--a-color);
}

a:hover {
  color: var(--a-color-hover);
}

.navbar__button {
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
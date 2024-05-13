<script setup>
import {computed, onMounted} from "vue";
import {useUserStore} from '../stores/UserStore.js';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUser();
});
const userData = computed(() => {
  return userStore.userData;
});
</script>

<template>
<div>Perfil de usuario</div>

  <article>
    <h2>Bienvenid@ <span>{{ userData.name }}</span></h2>
    Hola, {{ userData.name }} Bienvenido a Talent.Code<br>
    Tu email: {{ userData.email }}<br>
    <button class="button" @click="userStore.logout()">Cerrar sesión</button>
  </article>
</template>

<style scoped>

</style>
<script setup>
import {watchEffect} from "vue";
import {storeToRefs} from 'pinia';

import {useAlertStore} from '../stores/AlertStore.js';


const alertStore = useAlertStore();
const {alert} = storeToRefs(alertStore);

watchEffect(() => {
  if (alert.value) {
    setTimeout(() => {
      alertStore.clear();
    }, 4000);
  }
});
</script>

<template>
  <section v-if="alert">
    <article class="alert" :class="alert.type">
      <button @click="alertStore.clear()">
        <font-awesome-icon icon="fa-solid fa-xmark" class="icon"/>
      </button>
      {{ alert.message }}
    </article>
  </section>
</template>

<style scoped>
/* reset de estilos del botón */
button {
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-user-select: none; /* for button */
  -webkit-appearance: button; /* for input */
  -moz-user-select: none;
  -ms-user-select: none;
}

.alert {
  align-items: center;
  padding: 1rem;
  width: fit-content;
  position: fixed;
  bottom: 20px; /* Posiciona el elemento a 20px del borde inferior de la ventana */
  right: 20px; /* Posiciona el elemento a 20px del borde derecho de la ventana */
  z-index: 1000;
}

.alert__success {
  color: #1c6e37;
  background-color: #d5f1de;
  border: 1px solid #c0eace;
}

.alert__danger {
  color: #893232;
  background-color: #fadddd;
  border: 1px solid #f7cbcb;
}

</style>
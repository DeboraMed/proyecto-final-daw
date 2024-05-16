<script>
import {useAlertStore} from "./stores/AlertStore.js";
import Alert from "./shared/Alert.vue";
import Navbar from "./shared/Navbar.vue";

export default {
  name: "App",
  components: {Navbar,Alert},
  setup() {
    const alertStore = useAlertStore();
    return {alertStore};
  }
}
</script>

<template>
  <Navbar/>
  <main class="container">
    <router-view/>
    <alert></alert>
  </main>
</template>

<style>
</style>

<script>
import {useAlertStore} from "./stores/AlertStore.js";
import Alert from "./shared/Alert.vue";
import Navbar from "./shared/Navbar.vue";
import Footer from "./shared/Footer.vue";
import ScrollToTop from "./shared/ScrollToTop.vue";

export default {
  name: "App",
  components: {Navbar,Alert,Footer,ScrollToTop},
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
  <Footer />
  <ScrollToTop />
</template>

<style>
</style>

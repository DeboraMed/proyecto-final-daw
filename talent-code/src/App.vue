<script>

import Navbar from "./shared/Navbar.vue";

export default {
  nombre: "App",
  components: {Navbar}
}
</script>

<template>
  <Navbar/>
  <main class="container">
  <router-view/>
  </main>
</template>

<style>
</style>

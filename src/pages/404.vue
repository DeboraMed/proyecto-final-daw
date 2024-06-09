<script setup>
</script>

<template>
  <div class="main__content__404">
    <div class="content__404">
      <h1 class="pulse">404</h1>
      <h2>Not Found</h2>
      <p>El enlace solicitado no existe en este dominio.</p>
    </div>
  </div>
</template>

<style scoped>
body {
  color: #444;
  margin: 0;
  font: normal 14px/20px Arial, Helvetica, sans-serif;
  height: 100%;
  background-color: #fff;
}

.main__content__404 {
  height: auto;
  min-height: 100%;
}

.content__404 {
  text-align: center;
  width: 800px;
  margin-left: -400px;
  position: absolute;
  top: 30%;
  left: 50%;
}

h1 {
  margin: 0;
  font-size: 180px;
  line-height: 150px;
  font-weight: bold;
  animation: pulse 1.5s infinite;
}

h2 {
  margin-top: 20px;
  font-size: 30px;
}

/* animación */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
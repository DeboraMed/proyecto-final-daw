<script setup>

</script>

<template>
  <main>
    <section>
      <form>
        <h2>
          Inicio de sesión
        </h2>
        <div>
          <p> Inicia sesión en la aplicación </p>
        </div>
        <fieldset>
          <label for="Email">Email</label>
          <input
            id="email"
            placeholder="email@ejemplo.com"
            v-model="email"
            type="text"

            >
        </fieldset>
      </form>
    </section>
  </main>

</template>
<style scoped>

</style>
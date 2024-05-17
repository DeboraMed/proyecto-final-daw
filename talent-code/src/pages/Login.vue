<script>
import {useUserStore} from "../stores/UserStore.js";

export default {
  setup(){
    const userStore = useUserStore();
    return {
      userStore,
    }
  },
  data(){
    return {
      email: '',
      password: '',
      errors: {},
      isFormValid: false
    }
  },
  methods: {
    validateForm(field) {
      if (!this.email || !/\w+@\w+\.+[a-z]/.test(this.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else if (!this.password || this.password.length < 3) {
        this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      }
      if (Object.keys(this.errors).length === 0) {
        this.submitForm();
      }
    },
    async submitForm() {
      this.isFormValid = true
      this.userStore.login(this.email,this.password);
    },
  }
}

</script>

<template>
  <main>
    <section class="container__form">
      <form class="form" @submit.prevent="validateForm">
        <h2>
          Inicio de sesión en Talent.Code
        </h2>
        <fieldset>
          <legend> Inicia sesión en la aplicación </legend>
          <label for="Email">Email</label>
          <input
            id="email"
            placeholder="email@ejemplo.com"
            v-model="email"
            type="text"/>
          <p class="error" v-if="errors.email">{{ errors.email }}</p>
        </fieldset>
        <fieldset>
          <label for="password">Contraseña</label>
          <input
            id="password"
            placeholder="Contraseña"
            v-model="password"
            type="password"/>
          <p class="error" v-if="errors.password">{{ errors.password }}</p>
        </fieldset>
        <button class="form__button" type="submit">Enviar</button>
      </form>
    </section>
  </main>

</template>

<style scoped>
</style>
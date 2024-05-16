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
    }
  },
  methods: {
    validateForm(field) {
      if (!this.password || this.password.length < 3) {
        //this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      }
      if (!this.email || !this.validateEmail(this.email)) {
        //this.errors.email = 'Introduce un correo electrónico válido.';
      } else {
        //this.errors[field] = '';
      }
    },
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      return re.test(email);
    },
    async submitForm() {
      this.validateForm('email');
      //this.validateForm('password');

      // aqui llamar el UserStore
      this.userStore.login(this.email, this.password)

    },
  }

}

</script>

<template>
  <main>
    <section class="container__form">
      <form class="form" @submit.prevent="submitForm">
        <h2>
          Inicio de sesión en Talent.Code
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
            @change="validateForm('email')"
            >
        </fieldset>
        <fieldset>
          <label for="password">Contraseña</label>
          <input
            id="password"
            placeholder="Contraseña"
            v-model="password"
            type="password"
            @change="validateForm('password')"
          >
        </fieldset>
        <button class="form__button" type="submit">Enviar</button>
      </form>
    </section>
  </main>

</template>

<style scoped>
.container__form{
  margin-top: 5rem;
}

.form__button{
  background-color: black;
  border-radius: 99999px;
  color: #FFF8E8;
 /* margin-top: 20px;*/
  width: 100%;
  height: 56px;
  padding: 24px;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease; /* Transición suave */
}
.form__button:hover{
  background-color: #808080;
  /*color: #000000;*/
}

</style>
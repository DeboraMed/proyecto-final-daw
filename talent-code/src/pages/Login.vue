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
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

fieldset {
  border: none;
  margin-bottom: 20px;
}

legend {
  font-weight: bold;
  margin-bottom: 10px;

}

label {
  margin-bottom: 5px;

}

input[type="text"],
input[type="email"],
input[type="password"],
textarea,
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 80px;
  resize: none;
}

.error {
  color: #e74c3c;
  font-size: 0.875em;
  margin-top: -10px;
  margin-bottom: 10px;
}

.avatar-preview {
  display: block;
  margin-top: 10px;
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}

input[type="radio"] {
  margin-right: 10px;
}

div > p {
  font-weight: bold;
}

div > fieldset {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

div > fieldset > div {
  display: flex;
  align-items: center;
}
</style>
<script>
import {useAlertStore} from "../stores/AlertStore.js";

export default {
  components: {},
  data() {
    return {
      user: {
        name: '',
        email: '',
        description: '',
      },
      errors: {},
      isFormValid: false
    }
  },

  methods: {
    validateForm() {
      this.errors = {};

      if (!this.user.name || typeof this.user.name !== 'string' || this.user.name.length < 3) {
        this.errors.name = 'Introduce un nombre con al menos 3 caracteres.';
      } else if (!this.user.email || !/\w+@\w+\.+[a-z]/.test(this.user.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else if (!this.user.description) {
        this.errors.description = 'La descripción es requerida.';
      }
      if (Object.keys(this.errors).length === 0) {
        this.submitForm();
      }
    },
    async submitForm() {
      this.isFormValid = true
      const alertStore = useAlertStore();
      alertStore.success('Su formulario se ha enviado correctamente.');
    },
  }
}
</script>

<template>
  <main>
    <section class="container__form">
      <div>
        <h2>Formulario de contacto </h2>
        <form class="form" @submit.prevent="validateForm">

          <fieldset>
            <legend>Muchas gracias por ponerte en contacto te reponderemos lo antes posible.</legend>
            <label for="nombre">Nombre</label>
            <input type="text"
                   id="nombre"
                   v-model="user.name"
                   placeholder="Nombre"/>
            <p class="error" v-if="errors.name">{{ errors.name }}</p>
            <br>
            <label for="email">Email</label>
            <input type="email"
                   id="email"
                   v-model="user.email"
                   placeholder="Correo electrónico"/>
            <p class="error" v-if="errors.email">{{ errors.email }}</p>
            <br>
            <label for="descripcion">Descripción</label>
            <textarea type="text"
                      maxlength="500"
                      id="descripcion"
                      v-model="user.description"
                      placeholder="Detallanos tu consulta..."/>
            <p class="error" v-if="errors.description">{{ errors.description }}</p>
          </fieldset>
          <button type="submit" class="form__button">Enviar consulta</button>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
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
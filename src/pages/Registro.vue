<script>
import {useUserStore} from "../stores/UserStore.js";
import {useSelectStore} from "../stores/SelectStore.js";

export default {
  components: {},
  setup() {
    const userStore = useUserStore();
    const selectStore = useSelectStore();
    return {
      userStore,
      selectStore
    }
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        user_type: 'desarrollador',
        description: '',
        phone: '',
        address: '',
        avatar: '',
      },
      avatar_preview: '',
      errors: {},
      isFormValid: false
    }
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.user.name || typeof this.user.name !== 'string' || this.user.name.length < 3) {
        this.errors.name = 'Por favor,introduce un nombre con al menos 3 caracteres.';
      } else if (!this.user.email || !/\w+@\w+\.+[a-z]/.test(this.user.email)) {
        this.errors.email = 'Por favor,introduce un correo electrónico válido.';
      } else if (!this.user.password || this.user.password.length < 7) {
        this.errors.password = 'Por favor,introduce un contraseña con al menos 8 caracteres.';
      } else if (!this.user.description) {
        this.errors.description = 'Por favor,la descripción es requerida.';
      } else if (!this.user.phone) {
        this.errors.phone = 'Por favor,el teléfono es requerido.';
      } else if (!this.user.address) {
        this.errors.address = 'Por favor,la dirección es requerida.';
      } else if (!this.user.avatar) {
        this.errors.avatar = 'Por favor,el avatar es requerido.';
      } else if (!this.user.user_type) {
        this.errors.user_type = 'Por favor,por favor, selecciona si eres un desarrollador o una empresa.';
      }
      if (Object.keys(this.errors).length === 0) {
        this.submitForm();
      }
    },
    async submitForm() {
        this.isFormValid = true
        this.userStore.register(this.user);
    },
    handleFileUpload(event)  {
      const file = event.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      this.user.avatar = event.target.files[0];
      if (file && validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatar_preview = e.target.result;
        };
        reader.readAsDataURL(file);
        this.errors.avatar = '';
      } else {
        this.errors.avatar = 'Solo se permiten archivos JPG, JPEG, PNG, y GIF.'
      }
    }
  }
}
</script>

<template>
  <main>
    <section class="container__form">
      <div>
        <h2>Formulario de registro </h2>
        <form class="form" @submit.prevent="validateForm">
          <fieldset>
            <legend>Datos de registro</legend>
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
            <label for="password">Contraseña</label>
            <input type="password"
                   id="password"
                   v-model="user.password"
                   placeholder="Contraseña"/>
            <p class="error" v-if="errors.password">{{ errors.password }}</p>
          </fieldset>

          <fieldset>
            <legend>Datos personales</legend>
            <label for="descripcion">Descripción</label>
            <textarea type="text"
                   maxlength="300"
                   id="descripcion"
                   v-model="user.description"
                   placeholder="Escribe una pequeña descripción..."/>
            <p class="error" v-if="errors.description">{{ errors.description }}</p>
          </fieldset>
          <fieldset>
            <label for="telefono">Teléfono</label>
            <input type="text"
                   id="telefono"
                   v-model="user.phone"
                   placeholder="Teléfono"/>
            <p class="error" v-if="errors.phone">{{ errors.phone }}</p>
          </fieldset>
          <fieldset>
            <label for="direccion">Direccion</label>
            <input type="text"
                   id="direccion"
                   v-model="user.address"
                   placeholder="Dirección"/>
            <p class="error" v-if="errors.address">{{ errors.address }}</p>
          </fieldset>
          <fieldset>
            <label for="avatar">Avatar</label>
            <input type="file"
                   id="avatar"
                   @change="handleFileUpload"/>
            <p class="error" v-if="errors.avatar">{{ errors.avatar }}</p>
            <img v-if="avatar_preview" :src="avatar_preview" alt="Preview Avatar" class="avatar-preview"/>
          </fieldset>
          <!-- Seleccion desarrollador o empresa -->
          <div><p>¿Eres un desarrollador o una empresa?</p>
            <fieldset>
              <legend>Elije una opción</legend>
              <div>
                <input type="radio"
                       id="desarrollador"
                       value="desarrollador"
                       v-model="user.user_type"
                       checked/>
                <label for="desarrollador">Desarrollador</label>
              </div>
              <div>
                <input type="radio"
                       id="empresa"
                       value="empresa"
                       v-model="user.user_type"/>
                <label for="empresa">Empresa</label>
              </div>
              <p class="error" v-if="errors.user_type">{{ errors.user_type }}</p>
            </fieldset>
          </div>

          <button type="submit" class="form__button">Registrarse</button>
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
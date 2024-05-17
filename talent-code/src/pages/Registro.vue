<script>
import {useUserStore} from "../stores/UserStore.js";
import {useSelectStore} from "../stores/SelectStore.js";

export default {
  components: {}, setup() {
    const userStore = useUserStore();
    const selectStore = useSelectStore();
    return {
      userStore,
      selectStore
    }
  },
  data() {
    /*tipo desarrollador y empresa*/
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
      errors: {},
      isFormValid: false
    }
  },
  methods: {
    validateForm() {
      this.errors = {};

      // logica de validacion de formularios
      if (!this.user.name || typeof this.user.name !== 'string' || this.user.name.length < 3) {
        this.errors.name = 'Introduce un nombre con al menos 3 caracteres.';
      } else if (!this.user.email || !/\w+@\w+\.+[a-z]/.test(this.user.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else if (!this.user.password || this.user.password.length < 2) {
        this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      } else if (!this.user.description) {
        this.errors.description = 'La descripción es requerida.';
      } else if (!this.user.phone) {
        this.errors.phone = 'El teléfono es requerido.';
      } else if (!this.user.address) {
        this.errors.address = 'La dirección es requerida.';
      } else if (!this.user.avatar) {
        this.errors.avatar = 'El avatar es requerido.';
      } else if (!/^https?:\/\/.*/.test(this.user.avatar)) {
        this.errors.avatar = 'El avatar debe ser una URL válida.';
      } if (!this.user.user_type) {
        this.errors.user_type = 'Por favor, selecciona si eres un desarrollador o una empresa.';
      }
      if (Object.keys(this.errors).length === 0) {
        this.submitForm();
      }
    },
    async submitForm() {
        this.isFormValid = true
        this.userStore.register(this.user);
    },
    /*async registerUser() {
      if (this.validateForm()){
        this.userStore.register(this.user);
      }
    },*/
    previewFiles(event) {
      //TODO: implementar logica de file para avatar
      console.log(event.target.files);
    },
  }
}
</script>

<template>
  <main>
    <section class="container__form">
      <!-- Formulario de registro para trabajadores -->
      <div>
        <h2>Formulario de registro </h2>
        <form class="form" @submit.prevent="validateForm">
          <legend>Datos de registro</legend>
          <fieldset>
            <label for="nombre">Nombre</label>
            <input type="text"
                   id="nombre"
                   v-model="user.name"
                   placeholder="Nombre"/>
            <p class="error" v-if="errors.name">{{ errors.name }}</p>
          </fieldset>
          <fieldset>
            <label for="email">Email</label>
            <input type="email"
                   id="email"
                   v-model="user.email"
                   placeholder="Correo electrónico"/>
            <p class="error" v-if="errors.email">{{ errors.email }}</p>
          </fieldset>
          <fieldset>
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
            <input type="url"
                   id="avatar"
                   v-model="user.avatar"
                   placeholder="Avatar"/>
            <p class="error" v-if="errors.avatar">{{ errors.avatar }}</p>
          </fieldset>
          <!-- <input type="file"
                      @change="previewFiles"
                      placeholder="Avatar"/>-->

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
.error {
  color: var(--font-color-p-error);
  font-size: medium;
}

.container__form {
  margin-top: 5rem;
}
</style>
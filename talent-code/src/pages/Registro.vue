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
      developer: {
        name: '',
        email: '',
        password: '',
        user_type: 'desarrollador',
        description: '',
        phone: '',
        address: '',
        avatar: '',
      },
      company: {
        name: '',
        email: '',
        password: '',
        user_type: 'empresa',
        description: '',
        phone: '',
        address: '',
        avatar: '',
      },
      userType: 'desarrollador', // 'desarrollador' o 'empresa'
    }
  },
  methods: {
    validateForm(field) {
      // logica de validacion de formularios
    },
    async submitForm() {
      // TODO: validar los formularios
      this.validateForm('name', 'email', 'password', 'user_type',
          'description', 'phone', 'address', 'avatar');

      // aqui llamar el UserStore
      this.userStore.register(this.developer);

    },
    registerDeveloper() {
      // Lógica de registro para trabajadores
      this.userStore.register(this.developer);

    },
    registerCompany() {
      // Lógica de registro para empresas
    },
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
      <div v-if="userType === 'desarrollador'">
        <h2>Formulario de registro de desarrollador</h2>
        <form class="form" @submit.prevent="registerDeveloper">
          <input type="text"
                 id="nombre"
                 v-model="developer.name"
                 placeholder="Nombre"/>
          <input type="email"
                 id="email"
                 v-model="developer.email"
                 placeholder="Correo electrónico"/>
          <input type="password"
                 id="password"
                 v-model="developer.password"
                 placeholder="Contraseña"/>
          <input type="text"
                 id="descripcion"
                 v-model="developer.description"
                 placeholder="Escribe una pequeña descripción..."/>
          <input type="text"
                 id="telefono"
                 v-model="developer.phone"
                 placeholder="Teléfono"/>
          <input type="text"
                 id="direccion"
                 v-model="developer.address"
                 placeholder="Dirección"/>
          <input type="url"
                 v-model="developer.avatar"
                 placeholder="Avatar"/>
     <!-- <input type="file"
                 @change="previewFiles"
                 placeholder="Avatar"/>-->
          <button type="submit" class="form__button">Registrarse</button>
        </form>
      </div>

      <!-- Formulario de registro para empresas -->
      <div v-if="userType === 'empresa'">
        <h2>Registro de Empresa</h2>
        <form class="form" @submit.prevent="registerCompany">
          <!-- Pestaña de información básica -->
          <input type="text"
                 v-model="company.name"
                 placeholder="Nombre de la empresa"/>
          <input type="email"
                 v-model="company.email"
                 placeholder="Correo electrónico"/>
          <input type="password"
                 v-model="company.password"
                 placeholder="Contraseña"/>
          <input type="text"
                 v-model="company.description"
                 placeholder="Empresa ubicada en..."/>

          <input type="number"
                 v-model="company.phone"
                 placeholder="Teléfono"/>
          <input type="text"
                 v-model="company.address"
                 placeholder="Dirección"/>
          <input type="file"
                 @change="previewFiles"
                 placeholder="Avatar"/>
          <button type="submit" class="form__button">Registrarse</button>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
.container__form {
  margin-top: 5rem;
}

.form__button {
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

.form__button:hover {
  background-color: #808080;
  /*color: #000000;*/
}
</style>
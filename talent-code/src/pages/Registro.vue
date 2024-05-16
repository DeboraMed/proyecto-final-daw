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
        user_type: '',
        description: '',
        phone: '',
        address: '',
        avatar: '',
      },
      userType: '', // 'desarrollador' o 'empresa'
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
      this.userStore.register(this.user);

    },
    registeruser() {
      // Lógica de registro para users
      this.userStore.register(this.user);

    },
    registerCompany() {
      // Lógica de registro para empresas
      this.userStore.register(this.company);
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
      <div >
        <h2>Formulario de registro </h2>
        <form class="form" @submit.prevent="registeruser">
          <fieldset>
            <label for="nombre">Nombre</label>
            <input type="text"
                   id="nombre"
                   v-model="user.name"
                   placeholder="Nombre"/>
          </fieldset>
          <fieldset>
            <label for="email">Email</label>
            <input type="email"
                   id="email"
                   v-model="user.email"
                   placeholder="Correo electrónico"/>
          </fieldset>
          <fieldset>
            <label for="password">Contraseña</label>
            <input type="password"
                   id="password"
                   v-model="user.password"
                   placeholder="Contraseña"/>
          </fieldset>
          <fieldset>
            <label for="descripcion">Descripción</label>
            <input type="text"
                   id="descripcion"
                   v-model="user.description"
                   placeholder="Escribe una pequeña descripción..."/>
          </fieldset>
          <fieldset>
            <label for="telefono">Teléfono</label>
            <input type="text"
                   id="telefono"
                   v-model="user.phone"
                   placeholder="Teléfono"/>
          </fieldset>
          <fieldset>
            <label for="direccion">Direccion</label>
            <input type="text"
                   id="direccion"
                   v-model="user.address"
                   placeholder="Dirección"/>
          </fieldset>
          <fieldset>
            <label for="avatar">Avatar</label>
            <input type="url"
                   id="avatar"
                   v-model="user.avatar"
                   placeholder="Avatar"/>
          </fieldset>
          <!-- <input type="file"
                      @change="previewFiles"
                      placeholder="Avatar"/>-->

          <!-- Seleccion desarrollador o empresa -->
          <div> <p>¿Eres un desarrollador o una empresa?</p>
            <fieldset>
              <legend>Elije una opción</legend>
              <div>
                <input type="radio"
                       id="desarrollador"
                       value="desarrollador"
                       v-model="user.user_type"
                       checked />
                <label for="desarrollador">Desarrollador</label>
              </div>
              <div>
                <input type="radio"
                       id="empresa"
                       value="empresa"
                       v-model="user.user_type"/>
                <label for="empresa">Empresa</label>
              </div>
            </fieldset>
          </div>

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
<script>

import {useUserStore} from "../stores/UserStore.js";

export default {
  components: {}, setup () {
    const userStore = useUserStore();
    return {
      userStore,
    }
  },
  data(){
    /*tipo desarrollador y empresa*/
    return {
      name: '',
      email: '',
      password: '',
      user_type: '',
      description: '',
      phone: '',
      address: '',
      avatar: '',
      contract_type: '',
      work_mode: '',
      schedule: '',
      specialization: '',
      github_url: '',
    }
  },
  methods: {
    validateForm(field) {

    },
    async submitForm() {
      this.validateForm('name', 'email', 'password', 'user_type','description','phone','address',
      'avatar','contract_type','work_mode','schedule','specialization','github_url');

      // aqui llamar el UserStore
      this.userStore.register(this.name, this.email, this.password, this.user_type, this.description, this.phone,
      this.address, this.avatar, this.contract_type, this.work_mode, this.schedule, this.specialization, this.github_url);

    },
  }





}

</script>

<template>
  <main>
    <section class="container__form">
      <form class="form">
        <h2>
          Registrate en la aplicación
        </h2>
        <fieldset>
          <label for="name">Nombre</label>
          <input
              id="nombre"
              placeholder="Nombre y apellidos"
              v-model="name"
              type="text"
              @change="validateForm('name')"
          >
        </fieldset>
        <fieldset>
          <label for="email">Email</label>
          <input
              id="email"
              placeholder="email@ejemplo.com"
              v-model="email"
              type="text"
              @change="validateForm('email')"
          >
        </fieldset>


        <fieldset>
          <label for="password">Password</label>
          <input
              id="password"
              placeholder="contraseña"
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
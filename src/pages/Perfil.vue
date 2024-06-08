<script>

import {useUserStore} from '../stores/UserStore.js';
import {useSelectStore} from "../stores/SelectStore.js";
import FormFormacion from "./forms/FormFormacion.vue";
import FormExperiencia from "./forms/FormExperiencia.vue";
import FormProyectos from "./forms/FormProyectos.vue";

export default {
  components: {FormProyectos, FormFormacion,FormExperiencia},
  setup() {
    const selectStore = useSelectStore();
    const userStore = useUserStore();

    return {
      selectStore,
      userStore,
    }
  },
  data() {
    return {
      userData: null,
      /* Info que carga en los select */
      /* Payload de edicion TODO: manejar la edicion de la info base del perfil */
      user: {
        /*  name: '',
          email: '',
          password: '',
          user_type: '',
          description: '',
          phone: '',
          address: '',
          avatar: '',*/
        userable: {
          specialization: '',
          schedule: '',
          work_mode: '',
          contract_type: '',
          //github_url: '',
        }
      },
      errors: {},
      isFormValid: false
    }
  },
  async created() {
    // Refresca los valores para listas 'select'
    await this.selectStore.fetchAllSelectOptionsEnums();

    // trae al usuario con sus datos
    await this.userStore.fetchUser();
    this.userData = this.userStore.userData;
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.userData.userable.contract_type) {
        this.errors.contract_type = 'Por favor, selecciona un tipo de contrato.';
      } else if (!this.userData.userable.schedule) {
        this.errors.schedule = 'Por favor, selecciona un tipo de jornada.';
      } else if (!this.userData.userable.specialization) {
        this.errors.specialization = 'Por favor, selecciona una especialidad.';
      } else if (!this.userData.userable.work_mode) {
        this.errors.work_mode = 'Por favor, selecciona una modalidad.';
      }
      if (Object.keys(this.errors).length === 0) {
        this.submitForm();
      }
    },
    submitForm() {
      this.isFormValid = true
      this.userStore.editProfile(this.userData);
    }
    // TODO: limpiar el codigo repetido
  },
}
</script>

<template>
  <main>
    <section class="container__form">
      <article class="article__form" v-if="userData">
        <h1>Bienvenid@ <span>{{ userData.name }}</span></h1>
        Hola, {{ userData.name }} Bienvenido a Talent.Code<br>
        Tu email: {{ userData.email }}<br>
        <button class="button" @click="userStore.logout()">Cerrar sesión</button>
      </article>
      <div v-if="userStore.user_type==='developer'">
        <div class="tabs">
          <!-- Primera tab-->
          <div class="tab-2">
            <label for="tab2-1">Información Personal</label>
            <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
            <div v-if="userData && userData.userable">
              <form class="form__perfil" @submit.prevent="validateForm">

                <h2>Detalle de Perfil</h2>

                <p>Descripción de Perfil</p>
                <input type="text"
                       id="description"
                       v-model="userData.description"
                       placeholder="Descripción"/>

                <p>Teléfono</p>
                <input type="text"
                       id="phone"
                       v-model="userData.phone"
                       placeholder="Teléfono"/>

                <p>Dirección física</p>
                <input type="text"
                       id="address"
                       v-model="userData.address"
                       placeholder="Dirección"/>

                <p>Perfil Publico de Github</p>
                <input type="url"
                       id="github"
                       v-model="userData.userable['github_url']"
                       placeholder="Github URL"/>

                <h2>Formulario de preferencias laborales</h2>
                <!--<legend> Selecciona tus preferencias Laborales</legend>-->
                <p>Tipo de contrato</p>
                <select class="home__select"
                        v-model="userData.userable['contract_type']">
                  <option class="home__select__option" disabled value="">Selecciona un tipo de contrato</option>
                  <option class="home__select__option"
                          id="contrato"
                          v-for="option in selectStore.contractSelectData"
                          :key="option.value"
                          :value="option.value">{{ option.label }}
                  </option>
                </select>
                <p class="error" v-if="errors.contract_type">{{ errors.contract_type }}</p>
                <p>Tipo de Jornada laboral</p>
                <select class="home__select"
                        v-model="userData.userable['schedule']">
                  <option class="home__select__option" disabled value="">Selecciona un tipo de jornada</option>
                  <option class="home__select__option"
                          id="jornada"
                          v-for="option in selectStore.scheduleSelectData"
                          :key="option.value"
                          :value="option.value">{{ option.label }}
                  </option>
                </select>
                <p class="error" v-if="errors.schedule">{{ errors.schedule }}</p>
                <p>Especialidad que mas se ajuste a tu perfil</p>
                <select class="home__select"
                        v-model="userData.userable['specialization']">
                  <option class="home__select__option" disabled value="">Selecciona una especialidad</option>
                  <option class="home__select__option"
                          id="especialidad"
                          v-for="option in selectStore.specializationSelectData"
                          :key="option.value"
                          :value="option.value">{{ option.label }}
                  </option>
                </select>
                <p class="error" v-if="errors.specialization">{{ errors.specialization }}</p>
                <p>Modalidad de trabajo</p>
                <select class="home__select"
                        v-model="userData.userable['work_mode']">
                  <option class="home__select__option" disabled value="">Selecciona una modalidad de trabajo</option>
                  <option class="home__select__option"
                          id="modalidad"
                          v-for="option in selectStore.workSelectData"
                          :key="option.value"
                          :value="option.value">{{ option.label }}
                  </option>
                </select>
                <p class="error" v-if="errors.work_mode">{{ errors.work_mode }}</p>
                <button type="submit" class="form__button">Añadir preferencias laborales</button>
              </form>
            </div>
          </div>
          <!-- Segunda tab-->
          <div class="tab-2">
            <label for="tab2-2">Historial Academico / Profesional</label>
            <input id="tab2-2" name="tabs-two" type="radio">
            <div>
              <form-formacion></form-formacion>
              <form-experiencia></form-experiencia>
              <form-proyectos></form-proyectos>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
h2 {
  margin-bottom: 2rem;
}

button {
  margin-top: 1rem;
}

.home__select {
  width: 14.8rem;
  height: fit-content;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem 0.625rem;
  margin: 0.625rem 0;
}

.home__select__option {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 4;
}

.container__form {
  margin-top: 5rem;
  text-align: left;
}

.article__form {
  margin: 4rem 0;
}

.form__perfil {
  margin-top: 1rem;
  flex: 1;
  text-align: left;
}

/* diseño de los tabs */
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.tabs {
  display: block;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0;
  overflow: hidden;
}

.tabs [class^="tab"] label,
.tabs [class*=" tab"] label {
  color: #5d5d5d;
  cursor: pointer;
  display: block;
  font-size: 1.5em;
  font-weight: 300;
  line-height: 1em;
  text-align: center;
}

.tabs [class^="tab"] [type="radio"],
.tabs [class*=" tab"] [type="radio"] {
  border-bottom: 1px solid rgb(66, 66, 66);
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.tabs [class^="tab"] [type="radio"]:hover, .tabs [class^="tab"] [type="radio"]:focus,
.tabs [class*=" tab"] [type="radio"]:hover,
.tabs [class*=" tab"] [type="radio"]:focus {
  border-bottom: 1px solid #26fdb2;
}

.tabs [class^="tab"] [type="radio"]:checked,
.tabs [class*=" tab"] [type="radio"]:checked {
  border-bottom: 4px solid #26fdb2;
}

.tabs [class^="tab"] [type="radio"]:checked + div,
.tabs [class*=" tab"] [type="radio"]:checked + div {
  opacity: 1;
}

.tabs [class^="tab"] [type="radio"] + div,
.tabs [class*=" tab"] [type="radio"] + div {
  display: block;
  opacity: 0;
  padding: 2rem 0;
  width: 90%;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.tabs .tab-2 {
  width: 50%;
}

.tabs .tab-2 [type="radio"] + div {
  width: 200%;
  margin-left: 200%;
}

.tabs .tab-2 [type="radio"]:checked + div {
  margin-left: 0;
}

.tabs .tab-2:last-child [type="radio"] + div {
  margin-left: 100%;
}

.tabs .tab-2:last-child [type="radio"]:checked + div {
  margin-left: -100%;
}
</style>
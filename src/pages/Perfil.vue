<script>
import { useUserStore } from '../stores/UserStore.js';
import { useSelectStore } from "../stores/SelectStore.js";
import FormFormacion from "./forms/FormFormacion.vue";
import FormExperiencia from "./forms/FormExperiencia.vue";
import FormProyectos from "./forms/FormProyectos.vue";

export default {
  components: { FormProyectos, FormFormacion, FormExperiencia },
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
      user: {
        userable: {
          specialization: '',
          schedule: '',
          work_mode: '',
          contract_type: '',
        }
      },
      errors: {},
      isFormValid: false
    }
  },
  async created() {
    await this.selectStore.fetchAllSelectOptionsEnums();
    await this.userStore.fetchUser();
    this.userData = this.userStore.userData;
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.userData.description) {
        this.errors.description = 'Por favor,la descripción es requerida.';
      } else if (!this.userData.phone) {
        this.errors.phone = 'Por favor,el teléfono es requerido.';
      } else if (!this.userData.address) {
        this.errors.address = 'Por favor,la dirección es requerida.';
      } else if (!this.userData.userable.contract_type) {
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
      this.isFormValid = true;
      this.userStore.editProfile(this.userData);
    }
  },
}
</script>

<template>
  <main>
    <section class="container__form">
      <article class="article__form" v-if="userData">
        <div class="profile-container">
          <div class="profile-header">
            <img :src="userStore.userData.avatar_url" alt="Avatar de la empresa" class="avatar">
            <div class="profile-info">
              <h1>Bienvenid@ {{ userStore.userData.name }}</h1>
              <p>{{ userStore.userData.description }}</p>
              <p>Teléfono: {{ userStore.userData.phone }}</p>
              <p>email: {{ userStore.userData.email }}</p>
              <p>{{ userStore.userData.address }}</p>
              <button class="button" @click="userStore.logout()">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </article>

      <div v-if="userStore.user_type === 'developer'">
        <div class="tabs">
          <!-- Primera tab -->
          <div class="tab-2">
            <label for="tab2-1">Información Personal</label>
            <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
            <div v-if="userData && userData.userable">
              <form @submit.prevent="validateForm">
                <h2>Detalle de Perfil</h2>
                <p>Descripción del perfil</p>
                <textarea type="text"
                          maxlength="300"
                          id="descripcion"
                          v-model="userData.description"
                          placeholder="Escribe una pequeña descripción..."/>
                <p class="error" v-if="errors.description">{{ errors.description }}</p>
                <p>Teléfono</p>
                <input type="text"
                       id="phone"
                       v-model="userData.phone"
                       placeholder="Teléfono"/>
                <p class="error" v-if="errors.phone">{{ errors.phone }}</p>
                <p>Dirección física</p>
                <input type="text"
                       id="address"
                       v-model="userData.address"
                       placeholder="Dirección"/>
                <p class="error" v-if="errors.address">{{ errors.address }}</p>
                <p>Perfil publico de Github</p>
                <input type="url"
                       id="github"
                       v-model="userData.userable['github_url']"
                       placeholder="Github URL"/>

                <h2>Formulario de preferencias laborales</h2>

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

                <p>Especialidad que más se ajuste a tu perfil</p>
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
          <!-- Segunda tab -->
          <div class="tab-2">
            <label for="tab2-2">Historial Académico / Profesional</label>
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

.profile-container {
  width: 90%;
  max-width: 1200px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
}
.error {
  color: #e74c3c;
  font-size: 0.875em;
  margin-top: -10px;
  margin-bottom: 10px;
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
}

.profile-info {
  margin-top: 1rem;
  flex: 1;
  text-align: left;
}

.profile-info h1 {
  margin: 0 0 10px;
  font-size: 2em;
  color: #333;
}

.profile-info p {
  margin: 0 0 10px;
  color: #666;
}

input[type="text"],
textarea,
input[type="url"]{
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 1rem;
}

textarea {
  height: 80px;
  resize: none;
}

</style>
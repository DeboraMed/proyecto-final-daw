<script>
import {computed, onMounted} from "vue";
import {useUserStore} from '../stores/UserStore.js';
import {useSelectStore} from "../stores/SelectStore.js";

export default {
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
      perfilPendiente: true,
      selectContractOptions: [],
      selectScheduleOptions: [],
      selectSpecializationOptions: [],
      selectWorkOptions: [],
      selectAcademicOptions: [],
      selectExperienceOptions: [],
      selectTechnologyOptions: [],
      selectTechnologiesOptions: [],
      userData: null,
      developer: {
        contract_type: '',
        schedule: '',
        specialization: '',
        work_mode: '',
        academic_level: '',
        experience_level: '',
        technology_type: '',
        technologies: '',
        github_url: '',
      },
    }
  },
  async created() {
    // tipos de contrato
    await this.selectStore.fetchSelectContractOptions();
    this.selectContractOptions = this.selectStore.contractSelectData;
    // tipos de jornada laboral
    await this.selectStore.fetchSelectScheduleOptions();
    this.selectScheduleOptions = this.selectStore.scheduleSelectData;
    // tipos de espacialidad
    await this.selectStore.fetchSelectSpecializationOptions();
    this.selectSpecializationOptions = this.selectStore.specializationSelectData;
    // tipos de modo de trabajo
    await this.selectStore.fetchSelectWorkOptions();
    this.selectWorkOptions = this.selectStore.workSelectData;
    // niveles academicos
    await this.selectStore.fetchSelectAcademicOptions();
    this.selectAcademicOptions = this.selectStore.academicSelectData;
    // niveles de experiencia
    await this.selectStore.fetchSelectExperienceOptions();
    this.selectExperienceOptions = this.selectStore.experienceSelectData;
    // tipos de tecnologias
    await this.selectStore.fetchSelectTechnologyOptions();
    this.selectTechnologyOptions = this.selectStore.technologySelectData;
    // listado de tecnologias
    await this.selectStore.fetchSelectTechnologiesOptions();
    this.selectTechnologiesOptions = this.selectStore.technologiesSelectData;

    await this.userStore.fetchUser();
    this.userData = this.userStore.userData;
  },
  methods: {
    additionalProfileFields() {
      // registro de los campos extra
      this.userStore.register(this.developer);
    }
    // TODO: manejar el estado de campos de perfil pendiente
  },
}
</script>

<template>
  <main>
    <section class="container__form">
      <article v-if="userData">
        <h2>Bienvenid@ <span>{{ userData.name }}</span></h2>
        Hola, {{ userData.name }} Bienvenido a Talent.Code<br>
        Tu email: {{ userData.email }}<br>
        <button class="button" @click="userStore.logout()">Cerrar sesión</button>
      </article>

      <!--  TODO: validar los formularios -->
      <div v-if="perfilPendiente">
        <h2>Formulario de preferencias laborales</h2>
        <form class="form" @submit.prevent="additionalProfileFields">
          <legend> Selecciona tus preferencias Laborales</legend>
          <select class="home__select" v-model="developer.contract_type">
            <option class="home__select__option" disabled value="">Selecciona un tipo de contrato</option>
            <option class="home__select__option"
                    id="contrato"
                    v-for="option in selectContractOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <select class="home__select" v-model="developer.schedule">
            <option class="home__select__option" disabled value="">Selecciona un tipo de jornada</option>
            <option class="home__select__option"
                    id="jornada"
                    v-for="option in selectScheduleOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <select class="home__select" v-model="developer.specialization">
            <option class="home__select__option" disabled value="">Selecciona una especialidad</option>
            <option class="home__select__option"
                    id="especialidad"
                    v-for="option in selectSpecializationOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <select class="home__select" v-model="developer.work_mode">
            <option class="home__select__option" disabled value="">Selecciona una modalidad de trabajo</option>
            <option class="home__select__option"
                    id="modalidad"
                    v-for="option in selectWorkOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <h2>Formulario de preferencias personales</h2>
          <legend> Selecciona tus preferencias personales</legend>
          <p>Nivel académico (campo que estara el formulario de Formacion)</p>
          <select class="home__select" v-model="developer.academic_level">
            <option class="home__select__option" disabled value="">Selecciona un nivel académico</option>
            <option class="home__select__option"
                    id="estudios"
                    v-for="option in selectAcademicOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <p>Experiencia Laboral (campo que estara el formulario de Experiencia Laboral)</p>
          <select class="home__select" v-model="developer.experience_level">
            <option class="home__select__option" disabled value="">Selecciona un nivel de experiencia</option>
            <option class="home__select__option"
                    id="experiencia"
                    v-for="option in selectExperienceOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <p>Tecnologias (campo que estara el formulario de Proyectos)</p>
          <select class="home__select" v-model="developer.technology_type">
            <option class="home__select__option" disabled value="">Selecciona un tipo de tecnología</option>
            <option class="home__select__option"
                    id="tipo-tecnologias"
                    v-for="option in selectTechnologyOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <select class="home__select"
                  v-model="developer.technologies"
                  :disabled="!developer.technology_type">
            <option class="home__select__option" disabled value="">Selecciona una tecnología</option>
            <option class="home__select__option"
                    id="tecnologias"
                    v-for="option in selectTechnologiesOptions"
                    :key="option.value"
                    :value="option.value">{{ option.label }}
            </option>
          </select>
          <input type="url"
                 id="github"
                 v-model="developer.github_url"
                 placeholder="Github URL"/>
          <button type="submit" class="form__button">Añadir preferencias</button>
        </form>

      </div>
    </section>
  </main>
</template>

<style scoped>
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
}

</style>
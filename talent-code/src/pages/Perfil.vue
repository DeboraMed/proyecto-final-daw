<script>
import {computed, onMounted} from "vue";
import {useUserStore} from '../stores/UserStore.js';
import {useSelectStore} from "../stores/SelectStore.js";

export default {
  setup(){
    const selectStore = useSelectStore();
    const userStore = useUserStore();

    onMounted(async () => {
      await userStore.fetchUser();
    });

    const userData = computed(() => {
      return userStore.userData;
    });

    return {
      selectStore,
      userStore,
      userData
    }
  },

  data(){
    return {
      perfilPendiente: true,
      selectContractOptions: [],
      selectScheduleOptions: [],
      selectSpecializationOptions: [],
      selectWorkOptions: [],
      selectAcademicOptions: [],
      selectExperienceOptions: [],
      selectTechnologyOptions: [],
      developer: {
        contract_type: '',
        schedule: '',
        specialization: '',
        work_mode: '',
        academic_level: '',
        experience_level: '',
        technology_type: '',
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
  },
}

//TODO: el perfil no carga la info del usuario
</script>

<template>
  <div>Perfil de usuario</div>
  <article>
    <h2>Bienvenid@ <span>{{ userData.name }}</span></h2>
    Hola, {{ userData.name}} Bienvenido a Talent.Code<br>
    Tu email: {{ userData.email }}<br>
    <button class="button" @click="userStore.logout()">Cerrar sesión</button>
  </article>

  <!--  TODO: comprobar que el formulario sale si los campos no estan rellenos-->
  <div v-if="perfilPendiente">
    <h2>Formulario de preferencias laborales</h2>
    <form class="form" @submit.prevent="additionalProfileFields">
      <select v-model="developer.contract_type">
        <option disabled value="">Selecciona un tipo de contrato</option>
        <option
            id="contrato"
            v-for="option in selectContractOptions"
            :key="option.value"
            :value="option.value">{{ option.label }}
        </option>
      </select>
      <select v-model="developer.schedule">
        <option disabled value="">Selecciona un tipo de jornada</option>
        <option
            id="jornada"
            v-for="option in selectScheduleOptions"
            :key="option.value"
            :value="option.value">{{ option.label }}
        </option>
      </select>
      <select v-model="developer.specialization">
        <option disabled value="">Selecciona una especialidad</option>
        <option
            id="especialidad"
            v-for="option in selectSpecializationOptions"
            :key="option.value"
            :value="option.value">{{ option.label }}
        </option>
      </select>
      <select v-model="developer.work_mode">
        <option disabled value="">Selecciona una modalidad de trabajo</option>
        <option
            id="modalidad"
            v-for="option in selectWorkOptions"
            :key="option.value"
            :value="option.value">{{ option.label }}
        </option>
      </select>
      <select v-model="developer.academic_level">
        <option disabled value="">Selecciona un nivel académico</option>
        <option
            id="estudios"
            v-for="option in selectAcademicOptions"
            :key="option.value"
            :value="option.value">{{ option.label }}
        </option>
      </select>
      <select v-model="developer.experience_level">
        <option disabled value="">Selecciona un nivel de experiencia</option>
        <option
            id="experiencia"
            v-for="option in selectExperienceOptions"
            :key="option.value"
            :value="option.value">{{ option.label }}
        </option>
      </select>
      <select v-model="developer.technology_type">
        <option disabled value="">Selecciona una tecnología</option>
        <option
            id="tecnologias"
            v-for="option in selectTechnologyOptions"
            :key="option.value"
            :value="option.value">{{ option.label }}
        </option>
      </select>
      <input type="url"
             id="github"
             v-model="developer.github_url"
             placeholder="Github URL"/>

    </form>

  </div>
</template>

<style scoped>

</style>
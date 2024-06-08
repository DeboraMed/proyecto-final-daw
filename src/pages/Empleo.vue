<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import {useSelectStore} from "../stores/SelectStore.js";
import {useUserStore} from "../stores/UserStore.js";
import {useAlertStore} from "../stores/AlertStore.js";

const userStore = useUserStore();
const alertStore = useAlertStore();
const selectStore = useSelectStore();

let expandedCategories = ref({
  specialization: true,
  schedule: true,
  work_mode: true,
  contract_type: true,
});

const toggleCategory = (category) => {
  expandedCategories.value[category] = !expandedCategories.value[category];
};
//TODO: voy por aqui con los filtros
let vacancies = ref([]);
let filters = ref({
  specialization: '',
  schedule: '',
  work_mode: '',
  contract_type: '',
});

const fetchVacancies = async () => {
  try {
    const response = await axios.get('/api/v1/vacancies/random');
    vacancies.value = response.data.vacancies;
  } catch (error) {
    console.error('Error al recuperar las vacantes:', error);
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchVacancies();
});
</script>

<template>
  <main>
    <div class="header">
      <h1>Ofertas de empleo para Desarrolladores</h1>
      <p>Encontraras una gran variedad de ofertas de empleo Talent.Code</p>
    </div>
    <div class="container__div">
      <!-- filtros-->
      <div class="filter-menu">
        <h2>Filtros</h2>
        <p style="font-weight: lighter">Dale a la X para borrar un filtro.</p>
        <!-- Comienzo de filtros-->
        <div class="filter-category">
          <h4 @click="toggleCategory('specialization')" class="toggle-category">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
            Especialización
          </h4>
          <transition name="fade">
            <div v-if="expandedCategories.specialization">
              <label v-for="option in selectStore.specializationSelectData" :key="option.value">
                <input type="radio" :name="`specialization`" :value="option.value"
                       @change="toggleFilter('specialization', option.value)">
                {{ option.label }}
              </label>
            </div>
          </transition>
        </div>

        <div class="filter-category">
          <h4 @click="toggleCategory('schedule')" class="toggle-category">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
            Horario
          </h4>
          <transition name="fade">
            <div v-if="expandedCategories.schedule">
              <label v-for="option in selectStore.scheduleSelectData" :key="option.value">
                <input type="radio" :name="`schedule`" :value="option.value"
                       @change="toggleFilter('schedule', option.value)">
                {{ option.label }}
              </label>
            </div>
          </transition>
        </div>

        <div class="filter-category">
          <h4 @click="toggleCategory('work_mode')" class="toggle-category">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
            Modalidad
          </h4>
          <transition name="fade">
            <div v-if="expandedCategories.work_mode">
              <label v-for="option in selectStore.workSelectData" :key="option.value">
                <input type="radio" :name="`work_mode`" :value="option.value"
                       @change="toggleFilter('work_mode', option.value)">
                {{ option.label }}
              </label>
            </div>
          </transition>
        </div>

        <div class="filter-category">
          <h4 @click="toggleCategory('contract_type')" class="toggle-category">
            <font-awesome-icon :icon="['fas', 'xmark']"/>
            Contrato
          </h4>
          <transition name="fade">
            <div v-if="expandedCategories.contract_type">
              <label v-for="option in selectStore.contractSelectData" :key="option.value">
                <input type="radio" :name="`contract_type`" :value="option.value"
                       @change="toggleFilter('contract_type', option.value)">
                {{ option.label }}
              </label>
            </div>
          </transition>
        </div>
      </div>
      <!-- vacantes-->
      <div class="vacancies-section">
        <div v-for="vacancy in vacancies" :key="vacancy.id" class="vacancy">
          <div class="company-content-image">
            <router-link :to="'/empresa/' + vacancy.company['id']">
              <img :src="vacancy.company['user']['avatar_url']" alt="Imagen de la Empresa" class="company-image">
              <h3 class="company-name">{{ vacancy.company['user']['name'] }}</h3>
            </router-link>
          </div>
          <div class="vacancy-info">
            <h2>{{ vacancy.title }}</h2>
            <p>{{ vacancy.description }}</p>
            <p><strong>Tecnologías:</strong>
              <span v-for="technology in vacancy.technologies" :key="technology.name" class="vacancy-info-tecnologias">
                {{ technology.name }}
            </span>
            </p>
            <p>
              <span class="vacancy-info-tecnologias">{{ vacancy.contract_type }}</span>
              <span class="vacancy-info-tecnologias">{{ vacancy.work_mode }}</span>
              <span class="vacancy-info-tecnologias">{{ vacancy.schedule }}</span>
            </p>
            <div class="button-container">
              <button :disabled="!userStore.isLogged() || userStore.userType() !== 'developer'"
                      @click="alertStore.success('Se ha registrado en la vacante correctamente.');"
                      class="generic-button">
                {{
                  userStore.isLogged() ? (userStore.userType() === 'developer' ? 'Presentar candidatura' : 'No eres un desarrollador') : 'Inicia sesión para aplicar'
                }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
input {
  background-color: #f0f0f0; /* Fondo gris claro */
  color: #999; /* Texto gris oscuro */
  width: 20px;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0;
  margin: 0;
}
.button-container {
  padding: 0;
}
.container__div {
  display: flex;
}

.filter-menu {
  text-align: left;
  width: 450px;
  margin-right: 20px;
}

.filter-category {
  margin-bottom: 20px;
}
p {
  padding-bottom: 10px;
}

h2 {
  margin-top: 10px;
}

button {
  margin: 0;
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

.vacancies-section {
  margin-top: 20px;
  text-align: left;
}

.vacancies-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.vacancy {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.company-content-image {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.company-name {
  text-align: center;
  margin: 0 20px 0 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
  max-width: 150px;
}

.company-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
}

.vacancy-info {
  flex: 1;
  text-align: left;
}

.vacancy-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.vacancy-info p {
  margin: 0 0 5px;
  color: #666;
}

.vacancy-info strong {
  color: #333;
}

.vacancy-info-tecnologias {
  background-color: #c0c0c0;
  border-radius: 30px;
  padding: 5px 10px;
  margin: 5px;
}
.toggle-category {
  cursor: pointer;
  transition: all 0.5s ease-in;
}

label {
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
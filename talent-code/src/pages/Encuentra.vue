<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import {useSelectStore} from "../stores/SelectStore.js";

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

let developers = ref([]);
let filters = ref({
  specialization: '',
  schedule: '',
  work_mode: '',
  contract_type: '',
});

const fetchDevelopers = async () => {
  try {

    const params = new URLSearchParams();

    if (filters.value.specialization) {
      params.append('specialization', filters.value.specialization);
    }
    if (filters.value.schedule) {
      params.append('schedule', filters.value.schedule);
    }
    if (filters.value.work_mode) {
      params.append('work_mode', filters.value.work_mode);
    }
    if (filters.value.contract_type) {
      params.append('contract_type', filters.value.contract_type);
    }

    const queryString = params.toString();
    const response = await axios.get(`/api/v1/developer?${queryString}`);

    developers.value = response.data.developers;
  } catch (error) {
    console.error('Error al recuperar los desarrolladores:', error);
  }
};

onMounted(() => {
  fetchDevelopers();
  selectStore.fetchAllSelectOptionsEnums()
});

const toggleFilter = (category, value) => {
  filters.value[category] = value;
  fetchDevelopers();
};

</script>

<template>
  <main class="container__div">
    <div class="filter-menu">
      <h3>Filtros</h3>
      <!-- Comienzo de filtros-->
      <div class="filter-category">
        <h4 @click="toggleCategory('specialization')">Especialización</h4>
        <div v-if="expandedCategories.specialization">
          <label v-for="option in selectStore.specializationSelectData" :key="option.value">
            <input type="radio" :name="`specialization`" :value="option.value" @change="toggleFilter('specialization', option.value)">
            {{ option.label }}
          </label>
        </div>
      </div>

      <div class="filter-category">
        <h4 @click="toggleCategory('schedule')">Horario</h4>
        <div v-if="expandedCategories.schedule">
          <label v-for="option in selectStore.scheduleSelectData" :key="option.value">
            <input type="radio" :name="`schedule`" :value="option.value" @change="toggleFilter('schedule', option.value)">
            {{ option.label }}
          </label>
        </div>
      </div>

      <div class="filter-category">
        <h4 @click="toggleCategory('work_mode')">Modalidad</h4>
        <div v-if="expandedCategories.work_mode">
          <label v-for="option in selectStore.workSelectData" :key="option.value">
            <input type="radio" :name="`work_mode`" :value="option.value" @change="toggleFilter('work_mode', option.value)">
            {{ option.label }}
          </label>
        </div>
      </div>

      <div class="filter-category">
        <h4 @click="toggleCategory('contract_type')">Contrato</h4>
        <div v-if="expandedCategories.contract_type">
          <label v-for="option in selectStore.contractSelectData" :key="option.value">
            <input type="radio" :name="`contract_type`" :value="option.value" @change="toggleFilter('contract_type', option.value)">
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>

    <div class="developers-section">
      <div v-if="developers.length === 0">
        No se encontraron desarrolladores que coincidan con los filtros seleccionados.
      </div>
      <div v-else v-for="developer in developers" :key="developer.id" class="developer">
        <div class="developer-content-image">
          <img :src="developer.user['avatar_url']" alt="Avatar del desarrollador" class="developer-image">
        </div>
        <div class="developer-info">
          <h2><router-link :to="'/portfolio/' + developer.id">{{ developer.user.name }}</router-link></h2>
          <p>{{ developer.user.description }}</p>
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

.container__div {
  display: flex;
}

.filter-menu {
  width: 250px;
  margin-right: 20px;
}

.filter-category {
  margin-bottom: 20px;
}

.developers-section {
  flex: 1;
  margin-top: 20px;
}

.developer {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.developer-content-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.developer-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
}

.developer-info {
  flex: 1;
  text-align: left;
}

label {
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
}
</style>

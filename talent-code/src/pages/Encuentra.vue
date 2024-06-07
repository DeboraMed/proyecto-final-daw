<script setup>
import {onMounted, ref} from "vue";
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
  <main>
    <div class="header">
      <h1>Encuentra a Desarrolladores</h1>
      <p>Los mejores talentos en Talent.Code</p>
    </div>
    <div class="container__div">
      <div class="filter-menu">
        <h2>Filtros</h2>
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
      <!-- Empieza la lista de desarrolladores -->
      <div class="developers-section">
        <transition-group name="fade" tag="div">
          <div v-if="developers.length === 0">
            No se encontraron desarrolladores que coincidan con los filtros seleccionados.
          </div>
          <div v-else v-for="developer in developers" :key="developer.id" class="developer">
            <div class="developer-content-image">
              <img :src="developer.user['avatar_url']" alt="Avatar del desarrollador" class="developer-image">
              <div class="">
                <router-link class="generic-profile-button" :to="'/portfolio/' + developer.id">Ir al Perfil
                </router-link>
              </div>
            </div>
            <div class="developer-info">
              <h2>
                {{ developer.user.name }}
              </h2>
              <p>{{ developer.user.description }}</p>
            </div>
          </div>
        </transition-group>
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
  text-align: left;
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
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.developer-image {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
}

.developer-info {
  color: #5d5d5d;
  flex: 1;
  text-align: left;
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

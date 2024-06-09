<script setup>
import {useUserStore} from "../stores/UserStore.js";
import {useSelectStore} from "../stores/SelectStore.js";
import {useAlertStore} from "../stores/AlertStore.js";

import {onMounted, ref} from "vue";
import axios from "axios";

const userStore = useUserStore();
const selectStore = useSelectStore();
const alertStore = useAlertStore();

let vacancies = ref([]);
let vacancy = ref({
  title: '',
  description: '',
  contract_type: '',
  work_mode: '',
  schedule: '',
  academic_level: '',
  date: '',
  technologies: []
});

// Ref para controlar la visibilidad del formulario
let showForm = ref(false);

// Errores del formulario
let errors = ref({});

// Función para obtener las vacantes de la empresa
const fetchVacancies = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const response = await axios.get('/api/v1/vacancies/', config);
    vacancies.value = response.data.vacancies;
  } catch (error) {
    console.error('Error al recuperar las vacantes:', error);
    alertStore.error('Error al recuperar las vacantes.');
  }
};

// Función para validar el formulario
const validateForm = () => {
  errors.value = {};

  if (!vacancy.value.title || vacancy.value.title.length < 3) {
    errors.value.title = 'El título debe tener al menos 3 caracteres.';
  }
  if (!vacancy.value.description || vacancy.value.description.length < 10) {
    errors.value.description = 'La descripción debe tener al menos 10 caracteres.';
  }
  if (!vacancy.value.contract_type) {
    errors.value.contract_type = 'Selecciona un tipo de contrato.';
  }
  if (!vacancy.value.work_mode) {
    errors.value.work_mode = 'Selecciona una modalidad de trabajo.';
  }
  if (!vacancy.value.schedule) {
    errors.value.schedule = 'Selecciona un tipo de jornada.';
  }
  if (!vacancy.value.academic_level) {
    errors.value.academic_level = 'Selecciona un nivel académico.';
  }
  if (!vacancy.value.date) {
    errors.value.date = 'Selecciona una fecha.';
  }
  if (vacancy.value.technologies.length === 0) {
    errors.value.technologies = 'Selecciona al menos una tecnología.';
  }

  if (Object.keys(errors.value).length === 0) {
    addVacancy();
  } else {
    alertStore.error('Por favor, corrige los errores en el formulario.');
  }
};

// Función para agregar una nueva vacante
const addVacancy = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const technologiesArray = vacancy.value.technologies.map((tech) => ({
      name: tech
    }));

    const response = await axios.post('/api/v1/vacancies/', {
      ...vacancy.value,
      technologies: technologiesArray
    }, config);

    vacancies.value.push(response.data.vacancy);
    vacancy.value = {
      title: '',
      description: '',
      contract_type: '',
      work_mode: '',
      schedule: '',
      academic_level: '',
      date: '',
      technologies: []
    };
    alertStore.success('La vacante se ha creado correctamente.');
    showForm.value = false;
  } catch (error) {
    console.error('Error al agregar la vacante:', error);
    alertStore.error('Error al agregar la vacante.');
  }
};

// Función para eliminar una vacante
const deleteVacancy = async (id) => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    await axios.delete(`/api/v1/vacancies/${id}`, config);
    vacancies.value = vacancies.value.filter(exp => exp.id !== id);
    alertStore.success('La vacante ha sido eliminada.');
  } catch (error) {
    console.error('Error al eliminar la vacante:', error);
    alertStore.error('Error al eliminar las vacantes.');
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchVacancies();
  selectStore.fetchAllSelectOptionsEnums();
});
</script>


<template>
  <main>
    <div class="header">
      <h1>Crea una vacante en Talent.Code</h1>
      <p>Recluta al desarrollador que necesitas.</p>
      <!-- Botón para mostrar el formulario -->
      <button @click="showForm = true" v-if="!showForm">Crear una nueva vacante</button>
    </div>

    <!-- crear una nueva vacante -->
    <div class="container__form" v-if="showForm">
      <form class="form" @submit.prevent="validateForm">
        <label>Título de la vacante:</label>
        <input
            v-model="vacancy.title"
            type="text"/>
        <p class="error" v-if="errors.title">{{ errors.title }}</p>

        <label>Descripción:</label>
        <textarea
            v-model="vacancy.description">

        </textarea>
        <p class="error" v-if="errors.description">{{ errors.description }}</p>

        <label>Selecciona un tipo de contrato:</label>
        <select v-model="vacancy.contract_type">
          <option disabled value="">Selecciona un tipo de contrato</option>
          <option v-for="option in selectStore.contractSelectData" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <p class="error" v-if="errors.contract_type">{{ errors.contract_type }}</p>

        <label>Selecciona una modalidad:</label>
        <select v-model="vacancy.work_mode">
          <option disabled value="">Selecciona una modalidad:</option>
          <option v-for="option in selectStore.workSelectData" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <p class="error" v-if="errors.work_mode">{{ errors.work_mode }}</p>

        <label>Selecciona un tipo de jornada:</label>
        <select v-model="vacancy.schedule">
          <option disabled value="">Selecciona un tipo de jornada:</option>
          <option v-for="option in selectStore.scheduleSelectData" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <p class="error" v-if="errors.schedule">{{ errors.schedule }}</p>

        <label>Selecciona un nivel académico:</label>
        <select v-model="vacancy.academic_level">
          <option disabled value="">Selecciona un nivel académico:</option>
          <option v-for="option in selectStore.academicSelectData" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <p class="error" v-if="errors.academic_level">{{ errors.academic_level }}</p>

        <label>Fecha:</label>
        <input
            v-model="vacancy.date"
            type="date"/>
        <p class="error" v-if="errors.date">{{ errors.date }}</p>

        <label>Tecnologías:</label>
        <p class="detail"> Añade mas de una tecnología a la vez pulsando la tecla Ctrl</p>
        <select v-model="vacancy.technologies" multiple>
          <option v-for="option in selectStore.technologiesSelectData" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <p class="error" v-if="errors.technologies">{{ errors.technologies }}</p>

        <button type="submit">Crear Vacante</button>
        <button type="button" @click="showForm = false">Cancelar</button>
      </form>
    </div>

    <!-- listado de vacantes de la empresa -->
    <p>Tus vacantes actuales:</p>
    <div class="vacancy-section">
      <div v-for="vacancy in vacancies.slice().reverse()" :key="vacancy.id" class="vacancy">
        <div class="vacancy-info">
          <div class="vacancy-header">
            <h2>{{ vacancy.title }}</h2>
            <p class="vacancy-date">
              {{ vacancy.date }}
              <button class="delete-button" @click="deleteVacancy(vacancy.id)">
                <font-awesome-icon :icon="['fas', 'trash']"/>
              </button>
            </p>
          </div>
          <p>{{ vacancy.description }}</p>
          <p>
            <strong>Tecnologías:</strong>
            <span v-for="technology in vacancy.technologies" :key="technology.name" class="vacancy-info-tecnologias">
              {{ technology.name }}
            </span>
          </p>
          <p>
            <span class="vacancy-info-tecnologias">{{ vacancy.contract_type }}</span>
            <span class="vacancy-info-tecnologias">{{ vacancy.work_mode }}</span>
            <span class="vacancy-info-tecnologias">{{ vacancy.schedule }}</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
.detail {
  font-weight: lighter;
  font-size: small;
}

button {
  margin: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  line-height: 1.8;
}

form {
  display: flex;
  flex-direction: column;
}

fieldset {
  border: none;
  margin-bottom: 20px;
}

legend {
  font-weight: bold;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

input[type="text"],
textarea {
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
  height: 100px;
  resize: none;
}

/*estilos perfil*/
.profile-info h1 {
  margin: 0 0 10px;
  font-size: 2em;
  color: #333;
}

.profile-info p {
  margin: 0 0 10px;
  color: #666;
}

.vacancy-section h2 {
  margin-bottom: 20px;
  color: #333;
}

/*estilos vacantes*/
.vacancy-section {
  margin-top: 20px;
  text-align: left;
}

.vacancy {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding-right: 10px;
  padding-left: 20px;
  padding-bottom: 20px;
  border-radius: 8px;
  position: relative;
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
  padding: 5px 8px;
  margin: 8px 5px;
}

.vacancy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vacancy-date {
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  color: #666;
  text-align: right;
}

.error {
  color: #e74c3c;
  font-size: 0.875em;
  margin-top: -10px;
  margin-bottom: 10px;
}

div > p {
  font-weight: bold;
}

div > fieldset {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

div > fieldset > div {
  display: flex;
  align-items: center;
}
</style>
<script setup>
import { useUserStore } from "../../stores/UserStore.js";
import { useSelectStore } from "../../stores/SelectStore.js";
import {useAlertStore} from "../../stores/AlertStore.js";

import { onMounted, ref } from "vue";
import axios from "axios";

const userStore = useUserStore();
const selectStore = useSelectStore();
const alertStore = useAlertStore();

// Definir una ref para almacenar la Formacion
let educations = ref([]);
let newEducation = ref({
  institution: '',
  qualification: '',
  academic_level: '',
  completion_date: ''
});

let showForm = ref(false);
let errors = ref({});

// Función para obtener la Formacion del usuario
const fetchEducation = async () => {
  const config = {
    headers: { Authorization: `Bearer ${userStore.token}` }
  };
  try {
    const response = await axios.get('/api/v1/education/', config);
    educations.value = response.data.education;
  } catch (error) {
    console.error('Error al recuperar las formaciones:', error);
    alertStore.error('Error al recuperar las formaciones.');
  }
};

const validateEducationForm = () => {
  errors.value = {};

  if (!newEducation.value.academic_level) {
    errors.value.academic_level = 'Por favor, selecciona un nivel académico.';
  }
  if (!newEducation.value.institution) {
    errors.value.institution = 'Por favor, introduce el centro de estudios.';
  }
  if (!newEducation.value.qualification) {
    errors.value.qualification = 'Por favor, introduce la titulación.';
  }
  if (!newEducation.value.completion_date) {
    errors.value.completion_date = 'Por favor, introduce la fecha de finalización.';
  }

  return Object.keys(errors.value).length === 0;
};

const addEducation = async () => {
  if (!validateEducationForm()) {
    return;
  }

  const config = {
    headers: { Authorization: `Bearer ${userStore.token}` }
  };
  try {
    const response = await axios.post('/api/v1/education/', newEducation.value, config);
    educations.value.push(response.data.education);

    newEducation.value = {
      institution: '',
      qualification: '',
      academic_level: '',
      completion_date: ''
    };

    showForm.value = false;
    alertStore.success('La formación se ha actualizado correctamente.');
  } catch (error) {
    console.error('Error al agregar la formacion:', error);
    alertStore.error('Error al agregar la formacion:');
  }
};

const deleteEducation = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${userStore.token}` }
  };
  try {
    await axios.delete(`/api/v1/education/${id}`, config);
    educations.value = educations.value.filter(edu => edu.id !== id);
    alertStore.success('La formación se ha eliminado correctamente.');
  } catch (error) {
    console.error('Error al eliminar la formacion:', error);
    alertStore.error('Error al eliminar la formacion:');
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchEducation();
  selectStore.fetchAllSelectOptionsEnums();
});
</script>

<template>
  <section>
    <h2>Formación Académica</h2>
    <button @click="showForm = true" v-if="!showForm">Agregar Formación</button>
    <div class="container__form" v-if="showForm">
      <h3>Agregar Nueva Formación</h3>
      <form class="form" @submit.prevent="addEducation">
        <label>Nivel Académico:</label>
          <select  v-model="newEducation.academic_level">
            <option disabled value="">Selecciona un nivel académico</option>
            <option
                v-for="option in selectStore.academicSelectData"
                :key="option.value"
                :value="option.value">{{ option.label }}
            </option>
          </select>
          <p class="error" v-if="errors.academic_level">{{ errors.academic_level }}</p>
        <label>Centro de Estudios:</label>
          <input
              v-model="newEducation.institution"
              type="text" />
          <p class="error" v-if="errors.institution">{{ errors.institution }}</p>
        <label>Titulación:</label>
          <input
              v-model="newEducation.qualification"
              type="text" />
          <p class="error" v-if="errors.qualification">{{ errors.qualification }}</p>
        <label>Fecha de finalización:</label>
          <input
              v-model="newEducation.completion_date"
              type="date" />
          <p class="error" v-if="errors.completion_date">{{ errors.completion_date }}</p>
        <button class="form__button" type="submit">Agregar Formación</button>
        <button class="form__button" type="button" @click="showForm = false">Cancelar</button>
      </form>
    </div>

    <div class="education-section">
      <div v-for="education in educations.slice().reverse()" :key="education.id" class="education">
        <div class="education-info">
          <div class="education-header">
            <h2>{{ education.institution }}</h2>
            <p class="education-dates">{{ education.completion_date_formatted }}
              <button class="delete-button" @click="deleteEducation(education.id)">
                <font-awesome-icon :icon="['fas', 'trash']"/>
              </button>
            </p>
          </div>
          <p>{{ education.academic_level }} en <i>{{ education.qualification }}</i></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container__form{
  margin: 3rem;
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
input[type="date"],
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
.profile-info h1 {
  margin: 0 0 10px;
  font-size: 2em;
  color: #333;
}

.profile-info p {
  margin: 0 0 10px;
  color: #666;
}

.education-section {
  margin-top: 20px;
  text-align: left;
}

.education-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.education {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}

.education-info {
  flex: 1;
  text-align: left;
}

.education-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.education-info p {
  margin: 0 0 5px;
  color: #666;
}

.education-info strong {
  color: #333;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.education-dates {
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  color: #666;
  text-align: right;
}

.new-education-form {
  margin-top: 30px;
}

.new-education-form form {
  display: flex;
  flex-direction: column;
}

.new-education-form label {
  margin-bottom: 10px;
}

.new-education-form input,
.new-education-form textarea {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.error {
  color: #e74c3c;
  font-size: 0.875em;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
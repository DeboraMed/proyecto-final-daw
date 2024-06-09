<script setup>

import {useUserStore} from "../../stores/UserStore.js";
import {useSelectStore} from "../../stores/SelectStore.js";

import {onMounted, ref} from "vue";
import axios from "axios";
import {useAlertStore} from "../../stores/AlertStore.js";
const userStore = useUserStore();
const selectStore = useSelectStore();
const alertStore = useAlertStore();

// Definir refs para almacenar las experiencias y los campos del formulario
let experiences = ref([]);
let newExperience = ref({
  level: '',
  company_name: '',
  start_date: '',
  end_date: '',
  description: '',
  technologies: []
});

// Ref para controlar la visibilidad del formulario
let showForm = ref(false);
let errors = ref({});

// Función para obtener las experiencias laborales del usuario
const fetchExperiences = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const response = await axios.get('/api/v1/experiences/', config);
    experiences.value = response.data.experiences;
  } catch (error) {
    console.error('Error al recuperar las experiencias:', error);
  }
};

const validateEducationForm = () => {
  errors.value = {};

  if (!newExperience.value.level) {
    errors.value.level = 'Por favor, selecciona una experiencia.';
  }
  if (!newExperience.value.company_name) {
    errors.value.company_name = 'Por favor, introduce el nombre de la empresa.';
  }
  if (!newExperience.value.start_date) {
    errors.value.start_date = 'Por favor, introduce la fecha de inicio.';
  }
  if (!newExperience.value.end_date) {
    errors.value.end_date = 'Por favor, introduce la fecha de finalización.';
  }
  if (!newExperience.value.description) {
    errors.value.description = 'Por favor, introduce una descripción.';
  }
  if (!newExperience.value.technologies) {
    errors.value.technologies = 'Por favor, introduce al menos una tecnología.';
  }

  return Object.keys(errors.value).length === 0;
};

// Función para agregar una nueva experiencia laboral
const addExperience = async () => {
  if (!validateEducationForm()) {
    return;
  }

  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const technologiesArray = newExperience.value.technologies.map((tech) => ({
      name: tech
    }));

    const response = await axios.post('/api/v1/experiences/', {
      ...newExperience.value,
      technologies: technologiesArray
    }, config);

    experiences.value.push(response.data.experience);
    newExperience.value = {
      level: '',
      company_name: '',
      start_date: '',
      end_date: '',
      description: '',
      technologies: []
    };
    showForm.value = false;
    alertStore.success('La experiencia se ha creado correctamente.');
  } catch (error) {
    console.error('Error al agregar la experiencia:', error);
    alertStore.error('Error al agregar la experiencia:');
  }
};

// Función para eliminar una experiencia laboral
const deleteExperience = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${userStore.token}` }
  };
  try {
    await axios.delete(`/api/v1/experiences/${id}`, config);
    experiences.value = experiences.value.filter(exp => exp.id !== id);
    alertStore.success('La experiencia se ha eliminado correctamente.');
  } catch (error) {
    console.error('Error al eliminar la experiencia:', error);
    alertStore.error('Error al eliminar la experiencia:');
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchExperiences();
  selectStore.fetchAllSelectOptionsEnums();
});

</script>

<template>
  <section>
    <h2>Experiencia Laboral</h2>
    <!-- Botón para mostrar el formulario -->
    <button @click="showForm = true" v-if="!showForm">Agregar Experiencia</button>
    <!-- Formulario para agregar nueva experiencia, visible solo cuando showForm es true -->
    <div class="container__form" v-if="showForm">
      <h3>Agregar Nueva Experiencia Laboral</h3>
      <form class="form" @submit.prevent="addExperience">
        <label>
          Nivel:
          <select v-model="newExperience.level">
            <option disabled value="">Selecciona un nivel de experiencia</option>
            <option
                v-for="option in selectStore.experienceSelectData"
                :key="option.value"
                :value="option.value">{{ option.label }}
            </option>
          </select>
        </label>
        <label>Nombre de la empresa:</label>
          <input
              v-model="newExperience.company_name"
              type="text" />
          <p class="error" v-if="errors.company_name">{{ errors.company_name }}</p>
        <label>Fecha de inicio:</label>
          <input
              v-model="newExperience.start_date"
              type="date" />
          <p class="error" v-if="errors.start_date">{{ errors.start_date }}</p>
        <label>Fecha de finalización:</label>
          <input
              v-model="newExperience.end_date"
              type="date"/>
          <p class="error" v-if="errors.end_date">{{ errors.end_date }}</p>
        <label>Descripción:</label>
          <textarea
              v-model="newExperience.description">
          </textarea>
          <p class="error" v-if="errors.description">{{ errors.description }}</p>
        <label>Tecnologías:</label>
          <p class="detail"> Añade mas de una tecnología a la vez pulsando la tecla Ctrl</p>
          <select  v-model="newExperience.technologies" multiple>
            <option
                v-for="option in selectStore.technologiesSelectData"
                :key="option.value"
                :value="option.value">{{ option.label }}
            </option>
          </select>
          <p class="error" v-if="errors.technologies">{{ errors.technologies }}</p>

        <button class="form__button" type="submit">Agregar Experiencia</button>
        <button class="form__button" type="button" @click="showForm = false">Cancelar</button>
      </form>
    </div>

    <div class="experience-section">
      <div v-for="experience in experiences.slice().reverse()" :key="experience.id" class="experience">
        <div class="experience-info">
          <div class="experience-header">
            <h2>{{experience.level}} en <i>{{experience.company_name}}</i></h2>
            <p class="experience-date">{{experience.start_date_formatted}} - {{experience.end_date_formatted}}
            <button class="delete-button" @click="deleteExperience(experience.id)"><font-awesome-icon :icon="['fas', 'trash']"/></button>
            </p>
          </div>
          <p>{{experience.description}}</p>
          <p><strong>Tecnologías:</strong>
            <span v-for="technology in experience.technologies" :key="technology.name" class="experience-info-tecnologias">
              {{technology.name}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.detail {
  font-weight: lighter;
  font-size: small;
}
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

.experience-section {
  margin-top: 20px;
  text-align: left;
}

.experience-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.experience {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}

.experience-info {
  flex: 1;
  text-align: left;
}

.experience-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.experience-info p {
  margin: 0 0 5px;
  color: #666;
}

.experience-info strong {
  color: #333;
}

.experience-info-tecnologias {
  background-color: #c0c0c0;
  border-radius: 30px;
  padding: 5px 10px;
  margin: 5px;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.experience-date {
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  color: #666;
  text-align: right;
}

.error {
  color: #e74c3c;
  font-size: 0.875em;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
<script setup>

import {useUserStore} from "../../stores/UserStore.js";
import {useSelectStore} from "../../stores/SelectStore.js";

import {onMounted, ref} from "vue";
import axios from "axios";
const userStore = useUserStore();
const selectStore = useSelectStore();

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

// Función para agregar una nueva experiencia laboral
const addExperience = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    // Convertir las tecnologías seleccionadas en el formato requerido
    const technologiesArray = newExperience.value.technologies.map((tech) => ({
      name: tech
    }));

    console.log(newExperience.value.technologies);
    console.log(technologiesArray);

    const response = await axios.post('/api/v1/experiences/', {
      ...newExperience.value,
      technologies: technologiesArray
    }, config);

    experiences.value.push(response.data.experience);
    // Reiniciar el formulario
    newExperience.value = {
      level: '',
      company_name: '',
      start_date: '',
      end_date: '',
      description: '',
      technologies: []
    };
    // Ocultar el formulario después de agregar la experiencia
    showForm.value = false;
  } catch (error) {
    console.error('Error al agregar la experiencia:', error);
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
    <div class="new-experience-form" v-if="showForm">
      <h3>Agregar Nueva Experiencia Laboral</h3>
      <form @submit.prevent="addExperience">
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

        <label>
          Nombre de la empresa:
          <input v-model="newExperience.company_name" type="text" required/>
        </label>
        <label>
          Fecha de inicio:
          <input v-model="newExperience.start_date" type="date" required/>
        </label>
        <label>
          Fecha de finalización:
          <input v-model="newExperience.end_date" type="date"/>
        </label>
        <label>
          Descripción:
          <textarea v-model="newExperience.description" required></textarea>
        </label>
        <label>
          Tecnologías:
          <select v-model="newExperience.technologies" multiple>
            <option
                v-for="option in selectStore.technologiesSelectData"
                :key="option.value"
                :value="option.value">{{ option.label }}
            </option>
          </select>
        </label>
        <button type="submit">Agregar Experiencia</button>
        <button type="button" @click="showForm = false">Cancelar</button>
      </form>
    </div>

    <div class="experience-section">
      <div v-for="experience in experiences.slice().reverse()" :key="experience.id" class="experience">
        <div class="experience-info">
          <div class="experience-header">
            <h2>{{experience.level}} en <i>{{experience.company_name}}</i></h2>
            <p class="experience-date">{{experience.start_date_formatted}} - {{experience.end_date_formatted}}</p>
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
p {
  padding-bottom: 10px;
}

h2 {
  margin-top: 10px;
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

.new-experience-form {
  margin-top: 30px;
}

.new-experience-form form {
  display: flex;
  flex-direction: column;
}

.new-experience-form label {
  margin-bottom: 10px;
}

.new-experience-form input,
.new-experience-form textarea {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.new-experience-form button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.new-experience-form button:hover {
  background-color: #45a049;
}
</style>

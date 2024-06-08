<script setup>

import {useUserStore} from "../stores/UserStore.js";
import {useSelectStore} from "../stores/SelectStore.js";

import {onMounted, ref} from "vue";
import axios from "axios";

const userStore = useUserStore();
const selectStore = useSelectStore();

// Definir refs para almacenar las experiencias y los campos del formulario
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


// Función para obtener las experiencias laborales del usuario
/*const fetchExperiences = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const response = await axios.get('/api/v1/experiences/', config);
    experiences.value = response.data.experiences;
  } catch (error) {
    console.error('Error al recuperar las experiencias:', error);
  }
};*/

// Función para agregar una nueva experiencia laboral
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
    showForm.value = false;
  } catch (error) {
    console.error('Error al agregar la experiencia:', error);
  }
};

// Función para eliminar una experiencia laboral
const deleteExperience = async (id) => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    await axios.delete(`/api/v1/vacancies/${id}`, config);
    vacancies.value = vacancies.value.filter(exp => exp.id !== id);
  } catch (error) {
    console.error('Error al eliminar la experiencia:', error);
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  //fetchVacancies();
  selectStore.fetchAllSelectOptionsEnums();
});

</script>

<template>
  <main>
    <div class="header">
      <h1>Crea una vacante en Talent.Code</h1>
      <p>Recluta al desarrollador que necesitas.</p>
    </div>
    <div class="container__form">
      <form class="form" @submit.prevent="addVacancy">
        <label>Título de la vacante:</label>
        <input v-model="vacancy.title" type="text" required/>
        <label>Descripción:</label>
        <textarea v-model="vacancy.description" required></textarea>

        <label>Nivel:</label>
          <select v-model="vacancy.level">
            <option disabled value="">Selecciona un tipo de contrato</option>
            <option
                v-for="option in selectStore.contractSelectData"
                :key="option.value"
                :value="option.value">{{ option.label }}
            </option>
          </select>


        <label>Fecha:</label>
        <input v-model="vacancy.date" type="date" required/>
        <label>Tecnologías:</label>
        <p> Añade mas de una tecnología a la vez pulsando la tecla Ctrl</p>
        <select v-model="vacancy.technologies" multiple>
          <option
              v-for="option in selectStore.technologiesSelectData"
              :key="option.value"
              :value="option.value">{{ option.label }}
          </option>
        </select>
        <button type="submit">Crear Vacante</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
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
input[type="email"],
input[type="password"],
textarea,
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 80px;
  resize: none;
}

.error {
  color: #e74c3c;
  font-size: 0.875em;
  margin-top: -10px;
  margin-bottom: 10px;
}

.avatar-preview {
  display: block;
  margin-top: 10px;
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}

input[type="radio"] {
  margin-right: 10px;
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
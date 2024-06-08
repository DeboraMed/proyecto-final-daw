<script setup>

import {useUserStore} from "../../stores/UserStore.js";
import {useSelectStore} from "../../stores/SelectStore.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const userStore = useUserStore();
const selectStore = useSelectStore();


// Definir una ref para almacenar la Formacion
let educations = ref([]);
let newEducation = ref({
  institution: '',
  qualification: '',
  academic_level: '',
  completion_date: ''
});

let showForm = ref(false);

// Función para obtener  la Formacion del usuario
const fetchEducation = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const response = await axios.get('/api/v1/education/',config);
    educations.value = response.data.education;
  } catch (error) {
    console.error('Error al recuperar las formaciones:', error);
  }
};

const addEducation = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
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
  } catch (error) {
    console.error('Error al agregar la formacion:', error);
  }
};

const deleteEducation = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${userStore.token}` }
  };
  try {
    await axios.delete(`/api/v1/education/${id}`, config);
    educations.value = educations.value.filter(edu => edu.id !== id);
  } catch (error) {
    console.error('Error al eliminar la formacion:', error);
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

    <div class="new-education-form" v-if="showForm">
      <h3>Agregar Nueva Formación</h3>
      <form @submit.prevent="addEducation">
        <label>
          Nivel Académico:
          <select v-model="newEducation.academic_level">
            <option disabled value="">Selecciona un nivel académico</option>
            <option
                v-for="option in selectStore.academicSelectData"
                :key="option.value"
                :value="option.value">{{ option.label }}
            </option>
          </select>
        </label>

        <label>
          Centro de Estudios:
          <input v-model="newEducation.institution" type="text" required/>
        </label>
        <label>
          Titulación:
          <input v-model="newEducation.qualification" type="text" required/>
        </label>
        <label>
          Fecha de finalización:
          <input v-model="newEducation.completion_date" type="date" required/>
        </label>

        <button type="submit">Agregar Formación</button>
        <button type="button" @click="showForm = false">Cancelar</button>
      </form>
    </div>


    <div class="education-section">
      <div v-for="education in educations.slice().reverse()" :key="education.id" class="education">
        <div class="education-info">
          <div class="education-header">
            <h2>{{education.institution}}</h2>
            <p class="education-dates">{{education.completion_date_formatted}}
              <button class="delete-button" @click="deleteEducation(education.id)"><font-awesome-icon :icon="['fas', 'trash']"/></button>
            </p>
          </div>
          <p>{{education.academic_level}} en <i>{{education.qualification}}</i></p>
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

.new-education-form button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.new-education-form button:hover {
  background-color: #45a049;
}

.delete-button {
  background: none;
  border: none;
  color: #c00;
  cursor: pointer;
  font-size: 1.2em;
}

.delete-button:hover {
  color: #f00;
}
</style>
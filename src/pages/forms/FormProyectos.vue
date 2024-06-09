<script setup>
import {useUserStore} from "../../stores/UserStore.js";
import {useSelectStore} from "../../stores/SelectStore.js";
import {useAlertStore} from "../../stores/AlertStore.js";
import {onMounted, ref} from "vue";
import axios from "axios";

const userStore = useUserStore();
const selectStore = useSelectStore();
const alertStore = useAlertStore();

// Definir una ref para almacenar los proyectos
let projects = ref([]);
let newProject = ref({
  title: '',
  description: '',
  img_url: '',
  technologies: []
});

let showForm = ref(false);
let errors = ref({});

// Función para obtener los proyectos del usuario
const fetchProjects = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const response = await axios.get('/api/v1/projects/', config);
    projects.value = response.data.projects;
  } catch (error) {
    console.error('Error al recuperar los proyectos:', error);
    alertStore.error('Error al recuperar los proyectos.');
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (file && validTypes.includes(file.type)) {
    newProject.value.img_url = file;
    errors.value.img_url = ''; // Limpiar error de imagen si el archivo es válido
  } else {
    errors.value.img_url = 'Solo se permiten archivos JPG, JPEG, PNG, y GIF.';
  }
};

const validateProjectForm = () => {
  errors.value = {};

  if (!newProject.value.title) {
    errors.value.title = 'Por favor, introduce un título.';
  }
  if (!newProject.value.description) {
    errors.value.description = 'Por favor, introduce una descripción.';
  }
  if (!newProject.value.img_url) {
    errors.value.img_url = 'Por favor, selecciona una imagen.';
  }
  if (!newProject.value.technologies || newProject.value.technologies.length === 0) {
    errors.value.technologies = 'Por favor, introduce al menos una tecnología.';
  }

  return Object.keys(errors.value).length === 0;
};

const addProject = async () => {
  if (!validateProjectForm()) {
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const technologiesArray = newProject.value.technologies.map((tech) => ({
      name: tech
    }));

    const formData = new FormData();
    formData.append('img_url', newProject.value.img_url);
    formData.append('project_data', JSON.stringify({
      title: newProject.value.title,
      description: newProject.value.description,
      technologies: technologiesArray
    }));

    const response = await axios.post('/api/v1/projects/', formData, config);

    projects.value.push(response.data.project);

    newProject.value = {
      title: '',
      description: '',
      img_url: '',
      technologies: []
    };

    showForm.value = false;
    alertStore.success('El proyecto se ha agregado correctamente.');
  } catch (error) {
    console.error('Error al agregar el proyecto:', error);
    alertStore.error('Error al agregar el proyecto.');
  }
};

const deleteProject = async (id) => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    await axios.delete(`/api/v1/projects/${id}`, config);
    projects.value = projects.value.filter(project => project.id !== id);
    alertStore.success('El proyecto se ha eliminado correctamente.');
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    alertStore.error('Error al eliminar el proyecto.');
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchProjects();
  selectStore.fetchAllSelectOptionsEnums();
});
</script>

<template>
  <section>
    <h2>Proyectos</h2>
    <!-- Botón para mostrar el formulario -->
    <button @click="showForm = true" v-if="!showForm">Agregar Proyecto</button>
    <!-- Formulario para agregar nuevo proyecto, visible solo cuando showForm es true -->
    <div class="container__form" v-if="showForm">
      <h3>Agregar Nuevo Proyecto</h3>
      <form class="form" @submit.prevent="addProject">
        <label>Título:</label>
        <input
            v-model="newProject.title"
            type="text"/>
        <p class="error" v-if="errors.title">{{ errors.title }}</p>

        <label>Descripción:</label>
        <input
            v-model="newProject.description"
            type="text"/>
        <p class="error" v-if="errors.description">{{ errors.description }}</p>

        <label>Tecnologías:</label>
        <p class="detail"> Añade más de una tecnología a la vez pulsando la tecla Ctrl</p>
        <select v-model="newProject.technologies" multiple>
          <option
              v-for="option in selectStore.technologiesSelectData"
              :key="option.value"
              :value="option.value">{{ option.label }}
          </option>
        </select>
        <p class="error" v-if="errors.technologies">{{ errors.technologies }}</p>

        <label>Avatar:</label>
        <input type="file"
               id="avatar"
               @change="handleFileUpload" required/>
        <p class="error" v-if="errors.img_url">{{ errors.img_url }}</p>

        <button class="form__button" type="submit">Agregar Proyecto</button>
        <button class="form__button" type="button" @click="showForm = false">Cancelar</button>
      </form>
    </div>
    <!-- Proyectos -->
    <div class="projects-section">
      <div v-for="project in projects.slice().reverse()" :key="project.id" class="project">
        <div class="project-content-image">
          <img :src="project.image_url" alt="Imagen del proyecto" class="project-image">
        </div>
        <div class="project-info">
          <div class="project-header">
            <h2>{{ project.title }}</h2>
            <button class="delete-button" @click="deleteProject(project.id)">
              <font-awesome-icon :icon="['fas', 'trash']"/>
            </button>
          </div>
          <p>{{ project.description }}</p>
          <p><strong>Tecnologías:</strong>
            <span v-for="technology in project.technologies" :key="technology.name" class="project-info-tecnologias">
              {{ technology.name }}
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

.container__form {
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
input[type="file"],
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

.projects-section {
  margin-top: 20px;
  text-align: left;
}

.projects-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.project {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.project-content-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
}

.project-info {
  flex: 1;
  text-align: left;
}

.project-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.project-info p {
  margin: 0 0 5px;
  color: #666;
}

.project-info strong {
  color: #333;
}

.project-info-tecnologias {
  background-color: #c0c0c0;
  border-radius: 30px;
  padding: 5px 10px;
  margin: 5px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-project-form form {
  display: flex;
  flex-direction: column;
}

.new-project-form label {
  margin-bottom: 10px;
}

.new-project-form input,
.new-project-form textarea {
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
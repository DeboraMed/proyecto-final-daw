<script setup>

import {useUserStore} from "../../stores/UserStore.js";
import {useSelectStore} from "../../stores/SelectStore.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const userStore = useUserStore();
const selectStore = useSelectStore();

// Definir una ref para almacenar los proyectos
let projects = ref([]);
let newProject = ref({
  title: '',
  description: '',
  img_url: '',
  technologies: []
});

let showForm = ref(false);

// Función para obtener los proyectos del usuario
const fetchProjects = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
    try {
    const response = await axios.get('/api/v1/projects/',config);
    projects.value = response.data.projects;
  } catch (error) {
    console.error('Error al recuperar los proyectos:', error);
  }
};

const handleFileUpload = (event) => {
  newProject.value.img_url = event.target.files[0];
};

const addProject = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`, 'Content-Type': 'multipart/form-data'}
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
      technologies: technologiesArray,
    }));

    const response = await axios.post('/api/v1/projects/', formData, config);

    projects.value.push(response.data.project);

    newProject.value = {
      title: '',
      description: '',
      technologies: []
    };

    showForm.value = false;
  } catch (error) {
    console.error('Error al agregar el proyecto:', error);
  }
};

const deleteProject = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${userStore.token}` }
  };
  try {
    await axios.delete(`/api/v1/projects/${id}`, config);
    projects.value = projects.value.filter(project => project.id !== id);
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
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

      <!-- Formulario para agregar nueva experiencia, visible solo cuando showForm es true -->
      <div class="new-project-form" v-if="showForm">
        <h3>Agregar Nuevo Proyecto</h3>
        <form @submit.prevent="addProject">
          <label>
            Título:
            <input v-model="newProject.title" type="text" required/>
          </label>
          <label>
            Descripción:
            <input v-model="newProject.description" type="text" required/>
          </label>
          <label>
            Tecnologías:
            <select v-model="newProject.technologies" multiple>
              <option
                  v-for="option in selectStore.technologiesSelectData"
                  :key="option.value"
                  :value="option.value">{{ option.label }}
              </option>
            </select>
          </label>
          <label>
            Avatar
            <input type="file"
                   id="avatar"
                   @change="handleFileUpload"/>
          </label>
          <button type="submit">Agregar Proyecto</button>
          <button type="button" @click="showForm = false">Cancelar</button>
        </form>
      </div>

      <div class="projects-section">

        <div v-for="project in projects.slice().reverse()" :key="project.id" class="project">
          <div class="project-content-image">
            <img :src="project.image_url" alt="Imagen del proyecto" class="project-image">
          </div>

          <div class="project-info">
            <div class="project-header">
              <h2>{{project.title}}</h2>
              <button class="delete-button" @click="deleteProject(project.id)"><font-awesome-icon :icon="['fas', 'trash']"/></button>
            </div>

            <p>{{project.description}}</p>
            <p><strong>Tecnologías:</strong>
              <span v-for="technology in project.technologies" :key="technology.name" class="project-info-tecnologias">
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

.new-project-form {
  margin-top: 30px;
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

.new-project-form button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.new-project-form button:hover {
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
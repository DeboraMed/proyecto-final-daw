<script setup>

import {useUserStore} from "../../stores/UserStore.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const userStore = useUserStore();

// Definir una ref para almacenar los proyectos
let projects = ref([]);

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

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchProjects();
});

</script>

<template>

    <section v-if="projects">
      <h2>Proyectos</h2>
        <div class="projects-section">

          <div v-for="project in projects" :key="project.id" class="project">
            <div class="project-content-image">
              <img :src="project.image_url" alt="Imagen del proyecto" class="project-image">
            </div>

            <div class="project-info">
              <h2>{{project.title}}</h2>
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
</style>
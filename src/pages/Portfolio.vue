<script setup>
import {useUserStore} from "../stores/UserStore.js";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import ImageModal from "../shared/ImageModal.vue";

import axios from "axios";

// Definir una ref para almacenar los proyectos
let developer = ref();
const userStore = useUserStore();
const route = useRoute()
let showModal = ref(false);
let selectedImage = ref(null);

// Vigilar si existen cambios en la URL para recargar
watch(() => route, () => {
  fetchDeveloper(route.params.id)
}, {
  deep: true
})

// Función para obtener los proyectos del usuario
const fetchDeveloper = async (userId) => {

  if(!userId) {
    await userStore.fetchUser();
    userId = userStore.userData.userable.id;
  }

  try {
    const response = await axios.get('/api/v1/developer/' + userId);
    developer.value = response.data.developer;
  } catch (error) {
    console.error('Error al recuperar los proyectos:', error);
  }
};

const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  showModal.value = true;
};

const closeImageModal = () => {
  showModal.value = false;
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  const route = useRoute();
  fetchDeveloper(route.params.id);
});
</script>

<template>
  <main class="container__div">
    <section class="container__form">
    </section>
    <section v-if="developer">
      <div class="profile-container">
        <div class="profile-header">
          <img :src="developer.user['avatar_url']" alt="Avatar del desarrollador" class="avatar">
          <div class="profile-info">
            <h1>{{developer.user['name']}}</h1>
            <p>{{developer.user['description']}}</p>
            <a v-if="developer.github_url" :href="developer.github_url" target="_blank" class="github-link">GitHub</a>
          </div>
        </div>
        <div class="projects-section">
          <h2>Proyectos</h2>

          <div class="profile-info" v-if="developer.projects.length===0">
            <p>¡Aun no tienes ningún proyecto! Ve a la sección "Perfil" para aportar más información.</p>
          </div>

          <div v-for="project in developer.projects" :key="project.id" class="project">
            <div class="project-content-image">
              <img :src="project.image_url" alt="Imagen del proyecto" class="project-image" @click="openImageModal(project.image_url)">
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
      </div>
      <!-- Uso del componente de modal de imagen -->
      <ImageModal :show="showModal" :imageUrl="selectedImage" @close="closeImageModal" />
    </section>
  </main>
</template>

<style scoped>
p {
  padding-bottom: 10px;
}

h2 {
  margin-top: 10px;
}

.profile-container {
  width: 90%;
  max-width: 1200px;
  background-color: #fff;
  padding: 20px;
  //border: #ccc solid 1px;
  //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  text-align: left;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
}

.profile-info {
  margin-top: 1rem;
  flex: 1;
  text-align: left;
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

.github-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.github-link:hover {
  background-color: #555;
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
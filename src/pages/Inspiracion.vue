<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";

let developers = ref([]);
let visibleDevelopers = ref([]);


const fetchDevelopers = async () => {
  try {
    const response = await axios.get('/api/v1/developer/random');
    developers.value = response.data.developers;
    showDevelopersWithDelay();
  } catch (error) {
    console.error('Error al recuperar los desarrolladores:', error);
  }
};

const showDevelopersWithDelay = () => {
  developers.value.forEach((developer, index) => {
    setTimeout(() => {
      visibleDevelopers.value.push(developer);
    }, index * 100); // Retraso de 100ms entre cada aparición
  });
};

onMounted(() => {
  fetchDevelopers();
});
</script>

<template>
  <main>
    <div class="header">
      <h1>Descubre nuevos desarrolladores para Inspirarte</h1>
      <p>Conoce a nuestros desarrolladores de Talent.Code.</p>
    </div>
    <div class="container__div">
      <div class="developers-section">
        <transition-group name="fade" tag="div">
          <div v-if="developers.length === 0">
            No se encontraron desarrolladores que coincidan con los filtros seleccionados.
          </div>
          <div v-else v-for="developer in visibleDevelopers" :key="developer.id" class="developer">
            <div class="developer-content-image">
              <img :src="developer.user['avatar_url']" alt="Avatar del desarrollador" class="developer-image">
              <div class="">
                <router-link class="generic-profile-button" :to="'/portfolio/' + developer.id">Ir al Perfil
                </router-link>
              </div>
            </div>
            <div class="developer-info">
              <h2>
                {{ developer.user.name }}
              </h2>
              <p>{{ developer.user.description }}</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </main>
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

.developers-section {
  flex: 1;
  margin-top: 20px;
}

.developer {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.developer-content-image {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.developer-image {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
}

.developer-info {
  color: #5d5d5d;
  flex: 1;
  text-align: left;
}

.developer-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.developer-info p {
  margin: 0 0 5px;
  color: #666;
}

.developer-info strong {
  color: #333;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
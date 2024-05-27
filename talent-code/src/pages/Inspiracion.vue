<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";


// Definir una ref para almacenar los proyectos
let developers = ref([]);

// Función para obtener los proyectos del usuario
const fetchDevelopers = async () => {
  try {
    const response = await axios.get('/api/v1/developer/all');
    developers.value = response.data.developers;
  } catch (error) {
    console.error('Error al recuperar los desarrolladores:', error);
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchDevelopers();
  });
</script>

<template>
  <main class="container__div">
    <div class="developers-section">
      <div v-for="developer in developers" :key="developer.id" class="developer">
        <div class="developer-content-image">
          <img :src="developer.user['avatar_url']" alt="Avatar del desarrollador" class="developer-image">
        </div>

        <div class="developer-info">
          <h2><router-link :to="'/portfolio/' + developer.id">{{developer.user.name}}</router-link></h2>
          <p>{{developer.user.description}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

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
  margin-top: 20px;
  text-align: left;
}

.developers-section h2 {
  margin-bottom: 20px;
  color: #333;
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
  align-items: center;
  justify-content: center;
}

.developer-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
}

.developer-info {
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

</style>
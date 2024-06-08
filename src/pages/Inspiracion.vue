<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import axios from "axios";

let developers = ref([]);
let visibleDevelopers = ref([]);
let page = ref(1);
let hasMoreDevelopers = ref(true);
let isLoading = ref(false);

const fetchDevelopers = async () => {
  if (isLoading.value || !hasMoreDevelopers.value) return;

  isLoading.value = true;
  try {
    const response = await axios.get(`/api/v1/developer/random?page=${page.value}`);
    console.log(response.data.developers.data)
    if (response.data.developers.data.length === 0) {
      hasMoreDevelopers.value = false;
    } else {
      developers.value.push(...response.data.developers.data);
      showDevelopersWithDelay(response.data.developers.data);
      page.value += 1;
    }
  } catch (error) {
    console.error('Error al recuperar los desarrolladores:', error);
  } finally {
    isLoading.value = false;
  }
};

const showDevelopersWithDelay = (newDevelopers) => {
  newDevelopers.forEach((developer, index) => {
    setTimeout(() => {
      visibleDevelopers.value.push(developer);
    }, index * 100); // Retraso de 100ms entre cada aparición
  });
};

const handleScroll = () => {
  const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 10;
  if (bottomOfWindow) {
    fetchDevelopers();
  }
};

onMounted(() => {
  fetchDevelopers();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
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
          <div v-if="developers.length === 0 && !isLoading">
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
        <div v-if="isLoading" class="loading">
          Cargando más desarrolladores...
        </div>
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

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  padding: 20px;
}
</style>

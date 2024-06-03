<script setup>
import { useUserStore } from "../stores/UserStore.js";
import { onMounted, ref } from "vue";
import axios from "axios";

const userStore = useUserStore();
let jobmatches = ref([]);

const fetchVacancies = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${userStore.token}` }
    };
    const response = await axios.get('/api/v1/job-matches', config);
    console.log(response);
    jobmatches.value = response.data.job_match;
  } catch (error) {
    console.error('Error al recuperar las vacantes:', error);
  }
};

onMounted(() => {
  fetchVacancies();
});
</script>

<template>
  <main class="container__div">
    <div class="vacancies-section">
      <div v-for="jobmatch in jobmatches" :key="jobmatch.id" class="vacancy-wrapper">
        <div class="highlight">
          <p class="score">{{ jobmatch.score }}% - {{ jobmatch.notes }}</p>
        </div>
        <div class="vacancy">
          <div class="company-content-image">
            <router-link :to="'/empresa/' + jobmatch.vacancy.company.id">
              <img :src="jobmatch.vacancy.company.user.avatar_url" alt="Imagen de la Empresa" class="company-image">
              <h3 class="company-name">{{ jobmatch.vacancy.company.user.name }}</h3>
            </router-link>
          </div>

          <div class="vacancy-info">
            <h2>{{ jobmatch.vacancy.title }}</h2>
            <p>{{ jobmatch.vacancy.description }}</p>
            <p><strong>Tecnologías:</strong>
              <span v-for="technology in jobmatch.vacancy.technologies" :key="technology.name" class="vacancy-info-tecnologias">
                {{ technology.name }}
              </span>
            </p>
            <p>
              <span class="vacancy-info-tecnologias">{{ jobmatch.vacancy.contract_type }}</span>
              <span class="vacancy-info-tecnologias">{{ jobmatch.vacancy.work_mode }}</span>
              <span class="vacancy-info-tecnologias">{{ jobmatch.vacancy.schedule }}</span>
            </p>
          </div>
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

.vacancies-section {
  margin-top: 20px;
  text-align: left;
}

.vacancies-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.vacancy {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.company-content-image {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.company-name {
  text-align: center;
  margin: 0 20px 0 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
  max-width: 150px;
}

.company-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
}

.vacancy-info {
  flex: 1;
  text-align: left;
}

.vacancy-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.vacancy-info p {
  margin: 0 0 5px;
  color: #666;
}

.vacancy-info strong {
  color: #333;
}

.vacancy-info-tecnologias {
  background-color: #c0c0c0;
  border-radius: 30px;
  padding: 5px 10px;
  margin: 5px;
}

.highlight {
  background-color: darkseagreen;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: inline-block;
}

.highlight p {
  margin: 0;
  font-size: 14px;
  color: darkolivegreen;
  padding: 0;
}
</style>
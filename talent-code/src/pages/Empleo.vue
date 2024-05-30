<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";


let vacancies = ref([]);

const fetchVacancies = async () => {
  try {
    const response = await axios.get('/api/v1/vacancies/random');
    vacancies.value = response.data.vacancies;
  } catch (error) {
    console.error('Error al recuperar las vacantes:', error);
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchVacancies();
});
</script>

<template>
  <main class="container__div">
    <div class="vacancies-section">
      <div v-for="vacancy in vacancies" :key="vacancy.id" class="vacancy">
        <div class="company-content-image">
          <img :src="vacancy.company['user']['avatar_url']" alt="Imagen de la Empresa" class="company-image">
        </div>

        <div class="vacancy-info">
          <h1><router-link :to="'/empresa/' + vacancy.company['id']">{{vacancy.company['user']['name']}}</router-link></h1>
          <h2>{{vacancy.title}}</h2>
          <p>{{vacancy.description}}</p>
          <p><strong>Tecnologías:</strong>
            <span v-for="technology in vacancy.technologies" :key="technology.name" class="vacancy-info-tecnologias">
                {{technology.name}}
            </span>
          </p>
          <p>
            <span class="vacancy-info-tecnologias">{{vacancy.contract_type}}</span>
            <span class="vacancy-info-tecnologias">{{vacancy.work_mode}}</span>
            <span class="vacancy-info-tecnologias">{{vacancy.schedule}}</span>
          </p>
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
  justify-content: center;
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

</style>
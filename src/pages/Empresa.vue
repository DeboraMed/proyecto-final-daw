<script setup>

import {useUserStore} from "../stores/UserStore.js";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

// Definir una ref para almacenar los proyectos
let company = ref();

// Función para obtener los proyectos del usuario
const fetchCompany = async (companyId) => {

  try {
    const response = await axios.get('/api/v1/company/' + companyId);
    company.value = response.data.company;
  } catch (error) {
    console.error('Error al recuperar los datos de la empresa:', error);
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  const route = useRoute();
  fetchCompany(route.params.id);
});

</script>

<template>
  <main class="container__div">
    <section class="container__form">
    </section>
    <section v-if="company">
      <div class="profile-container">
      <!-- perfil empresa-->
        <div class="profile-header">
          <img :src="company.user['avatar_url']" alt="Avatar de la empresa" class="avatar">
          <div class="profile-info">
            <h1>{{ company.user['name'] }}</h1>
            <p>{{ company.user['description'] }}</p>
            <p>{{ company.user['phone'] }}</p>
            <p>{{ company.user['address'] }}</p>
            <p class="github-link">{{company.user['email']}}</p>
<!--        <a :href="company.user['email']" target="#" @click="" class="github-link">{{company.user['email']}}</a>-->
          </div>
        </div>
        <!-- Vacantes de la empresa -->
        <div class="vacancies-section">
          <h2>Vacantes</h2>
          <div v-for="vacancy in company.vacancies" :key="vacancy.id" class="vacancy">
            <div class="vacancy-info">
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
      </div>
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
  color: #fff!important;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.github-link:hover {
  background-color: #555;
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
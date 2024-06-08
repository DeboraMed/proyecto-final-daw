<script setup>

import {useUserStore} from "../../stores/UserStore.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const userStore = useUserStore();

// Definir una ref para almacenar la Experiencia Laboral
let experiences = ref([]);

// Función para obtener los Experiencia Laboral del usuario
const fetchExperiences = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const response = await axios.get('/api/v1/experiences/',config);
    experiences.value = response.data.experiences;
  } catch (error) {
    console.error('Error al recuperar los proyectos:', error);
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchExperiences();
});

</script>

<template>
  <section v-if="experiences">
    <h2>Experiencia Laboral</h2>
    <div class="experience-section">
      <div v-for="experience in experiences" :key="experience.id" class="experience">
        <div class="experience-info">
          <div class="experience-header">
            <h2>{{experience.level}} en <i>{{experience.company_name}}</i></h2>
            <p class="experience-date">{{experience.start_date_formatted}} - {{experience.end_date_formatted}}</p>
          </div>
          <p>{{experience.description}}</p>
          <p><strong>Tecnologías:</strong>
            <span v-for="technology in experience.technologies" :key="technology.name" class="experience-info-tecnologias">
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

.experience-section {
  margin-top: 20px;
  text-align: left;
}

.experience-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.experience {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}

.experience-info {
  flex: 1;
  text-align: left;
}

.experience-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.experience-info p {
  margin: 0 0 5px;
  color: #666;
}

.experience-info strong {
  color: #333;
}

.experience-info-tecnologias {
  background-color: #c0c0c0;
  border-radius: 30px;
  padding: 5px 10px;
  margin: 5px;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.experience-date {
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  color: #666;
  text-align: right;
}
</style>
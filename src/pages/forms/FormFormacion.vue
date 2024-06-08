<script setup>

import {useUserStore} from "../../stores/UserStore.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const userStore = useUserStore();

// Definir una ref para almacenar la Formacion
let educations = ref([]);

// Función para obtener  la Formacion del usuario
const fetchEducation = async () => {
  const config = {
    headers: {Authorization: `Bearer ${userStore.token}`}
  };
  try {
    const response = await axios.get('/api/v1/education/',config);
    educations.value = response.data.education;
  } catch (error) {
    console.error('Error al recuperar los proyectos:', error);
  }
};

// Usar el hook onMounted para llamar a la función cuando el componente se monte
onMounted(() => {
  fetchEducation();
});

</script>

<template>
  <section v-if="educations">
    <h2>Formación Académica</h2>
    <div class="education-section">
      <div v-for="education in educations" :key="education.id" class="education">
        <div class="education-info">
          <div class="education-header">
            <h2>{{education.institution}}</h2>
            <p class="education-dates">{{education.completion_date_formatted}}</p>
          </div>
          <p>{{education.academic_level}} en <i>{{education.qualification}}</i></p>
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

.education-section {
  margin-top: 20px;
  text-align: left;
}

.education-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.education {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}

.education-info {
  flex: 1;
  text-align: left;
}

.education-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.education-info p {
  margin: 0 0 5px;
  color: #666;
}

.education-info strong {
  color: #333;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.education-dates {
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  color: #666;
  text-align: right;
}
</style>
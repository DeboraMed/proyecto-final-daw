<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

let developers = ref([]);

const fetchDevelopers = async () => {
  try {
    const response = await axios.get('/api/v1/developer/random');
    developers.value = response.data.developers.data;
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
    <div class="home__title">“Exhibe tu talento, expande tus horizontes”</div>
    <div class="home__subtitle">Descubre a los mejores Desarrolladores en TalentCode</div>
    <section>
      <router-link to="/empleo" custom v-slot="{ navigate }">
        <button class="home__button" @click="navigate" role="link">Oportunidades Laborales</button>
      </router-link>
      <router-link to="/recluta" custom v-slot="{ navigate }">
        <button class="home__button" @click="navigate" role="link">Contratar a un desarrollador</button>
      </router-link>
    </section>
    <section class="home__carousel">
      <div class="slider">
        <div class="slide-track">
          <div v-for="developer in developers" :key="developer.id">
            <div class="slide">
              <router-link :to="'/portfolio/' + developer.id"><img :src="developer.user['avatar_url']"
                                                                   alt="Avatar del desarrollador">
                <p>{{ developer.user.name }}</p></router-link>
            </div>
          </div>
        </div>
      </div>

    </section>
  </main>
</template>

<style lang="scss">
/*Comment Ctrl + Alt + (number /)*/
.home__title {
  display: inline-flex;
  padding-top: 4rem;
  font-size: 4rem;
  flex-wrap: nowrap;
  font-weight: bolder;
}

.home__subtitle {
  padding-top: 2rem;
  font-size: x-large;
}

.home__button {
  padding: 1rem 2rem;
  margin: 2rem 2rem;
}

.home__carousel {
  display: flex;
  width: 100%;
  padding-top: 4rem;
}

@mixin white-gradient {
  background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
}

$animationSpeed: 40s;

/* Animation */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 5))
  }
}

/* Styling */
.slider {
  background: var(--bg-color-clear);
  height: 300px;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100%;

  /*estilo del degradado*/
  &::before,
  &::after {
    @include white-gradient;
    content: "";
    height: 100%;
    position: absolute;
    width: 200px;
    z-index: 2;
  }

  &::after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }

  &::before {
    left: 0;
    top: 0;
  }

  .slide-track {
    animation: scroll $animationSpeed linear infinite;
    display: flex;
    width: calc(250px * 21);
    height: auto;
  }

  .slide {
    height: 100px;
    width: 250px;
  }

  .slide img {
    height: 250px;
    width: 250px;
  }
}
</style>
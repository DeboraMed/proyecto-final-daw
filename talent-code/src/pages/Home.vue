<script setup>

</script>

<template>
  <main  class="container__div">
    <div class="home__title">“Exhibe tu talento, expande tus horizontes”</div>
    <div class="home__subtitle">Descubre a los mejores Desarrolladores en TalentCode </div>
    <section>
      <button class="home__button">Oportunidades Laborales</button>
      <button class="home__button">Contratar a un desarrollador</button>
    </section>
    <section class="home__carousel">
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil.png" alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil2.png"  alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil3.png"  alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil.png" alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil2.png"  alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil3.png"  alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil3.png"  alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil3.png"  alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil3.png"  alt="" />
          </div>
          <div class="slide">
            <img src="../assets/perfiles/ejemploDePerfil3.png"  alt="" />
          </div>
        </div>
      </div>

    </section>
  </main>
</template>

<style lang="scss">
/*Comment Ctrl + Alt + (number /)*/
.home__title{
  display: inline-flex;
  padding-top: 4rem;
  font-size: 4rem;
  flex-wrap: nowrap;
  font-weight: bolder;
}
.home__subtitle{
  padding-top: 2rem;
  font-size: x-large;
}
.home__button{
  padding: 1rem 2rem;
  margin: 2rem 2rem;
}
.home__carousel{
  display: flex;
  width: 100%;
}
/*Estilo del slide*/
/*body {
  align-items: center;
  background: #E3E3E3;
  display: flex;
  height: 100vh;
  justify-content: flex-start;
  overflow-x: hidden;
}*/

@mixin white-gradient {
  background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
}

$animationSpeed: 40s;

 /* Animation */
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-250px * 5))}
}


/* Styling */
.slider {
  background: white;
  /*sombra del slider*/
  /*box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .125);*/
  height: 300px;
  margin: auto;
  overflow:hidden;
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
</style>b
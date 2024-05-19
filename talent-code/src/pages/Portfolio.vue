<script setup>
// TODO: traer los datos de la API
</script>

<template>
  <main class="container__div">
    <section class="container__form">
    </section>
    <section>
      <div class="profile-container">
        <div class="profile-header">
          <img src="../assets/perfiles/ejemploDePerfil.png" alt="Avatar del desarrollador" class="avatar">
          <div class="profile-info">
            <h1>Nombre del Desarrollador</h1>
            <p>Descripción breve sobre el desarrollador. Puede incluir habilidades, experiencia, y objetivos
              profesionales.</p>
            <a href="https://github.com/tu-github" target="_blank" class="github-link">GitHub</a>
          </div>
        </div>
        <div class="projects-section">
          <h2>Proyectos</h2>
          <div class="project">
            <div class="project-content-image">
              <img src="../assets/logotipo-v2-negativo.svg" alt="Imagen del proyecto 1" class="project-image">
            </div>

            <div class="project-info">
              <h2>Título del Proyecto 1</h2>
              <p>Descripción breve del proyecto. Explicación de lo que hace el proyecto y su propósito. Aqui puedes
                añadir los detalles de tu proyectos, como los has realizado, cuanto tiempo te ha llevado.</p>
              <p><strong>Tecnologías:</strong>
                <span class="project-info-tecnologias">HTML</span><span class="project-info-tecnologias">CSS</span><span
                    class="project-info-tecnologias">Javascript</span></p>
            </div>
          </div>
          <div class="project">
            <div class="project-content-image">
              <img src="../assets/logotipo-v2-positivo.svg" alt="Imagen del proyecto 2" class="project-image">
            </div>
            <div class="project-info">
              <h2>Título del Proyecto 2</h2>
              <p>Descripción breve del proyecto. Explicación de lo que hace el proyecto y su propósito.</p>
              <p><strong>Tecnologías:</strong>
                <span class="project-info-tecnologias">Python</span><span class="project-info-tecnologias">Django</span>
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
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.github-link:hover {
  background-color: #555;
}

.projects-section {
  margin-top: 20px;
  text-align: left;
}

.projects-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.project {
  display: flex;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.project-content-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
}

.project-info {
  flex: 1;
  text-align: left;
}

.project-info h3 {
  margin: 0 0 10px;
  color: #333;
}

.project-info p {
  margin: 0 0 5px;
  color: #666;
}

.project-info strong {
  color: #333;
}

.project-info-tecnologias {
  background-color: #c0c0c0;
  border-radius: 30px;
  padding: 5px 10px;
  margin: 5px;
}
</style>
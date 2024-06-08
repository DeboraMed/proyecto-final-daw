<script>
export default {
  data() {
    return {
      isFooterVisible: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.checkScrollPosition);
    this.checkScrollPosition(); // Verificar la posición inicial al montar el componente
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition);
  },
  methods: {
    checkScrollPosition() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight || window.innerHeight >= document.body.offsetHeight) {
        this.isFooterVisible = true;
      } else {
        this.isFooterVisible = false;
      }
    },
  },
};
</script>

<template>
  <footer v-if="isFooterVisible" class="footer">
    <span>&copy; 2024 Talent.Code</span>
    <span><a href="/contacto">Contacto</a></span>
    <span><a href="#">Quiénes Somos</a></span>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  background-color: var(--bg-color-clear);
  text-align: center;
  padding: 10px;
  border-top: 1px solid #ccc;
  transition: background 0.5s ease, color 0.5s ease;
}

.footer span {
  margin: 0 10px;
}

.footer a {
  color: inherit;
  text-decoration: none;
}
</style>
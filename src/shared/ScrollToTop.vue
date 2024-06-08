<template>
  <div v-if="isVisible" class="scroll-to-top" @click="scrollToTop">
<!--    <font-awesome-icon :icon="['fas', 'chevron-up']" />-->
    ^
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
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
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  font-size: x-large;
  bottom: 70px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #656565;
  color: white;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s;
}

.scroll-to-top:hover {
  background-color: #555;

}
</style>
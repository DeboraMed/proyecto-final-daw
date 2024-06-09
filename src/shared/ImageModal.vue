<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  imageUrl: String
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="show" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <img :src="imageUrl" alt="Imagen a mayor resolución" class="modal-image" />
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  position: relative;
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s;
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

.modal-image {
  max-width: 80vw;
  max-height: 80vh;
}
</style>

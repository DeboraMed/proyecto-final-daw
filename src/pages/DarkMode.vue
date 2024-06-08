<script setup>
import {useThemeStore} from '../stores/ThemeStore.js';

const store = useThemeStore();
document.documentElement.setAttribute('data-theme', store.theme);
</script>

<template>
  <section>
    <input type="checkbox" class="toggle" @change="store.toggleTheme()"/>
  </section>
</template>

<style>
/* Dark Mode CSS*/
[data-theme="light"] {
  --font-color: #000000;
  --font-color-h2-pri: #ffffff;
  --font-color-h2-sec: #3b8568;

  --font-color-p-error: #c2431e;

  --a-color: #2f6c54;
  --a-color-ft: #ffffff;
  --a-color-hover: #5aad8d;

  --bt-color-1: #ffffff;
  --bt-color-1-after: #5aad8d;
  --bt-color-1-before: #2f6c54;

  --burguer-bg-color: #FFF8E8;
  --bg-color-clear: #ffffff;
  --bg-color-medium: #f9f9f9;
  --bg-color-dark: #174231;
}

[data-theme="dark"] {
  --font-color: #ffffff;
  --font-color-h2-pri: #ffffff;
  --font-color-h2-sec: #97efcd;

  --font-color-p-error: #f18465;

  --a-color: #e8e8e8;
  --a-color-hover: #5aad8d;

  --bt-color-1: #ffffff;
  --bt-color-1-after: #5aad8d;
  --bt-color-1-before: #174231;

  --burguer-bg-color: #5aad8d;
  --bg-color-clear: #262c29;
  --bg-color-medium: #737373;
  --bg-color-dark: #174231;
}

/* boton Toggle */
.toggle {
  margin-top: 1.5rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 60px;
  height: 30px;
  border-radius: 30px;
  background-color: #676767;
  position: absolute;
  transition: all 0.5s ease-in;
  cursor: pointer;
  z-index: 1;
}

.toggle::before {
  content: "";
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #5aad8d;
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  transition: all 0.5s ease-in;
}

.toggle:checked {
  background: #c5bde7;
}

.toggle:checked::before {
  background: #6c6c6c;
  left: 32px;
}
</style>
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
  --font-color-h2-pri: #4c3b9a;
  --font-color-h2-sec: #c2431e;

  --font-color-p-error: #c2431e;

  --a-color: #4c3b9a;
  --a-color-ft: #ffffff;
  --a-color-hover: #747bff;

  --bt-color-1: #ffffff;
  --bt-color-1-after: #7563c7;
  --bt-color-1-before: #4c3b9a;

  --bt-color-2: #fff;
  --bt-color-2-after: #e76c49;
  --bt-color-2-before: #C2431E;

  --burguer-bg-color: #FFF8E8;
  --bg-color-clear: #FFF8E8;
  --bg-color-medium: #FFEFC9;
  --bg-color-dark: #FCBD7A;

  --ft-bg-color-medium: #4E3D90;
  --ft-bg-color-dark: #2E2067;

}

[data-theme="dark"] {
  --font-color: #ffffff;
  --font-color-h2-pri: #ffffff;
  --font-color-h2-sec: #efce97;

  --font-color-p-error: #f18465;

  --a-color: #ffffff;
  --a-color-hover: #747bff;

  --bt-color-1: #ffffff;
  --bt-color-1-after: #e76c49;
  --bt-color-1-before: #C2431E;

  --bt-color-2: #fff;
  --bt-color-2-after: #e76c49;
  --bt-color-2-before: #C2431E;

  --burguer-bg-color: #645c81;
  --bg-color-clear: #645c81;
  --bg-color-medium: #524b6e;
  --bg-color-dark: #3F3661;

  --ft-bg-color-medium: #292147;
  --ft-bg-color-dark: #1c1634;
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
  background-color: #333;
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
  background: #efce97;
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
  background: #333;
  left: 32px;
}
</style>
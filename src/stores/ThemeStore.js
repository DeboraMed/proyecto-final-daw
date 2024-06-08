import {defineStore} from 'pinia';

export const useThemeStore = defineStore({
    id: 'theme',
    state: () => ({
        theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light', // valor por defecto
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', this.theme);
            document.documentElement.setAttribute('data-theme', this.theme);
        },
    },
});
import {defineStore} from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            this.alert = {message, type: 'alert__success'};
        },
        error(message) {
            this.alert = {message, type: 'alert__danger'};
        },
        clear() {
            this.alert = null;
        }
    }
});
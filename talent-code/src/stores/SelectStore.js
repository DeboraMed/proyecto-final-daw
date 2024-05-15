import {defineStore} from "pinia";
import axios from "axios";

export const useSelectStore = defineStore( 'select', {
    state:() => ({
        contractSelectData: JSON.parse(localStorage.getItem('contractSelectData'))
    }),
    actions: {
        async fetchSelectContractOptions() {
            if(!this.contractSelectData) {
                await axios.get('http://localhost:8000/api/v1/contract-type')
                    .then(response => {
                        this.contractSelectData = Object.entries(response.data).map(([value, label]) => ({value, label}));
                        localStorage.setItem('contractSelectData', JSON.stringify(this.contractSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
    }
})
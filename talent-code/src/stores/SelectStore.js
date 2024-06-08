import {defineStore} from "pinia";
import axios from "axios";

export const useSelectStore = defineStore( 'select', {
    state: () => ({
        contractSelectData: JSON.parse(localStorage.getItem('contractSelectData')),
        scheduleSelectData: JSON.parse(localStorage.getItem('scheduleSelectData')),
        specializationSelectData: JSON.parse(localStorage.getItem('specializationSelectData')),
        workSelectData: JSON.parse(localStorage.getItem('workSelectData')),
        academicSelectData: JSON.parse(localStorage.getItem('academicSelectData')),
        experienceSelectData: JSON.parse(localStorage.getItem('experienceSelectData')),
        technologySelectData: JSON.parse(localStorage.getItem('technologySelectData')),
        technologiesSelectData: JSON.parse(localStorage.getItem('technologiesSelectData'))
    }),
    actions: {
        async fetchSelectContractOptions() {
            if (!this.contractSelectData) {
                await axios.get('/api/v1/contract-type')
                    .then(response => {
                        this.contractSelectData = Object.entries(response.data).map(([value, label]) => ({
                            value,
                            label
                        }));
                        localStorage.setItem('contractSelectData', JSON.stringify(this.contractSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchSelectScheduleOptions() {
            if (!this.scheduleSelectData) {
                await axios.get('/api/v1/schedule')
                    .then(response => {
                        this.scheduleSelectData = Object.entries(response.data).map(([value, label]) => ({
                            value,
                            label
                        }));
                        localStorage.setItem('scheduleSelectData', JSON.stringify(this.scheduleSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchSelectSpecializationOptions() {
            if (!this.specializationSelectData) {
                await axios.get('/api/v1/specialization')
                    .then(response => {
                        this.specializationSelectData = Object.entries(response.data).map(([value, label]) => ({
                            value,
                            label
                        }));
                        localStorage.setItem('specializationSelectData', JSON.stringify(this.specializationSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchSelectWorkOptions() {
            if (!this.workSelectData) {
                await axios.get('/api/v1/work-mode')
                    .then(response => {
                        this.workSelectData = Object.entries(response.data).map(([value, label]) => ({value, label}));
                        localStorage.setItem('workSelectData', JSON.stringify(this.workSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchSelectAcademicOptions() {
            if (!this.academicSelectData) {
                await axios.get('/api/v1/academic-level')
                    .then(response => {
                        this.academicSelectData = Object.entries(response.data).map(([value, label]) => ({
                            value,
                            label
                        }));
                        localStorage.setItem('academicSelectData', JSON.stringify(this.academicSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchSelectExperienceOptions() {
            if (!this.experienceSelectData) {
                await axios.get('/api/v1/experience-level')
                    .then(response => {
                        this.experienceSelectData = Object.entries(response.data).map(([value, label]) => ({
                            value,
                            label
                        }));
                        localStorage.setItem('experienceSelectData', JSON.stringify(this.experienceSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchSelectTechnologyTypeOptions() {
            if (!this.technologySelectData) {
                await axios.get('/api/v1/technology-type')
                    .then(response => {
                        this.technologySelectData = Object.entries(response.data).map(([value, label]) => ({
                            value,
                            label
                        }));
                        localStorage.setItem('technologySelectData', JSON.stringify(this.technologySelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchSelectTechnologiesOptions() {
            if (!this.technologiesSelectData) {
                await axios.get('/api/v1/technologies')
                    .then(response => {
                        this.technologiesSelectData = response.data.technologies.map((tech, index) => ({
                            value: tech.name,
                            label: `${tech.name} (${tech.type})`
                        }));
                        localStorage.setItem('technologiesSelectData', JSON.stringify(this.technologiesSelectData));
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            }
        },
        async fetchAllSelectOptionsEnums() {
            await this.fetchSelectContractOptions();
            await this.fetchSelectScheduleOptions();
            await this.fetchSelectSpecializationOptions();
            await this.fetchSelectWorkOptions();
            await this.fetchSelectAcademicOptions();
            await this.fetchSelectExperienceOptions();
            await this.fetchSelectTechnologyTypeOptions();
            await this.fetchSelectTechnologiesOptions();
        },
    }
})
import {defineStore} from "pinia";
import axios from "axios";
import router from "../router/router.js"
import {useAlertStore} from "./AlertStore.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token'),
        user_type: localStorage.getItem('user_type'),
        userData: []
    }),
    actions: {
        isLogged() {
            return this.token !== null
        },
        userType() {
            if (this.user_type !== null)
                return this.user_type
        },
        register(user) {
            const alertStore = useAlertStore();
            let json = {
                'name': user.name,
                'email': user.email,
                'password': user.password,
                'user_type': user.user_type,
                'description': user.description,
                'phone': user.phone,
                'address': user.address,
                'avatar': user.avatar,
            };
            axios.post('/api/v1/register', json)
                .then(data => {
                    if (data.statusText === "Created") {
                        console.log('Se ha registrado correctamente');
                        alertStore.success('Se ha registrado correctamente.');

                        // loguea directamente al usuario
                        this.login(user.email, user.password)
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud: ', error);
                    alertStore.error('Error en la solicitud: Email ya registrado.');
                });
        },
        editProfile(user) {
            const alertStore = useAlertStore();
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            let json = {
                'name': user.name,
                'email': user.email,
                'password': user.password,
                'user_type': user.user_type,
                'description': user.description,
                'phone': user.phone,
                'address': user.address,
                'avatar': user.avatar,
                "userable": {
                    'contract_type': user.contract_type,
                    'work_mode': user.work_mode,
                    'schedule': user.schedule,
                    'specialization': user.specialization,
                    'github_url': user.github_url,
                },
            };
            axios.put('/api/v1/user', json, config)
                .then(async data => {
                    console.log(data.statusText)
                    if (data.statusText === "OK") {
                        console.log('Se ha editado la información correctamente');
                        alertStore.success('Se ha editado la información correctamente.');
                        // me traigo el usuario de nuevo
                        await this.fetchUser()
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud: ', error);
                    alertStore.error('Error en la solicitud.');
                });
        },
        login(email, password) {
            const alertStore = useAlertStore();
            let json = {
                'email': email,
                'password': password,
            };
            axios.post('/api/v1/login', json)
                .then(data => {
                    console.log(data.statusText)
                    console.log(data.data)
                    if (data.statusText === "OK") {
                        // saca el token de la llamada??
                        this.token = data.data.token;
                        this.user_type = data.data.user_type
                        // guarda el token en el localstorage
                        localStorage.setItem('token', this.token);
                        localStorage.setItem('user_type', this.user_type)
                        alertStore.success('Se ha logueado correctamente.');
                        console.log('Se ha logueado correctamente.', this.token);
                        // redirigir al perfil
                        router.push({path: '/perfil'})
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Usuario o contraseña incorrectos.');
                });
        },
        async fetchUser() {
            const alertStore = useAlertStore();
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            await axios.get('/api/v1/user', config)
                .then(data => {
                    console.log(data, data.data)
                    if (data.statusText === "OK") {
                        this.userData = data.data.user
                        alertStore.success('Solicitud procesada correctamente.');
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Error en la solicitud.');
                });
        },
        logout() {
            const alertStore = useAlertStore();
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            axios.get('/api/v1/logout', config)
                .then(data => {
                    console.log(data.statusText)
                    if (data.statusText === "OK") {
                        alertStore.success('Ha cerrado sesión correctamente.');
                        this.token = null;
                        // borra el token del localstorage
                        localStorage.removeItem('token');
                        // redirige al inicio
                        router.push({path: '/'})
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Error en la solicitud.');
                });
        },
    }
})
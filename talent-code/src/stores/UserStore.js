import {defineStore} from "pinia";
import axios from "axios";
import router from "../router/router.js"
import {useAlertStore} from "./AlertStore.js";

export const useUserStore = defineStore( 'user', {
    state:() => ({
        token: localStorage.getItem('token'),
        userData: []
    }),
    actions: {
        isLogged(){
            return this.token !== null
        },
        register(user){
            const alertStore = useAlertStore();
            let json = {
                'name': user.name,
                'email':user.email,
                'password': user.password,
                'user_type': user.user_type,
                'description': user.description,
                'phone': user.phone,
                'address': user.address,
                'avatar': user.avatar,
                /*'contract_type': developer.contract_type,
                'work_mode': developer.work_mode,
                'schedule':developer.schedule,
                'specialization': developer.specialization,
                'github_url':developer.github_url,*/
            };
            axios.post('/api/v1/register',json)
                .then(data => {
                    if (data.statusText === "Created") {
                        console.log('Se ha registrado correctamente');
                        alertStore.success('Se ha registrado correctamente.');

                        // loguea directamente al usuario
                        this.login(user.email,user.password)
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud: ', error);
                    alertStore.error('Error en la solicitud: Email ya registrado.');
                });
        },
        login(email,password) {
            const alertStore = useAlertStore();
            let json = {
                'email': email,
                'password': password,
            };
            axios.post('/api/v1/login', json)
                .then(data => {
                    console.log(data.statusText)
                    console.log(json)
                    if (data.statusText === "OK") {
                        // saca el token de la llamada??
                        this.token = data.data.token;
                        // guarda el token en el localstorage
                        localStorage.setItem('token', this.token);
                        alertStore.success('Se ha logueado correctamente.');
                        console.log('Se ha logueado correctamente.',this.token);
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
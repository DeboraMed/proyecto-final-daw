import {defineStore} from "pinia";
import axios from "axios";
import router from "../router/router.js"

export const useUserStore = defineStore( 'user', {
    state:() => ({
        token: localStorage.getItem('token'),
        userData: []
    }),
    actions: {
        isLogged(){
            return this.token !== null
        },
        register(developer){
            let json = {
                'name': developer.name,
                'email':developer.email,
                'password': developer.password,
                'user_type': developer.user_type,
                'description': developer.description,
                'phone': developer.phone,
                'address': developer.address,
                'avatar': developer.avatar,
                /*'contract_type': developer.contract_type,
                'work_mode': developer.work_mode,
                'schedule':developer.schedule,
                'specialization': developer.specialization,
                'github_url':developer.github_url,*/
            };
            axios.post('http://localhost:8000/api/v1/register',json)
                .then(data => {
                    if (data.statusText === "OK") {
                        console.log('Se ha registrado correctamente');
                        // redirige al login
                        router.push(({path: '/login'}))
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud: ', error);
                });

        },
        login(email,password) {
            let json = {
                'email': email,
                'password': password,
            };
            axios.post('http://localhost:8000/api/v1/login', json)
                .then(data => {
                    console.log(json)
                    if (data.statusText === "OK") {
                        // saca el token de la llamada??
                        this.token = data.data.token;
                        // guarda el token en el localstorage
                        localStorage.setItem('token', this.token);
                        console.log('Se ha logueado correctamente.',this.token);
                        // redirigir al perfil
                        router.push({path: '/perfil'})
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },
        async fetchUser() {
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            await axios.get('http://localhost:8000/api/v1/user', config)
                .then(data => {
                    console.log(data, data.data)
                    if (data.statusText === "OK") {
                        this.userData = data.data.user
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },
        logout() {
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            axios.get('http://localhost:8000/api/v1/logout', config)
                .then(data => {
                    console.log(data.statusText)
                    if (data.statusText === "OK") {
                        this.token = null;
                        // borra el token del localstorage
                        localStorage.removeItem('token');
                        // redirige al inicio
                        router.push({path: '/'})
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },


    }
})
import {defineStore} from "pinia";
import axios from "axios";
import router from "../router/router.js"

export const useUserStore = defineStore( 'user', {
    state:() => ({
        //token: localStorage.getItem('token'),
        token: '6|qwncmNVuom8VtqMrgzFTxv5wvxJLdLJrPoyg3mJHeb8944ab',
        userData: ['User Test',]
    }),
    actions: {
        /*isLogged(){
            return this.token !== null
        },*/
        register(name,email,password,user_type,description,phone,address,avatar,contract_type,work_mode,schedule,specialization,github_url){
            let json = {
                'name': name,
                'password': password,
                'user_type': user_type,
                'description': description,
                'phone': phone,
                'address': address,
                'avatar': avatar,
                'contract_type': contract_type,
                'work_mode': work_mode,
                'schedule':schedule,
                'specialization': specialization,
                'github_url':github_url,
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
                        console.log('Se ha logueado correctamente.');
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
                    if (data.statusText === "OK") {
                        //this.userData = data.data
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
                    if (data.statusText === "OK") {
                        this.token = null;
                        // borra el token del localstorage
                        // localStorage.removeItem('token');

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
import {useUserStore} from '../stores/UserStore.js';

const authGuard = (to, from, next) => {
    const userStore = useUserStore();

    if (userStore.isLogged()) {
        next(); // permite el acceso si el usuario esta logueado
    } else {
        next('/login'); // sino, redirige al login
    }
};

export default authGuard;
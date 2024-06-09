import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Home from "../pages/Home.vue";
import authGuard from "./guard.js";
import {useUserStore} from "../stores/UserStore.js";

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                component: () => import('../pages/HomeSection.vue')
            }
        ]
    },
    {
        path: '/encuentra',
        component: () => import('../pages/Encuentra.vue')
    },
    {
        path: '/inspiracion',
        component: () => import('../pages/Inspiracion.vue')
    },
    {
        path: '/empleo',
        component: () => import('../pages/Empleo.vue')
    },
    {
        path: '/recluta',
        component: () => import('../pages/Recluta.vue'),
        beforeEnter: authGuard
    },
    {
        path: '/portfolio/:id?',
        component: () => import('../pages/Portfolio.vue'),
        beforeEnter: authGuard
    },
    {
        path: '/empresa/:id',
        component: () => import('../pages/Empresa.vue')
    },
    {
        path: '/login',
        component: () => import('../pages/Login.vue')
    },
    {
        path: '/registro',
        component: () => import('../pages/Registro.vue')
    },
    {
        path: '/perfil',
        component: () => import('../pages/Perfil.vue'),
        beforeEnter: authGuard
    },
    {
        path: '/match',
        component: () => import('../pages/Match.vue'),
        beforeEnter: authGuard
    },
    {
        path: '/contacto',
        component: () => import('../pages/Contacto.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/404.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// guard global
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (userStore.isLogged()) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
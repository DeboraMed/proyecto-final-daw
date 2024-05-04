import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
    {   /*rutas anidadas*/
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                component: () => import('../pages/HomeSection.vue')
            }
        ]
    },
    {   /*lazy loading*/
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
        component: () => import('../pages/Recluta.vue')
    },
    {
        path: '/portfolio',
        component: () => import('../pages/Portfolio.vue')
    },
    {
        path: '/login',
        component: () => import('../pages/Login.vue')
    },   {
        path: '/registro',
        component: () => import('../pages/Registro.vue')
    },
    {
        path: '/perfil',
        component: () => import('../pages/Perfil.vue')
    },
    {
        path: '/:pathMach(.*)*',
        component: () => import('../pages/404.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
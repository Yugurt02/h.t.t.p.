import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Info',
        component: () => import('@/components/Info.vue')
    },
    {
        path: '/post',
        name: 'Post',
        component: () => import('@/components/Post1.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/Login.vue')
    },
    {
        path: '/forum',
        name: 'Forum',
        component: () => import('@/components/Forum.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
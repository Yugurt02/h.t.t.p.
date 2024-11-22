import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Info',
        component: () => import('@/components/Info.vue')
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
    {
        path: '/forum/post1',
        name: 'Post1',
        component: () => import('@/components/Post1.vue')
    },
    {
        path: '/forum/post2',
        name: 'Post2',
        component: () => import('@/components/Post2.vue')
    },
    {
        path: '/forum/post3',
        name: 'Post3',
        component: () => import('@/components/Post3.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
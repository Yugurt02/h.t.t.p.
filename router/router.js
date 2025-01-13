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
        path: '/list',
        name: 'List',
        component: () => import('@/components/TopicList.vue')
    },
    {
        path: '/msg',
        name: 'Msg',
        component: () => import('@/components/MessageBoard.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
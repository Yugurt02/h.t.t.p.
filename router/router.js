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
        component: () => import('@/components/Post.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
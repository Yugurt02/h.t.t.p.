import {createRouter, createWebHashHistory} from 'vue-router'

import Post from "@/components/Post.vue";

const routes = [
    {path: '/post', component: Post},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
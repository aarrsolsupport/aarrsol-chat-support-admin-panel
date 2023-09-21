import { createRouter, createWebHistory } from 'vue-router'


const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('@/components/auth/LoginComponent.vue')
        },

        {
            path: '/',
            component: () => import('@/components/DashboardComponent.vue')
        },
        {
            path: '/chat-flow',
            component: () => import('@/components/chat-flow/ListComponent.vue')
        },
        {
            path: '/operators',
            component: () => import('@/components/operators/ListComponent.vue')
        },
        {
            path: '/tickets',
            component: () => import('@/components/tickets/ListComponent.vue')
        },
    ],
})

export default routes

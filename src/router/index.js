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
            props: true,
            path: '/operator-details/:item_id',
            component: () => import('@/components/operators/DetailComponent.vue')
        },
        {
            path: '/tickets',
            component: () => import('@/components/tickets/ListComponent.vue')
        },
        {
            path: '/whitelable',
            component: () => import('@/components/whitelables/ListComponent.vue')
        },
        {
            props: true,
            path: '/whitelable-details/:item_id',
            component: () => import('@/components/whitelables/DetailComponent.vue')
        },
        {
            path: '/agents',
            component: () => import('@/components/agents/ListComponent.vue')
        },
        {
            props: true,
            path: '/agent-details/:item_id',
            component: () => import('@/components/agents/DetailComponent.vue')
        },
        {
            path: '/chats',
            component: () => import('@/components/chats/ListComponent.vue')
        },
        {
            path: '/chat-requests',
            component: () => import('@/components/chatrequests/ListComponent.vue')
        },
        {
            path: '/auto-suggestions',
            component: () => import('@/components/autosuggestion/ListComponent.vue')
        },
        {
            path: '/theme-settings',
            component: () => import('@/components/themesetting/ListComponent.vue')
        },

        {
            path: '/support-chat/:ref_id/:user_ip/:user_id?',
            name: 'support-chat',
            component: () => import('@/components/EndUserChatComponent.vue')
        },
    ],
})

export default routes

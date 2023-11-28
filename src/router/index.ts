import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue'),
        },
        {
            path: '/layouts',
            name: 'layouts',
            component: () => import('@/views/LayoutsView.vue'),
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/DashboardView.vue'),
                }
            ]
        }

    ]
});


export default router;
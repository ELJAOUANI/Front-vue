import { createRouter, createWebHistory } from 'vue-router'

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
          component: () => import('@/views/DashboardView.vue')
        },
        {
          path: '/techniciens',
          name: 'techniciens',
          component: () => import('@/views/techniciens/Techniciens.vue')
        },
        {
          path: '/articles',
          name: 'articles',
          component: () => import('@/views/Article/Article.vue')
        },
        {
          path: '/rapports',
          name: 'rapports',
          component: () => import('@/views/rapport/Rapport.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  console.log(token);

  if (token) {
    // If the user is authenticated (has a token)
    if (to.path === '/login') {
      // If trying to access the login page, redirect to the dashboard
      router.replace('/dashboard');
      return;
    } else {
      // Proceed to the requested route
      next();
    }
  } else {
    // If the user is not authenticated
    if (to.path !== '/login') {
      // If trying to access a page other than login, redirect to login
      router.replace('/login');
      return;
    } else {
      // Proceed to the login page
      next();
    }
  }

  // If the flow reaches here, ensure to call next() to allow navigation
  next();
});
export default router

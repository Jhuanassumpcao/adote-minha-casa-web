import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Requirement from '../views/RequirementView.vue'
import Search from '../views/SearchView.vue'
import Donation from '../views/DonationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/requirement',
      name: 'requirement',
      component: Requirement,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/page/:id',
      name: 'Page',
      component: Donation
    }
  ]
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const tokenExists = localStorage.getItem('TOKEN_KEY');

  if (requiresAuth && !tokenExists) {
    next('/login');
  }
  else {
    next();
  }
});

export default router

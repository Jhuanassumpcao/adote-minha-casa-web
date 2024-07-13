import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Requirement from '../views/RequirementView.vue'
import Search from '../views/SearchView.vue'
import Donation from '../views/DonationView.vue'
import UserProfile from '../views/ProfileView.vue'

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
      path: '/page/:id',
      name: 'Page',
      component: Donation
    },
    {
      path: '/profile',
      name: 'Profile',
      component: UserProfile
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

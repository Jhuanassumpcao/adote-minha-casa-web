
<template>
  <header class="text-white">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <div class="logo-container mb-3 mb-md-0">
          <Logo />
        </div>
        <button
          class="navbar-toggler custom-toggler"
          type="button"
          @click="toggleCollapse"
          aria-controls="navbarNav"
          aria-expanded="!isCollapsed"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="['collapse', 'navbar-collapse', { show: !isCollapsed }]" id="navbarNav">
          <ul class="navbar-nav">
            <li v-for="(link) in links" :key="link.name" class="nav-item">
              <router-link
                class="nav-link text-white btn light-button"
                v-if="link.condition"
                :to="link.path"
                @click="link.action"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'Header',
  data() {
    return {
      isCollapsed: true,
      active: 0,
      links: [
        { name: 'Home', path: '/', condition: true },
        { name: 'Quero Doar', path: '/search', condition: true },
        { name: 'Preciso de Ajuda', path: '/requirement', condition: this.loggedUser() },
        { name: 'Entre ou Cadastre-se', path: '/login', condition: !this.loggedUser() },
        { name: 'Sair', path: '/', condition: this.loggedUser(), action: this.logOut }
      ]
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    logOut() {
      localStorage.removeItem('TOKEN_KEY');
      this.$router.go(0);
    },
    loggedUser() {
      return localStorage.getItem('TOKEN_KEY') != null;
    }
  },
  components: {
    Logo
  }
}
</script>

<style scoped>
header {
  background-color: var(--deep-blue);
}

a {
  color: white;
  font-size: 1.2rem;
  margin-left: 20px;
}

.navbar-toggler {
  border-color: white; 
}

.navbar-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' linecap='round' linejoin='round' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
      justify-content: end;
  }
}

@media (max-width: 768px) {
  .navbar {
    justify-content: center;
  }
}

@media (min-width: 530px) and (max-width: 1000px) {
  .navbar-nav {
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    flex-direction: row;
  }

  .nav-item {
    display: inline-block;
    margin: 0 10px 14px; 
  }
}
@media (max-width: 530px) {

  .nav-item {
    display: inline-block;
    margin: 0 10px 14px; 
  }
}
</style>

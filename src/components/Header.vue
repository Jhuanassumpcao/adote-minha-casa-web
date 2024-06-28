<!-- Header.vue -->
<template>
  <header class="text-white">
    <div class="container d-flex justify-content-between align-items-center py-3">
      <div>
        <Logo />
      </div>
      <nav class="navbar navbar-expand navbar-light wrap">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-wrap gap-3">

            <li v-for="(link) in links" key="link.name" class="nav-item">

              <router-link class="nav-link text-white btn light-button"
                v-if="link.condition"
                :to="link.path" 
                @click="link.action"
                >
                  {{ link.name }}
              </router-link>

            </li>

          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'Header',
  data() {
    return {
      active: 0,
      links: [
        { name: 'Home', path: '/', condition: true },
        { name: 'Quero Doar', path: '/search', condition: true },
        { name: 'Preciso de Ajuda', path: '/requirement', condition: this.loggedUser() },
        { name: 'Entre ou Cadastre-se', path: '/login', condition: !this.loggedUser() },
        { name: 'Sair', path: '/', condition: this.loggedUser(), action: this.logOut}
      ]
    };
  },
  methods: {
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

a{
  color: white;
  font-size: 1.2rem;
  margin-left: 20px;
}
</style>

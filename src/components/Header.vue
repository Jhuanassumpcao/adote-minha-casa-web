<template>
  <header class="deep-blue text-white">
    <v-container>
      <v-row align="center" justify="space-between" no-gutters>
        <v-col
          cols="12"
          md="auto"
          class="d-flex justify-center justify-md-start"
        >
          <Logo />
        </v-col>
        <v-col 
          cols="12" md="auto"
          >
          <v-row no-gutters class="d-flex justify-center">
            <v-col
              v-for="(link, index) in filteredLinks"
              :key="index"
              cols="auto"
              class="d-flex justify-center"
            >
              <router-link :to="link.path" @click="link.action" class="router-link">
                <v-btn class="mx-2 my-2" outlined text>{{ link.name }}</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>
<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'Header',
  components: {
    Logo
  },
  data() {
    return {
      links: [
        { name: 'Home', path: '/', condition: () => true },
        { name: 'Quero Doar', path: '/search', condition: () => true },
        { name: 'Preciso de Ajuda', path: '/requirement', condition: this.loggedUser },
        { name: 'Entre ou Cadastre-se', path: '/login', condition: () => !this.loggedUser() },
        { name: 'Sair', path: '/', condition: this.loggedUser, action: this.logOut }
      ]
    };
  },
  computed: {
    filteredLinks() {
      return this.links.filter(link => link.condition());
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('TOKEN_KEY');
      this.$router.go(0);
    },
    loggedUser() {
      return localStorage.getItem('TOKEN_KEY') != null;
    }
  }
};
</script>

<style scoped>
.deep-blue {
  background-color: var(--deep-blue) !important;
}
.router-link {
  text-decoration: none;
}
.v-btn {
  color: white !important;
  background-color: transparent !important;
  font-size: 1.2rem;
}
.logo {
  max-height: 70px;
  display: flex;
  align-items: center;
}
</style>

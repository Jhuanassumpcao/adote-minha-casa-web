<!-- Header.vue -->
<template>
  <header class="text-white">
    <div class="container d-flex justify-content-between align-items-center py-3">
      <div>
        <router-link to="/" class="d-flex flex-column align-items-center" 
                    style="text-decoration: none; margin-right:50px;">
          <img :src="logo" alt="Logo" class="img-fluid mb-3" style="max-width:80px; max-height: 80px;">
          <p class="text-center">Adote Minha Casa</p>
        </router-link>
      </div>
      <nav class="navbar navbar-expand navbar-light wrap">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-wrap gap-3">
            <li class="nav-item">
              <router-link class="nav-link text-white btn light-button" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white btn light-button" to="/search">Quero Doar</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white btn light-button" to="/requirement">Preciso de Ajuda</router-link>
            </li>
            <li v-if="notloggedUser" class="nav-item">
              <router-link class="nav-link text-white btn light-button" to="/login">Entre ou Cadastre-se</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import logo from '@/assets/lar.png'

export default {
  name: 'Header',
  data() {
    return {
      logo: logo,
      notloggedUser: false
    };
  },
  mounted() {
    const tokenExists = localStorage.getItem('TOKEN_KEY');
    this.notloggedUser = !tokenExists;
  },
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

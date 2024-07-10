<template>
    <router-link to="/" class="d-flex flex-column align-center text-decoration-none">
      <img :src="logo" alt="Logo" class="img-fluid mb-3" style="max-width: 80px; max-height: 80px;">
      <p class="text-center text-white">Adote Minha Casa</p>
    </router-link>
  </template>
  
  <script>
  import logo from '@/assets/lar.png';
  
  export default {
    name: 'Logo',
    data() {
      return {
        logo: logo
      };
    }
  };
  </script>
  
  <style scoped>
  .text-decoration-none {
    text-decoration: none;
  }
  .mr-6 {
    margin-right: 50px;
  }
  </style>
  
<template>
    <router-link to="/" class="d-flex flex-column align-items-center" 
        style="text-decoration: none; margin-right:50px;">
    <img :src="logo" alt="Logo" class="img-fluid mb-3" style="max-width:80px; max-height: 80px;">
    <p class="text-center">Adote Minha Casa</p>
    </router-link>
</template>

<script>
import logo from '@/assets/lar.png'

export default {
    name: 'Logo',
    data() {
        return {
            logo: logo
        };
    }
}

</script>
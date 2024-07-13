<template>
  <v-container class="py-5">
    <v-card class="pa-4">
      <v-card-title class="headline mb-4">Perfil do Usuário</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-subheader class="subheader"> <v-icon left>mdi-account</v-icon>Name </v-subheader>
            <p class="description">{{ user.name }}</p>
          </v-col>
          <v-col cols="12">
            <v-subheader class="subheader"> <v-icon left>mdi-email</v-icon>Email </v-subheader>
            <p class="contact">{{ user.email }}</p>
          </v-col>
          <v-col cols="12" v-if="user.phone">
            <v-subheader class="subheader"> <v-icon left>mdi-phone</v-icon>Phone </v-subheader>
            <p class="contact">{{ user.phone }}</p>
          </v-col>
          <v-col cols="12" v-if="user.city">
            <v-subheader class="subheader">
              <v-icon left>mdi-map-marker</v-icon>City
            </v-subheader>
            <p class="address">{{ user.city }}</p>
          </v-col>
          <v-col cols="12" v-if="user.state">
            <v-subheader class="subheader">
              <v-icon left>mdi-map-marker</v-icon>State
            </v-subheader>
            <p class="address">{{ user.state }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
  
  <script>
  import api from '@/services/api.js'
  
  export default {
    name: 'Profile',
    data() {
      return {
        user: {
          name: '',
          email: '',
          phone: '',
          city: '',
          state: '',
          phone: '',
          createdAt: ''
        }
      }
    },
    async created() {
      try {
        const { data } = await api.get('/recipients/me', { withCredentials: true })
        this.user = data
      } catch (error) {
        console.error('Erro ao obter dados do usuário', error)
      }
    }
  }
  </script>
  
  <style scoped>
  .subheader {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .description,
  .contact,
  .address {
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
  </style>
  
<template>
  <v-container class="py-5">
    <v-card class="pa-4">
      <v-card-title class="headline mb-4">Perfil do Usuário
        <div class="text-end">
          <v-btn 
          v-if="!isEditing" 
          color="primary" 
          @click="isEditing = true">
          Editar
        </v-btn>
    
        </div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-subheader class="subheader"> <v-icon left>mdi-account</v-icon>Name </v-subheader>
            <v-text-field 
              v-if="isEditing" 
              v-model="user.name">
            </v-text-field>
            <p v-else class="description">{{ user.name }}</p>
          </v-col>
          <v-col cols="12">
            <v-subheader class="subheader"> <v-icon left>mdi-email</v-icon>Email </v-subheader>
            <v-text-field 
              v-if="isEditing" 
              v-model="user.email">
            </v-text-field>
            <p v-else class="contact">{{ user.email }}</p>
          </v-col>
          <v-col cols="12" v-if="user.phone">
            <v-subheader class="subheader"> <v-icon left>mdi-phone</v-icon>Phone </v-subheader>
            <v-text-field 
              v-if="isEditing" 
              v-model="user.phone">
            </v-text-field>
            <p v-else class="contact">{{ user.phone }}</p>
          </v-col>
          <v-col cols="12" v-if="user.city">
            <v-subheader class="subheader">
              <v-icon left>mdi-map-marker</v-icon>City
            </v-subheader>
            <v-text-field 
              v-if="isEditing" 
              v-model="user.city">
            </v-text-field>
            <p v-else class="address">{{ user.city }}</p>
          </v-col>
          <v-col cols="12" v-if="user.state">
            <v-subheader class="subheader">
              <v-icon left>mdi-map-marker</v-icon>State
            </v-subheader>
            <v-text-field 
              v-if="isEditing" 
              v-model="user.state">
            </v-text-field>
            <p v-else class="address">{{ user.state }}</p>
          </v-col>
        </v-row>
        <div class="text-end">
          <v-btn 
            v-if="isEditing" 
            class="mr-2"
            color="success" 
            @click="saveChanges">
            Salvar
          </v-btn>
          <v-btn 
            v-if="isEditing" 
            color="error" 
            @click="cancelChanges">
            Cancelar
          </v-btn>
        </div>
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

      },
      originalUser: {},
      isEditing: false
    }
  },
  async created() {
    try {
      const { data } = await api.get('/recipients/me', { withCredentials: true })
      this.user = data
      this.originalUser = { ...data }
    } catch (error) {
      console.error('Erro ao obter dados do usuário', error)
    }
  },
  methods: {
    async saveChanges() {
      const { data } = await api.put('/recipients/me', this.user, { withCredentials: true })
      this.originalUser = { ...this.user }
      this.isEditing = false
    },
    cancelChanges() {
      this.user = { ...this.originalUser }
      this.isEditing = false
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

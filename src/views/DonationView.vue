<template>
  <v-app>
    <Header />
    <v-container class="py-5">
      <v-card class="pa-4">
        <v-card-title class="headline mb-4">{{ title }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="mb-4">
              <v-subheader class="subheader"
                ><v-icon left>mdi-text-box-outline</v-icon>Descrição</v-subheader
              >
              <hr />
              <p class="description">{{ description }}</p>
            </v-col>
            <v-col cols="12" class="mb-4">
              <v-subheader class="subheader"
                ><v-icon left>mdi-account-box</v-icon>Contato</v-subheader
              >
              <hr />
              <p class="contact"><v-icon left>mdi-cash</v-icon> <strong>Pix:</strong> {{ pix }}</p>
              <p class="contact">
                <v-icon left>mdi-phone</v-icon> <strong>Telefone:</strong> {{ phone }}
              </p>
            </v-col>
            <v-col cols="12" class="mb-4">
              <v-subheader class="subheader"
                ><v-icon left>mdi-map-marker</v-icon>Endereço</v-subheader
              >
              <hr />
              <p class="address">
                <v-icon left>mdi-home-outline</v-icon> <strong>Rua:</strong> {{ address }}
              </p>
              <p class="address">
                <v-icon left>mdi-city</v-icon> <strong>Bairro:</strong> {{ neighborhood }}
              </p>
              <p class="address">
                <v-icon left>mdi-city-variant-outline</v-icon> <strong>Cidade:</strong> {{ city }}
              </p>
              <p class="address">
                <v-icon left>mdi-map</v-icon> <strong>Estado:</strong> {{ state }}
              </p>
              <p class="address">
                <v-icon left>mdi-mailbox-outline</v-icon> <strong>CEP:</strong> {{ cep }}
              </p>
            </v-col>
            <v-col cols="12" class="mb-4">
              <v-subheader class="subheader"
                ><v-icon left>mdi-currency-usd</v-icon>Valor Total Estimado</v-subheader
              >
              <hr />
              <p class="estimated-value">R$ {{ value }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api.js'

export default {
  name: 'DonationView',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      title: '',
      description: '',
      pix: '',
      address: '',
      city: '',
      state: '',
      value: '',
      neighborhood: '',
      cep: '',
      phoneNumber: ''
    }
  },
  async beforeMount() {
    try {
      const { data } = await api.get(`/houses/${this.$route.params.id}`)
      this.title = data.title
      this.description = data.description
      this.pix = data.pixkey
      this.address = data.address
      this.city = data.city
      this.state = data.state
      this.value = data.value
      this.neighborhood = data.bairro
      this.cep = data.cep
      this.phone = data.number
    } catch (error) {
      console.error('Erro ao obter dados das casas', error)
    }
  }
}
</script>

<style scoped>
.subheader {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>

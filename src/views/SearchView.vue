<template>
  <v-app>
    <Header />
    <!-- Navbar de filtro de pesquisa -->
    <SearchFilters />

    <!-- Conteúdo -->
    <v-container>
      <v-row>
        <Album :items="infocards" />
      </v-row>
    </v-container>

    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import InfoCard from '@/components/InfoCard.vue'
import Album from '@/components/Album.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import api from '@/services/api.js'

export default {
  name: 'SearchPage',
  components: {
    Header,
    Footer,
    InfoCard,
    Album,
    SearchFilters
  },
  data() {
    return {
      infocards: []
    }
  },
  async beforeMount() {
    try {
      const { data } = await api.get('/houses')

      this.infocards = data.map((item) => {
        return {
          component: InfoCard,
          props: {
            id: item.id.toString(),
            imageSrc: 'https://www.shutterstock.com/image-vector/house-logo-template-design-vector-600nw-741515455.jpg',
            title: item.title,
            description: item.description,
            ownerName: item.recipient.name,
            pixkey: item.pixkey
          }
        }
      })
    } catch (error) {
      console.error('Erro ao obter dados das casas', error)
    }
  }
}
</script>

<style scoped>
#section1 {
  background-image: url('../assets/cerca.jpg');
  color: white;
  background-size: cover;
}

h2 {
  font-family: 'Courier New', Courier, monospace;
  font-size: 3em;
  text-transform: uppercase;
  margin-top: 20px;
  font-weight: bold;
}
</style>

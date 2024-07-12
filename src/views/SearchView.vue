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
    <hr>
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

  watch: {
    '$route.query': 'fetchHouses'
  },
  async created() {
    await this.fetchHouses();
  },

  methods: {
    async fetchHouses() {
      try {
        const { state, city, maxValue, perPage } = this.$route.query;
        const params = { state, city, maxValue, perPage };

        const {data} = await api.get('/houses', {params: params})

        const hdata = data.data
        const meta = data.meta
        
        console.log('Dados das casas', hdata)
        console.log('Metadados das casas', meta)

        this.infocards = hdata.map((item) => {
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
}
</script>
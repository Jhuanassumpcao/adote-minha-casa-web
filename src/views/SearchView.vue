<template>
  <div>
    <Header />
    <!-- Navbar de filtro de pesquisa -->
    <SearchFilters />

    <!-- Conteúdo -->
    <Album :items=carouselSlides />

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import InfoCard from '@/components/InfoCard.vue';
import Album from '@/components/Album.vue';
import SearchFilters from '@/components/SearchFilters.vue';
import api from '@/services/api.js';

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
      carouselSlides: []
    }
  },
  async beforeMount() {
    try {
      const { data } = await api.get('/houses');
      console.log("printando casaaa", data);

      this.carouselSlides = data.map(item => {
        return {
          component: InfoCard,
          props: {
            id: item.id.toString(),
            imageSrc: item.file_url || "https://www.petz.com.br/blog/wp-content/uploads/2021/04/raca-de-cachorro-docil-2.jpg", // Use uma imagem padrão se `file_url` for null
            title: item.title,
            description: item.description,
            ownerName: "Marsio", // Ajuste conforme necessário
            pixkey: item.pixkey
          }
        }
      });
    } catch (error) {
      console.error("Erro ao obter dados das casas", error);
    }
  }

}
</script>

<style scoped>

#section1{
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
<template>
  <v-app>
    <Header />

    <v-main>
      <SearchFilters />

      <v-container>
        <v-row v-if="!loading && infocards.length > 0">
          <Album :items="infocards" />
        </v-row>

        <v-row justify="center" v-if="loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>

        <v-row justify="center" v-if="!loading && infocards.length === 0">
          <v-alert type="warning">
            Nenhuma casa encontrada.
          </v-alert>
        </v-row>

        <v-row justify="center">
          <v-pagination
            :v-model="$route.query.page"
            rounded="circle"
            :length="totalPages"
            @update:model-value="changePage"
          />
        </v-row>
      </v-container>
    </v-main>

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
      infocards: [],
      totalPages: 1,
      loading: false
    }
  },

  watch: {
    '$route.query': 'fetchHouses'
  },
  
  async created() {
    await this.fetchHouses();
  },

  methods: {
    readQuery(){
      if (!this.$route.query.page) {
        this.$router.replace({ query: { ...this.$route.query, page: 1 } });
      } 
      const { state, city, maxValue, perPage, page } = this.$route.query;

      const params = { state, city, maxValue, perPage, page };
      return params;
    },

    changePage(newPage){
      console.log('Nova página', newPage);
      this.$router.replace({ query: { ...this.$route.query, page: newPage } });
    },

    async fetchHouses() {
      this.loading = true;
      try {
        const params = this.readQuery();

        const { data } = await api.get('/houses', { params });

        if (data.length === 0) {
          this.infocards = [];
          return;
        }

        const hdata = data.data;
        const meta = data.meta;
        this.totalPages = meta.last_page;

        this.infocards = hdata.map((item) => {
          return {
            component: InfoCard,
            props: {
              house : item
            }
          }
        });
      } catch (error) {
        console.error('Erro ao obter dados das casas', error);
      }finally{
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* hide pagination numbers */
li.VuePagination__pagination-item:not(.VuePagination__pagination-item-prev-page):not(.VuePagination__pagination-item-prev-chunk):not(.VuePagination__pagination-item-next-page):not(.VuePagination__pagination-item-next-chunk) {
  display: none;
}
</style>
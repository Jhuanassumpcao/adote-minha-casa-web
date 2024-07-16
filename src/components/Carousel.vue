<template>
  <v-container class="py-5">
    <v-row v-if="infocards.length > 0">
      <v-col cols="12">
        <v-carousel hide-delimiters height="400px">
          <v-carousel-item
            v-for="(slide, index) in infocards"
            :key="index">

            <component
              :is="slide.component"
              v-bind="slide.props"
            />

          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <v-row justify="center" v-else-if="failed">
      <v-alert type="warning">
        Nenhuma casa encontrada.
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/api.js';
import InfoCard from './InfoCard.vue';

export default {
  name: 'Carousel',
  data() {
    return {
      infocards: [],
      loading: true,
      failed: false
    };
  },
  async created() {
    try {
      this.loading = true;
      const { data } = await api.get('/houses', { params: { perPage: 10 } });

      if (!data.data) {
        return;
      }

      this.infocards = data.data.map((item) => {
        return {
          component: InfoCard,
          props: {house : item}
        }

      
      });
      
      if (this.infocards.length === 0) {
        this.failed = true;
      }

      this.loading = false;

    } catch (error) {
      console.error('Erro ao obter dados das casas', error)
      this.loading = false;
      this.failed = true;
    }
  }
};
</script>

<template>
  <v-container class="py-5">
    <v-row>
      <v-col cols="12">
        <div class="custom-carousel">
          <v-btn icon @click="prev">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <div class="carousel-wrapper">
            <div class="carousel-inner" :style="carouselStyle">
              <v-col
                v-for="(slide, index) in visibleInfocards"
                :key="index"
                cols="4"
              >
                <component
                  :is="slide.component"
                  v-bind="slide.props"
                />
              </v-col>
            </div>
          </div>

          <v-btn icon @click="next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-col>
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
      currentIndex: 0,
      visibleItems: 3
    };
  },
  computed: {
    visibleInfocards() {
      const start = this.currentIndex;
      const end = start + this.visibleItems;
      return this.infocards.slice(start, end);
    },
    carouselStyle() {
      return {
        transform: `translateX(-${this.currentIndex * (100 / this.visibleItems)}%)`,
        display: 'flex'
      };
    }
  },
  async beforeCreate() {
    try {
      const { data } = await api.get('/houses', { params: { perPage: 10 } });

      if (!data.data) {
        return;
      }

      this.infocards = data.data.map((item) => {
        return {
          component: InfoCard,
          props: {
            id: item.id.toString(),
            imageSrc: item.file_url || 'https://www.shutterstock.com/image-vector/house-logo-template-design-vector-600nw-741515455.jpg',
            title: item.title,
            description: item.description,
            ownerName: item.recipient.name,
            pixkey: item.pixkey
          }
        };
      });
    } catch (error) {
      console.error('Erro ao obter dados das casas', error);
    }
  },
  methods: {
    next() {
      if (this.currentIndex < this.infocards.length - this.visibleItems) {
        this.currentIndex++;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
  }
};
</script>

<style scoped>
.custom-carousel {
  display: flex;
  align-items: center;
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  display: flex;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}
</style>

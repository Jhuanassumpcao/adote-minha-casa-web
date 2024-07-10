<template>
  <v-container class="py-5">
    <v-row>
      <v-col cols="12">
        <v-carousel hide-delimiters height="400px">
          <v-carousel-item
            v-for="(slide, index) in infocards"
            :key="index"
          >
            <component
              :is="slide.component"
              v-bind="slide.props"
            />
          </v-carousel-item>
        </v-carousel>
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
      infocards: []
    };
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
};
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 95%;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--deep-blue);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.carousel-button.prev {
  left: 0;
}

.carousel-button.next {
  right: 0;
}

#carousel-3-items {
  display: flex;
  justify-content: center;
  transition: transform 0.5s;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
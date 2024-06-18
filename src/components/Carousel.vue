<template>
  <div class="carousel">
    <button class="carousel-button prev" @click="prevSlide">&laquo;</button>

    <div id="carousel-3-items" class="d-inline-flex">
    <component
        v-for="(slide, index) in visibleSlides"
        :key="index"
        :is="slide.component"
        v-bind="slide.props"
      />
    </div>
    
    <button class="carousel-button next" @click="nextSlide">&raquo;</button>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSlide: 0
    };
  },
  computed: {
    visibleSlides() {
      return [
        this.slides[this.currentSlide],
        this.slides[(this.currentSlide + 1) % this.slides.length],
        this.slides[(this.currentSlide + 2) % this.slides.length]
      ];
    }
  },
  methods: {
    prevSlide() {
      this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
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
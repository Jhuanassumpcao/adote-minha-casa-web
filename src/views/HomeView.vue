<template>
  <v-app>
    <Header />
    <v-main>

    <v-container class="py-5" id="section1">
      <v-col class="text-center">
        <h2 class="mb-4">Adote Minha Casa</h2>
        <p style="font-size: 25px">
          Unindo pessoas que precisam de ajuda com pessoas dispostas a ajudar.
        </p>
        <v-row justify="center" >
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text>Juntas, ONGs colaboram para transformar vidas e lares.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text
                >Doar utensílios domésticos e eletrônicos é uma forma de fazer a
                diferença.</v-card-text
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text
                >Cada contribuição em dinheiro nos aproxima da reforma que sonhamos.</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-container>

    <v-container class="py-5">
      <v-col class="text-center">
        <h2 class="mb-4">Comece a doar</h2>
        <Carousel/>
        <router-link to="/search">
          <v-btn class="basic-button mt-4">Ver mais</v-btn>
        </router-link>
      </v-col>
    </v-container>
    <Footer />
  </v-main>

  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import InfoCard from '@/components/InfoCard.vue'
import Carousel from '@/components/Carousel.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Header,
    Footer,
    InfoCard,
    Carousel
  }
})
</script>

<style scoped>
#section1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
    url('@/assets/casa.jpg');
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

.v-card-text {
  font-size: 20px;
}

.v-card{
  min-height: 100%;
}

.v-card {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  font-size: 20px;
}
</style>

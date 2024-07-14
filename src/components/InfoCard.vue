<template>
  <v-card class="mx-auto fixed-size d-flex flex-column p-3" max-width="344">
    <router-link :to="pagePath()" style="text-decoration:none; color: black;">
      <v-img :src="file_url || baseUrl" alt="Card image" cover></v-img>
      <v-card-title>{{ house.title }}</v-card-title>
      <v-card-text>
        <p>{{ house.description }}</p>
        <p><strong>Proprietário:</strong> {{ house.owner_name }}</p>
        <p><strong>Chave pix:</strong> {{ house.pixkey }}</p>
      </v-card-text>
    </router-link>
  </v-card>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    house: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      baseUrl: 'https://www.shutterstock.com/image-vector/house-logo-template-design-vector-600nw-741515455.jpg'
    };
  },
  methods: {
    pagePath() {
      return `/page/${this.$props.house.id}`;
    }
  }
};
</script>

<style scoped>
.fixed-size {
  width: 18rem;
  height: 24rem;
}
.mx-auto {
  margin: auto;
}
.v-img {
  object-fit: cover;
}

</style>

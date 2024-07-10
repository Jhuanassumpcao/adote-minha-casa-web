<template>
  <v-card class="mx-auto fixed-size d-flex flex-column p-3" max-width="344">
    <router-link :to="pagePath()" style="text-decoration:none; color: black;">
      <v-img :src="imageSrc" alt="Card image" cover></v-img>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <p>{{ description }}</p>
        <p><strong>Proprietário:</strong> {{ ownerName }}</p>
        <p><strong>Chave pix:</strong> {{ pixkey }}</p>
      </v-card-text>
    </router-link>
  </v-card>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    id: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    pixkey: {
      type: String,
      required: true
    }
  },
  methods: {
    accessDonatePage() {
      this.$router.push(`/page/${this.id}`);
    },
    pagePath() {
      return `/page/${this.id}`;
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

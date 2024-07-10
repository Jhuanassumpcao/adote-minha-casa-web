<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <v-row class="py-5" justify="space-between">
          <v-col cols="12" md="6">
            <RequirementForm />
          </v-col>
          <v-col cols="12" md="5" class="d-none d-md-flex flex-column justify-center align-center aside-background">
            <h2 class="text-center white--text">Conecte-se com Doadores do Brasil Inteiro</h2>
            <p class="text-center white--text">Se você precisa de ajuda, preencha o formulário</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import RequirementForm from '@/components/forms/RequirementForm.vue';

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    RequirementForm
  }
};
</script>

<style scoped>
.aside-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('@/assets/maos.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 50px;
  color: white;
}
</style>

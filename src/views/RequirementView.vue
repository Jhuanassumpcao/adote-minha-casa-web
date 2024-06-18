<template>
  <Header />
  <main class="d-flex justify-content-evenly py-5">
    <RequirementForm />
    <aside id="aside1" class="w-50 align-content-center text-white d-none d-md-block">
      <h2 class="text-center">Contecte-se com Doadores do Brasil Inteiro</h2>
      <p class="text-center">Se você precisa de ajuda, preencha o formulário</p>
    </aside>
  </main>

  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import RequirementForm from '@/components/forms/RequirementForm.vue'

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
#aside1{
  background-image: 
  linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('@/assets/maos.jpg');
  color: white;
  background-size: cover;
  background-position: center;
  border-radius: 50px;
}
</style>
<template>
  <v-app>
    <Header />
    <v-main>
      <v-container class="d-flex justify-center flex-wrap">
        <v-row>
          <v-col cols="12" md="6">
            <LoginForm />
          </v-col>
          <v-col cols="12" md="6">
            <SignUpForm />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import SignUpForm from '@/components/forms/SignUpForm.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
    LoginForm,
    SignUpForm
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>

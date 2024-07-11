<template>
  <v-app>
    <v-container class="login-container d-flex flex-column align-center justify-center">
      <v-card class="pa-4" min-width="400">
        <v-card-title>
          <h1>Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              required
            ></v-text-field>
            <v-alert v-if="loginFail" type="error" dismissible>
              Email ou senha inválidos
            </v-alert>
            <v-btn type="submit" class="basic-button mt-4">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import api from '@/services/api.js';

export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      loginFail: false,
    };
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        console.log(data);
        const response = await api.post('/login', data);
        console.log(response);
        localStorage.setItem('TOKEN_KEY', response.data.token);
        
        this.$router.push(`/`);
        // Clean the form
        this.email = '';
        this.password = '';
        this.loginFail = false;
        console.log("LOGIN FEITO COM SUCESSO", response);
      } catch (error) {
        this.loginFail = true;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

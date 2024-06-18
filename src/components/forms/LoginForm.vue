<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn basicbutton" @click="login">Login</button>
      </form>
    </div>

</template>

<script>
import {loginRecipient} from '@/scripts/recipients.js';
import api from '@/services/api.js';

export default {
  name: 'Login',
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      
      const data = {
        email: this.email,
        password: this.password,
      };
      try{
        console.log(data)
        const response = await api.post('/login', data);
        localStorage.setItem('TOKEN_KEY', response.data.token);
        this.$router.push(`/`);

        console.log("LOGIN FEITO COM SUCESSO", response);
      } catch (error) {
        console.error(error);
      }

    }
  }
};
</script>

<style lang="css" scoped src="@/assets/styles/form.css"></style>
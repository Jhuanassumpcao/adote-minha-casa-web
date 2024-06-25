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
        <span id="login_fail" style="display:none">
            <p style="color:red;">Email ou senha inválidos</p>
        </span>
        <button type="submit" class="btn basicbutton" @click="login">Login</button>
      </form>
    </div>

</template>

<script>
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
      const data = {
        email: this.email,
        password: this.password,
      };
      try{
        console.log(data)
        const response = await api.post('/login', data);
        localStorage.setItem('TOKEN_KEY', response.data.token);
        this.$router.push(`/`);
        //clean the form
        this.email = '';
        this.password = '';

        console.log("LOGIN FEITO COM SUCESSO", response);
      } catch (error) {
        document.getElementById('login_fail').style.display = 'block';
      }

    }
  }
};
</script>

<style lang="css" scoped src="@/assets/styles/form.css"></style>
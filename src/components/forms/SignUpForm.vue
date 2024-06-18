<template>

    <div class="login-container">
      <h1>Crie uma conta</h1>
      <form @submit.prevent="sign_up">
        <div class="form-group">
          <label for="signemail">Email:</label>
          <input type="email" id="signemail" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="signname">Nome:</label>
          <input type="text" id="signname" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="phone">Telefone:</label>
          <input type="text" id="phone" v-model="phone" required>
        </div>
        <div class="form-group">
          <label for="city">Cidade:</label>
          <input type="text" id="city" v-model="city" required>
        </div>
        <div class="form-group">
          <label for="state">Estado:</label>
          <input type="text" id="state" v-model="state" required>
        </div>
        <div class="form-group">
          <label for="signpassword">Senha:</label>
          <input type="password" id="signpassword" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="signpassword2">Confirme sua senha:</label>
          <input type="password" id="signpassword2" v-model="passwordConf" required>
        </div>
        <button type="submit" class="btn basicbutton">SignUp</button>
      </form>
    </div>

</template>

<script>
import {sendPostRecipients} from '@/scripts/recipients.js';
import api from '@/services/api.js';

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConf: '',
      phone: '',
      city: '',
      state: ''
    };
  },
  methods: {
    async sign_up() {
      console.log('Email:', this.email);
      console.log('Name:', this.name);
      console.log('Password:', this.password);
      console.log('PasswordConf:', this.passwordConf);

      const data = {
        "email": this.email,
        "name": this.name,
        "phone": this.phone,
        "password": this.password,
        "city": this.city,
        "state": this.state
      }

      if (this.password !== this.passwordConf) {
        alert('As senhas não conferem');
      }else{
        try{
          const response = await api.post('/recipients', data);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
        
      }
    }
  }
};
</script>

<style lang="css" scoped src="@/assets/styles/form.css"></style>

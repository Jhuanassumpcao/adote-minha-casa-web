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
          <label for="state">Estado:</label>
          <select v-model="state" class="form-select" 
            id="state" 
            @change="updateCities"
            required>
            <option v-for="state in stateList" :key="state" :value="state">{{ state }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="cities">Cidade:</label>
          <select v-model="city" class="form-select">
                class="form-select mt-3" id="cities" 
                :disabled="!state"
                required>
            <option v-for="city in cityList" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="signpassword">Senha:</label>
          <input type="password" id="signpassword" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="signpassword2">Confirme sua senha:</label>
          <input type="password" id="signpassword2" v-model="passwordConf" required>
        </div>

        <span id="signup_fail" style="display:none">
            <!-- <p style="color:red;">Erro ao se cadastrar</p> -->
        </span>
        <span id="signup_password_fail" style="display:none">
            <p style="color:red;">Senhas não conferem</p>
        </span>

        <button type="submit" class="btn basicbutton">SignUp</button>
      </form>
    </div>

</template>

<script>
import api from '@/services/api.js';
import { getStates, getCities } from '@/scripts/estados.js';

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
      state: '',
      stateList: [],
      cityList: [],
    };
  },
  async created() {
    this.stateList = await getStates();
  },
  methods: {
    async updateCities() {
      this.cityList = await getCities(this.state);
    },
    async sign_up() {
      const errMessage = document.getElementById('signup_fail');
      const passErrorMessage = document.getElementById('signup_password_fail');
      
      errMessage.style.display = 'none';
      passErrorMessage.style.display = 'none';

      const data = {
        "email": this.email,
        "name": this.name,
        "state": this.state,
        "city": this.city,
        "phone": this.phone,
        "password": this.password,
      }

      if (this.password !== this.passwordConf) {
        console.log('Senhas não conferem');
        passErrorMessage.style.display = 'block';
      }else{
        try{
          //user register
          const response = await api.post('/recipients', data);

          //user login
          const responselogin = await api.post('/login', {
            email: this.email,
            password: this.password
          })

          //clean the form
          this.email = '';
          this.name = '';
          this.password = '';
          this.passwordConf = '';
          this.phone = '';
          this.city = '';
          this.state = '';

          localStorage.setItem('TOKEN_KEY', response.data.token.token);
          localStorage.setItem('USER_ID', response.data.user_id);
          
          this.$router.push(`/requirement`);
        } catch (error){

          console.log(error);
          errMessage.style.display = 'block';
          errMessage.innerHTML = "<p style=\"color:red\">" + error.response.data.errors[0].message + "</p>";
          
        }
      }
    }
  },
};
</script>

<style lang="css" scoped src="@/assets/styles/form.css"></style>

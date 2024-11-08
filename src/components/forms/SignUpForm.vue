<template>
  <v-app>
    <v-container class="login-container d-flex flex-column align-center justify-center">
      <v-card class="pa-4" min-width="400">
        <v-card-title>
          <h1>Crie uma conta</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="signUp">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="name"
              label="Nome"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              v-model="phone"
              label="Telefone"
              type="text"
              required
            ></v-text-field>
            <v-select
              v-model="state"
              :items="stateList"
              label="Estado"
              required
            ></v-select>
            <v-select
              v-model="city"
              :items="cityList"
              label="Cidade"
              :disabled="!state"
              required
            ></v-select>
            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordConf"
              label="Confirme sua senha"
              type="password"
              required
            ></v-text-field>
            <v-alert v-if="passwordMismatch" type="error" dismissible>
              Senhas não conferem
            </v-alert>
            <v-alert v-if="signupError" type="error" dismissible>
              {{ signupError }}
            </v-alert>
            <v-btn type="submit" class="basic-button mt-4">SignUp</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import login from '@/services/login.js';
import signIn from '@/services/signIn.js';
import { getStates, getCities } from '@/scripts/cep.js';

export default {
  name: 'SignUpForm',
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
      passwordMismatch: false,
      signupError: '',
    };
  },
  async created() {
    try {
      this.stateList = await getStates();
    } catch (error) {
      console.error('Failed to fetch states:', error);
    }
  },
  watch: {
    async state(newVal) {
      if (newVal) {
        try {
          this.cityList = await getCities(newVal);
        } catch (error) {
          console.error('Failed to fetch cities:', error);
        }
      }
    }
  },
  methods: {
    async signUp() {
      this.passwordMismatch = false;
      this.signupError = '';

      if (this.password !== this.passwordConf) {
        this.passwordMismatch = true;
        return;
      }

      const signInData = {
        email: this.email,
        name: this.name,
        state: this.state,
        city: this.city,
        phone: this.phone,
        password: this.password
      };

      const loginData = {
          email: this.email,
          password: this.password
      };
      
      try {
        // User registration

        await signIn(signInData);
        const b = await login(loginData);


        // Clean the form
        this.email = '';
        this.name = '';
        this.password = '';
        this.passwordConf = '';
        this.phone = '';
        this.city = '';
        this.state = '';

        this.$router.push(`/requirement`);
        this.$toast.success("Bem-vindo! :)");
      } catch (error) {
        console.log(error);
        
        this.signupError = error.response.data.errors[0].message || error.message || 'Erro ao se cadastrar';
        this.$toast.error(this.signupError);
      }
    }
  }
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

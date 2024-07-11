<template>
  <v-app>
    <v-container class="login-container d-flex flex-column align-center justify-center">
      <v-card class="pa-4" max-width="600">
        <v-card-title>
          <h1>Iniciar Pedido de Ajuda</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="cep"
              label="CEP"
              @change="handleCep"
              required
            ></v-text-field>
            <v-alert v-if="cepError" type="error" dismissible>
              Informe um CEP válido
            </v-alert>
            <v-alert v-if="cepSuccess" type="success" dismissible>
              <p>Rua: {{ address }}</p>
              <p>Bairro: {{ bairro }}</p>
              <p>Cidade: {{ city }}</p>
              <p>Estado: {{ state }}</p>
            </v-alert>
            <v-text-field
              v-model="value"
              label="Estimativa para reparação"
              required
            ></v-text-field>
            <v-text-field
              v-model="title"
              label="Breve descrição"
              required
            ></v-text-field>
            <v-textarea
              v-model="description"
              label="Descrição detalhada"
              required
            ></v-textarea>
            <v-text-field
              v-model="pix"
              label="Chave Pix"
              required
            ></v-text-field>
            <v-text-field
              v-model="phoneNumber"
              label="WhatsApp"
              required
            ></v-text-field>
            <v-btn type="submit" class="basic-button mt-4">Abrir Requerimento</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import api from '@/services/api.js';

export default {
  name: 'RequirementForm',
  data() {
    return {
      cep: '',
      city: '',
      bairro: '',
      address: '',
      state: '',
      value: '',
      title: '',
      description: '',
      pix: '',
      phoneNumber: '',
      cepError: false,
      cepSuccess: false,
    };
  },
  methods: {
    async submit() {
      const token = localStorage.getItem('TOKEN_KEY');
      if (!token) {
        alert('Você precisa estar logado para fazer um pedido de ajuda');
        return;
      }

      const data = {
        "title": this.title,
        "description": this.description,
        "pixkey": this.pix,
        "address": this.address,
        "city": this.city,
        "state": this.state,
        "value": this.value,
        "bairro": this.bairro,
        "cep": this.cep,
        "number": this.phoneNumber
      };
      
      try {
        const response = await api.post('/houses', data);
        // Clean the form
        this.cep = '';
        this.city = '';
        this.bairro = '';
        this.address = '';
        this.state = '';
        this.value = '';
        this.title = '';
        this.description = '';
        this.pix = '';
        this.phoneNumber = '';
        this.cepError = false;
        this.cepSuccess = false;
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    async handleCep(event) {
      const value = event.target.value;
      const url = `https://viacep.com.br/ws/${value}/json/`;
      this.cepError = false;
      this.cepSuccess = false;

      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.logradouro) {
          this.cepSuccess = true;
          this.cepError = false;
          this.cep = json.cep;
          this.city = json.localidade;
          this.bairro = json.bairro;
          this.address = json.logradouro;
          this.state = json.uf;
        } else {
          this.cepError = true;
          this.cepSuccess = false;
        }
      } catch (error) {
        this.cepError = true;
        this.cepSuccess = false;
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

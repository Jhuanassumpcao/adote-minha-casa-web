<template>
  <v-app>
    <v-container class="form-container d-flex flex-column align-center justify-center">
      <v-card class="pa-4" max-width="600">
        <v-card-title>
          <h1>{{ isEdit ? 'Editar Pedido de Ajuda' : 'Iniciar Pedido de Ajuda' }}</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="cep"
              label="CEP"
              @change="handleCep"
              required
              prepend-icon="mdi-map-marker"
            ></v-text-field>
            <v-alert v-if="cepError" type="error" dismissible>
              Informe um CEP válido
            </v-alert>
            <v-alert v-if="cepSuccess" type="success" dismissible>
              <p>Rua: {{ address }}</p>
              <p>Bairro: {{ bairro }}</p>
              <p>Cidade: {{ city }}</p>
              <p>Estado: {{ state }}</p>
              <hr>
            </v-alert>
            <v-text-field
              v-model="value"
              label="Estimativa para reparação"
              required
              type="number"
              prepend-icon="mdi-cash"
            ></v-text-field>
            <v-text-field
              v-model="title"
              label="Título"
              required
              prepend-icon="mdi-information"
            ></v-text-field>
            <v-textarea
              v-model="description"
              label="Descrição detalhada"
              required
              prepend-icon="mdi-text"
            ></v-textarea>
            <v-text-field
              v-model="pix"
              label="Chave Pix"
              required
              prepend-icon="mdi-currency-usd"
            ></v-text-field>
            <v-text-field
              v-model="phoneNumber"
              label="WhatsApp"
              required
              prepend-icon="mdi-whatsapp"
            ></v-text-field>
            <v-file-input
              v-model="file_url"
              label="Imagem Significativa"
              prepend-icon="mdi-camera"
              accept="image/*"
            ></v-file-input>
            <v-btn type="submit" class="basic-button mt-4">{{ isEdit ? 'Salvar Alterações' : 'Abrir Requerimento' }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import addHouse from '@/services/houses.js';
import getHouse from '@/services/getHouses.js'; // Supondo que você tenha um serviço para buscar os dados de um pedido
import api from '@/services/api.js';

export default {
  name: 'RequirementForm',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      cep: '',
      city: '',
      bairro: '',
      address: '',
      state: '',
      value: 0,
      title: '',
      description: '',
      pix: '',
      phoneNumber: '',
      file_url: null,
      cepError: false,
      cepSuccess: false,
      isEdit: false,
      idHouse: '',
    };
  },
  async beforeMount() {
    this.isEdit = this.$route.query.isEdit === 'true';
    this.idHouse = this.$route.query.id;

    if (this.isEdit && this.idHouse) {
      this.fetchData(this.idHouse);
    }
  },
  methods: {
    async fetchData(id) {
      try {
        const existingData = await getHouse(id);
        this.cep = existingData.cep;
        this.city = existingData.city;
        this.bairro = existingData.bairro;
        this.address = existingData.address;
        this.state = existingData.state;
        this.value = existingData.value;
        this.title = existingData.title;
        this.description = existingData.description;
        this.pix = existingData.pixkey;
        this.phoneNumber = existingData.number;
      } catch (error) {
        console.error('Error fetching existing data:', error);
      }
    },
    async submit() {
      const token = localStorage.getItem('TOKEN_KEY');
      if (!token) {
        alert('Você precisa estar logado para fazer um pedido de ajuda');
        return;
      }
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('pixkey', this.pix);
      formData.append('address', this.address);
      formData.append('city', this.city);
      formData.append('state', this.state);
      formData.append('value', this.value);
      formData.append('bairro', this.bairro);
      formData.append('cep', this.cep);
      formData.append('number', this.phoneNumber);
      formData.append('file_url', this.file_url);

      console.log(formData)

      try {
        if (this.isEdit) {
          await api.put(`/houses/${this.idHouse}`, formData);
        } else {
          await addHouse(formData);
        }
        this.$router.push('/profile');
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
.form-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

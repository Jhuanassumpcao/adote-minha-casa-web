<template>

    <div class="login-container">
      <h1>Iniciar Pedido de Ajuda</h1>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="cep">CEP:</label>
          <input @change="handle_cep" type="text" id="cep" v-model="cep" required>
        </div>
        <span id="address_success" style="display:none">
        </span>
        <span id="address_fail" style="display:none">
            <p style="color:red;">Informe um CEP válido</p>
        </span>
        <div class="form-group">
          <label for="value">Estimativa para reparação:</label>
          <input type="text" id="value" v-model="value" required>
        </div>
        <div class="form-group">
          <label for="title">Breve descrição:</label>
          <input type="text" id="title" v-model="title" required>
        </div>
        <div class="form-group">
          <label for="text">Descrição detalhada:</label>
          <input type="text" id="text" v-model="description" required>
        </div>
        <div class="form-group">
          <label for="pix">Chave Pix:</label>
          <input type="text" id="pix" v-model="pix" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Whatzapp:</label>
          <input type="tel" id="phoneNumber" v-model="phoneNumber" required>
        </div>
        
        <button type="submit" class="btn basicbutton">Abrir Requerimento</button>
      </form>
    </div>
</template>

<script>
import {sendPostHouses} from '@/scripts/houses.js';
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
      phoneNumber: ''
    };
  },
  methods: {
    async submit() {
      const data = {
        "cadastred_by_user_id": "1",
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
        //
      };
      const response = await api.post('/houses', data);
      console.log(response);
    },

    handle_cep(event) {
  		const value = event.target.value;
      const url = `https://viacep.com.br/ws/${value}/json/`;

      const errorElement = document.getElementById('address_fail');
      const successElement = document.getElementById('address_success');
      successElement.innerHTML = '';
      errorElement.innerHTML = '';
      fetch(url)
      .then( response => response.json())
      .then( json => {
      		
          if( json.logradouro ) {
            console.log(json)
            errorElement.style.display = 'none';
            successElement.style.display = 'block';
            successElement.innerHTML = `
              <p>Rua: ${json.logradouro}</p>
              <p>Bairro: ${json.bairro}</p>
              <p>Cidade: ${json.localidade}</p>
              <p>Estado: ${json.uf}</p>
              <hr>
            `;

            this.cep = json.cep;
            this.city = json.localidade;
            this.bairro = json.bairro;
            this.address = json.logradouro;
            this.state = json.uf;
          }
      }).catch( _ => {
        errorElement.style.display = 'block';
        successElement.style.display = 'none';

      });
    }
  }
};
</script>

<style lang="css" scoped src="@/assets/styles/form.css"></style>

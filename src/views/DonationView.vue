<template>
  <div class="container">
    <Header />
    <div class="content">
      <section class="section">
        <h2 class="title">{{ title }}</h2>
      </section>

      <section class="section">
        <h3 class="subtitle">Descrição</h3>
        <p class="description">{{ description }}</p>
      </section>

      <section class="section contact-section">
        <h3 class="subtitle">Contato</h3>
        <div class="contact-info">
          <p><i class="fas fa-money-check-alt"></i><strong> Pix:</strong> {{ pix }}</p>
          <p><i class="fas fa-phone-alt"></i><strong> Telefone:</strong> {{ phoneNumber }}</p>
        </div>
      </section>

      <section class="section address-section">
        <h3 class="subtitle">Endereço</h3>
        <div class="address-info">
          <p><i class="fas fa-map-marker-alt"></i> {{ address }}</p>
          <p><strong>Bairro:</strong> {{ bairro }}</p>
          <p><strong>Cidade:</strong> {{ city }}</p>
          <p><strong>Estado:</strong> {{ state }}</p>
          <p><strong>CEP:</strong> {{ cep }}</p>
        </div>
      </section>

      <section class="section value-section">
        <h3 class="subtitle">Valor estimado</h3>
        <p class="value">$ {{ value }}</p>
      </section>

    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api.js';

export default {
  name: 'DonationView',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      title: '',
      description: '',
      pix: '',
      address: '',
      city: '',
      state: '',
      value: '',
      bairro: '',
      cep: '',
      phoneNumber: ''
    };
  },
  async beforeMount() {
    try {
      const { data } = await api.get(`/houses/${this.$route.params.id}`);
        this.title = data.title;
        this.description = data.description;
        this.pix = data.pixkey;
        this.address = data.address;
        this.city = data.city;
        this.state = data.state;
        this.value = data.value;
        this.bairro = data.bairro;
        this.cep = data.cep;
        this.phoneNumber = data.number;
    } catch (error) {
      console.error("Erro ao obter dados das casas", error);
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.container {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.content:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.section {
  margin-bottom: 20px;
}

.title {
  font-size: 26px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  transition: color 0.3s ease;
}

.title:hover {
  color: #2980b9;
}

.subtitle {
  font-size: 22px;
  color: #3498db;
  margin-top: 20px;
  border-left: 4px solid #2980b9;
  padding-left: 10px;
}

.description {
  font-size: 16px;
  color: #7f8c8d;
  line-height: 1.6;
}

.contact-info p,
.address-info p,
.value {
  font-size: 16px;
  color: #2c3e50;
  margin: 8px 0;
}

.contact-info p strong,
.address-info p strong {
  color: #3498db;
}

.value {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
  border: 2px solid #e74c3c;
  padding: 10px;
  display: inline-block;
  border-radius: 5px;
  background-color: #fef6f6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.value:hover {
  background-color: #e74c3c;
  color: #ffffff;
}

.contact-info i,
.address-info i {
  margin-right: 10px;
  color: #3498db;
}
</style>
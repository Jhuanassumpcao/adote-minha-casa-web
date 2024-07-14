<template>
  <v-app>
    <Header />
    <v-container class="py-5">
      <v-card
        :disabled="loading"
        :loading="loading"
        class="mx-auto"
        max-width="374"
      >
        <v-img height="250" :src="requirement.file_url || baseUrl" cover></v-img>

        <v-card-item>
          <v-card-title>{{ requirement.title }}</v-card-title>

          <v-card-subtitle>
            <span class="me-1">
              <v-icon left>mdi-city-variant-outline</v-icon> {{ requirement.city }} -
              {{ requirement.state }}
            </span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <div class="mb-4 text-subtitle-1">
            <v-icon left>mdi-home-outline</v-icon> {{ requirement.address }} -
            {{ requirement.bairro }}, {{ requirement.cep }}
          </div>
          <div class="my-4 text-subtitle-1">
            <v-icon left>mdi-phone</v-icon> Telefone: {{ requirement.number }}
          </div>
          <div class="my-4 text-subtitle-1">
            <v-icon left>mdi-account</v-icon> Usuário: {{ requirement.owner_name }}
          </div>
          <div>{{ requirement.description }}</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-title>
          Valor Total Estimado: <p class="estimated-value">R$ {{ requirement.value }}</p>
        </v-card-title>

        <v-card-title>
          Total Recebido: <p class="estimated-value">R$ {{ requirement.total_donations }}</p>
        </v-card-title>

        <v-card-actions>
          <v-btn color="deep-purple-lighten-2" text="Doar" block border @click="dialog = true"></v-btn>
          <v-dialog v-model="dialog" width="auto">
            <v-card max-width="400">
              <v-card-title>Doar</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-file-input
                    v-model="donationProof"
                    label="Comprovante"
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    required
                    @change="imageHandler"
                  ></v-file-input>
                  <v-text-field
                    v-model="donationValue"
                    label="Valor da Doação"
                    type="number"
                    required
                    :disabled="loading || !donationValueExtracted"
                  ></v-text-field>
                  <v-textarea
                    v-model="donationDescription"
                    label="Descrição"
                    rows="2"
                    required
                  ></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  color="blue darken-1" 
                  text 
                  @click="submitDonation" 
                  :loading="loading"
                  :disabled="loading || !donationValueExtracted"
                >
                  Enviar
                </v-btn>
                <v-btn text @click="dialog = false">Cancelar</v-btn>
              </v-card-actions>
            </v-card>
            
          </v-dialog>
          <v-dialog v-model="confirm_donation" width="auto">
            <v-card max-width="400">
              <v-card-title>Doação Enviada</v-card-title>
              <v-card-text>
                <v-alert type="success" icon="mdi-check-circle-outline">
                  Doação enviada com sucesso!
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="confirm_donation = false">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api.js'
import { ref } from 'vue'

export default {
  name: 'DonationView',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      requirement: {
        title: '',
        description: '',
        pixkey: '',
        address: '',
        city: '', 
        state: '',
        value: '',
        bairro: '',
        cep: '',
        number: '',
        file_url: ''
      },
      dialog: false,
      donationValue: '',
      donationDescription: '',
      donationProof: null,
      loading: false,
      donationValueExtracted: false,
      confirm_donation: false,
      baseUrl: 'https://www.shutterstock.com/image-vector/house-logo-template-design-vector-600nw-741515455.jpg'
    }
  },
  async beforeMount() {
    try {
      const { data } = await api.get(`/houses/${this.$route.params.id}`)
      this.requirement = data
    } catch (error) {
      console.error('Erro ao obter dados das casas', error)
    }
  },
  methods: {
    imageHandler() {
      const file = this.donationProof;
      if (!file) {
        this.result = 'Por favor, carregue uma imagem.';
        return;
      }
      this.loading = true;
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1];
        this.extractText(base64Image);
      };
      reader.readAsDataURL(file);
    },
    extractText(base64Image) {
      Tesseract.recognize(
        `data:image/png;base64,${base64Image}`, 
        'por', 
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        const valor = text.match(/R\$ ?\d{1,3}(?:\.\d{3})*,\d{2}/g);
        if (valor) {
          this.donationValue = this.convertToNumber(valor[0]);
          this.donationValueExtracted = true;
        } else {
          this.result = 'Valor não encontrado na imagem.';
          this.donationValueExtracted = false;
        }
        this.loading = false;
      }).catch(error => {
        console.error('Erro ao processar a imagem:', error);
        this.result = 'Erro ao processar a imagem.';
        this.loading = false;
        this.donationValueExtracted = false;
      });
    },
    convertToNumber(value) {
      return parseFloat(value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
    },
    async submitDonation(){
      this.loading = true;
      if (!this.donationProof || !this.donationValue || !this.donationDescription) {
        return;
      }
      const formData = new FormData();
      formData.append('image', this.donationProof);
      formData.append('donationValue', this.donationValue);
      formData.append('description', this.donationDescription);
      formData.append('house_id', this.requirement.id);

      try {
        await api.post(`/donations/`, formData);
        console.log('Doação enviada com sucesso');
      } catch (error) {
        console.error('Erro ao enviar doação', error);
        this.loading = false;
      }finally{
        this.loading = false;
        this.dialog = false;
        this.confirm_donation = true;
        this.donationValue = '',
        this.donationDescription = '',
        this.donationProof = null
      }
    }
  },
  watch: {
    donationProof(comprovante) {
      this.imageHandler(comprovante);
    }
  }
}
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.headline {
  font-weight: bold;
  color: #2c3e50;
}
.subheader {
  font-size: 1.25rem;
  color: #34495e;
}
.v-divider {
  margin: 10px 0;
}
.description,
.contact,
.address,
.estimated-value {
  font-size: 1rem;
  color: #7f8c8d;
}
.image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.donate-btn {
  font-size: 1.2rem;
  padding: 14px 28px;
}
</style>

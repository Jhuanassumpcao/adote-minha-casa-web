<template>
  <v-app>
    <Header />
    <v-container class="py-5">
      <Profile />
      <hr>
      <v-container>
        <v-row v-if="!loading && requirements.length > 0">
            <v-data-table :headers="headers" :items="requirements" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Requisições</v-toolbar-title>
                </v-toolbar>
              </template>
              <template v-slot:item.created_at="{ item }">
                {{ new Date(item.created_at).toLocaleString() }}
              </template>
              <template v-slot:item.active="{ item }">
                <v-icon color="green" v-if="isActive(item)">mdi-check-circle</v-icon>
                <v-icon color="red" v-else>mdi-close-circle</v-icon>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editRequirement(item)">mdi-pencil</v-icon> 
                <v-icon small @click="openDeleteDialog(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
        </v-row>

        <v-row justify="center" v-if="loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>

        <v-row justify="center" v-if="!loading && requirements.length === 0">
          <v-alert type="warning">
            Você não possui nenhuma requisição feita.
          </v-alert>
        </v-row>

      </v-container>
    </v-container>

    <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Confirmar Exclusão</v-card-title>
          <v-card-text>Você tem certeza que deseja excluir esta requisição?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="red darken-1" text @click="confirmDeletion">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Profile from '@/components/Profile.vue'
import api from '@/services/api.js'

export default {
  name: 'UserProfile',
  components: {
    Header,
    Footer,
    Profile
  },
  data() {
    return {
      loading: false,
      requirements: [],
      headers: [
        { title: 'Título', value: 'title' },
        { title: 'CEP', value: 'cep' },
        { title: 'Data de criação', value: 'created_at', sortable: true },
        { title: 'Total de doações', value: 'total_donations', sortable: true },
        { title: 'Valor estimado', value: 'value', sortable: true },
        { title: 'Ativo', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      deleteId: null,
      dialog: false
    }
  },
  async created() {
    this.loading = true;
    try {
      const { data } = await api.get('/houses/mine')
      this.requirements = data
      console.log(data)
    } catch (error) {
      console.error('Erro ao obter dados das requisições', error)
    }finally {
      this.loading = false;
    }
  },
  methods: {
    editRequirement(item) {
      this.$router.push('/requirement?isEdit=true&id=' + item.id)
    },
    openDeleteDialog(id) {
      this.dialog = true;
      this.deleteId = id; 
    },
    async confirmDeletion() {
      try {
        await api.delete(`/houses/${this.deleteId}`)
        this.requirements = this.requirements.filter(item => item.id !== this.deleteId)
        this.deleteId = null;
        this.$toast.success('Casa deletada com sucesso!')
      } catch (error) {
        console.error('Erro ao deletar requisição', error)
        this.$toast.error('Erro ao deletar casa')
      }finally{
        this.dialog = false;
      }
    },
    isActive(item){
      return item.total_donations < item.value
    }
  }
}
</script>
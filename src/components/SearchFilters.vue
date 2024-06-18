<template>
  <div class="container py-5">
    <!-- Select de estados -->
    <select v-model="selectedState" class="form-select" id="states" @change="updateCities">
      <option value="" disabled>Selecione um estado</option>
      <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
    </select>

    <!-- Select de cidades -->
    <select v-model="selectedCity" class="form-select mt-3" id="cities" :disabled="!selectedState">
      <option value="" disabled>Selecione uma cidade</option>
      <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
    </select>

    <!-- Botão "Aplicar Filtros" com route-link -->
    <router-link :to="{ name: 'search'}" tag="button" class="btn basicbutton mt-3">
      Aplicar Filtros
    </router-link>
  </div>
</template>

<script>
import { getStates, getCities } from '@/scripts/estados.js';
export default {
  data() {
    return {
      states: [],
      selectedState: null,
      cities: [],
      selectedCity: null
    };
  },
  async created() {
    this.states = await getStates();
  },
  methods: {
    async updateCities() {
      this.cities = await getCities(this.selectedState);
    }
  },
  
};
</script>

<style scoped>
/* Estilos específicos do componente podem ser adicionados aqui */
</style>
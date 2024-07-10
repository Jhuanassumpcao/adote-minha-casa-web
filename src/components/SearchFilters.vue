<template>
  <v-container class="py-5">
    <!-- Select de estados -->
    <v-select
      v-model="selectedState"
      :items="states"
      label="Selecione um estado"
      outlined
      dense
    ></v-select>

    <!-- Select de cidades -->
    <v-select
      v-model="selectedCity"
      :items="cities"
      label="Selecione uma cidade"
      :disabled="!selectedState"
      class="mt-3"
      outlined
      dense
    ></v-select>

    <!-- Botão "Aplicar Filtros" com route-link -->
    <v-btn :to="{name: 'search'}" class="basic-button mt-3" outlined>
      Aplicar Filtros
    </v-btn>
  </v-container>
</template>

<script>
import { getStates, getCities } from '@/scripts/cep.js';
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
  watch: {
    selectedState(newVal) {
      this.updateCities(newVal);
    }
  },
  methods: {
    async updateCities() {
      this.cities = await getCities(this.selectedState);
    }
  },
};
</script>

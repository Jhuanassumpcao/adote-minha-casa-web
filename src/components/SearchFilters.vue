<template>
  <v-container class="py-5">
    <v-select
      v-model="selectedState"
      :items="states"
      label="Selecione um estado"
      outlined
      dense
    ></v-select>

    <v-select
      v-model="selectedCity"
      :items="cities"
      label="Selecione uma cidade"
      :disabled="!selectedState"
      class="mt-3"
      outlined
      dense
    ></v-select>

    <v-text-field
      v-model="maxValue"
      label="Valor máximo"
      type="number"
      class="mt-3"
      min="0"
      outlined
      dense
    ></v-text-field>

    <v-text-field
      v-model="itemsPerPage"
      label="Itens por página"
      type="number"
      min="1"
      max="50"
      class="mt-3"
      outlined
      dense
    ></v-text-field>

    <v-btn @click="applyFilters" class="basic-button mt-3" outlined>
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
      selectedCity: null,
      maxValue: null,
      itemsPerPage: null,
    };
  },
  async created() {
    this.states = await getStates();
    this.updateFromRouter();
  },
  watch: {
    selectedState(newVal) {
      this.updateCities(newVal);
    }
  },
  methods: {
    async updateCities() {
      this.cities = await getCities(this.selectedState);
    },
    applyFilters() {
      const queryParams = {
        state: this.selectedState,
        city: this.selectedCity,
        maxValue: this.maxValue,
        perPage: this.itemsPerPage
      };

      Object.keys(queryParams).forEach(key => {
        if (!queryParams[key]) {
          delete queryParams[key];
        }
      });

      this.$router.push({ name: 'search', query: queryParams });
    },
    updateFromRouter(){
      this.selectedState = this.$route.query.state;
      this.selectedCity = this.$route.query.city;
      this.maxValue = this.$route.query.maxValue;
      this.itemsPerPage = this.$route.query.perPage;
    }
  },
};
</script>

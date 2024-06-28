<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
:root{
  --deep-blue: #181e2a;
  --light-blue: #6577b5;
  --white-background: #EFEFEF;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: var(--white-background);
}
</style>
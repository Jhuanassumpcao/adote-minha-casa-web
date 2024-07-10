<template>
  <v-container>
    <v-row class="gap-5" justify="center">
      <component
        v-for="(item, index) in items"
        :key="index"
        :is="item.component"
        v-bind="item.props"
        class="d-flex"
      >
      </component>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Album',
  props: {
    items: {
      type: Array,
      required: true
    },
    colClass: {
      type: String,
      default: 'col'
    }
  }
}
</script>

<style scoped></style>
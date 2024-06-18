<template>
  <div class="container">
    <div class="row gap-5 w-100 justify-content-center">
      <component
        :class="colClass"
        v-for="(item, index) in items"
        :key="index"
        :is="item.component"
        v-bind="item.props"
      >
      </component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Album',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>

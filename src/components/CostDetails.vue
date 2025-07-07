<script setup>
import { defineProps } from "vue";

defineProps({
  items: {
    type: Array,
  },
});
</script>

<template>
  <div class="costDetails__container">
    <div v-for="item in items" :key="item.label" class="costDetails__item">
      <div>{{ item.label }}</div>
      <div class="costDetails__value">{{ item.value }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.costDetails__item {
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding: 0px 40px;

  font-size: 0.8em;

  .costDetails__value {
    text-align: right
  }
}
</style>

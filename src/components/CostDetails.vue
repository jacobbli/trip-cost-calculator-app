<template>
  <div class="costDetails__container">
    <div v-for="item in items" :key="item.label" class="costDetails__item">
      <div>{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  items: {
    type: Array,
  },
});
</script>
<style scoped lang="scss">
.costDetails__container {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 4px;
  font-size: 12px;

  border-radius: 5px;

  min-width: 140px;
  position: absolute;
  left: 105%;
  z-index: 1;
  border: 1px rgb(175, 175, 175) solid;
  background-color: rgba(0, 0, 0, 0.1);
  .costDetails__item {
    display: grid;
    grid-template-columns: 1fr 1fr;

    div:nth-child(2) {
      text-align: right;
    }
  }
}
</style>

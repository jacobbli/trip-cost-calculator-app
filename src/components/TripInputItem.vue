<template>
  <div class="tripInputItem__container">
    <div class="tripInputItem__label">{{ label }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  label: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.tripInputItem__container {
  display: flex;
  flex-direction: column;

  .tripInputItem__label{
    max-width: 150px;
  }
}

@media only screen and (min-width: 600px) {
  .tripInputItem__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>

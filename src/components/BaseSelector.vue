<template>
    <form class="pricingeSchemeSelector__container">
      <div class="pricingeSchemeSelector__option" v-for="option in options" :key="option.label" @click="onClick(option)">
        <input type="radio" :id="option.label" :checked="selectedOption.label == option.label" />
        <label :for="option.label">{{ option.label}}</label>
      </div>
    </form>
</template>

<script setup>

import { defineProps } from "vue";

defineProps({
  options: {
    type: Array,
    required: true
  },
  selectedOption: Object,
  onClick: Function
})


</script>

<style scoped lang="scss">
.pricingeSchemeSelector__container {
  display: flex;
  gap:12px;

  padding: 24px 0 24px 0;
}
</style>

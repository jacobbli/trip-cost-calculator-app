<template>

  <form class="pricingeSchemeSelector__container">
    <TransitionGroup>
    <template v-if="isVisible">
      <div class="pricingeSchemeSelector__option" v-for="option in options" :key="option.label"
        @click="onClick(option)">
        <input type="radio" :id="option.label" :checked="selectedOption.label == option.label" />
        <label :for="option.label">{{ option.label }}</label>
      </div>
    </template>
    </TransitionGroup>
  </form>
</template>

<script setup>

import { defineProps } from "vue";

defineProps({
  options: {
    type: Array,
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  },
  selectedOption: Object,
  onClick: Function
})


</script>

<style scoped lang="scss">
.pricingeSchemeSelector__container {
  display: flex;
  align-items: center;
  gap: 12px;

  height: 5rem;

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  input,
  label {
    cursor: pointer;
  }
}
</style>

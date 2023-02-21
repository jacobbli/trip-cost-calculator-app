<template>
  <div class="costItem__container" :class="costItemClass">
    <div>{{ label }}</div>
    <div class="costItem__value">{{ value }}</div>
    <cost-details v-if="tooltip" class="costItem__tooltip" :items="tooltip" />
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import CostDetails from "./CostDetails.vue";

const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  tooltip: {
    type: Object,
  },
  isTotal: {
    type: Boolean,
    default: false,
  },
});

const costItemClass = computed(() => (props.isTotal ? "costItem__total" : ""));
</script>

<style scoped lang="scss">
.costItem__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;

  padding: 5px 0;

  .costItem__value {
    text-align: right;
  }

  &:hover {
    background-color: rgb(235, 235, 235);

    & .costItem__tooltip {
      visibility: visible;
    }
  }
}
.costItem__tooltip {
  visibility: hidden;

  &:hover {
    background-color: rgb(235, 235, 235);
    visibility: visible;

    & .costItem__tooltip {
      visibility: visible;
    }
  }
}

.costItem__total {
  font-weight: bold;
  background-color: rgb(228, 243, 228);
}
</style>

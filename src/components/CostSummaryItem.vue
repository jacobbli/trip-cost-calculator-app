<template>
  <div class="costSummaryItem__container" :class="costSummaryItemClass">
    <div>{{ label }}</div>
    <div class="costSummaryItem__value">{{ value }}</div>
    <cost-details
      v-if="tooltip"
      class="costSummaryItem__tooltip"
      :items="tooltip"
    />
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

const costSummaryItemClass = computed(() =>
  props.isTotal ? "costSummaryItem__total" : ""
);
</script>

<style scoped lang="scss">
.costSummaryItem__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;

  padding: 5px 0;

  .costSummaryItem__value {
    text-align: right;
  }

  &:hover {
    background-color: rgb(235, 235, 235);

    & .costSummaryItem__tooltip {
      visibility: visible;
    }
  }
}
.costSummaryItem__tooltip {
  visibility: hidden;
}

.costSummaryItem__total {
  font-weight: bold;
  background-color: rgb(228, 243, 228);
}
</style>

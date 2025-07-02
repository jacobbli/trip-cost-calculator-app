<template>
  <div class="costSummary__container">
    <cost-summary-item
      v-for="costItem in costItems"
      :key="costItem.label"
      :label="costItem.label"
      :value="costItem.value"
      :is-total="costItem.isTotal"
      :tooltip="costItem.tooltip"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import CostSummaryItem from "./CostSummaryItem.vue";

defineProps({
  costItems: {
    type: Array,
  },
});
</script>

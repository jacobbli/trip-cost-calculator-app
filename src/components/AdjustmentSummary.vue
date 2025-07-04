<script setup>
import { defineProps, computed } from "vue";
import CostSummaryItem from "./CostSummaryItem.vue";

const props = defineProps({
  tripDuration: {
    type: Object,
    required: true
  },
  originalCost: {
    type: Number,
    required: true
  },
  adjustedTotalCost: {
    type: Number,
    required: true
  }
});


const durationText = computed(() => {
  if (
    Object.values(props.tripDuration).some(
      (duration) => duration < 0 || isNaN(duration)
    )
  )
    return "Invalid time range";

  const dayLabel = props.tripDuration.days == 1 ? "day" : "days";
  const hourLabel = props.tripDuration.hours == 1 ? "hour" : "hours";
  const minuteLabel = props.tripDuration.minutes == 1 ? "minute" : "minutes";

  return `${props.tripDuration.days} ${dayLabel} ${props.tripDuration.hours} ${hourLabel} ${props.tripDuration.minutes} ${minuteLabel}`;
});


const adjustment = computed(() => {
  const difference = props.adjustedTotalCost - props.originalCost;
  return difference >= 0
    ? `$${difference.toFixed(2)}`
    : `-$${Math.abs(difference).toFixed(2)}`;
});

const originalTotalCostSummary = computed(() => `$${props.originalCost.toFixed(2)}`)
const adjustedTotalCostSummary = computed(() => `$${props.adjustedTotalCost.toFixed(2)}`)
const adjustedAmmount = computed(() => adjustment.value)

// const costSummaryItems = computed(() => [
//   {
//     label: "Original total cost",
//     value: `$${props.originalCost.toFixed(2)}`,
//   },
//   {
//     label: "Adjusted total cost",
//     value: `$${props.adjustedTotalCost.toFixed(2)}`,
//   },
//   { label: "Adjustment amount", value: adjustment.value, isTotal: true },
// ]);

</script>

<template>
  <div class="adjustmentSummary_duration">
    <cost-summary-item label="Adjusted trip duration" :value="durationText" />
  </div>
  <div class="adjustmentSummary__container">
    <!-- <cost-summary-item v-for="costItem in costSummaryItems" :key="costItem.label" :label="costItem.label"
      :value="costItem.value" :is-total="costItem.isTotal" :tooltip="costItem.tooltip" /> -->
    <cost-summary-item label="Original total cost" :value="originalTotalCostSummary" />
    <cost-summary-item label="Adjusted total cost" :value="adjustedTotalCostSummary" />
    <cost-summary-item label="Adjustment amount" :value="adjustedAmmount" :is-total="true" />


  </div>
</template>

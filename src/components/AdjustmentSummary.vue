<script setup>
import { defineProps, computed } from "vue";
import SummaryItem from "./SummaryItem.vue";

const props = defineProps({
  tripDuration: {
    type: Object,
    required: false
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
  if (!props.tripDuration) return "Invalid time range";

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
</script>

<template>
  <div class="adjustmentSummary__duration">
    <div>Adjusted trip duration</div>
    <div class="adjustmentSummary__durationText">{{ durationText }}</div>
  </div>
  <div class="adjustmentSummary__container">
    <summary-item label="Original total cost" :value="originalTotalCostSummary" />
    <summary-item label="Adjusted total cost" :value="adjustedTotalCostSummary" />
    <summary-item label="Adjustment amount" :value="adjustedAmmount" :is-total="true" />
  </div>
</template>

<style scoped lang="scss">
.adjustmentSummary__duration {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .adjustmentSummary__durationText {
    text-align: right
  }
}
</style>
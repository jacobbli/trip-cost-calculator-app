<template>
  <div class="adjustmentCalculator__container">
    <div class="adjustmentCalculator__heading">Trip adjustment</div>

    <trip-input-item label="Adjusted end time">
      <datetime-input
        :datetime="adjustedEndDatetime"
        :on-change="updateTripDuration"
      />
    </trip-input-item>

    <trip-input-item label="BCAA member discount">
      <input
        class="adjustmentsCalculator__checkbox"
        id="is-bcaa-member"
        type="checkbox"
        :checked="isBcaaMember"
        @change="toggleBcaaMember"
      />
    </trip-input-item>

    <trip-input-item label="Include access fee">
      <input
        class="adjustmentsCalculator__checkbox"
        id="include-access-fee"
        type="checkbox"
        :checked="includeAccessFee"
        @change="toggleAccessFee"
      />
    </trip-input-item>
  </div>
  <div class="adjustmentCalculator__duration">
    Adjusted trip duration: {{ durationText }}
  </div>

  <cost-summary :cost-items="costSummaryItems" />
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import DatetimeInput from "./DatetimeInput.vue";
import TripInputItem from "./TripInputItem.vue";
import CostSummary from "./CostSummary.vue";

import {
  calculateTripDuration,
  calculatePvrtDays,
} from "../helpers/duration.js";
import {
  calculateTripCost,
  calculateDiscounts,
  calculatePvrtCost,
  calculateTax,
} from "@/helpers/costs.js";

const props = defineProps({
  startDatetime: {
    type: Date,
  },
  originalCost: {
    type: Number,
  },
});
const adjustedEndDatetime = ref(new Date());

const isBcaaMember = ref(false);
const includeAccessFee = ref(true);

function toggleBcaaMember() {
  isBcaaMember.value = !isBcaaMember.value;
}

function toggleAccessFee() {
  includeAccessFee.value = !includeAccessFee.value;
}

function updateTripDuration(newEndDatetime) {
  adjustedEndDatetime.value = newEndDatetime;
}

const tripDuration = computed(() =>
  calculateTripDuration(props.startDatetime, adjustedEndDatetime.value)
);

const adjustedTotalCost = computed(() => {
  const adjustedTripCost = calculateTripCost(tripDuration.value);

  const adjustedAccessFee = includeAccessFee.value ? 1 : 0;

  const adjustedPvrtCost = calculatePvrtCost(
    calculatePvrtDays(tripDuration.value)
  );

  const adjustedTotalDiscounts = Object.values(
    calculateDiscounts(isBcaaMember.value, adjustedTripCost.tripCost)
  ).reduce((prev, cur) => prev + cur);

  const adjustedTotalTax = Object.values(
    calculateTax(
      adjustedTripCost.tripCost - adjustedTotalDiscounts,
      adjustedPvrtCost,
      adjustedAccessFee
    )
  ).reduce((prev, cur) => prev + cur);

  return (
    adjustedTripCost.tripCost -
    adjustedTotalDiscounts +
    adjustedAccessFee +
    adjustedPvrtCost +
    adjustedTotalTax
  );
});

const durationText = computed(() => {
  const dayLabel = tripDuration.value.days == 1 ? "day" : "days";
  const hourLabel = tripDuration.value.hours == 1 ? "hour" : "hours";
  const minuteLabel = tripDuration.value.minutes == 1 ? "minute" : "minutes";

  return `${tripDuration.value.days} ${dayLabel} ${tripDuration.value.hours} ${hourLabel} ${tripDuration.value.minutes} ${minuteLabel}`;
});

const adjustment = computed(() => {
  const difference = adjustedTotalCost.value - props.originalCost;
  return difference >= 0
    ? `$${difference.toFixed(2)}`
    : `-$${Math.abs(difference).toFixed(2)}`;
});

const costSummaryItems = computed(() => [
  {
    label: "Original total cost",
    value: `$${props.originalCost.toFixed(2)}`,
  },
  {
    label: "Adjusted total cost",
    value: `$${adjustedTotalCost.value.toFixed(2)}`,
  },
  { label: "Adjustment amount", value: adjustment.value, isTotal: true },
]);
</script>

<style scoped lang="scss">
.adjustmentCalculator__container {
  display: flex;
  flex-direction: column;
  row-gap: 18px;

  .adjustmentCalculator__heading {
    font-size: 20px;
    font-weight: bold;
  }

  .adjustmentsCalculator__checkbox {
    width: 14px;
    height: 14px;
    align-self: center;
  }
}

.adjustmentCalculator__duration {
  text-align: center;
}
</style>

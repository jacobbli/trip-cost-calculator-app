<template>
  <div class="tripCalculator__inputs">
    <trip-inputs
      :on-change="updateTripDuration"
      :is-bcaa-member="isBcaaMember"
      :toggle-bcaa-member="toggleBcaaMember"
    />
  </div>

  <trip-billing-table
    :trip-duration="tripDuration"
    :trip-cost="tripCost"
    :discounts="discounts"
    :pvrt-cost="pvrtCost"
    :tax="tax"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import TripInputs from "./TripInputs.vue";
import TripBillingTable from "./TripBillingTable.vue";

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

const tripDuration = ref({
  days: 0,
  hours: 0,
  minutes: 0,
});

const pvrtDays = ref(0);

const tripCost = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  tripCost: 0,
});

const discounts = ref({
  bcaa: 0,
});

const tax = ref({
  pst: 0,
  gst: 0,
});

const pvrtCost = ref(0);

const isBcaaMember = ref(false);

function toggleBcaaMember() {
  isBcaaMember.value = !isBcaaMember.value;
  calculateCosts();
}

function updateTripDuration(startDatetime, endDatetime) {
  tripDuration.value = calculateTripDuration(startDatetime, endDatetime);
  pvrtDays.value = calculatePvrtDays(tripDuration.value);
  calculateCosts();
}

function calculateCosts() {
  tripCost.value = calculateTripCost(tripDuration.value);
  discounts.value = calculateDiscounts(
    isBcaaMember.value,
    tripCost.value.tripCost
  );
  pvrtCost.value = calculatePvrtCost(pvrtDays.value);

  const totalCost = tripCost.value.tripCost - totalDiscounts.value;
  tax.value = calculateTax(totalCost, pvrtCost.value);
}

const totalDiscounts = computed(() => {
  return Object.values(discounts.value).reduce((prev, cur) => prev + cur);
});
</script>

<style scoped lang="scss">
.tripCalculator__inputs {
  //   width: fit-content;
}
</style>

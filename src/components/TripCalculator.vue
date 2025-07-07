<script setup>
import { ref, computed, defineProps } from "vue";
import TripInputs from "./TripInputs.vue";
import TripSummary from "./TripSummary.vue";
import BaseSection from "./base/BaseSection.vue";

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
  pricingScheme: {
    type: Object,
    required: true
  },
  tripCost: {
    type: Number,
    required: true
  },
  onInputsChange: {
    type: Function,
    required: false
  },
  onStartDateTimeChange: {
    type: Function,
    required: false
  },
  startDateTime: {
    type: Date,
    required: true
  }
})

const endDatetime = ref(new Date());

const isBcaaMember = ref(false);
const includeAccessFee = ref(true);
const hasSubscription = ref(false);

function toggleBcaaMember() {
  if (!isBcaaMember.value) {
    hasSubscription.value = false
  }
  isBcaaMember.value = !isBcaaMember.value;
  props.onInputsChange(totalCost.value)
}

function toggleAccessFee() {
  includeAccessFee.value = !includeAccessFee.value;
  props.onInputsChange(totalCost.value)
}

function toggleSubscription() {
  if (!hasSubscription.value) {
    isBcaaMember.value = false
  }
  hasSubscription.value = !hasSubscription.value;
  props.onInputsChange(totalCost.value)
}

function updateTripDuration(newStartDatetime, newEndDatetime) {
  props.onStartDateTimeChange(newStartDatetime)
  endDatetime.value = newEndDatetime;
  props.onInputsChange(totalCost.value)
}

const tripDuration = computed(() =>
  calculateTripDuration(props.startDateTime, endDatetime.value)
);
const tripCost = computed(() => calculateTripCost(tripDuration.value, props.pricingScheme, hasSubscription.value));
const discounts = computed(() =>
  calculateDiscounts(isBcaaMember.value, tripCost.value)
);
const accessFee = computed(() =>
  includeAccessFee.value ? parseFloat(props.pricingScheme.accessFee) : 0
);
const pvrtDays = computed(() => calculatePvrtDays(tripDuration.value));
const pvrtCost = computed(() => calculatePvrtCost(pvrtDays.value, props.pricingScheme));

const taxes = computed(() => {
  const taxableCost = tripCost.value - totalDiscounts.value;
  return calculateTax(taxableCost, pvrtCost.value, accessFee.value, props.pricingScheme);
});

const totalDiscounts = computed(() => {
  return Object.values(discounts.value).reduce((prev, cur) => prev + cur);
});

const totalTax = computed(() => {
  return Object.values(taxes.value).reduce((prev, cur) => prev + cur);
});

const totalCost = computed(() => {
  return (
    tripCost.value -
    totalDiscounts.value +
    accessFee.value +
    pvrtCost.value +
    totalTax.value
  );
});
</script>

<template>
  <div class="tripCalculator__container">
    <base-section>
      <template #title>Trip Inputs</template>
      <template #content>
        <div class="tripCalculator__inputs">
          <trip-inputs :start-datetime="startDateTime" :end-datetime="endDatetime" :on-change="updateTripDuration"
            :is-bcaa-member="isBcaaMember" :include-access-fee="includeAccessFee" :has-subscription="hasSubscription"
            :toggle-bcaa-member="toggleBcaaMember" :toggle-access-fee="toggleAccessFee"
            :toggle-subscription="toggleSubscription" :pricing-scheme="pricingScheme" />
        </div>
      </template>
    </base-section>

    <base-section>
      <template #title>Trip Summary</template>
      <template #content>
        <trip-summary :trip-duration="tripDuration" :tripCost="tripCost" :totalDiscounts="totalDiscounts"
          :discounts="discounts" :accessFee="accessFee" :pvrtCost="pvrtCost" :pvrt-days="pvrtDays" :totalTax="totalTax"
          :taxes="taxes" :totalCost="totalCost" :pricing-scheme="pricingScheme" />
      </template>
    </base-section>
  </div>
</template>

<style scoped lang="scss">
.tripCalculator__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>

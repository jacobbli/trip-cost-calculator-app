<script setup>
import { ref, defineProps, computed } from "vue";
import AdjustmentSummary from "./AdjustmentSummary.vue";
import BaseDivider from "./base/BaseDivider.vue";
import BaseSection from "./base/BaseSection.vue";
import AdjustmentInputs from "./AdjustmentInputs.vue";
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
  pricingScheme: Object
});
const adjustedEndDatetime = ref(new Date());

const isBcaaMember = ref(false);
const includeAccessFee = ref(true);
const hasSubscription = ref(false);

function toggleBcaaMember() {
  isBcaaMember.value = !isBcaaMember.value;
}

function toggleAccessFee() {
  includeAccessFee.value = !includeAccessFee.value;
}

function toggleSubscription() {
  if (!hasSubscription.value) {
    isBcaaMember.value = false
  }
  hasSubscription.value = !hasSubscription.value;
}

function updateTripDuration(newEndDatetime) {
  adjustedEndDatetime.value = newEndDatetime;
}

const tripDuration = computed(() =>
  calculateTripDuration(props.startDatetime, adjustedEndDatetime.value)
);

const adjustedTotalCost = computed(() => {
  const adjustedTripCost = calculateTripCost(tripDuration.value, props.pricingScheme, hasSubscription.value);

  const adjustedAccessFee = includeAccessFee.value
    ? parseFloat(props.pricingScheme.accessFee)
    : 0;

  const adjustedPvrtCost = calculatePvrtCost(
    calculatePvrtDays(tripDuration.value),
    props.pricingScheme
  );

  const adjustedTotalDiscounts = Object.values(
    calculateDiscounts(isBcaaMember.value, adjustedTripCost)
  ).reduce((prev, cur) => prev + cur);

  const adjustedTotalTax = Object.values(
    calculateTax(
      adjustedTripCost - adjustedTotalDiscounts,
      adjustedPvrtCost,
      adjustedAccessFee,
      props.pricingScheme
    )
  ).reduce((prev, cur) => prev + cur);

  return (
    adjustedTripCost -
    adjustedTotalDiscounts +
    adjustedAccessFee +
    adjustedPvrtCost +
    adjustedTotalTax
  );
});
</script>

<template>
  <base-section>
    <template #title>Adjustment Inputs</template>
    <template #content>
      <adjustment-inputs 
        :adjusted-end-datetime="adjustedEndDatetime"
        :onAdjustedEndTimeChange="updateTripDuration"
        :is-bcaa-member="isBcaaMember"
        :toggle-bcaa-member="toggleBcaaMember"
        :include-access-fee="includeAccessFee"
        :toggle-access-fee="toggleAccessFee"
        :toggle-subscription="toggleSubscription"
        :pricing-scheme="pricingScheme"
        :has-subscription="hasSubscription"
        />
    </template>
  </base-section>
  <base-divider />

  <base-section>
    <template #title>Adjustment Summary</template>
    <template #content>
      <adjustment-summary 
        :trip-duration="tripDuration"
        :original-cost="originalCost"
        :adjusted-total-cost="adjustedTotalCost"
       />
    </template>
  </base-section>
</template>

<style scoped lang="scss">

</style>

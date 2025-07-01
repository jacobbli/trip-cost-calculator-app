<script setup>
import { ref, computed, defineProps } from "vue";
import TripInputs from "./TripInputs.vue";
import AdjustmentCalculator from "./AdjustmentCalculator.vue";
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


import { Taxes } from "@/models/taxes";

const props = defineProps({
  pricingScheme: Object
})

const startDatetime = ref(new Date());
const endDatetime = ref(new Date());

const isBcaaMember = ref(false);
const includeAccessFee = ref(true);
const hasSubscription = ref(false);

function toggleBcaaMember() {
  if (!isBcaaMember.value) {
    hasSubscription.value = false
  }
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

function updateTripDuration(newStartDatetime, nweEndDatetime) {
  startDatetime.value = newStartDatetime;
  endDatetime.value = nweEndDatetime;
}

const tripDuration = computed(() =>
  calculateTripDuration(startDatetime.value, endDatetime.value)
);

const tripCost = computed(() => calculateTripCost(tripDuration.value, props.pricingScheme, hasSubscription.value));
const discounts = computed(() =>
  calculateDiscounts(isBcaaMember.value, tripCost.value.tripCost)
);
const accessFee = computed(() =>
  includeAccessFee.value ? parseFloat(props.pricingScheme.accessFee) : 0
);
const pvrtDays = computed(() => calculatePvrtDays(tripDuration.value));
const pvrtCost = computed(() => calculatePvrtCost(pvrtDays.value, props.pricingScheme));

const taxes = computed(() => {
  const taxableCost = tripCost.value.tripCost - totalDiscounts.value;
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
    tripCost.value.tripCost -
    totalDiscounts.value +
    accessFee.value +
    pvrtCost.value +
    totalTax.value
  );
});

const durationText = computed(() => {
  if (
    Object.values(tripDuration.value).some(
      (duration) => duration < 0 || isNaN(duration)
    )
  )
    return "Invalid time range";

  const dayLabel = tripDuration.value.days == 1 ? "day" : "days";
  const hourLabel = tripDuration.value.hours == 1 ? "hour" : "hours";
  const minuteLabel = tripDuration.value.minutes == 1 ? "minute" : "minutes";

  return `${tripDuration.value.days} ${dayLabel} ${tripDuration.value.hours} ${hourLabel} ${tripDuration.value.minutes} ${minuteLabel}`;
});

const tripCostDetails = computed(() => {
  return [
    { label: "Day rate", value: `$${tripCost.value.days.toFixed(2)}` },
    { label: "Hour rate", value: `$${tripCost.value.hours.toFixed(2)}` },
    { label: "Minute rate", value: `$${tripCost.value.minutes.toFixed(2)}` },
  ];
});

const discountDetails = computed(() => {
  const discountLabelMap = {
    bcaa: "BCAA",
  };
  return Object.keys(discounts.value).map((discount) => {
    return {
      label: discountLabelMap[discount],
      value: `$${discounts.value[discount].toFixed(2)}`,
    };
  });
});

const pvrtDetails = computed(() => {
  return [
    {
      label: "PVRT days",
      value: `${pvrtDays.value}`,
    },
    {
      label: "PVRT rate",
      value: `$${Taxes.PVRT}`,
    },
  ];
});

const taxDetails = computed(() => {
  const taxLabelMap = {
    tripGst: "GST on trip",
    tripPst: "PST on trip",
    pvrtGst: "GST on PVRT",
    accessFeeGst: "GST on access fee",
    accessFeePst: "PST on access fee",
  };
  return Object.keys(taxes.value).map((tax) => {
    return {
      label: taxLabelMap[tax],
      value: `$${taxes.value[tax].toFixed(2)}`,
    };
  });
});

const costSummaryItems = computed(() => {
  const items = [
    {
      label: "Trip cost",
      value: `$${tripCost.value.tripCost.toFixed(2)}`,
      tooltip: tripCostDetails.value,
    },
    {
      label: "Discounts",
      value: `-$${totalDiscounts.value.toFixed(2)}`,
      tooltip: discountDetails.value,
    },
    { label: "Access fee", value: `$${accessFee.value.toFixed(2)}` },
  ]

  if (props.pricingScheme.isPvrtCharged) items.push({
    label: "PVRT",
    value: `$${pvrtCost.value.toFixed(2)}`,
    tooltip: pvrtDetails.value,
  })

  return [
    ...items,
    {
      label: "Tax",
      value: `$${totalTax.value.toFixed(2)}`,
      tooltip: taxDetails.value,
    },
    {
      label: "Total cost",
      value: `$${totalCost.value.toFixed(2)}`,
      isTotal: true,
    }
  ]
});
</script>

<template>
  <div class="costCalculator__container">
    <div class="costCalculator__heading">Cost summary</div>
    <div class="costCalculator__inputs">
      <trip-inputs :start-datetime="startDatetime" :end-datetime="endDatetime" :on-change="updateTripDuration"
        :is-bcaa-member="isBcaaMember" :include-access-fee="includeAccessFee" :has-subscription="hasSubscription"
        :toggle-bcaa-member="toggleBcaaMember" :toggle-access-fee="toggleAccessFee"
        :toggle-subscription="toggleSubscription" :pricing-scheme="pricingScheme" />
    </div>

    <hr class="costCalculator__divider" />

    <div class="costCalculator__duration">
      Trip duration: {{ durationText }}
    </div>

    <cost-summary :cost-items="costSummaryItems" />

    <hr class="costCalculator__divider" />

    <adjustment-calculator :start-datetime="startDatetime" :original-cost="totalCost"
      :pricing-scheme="pricingScheme" :has-subscription="hasSubscription" />
  </div>
</template>

<style scoped lang="scss">
.costCalculator__container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .costCalculator__heading {
    font-size: 20px;
    font-weight: bold;
  }

  .costCalculator__divider {
    width: 80%;
  }

  .costCalculator__duration {
    text-align: center;
  }
}

@media only screen and (min-width: 600px) {
  .costCalculator__container {
    width: 50%;
    max-width: 400px;
  }
}
</style>

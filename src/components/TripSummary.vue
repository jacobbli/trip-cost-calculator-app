<script setup>
import { defineProps, computed } from "vue";
import SummaryItem from "./SummaryItem.vue";

import { Taxes } from "@/models/taxes";

const props = defineProps({
  tripCost: {
    type: Number,
    required: true
  },
  totalDiscounts: {
    type: Number,
    required: true
  },
  discounts: {
    type: Object,
    required: true
  },
  accessFee: {
    type: Number,
    required: true
  },
  pvrtCost: {
    type: Number,
    required: true
  },
  pvrtDays: {
    type: Number,
    required: true
  },
  totalTax: {
    type: Number,
    required: true
  },
  taxes: {
    type: Object,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  pricingScheme: {
    type: Object,
    required: true
  },
  tripDuration: {
    type: Object,
    required: false
  }
});

const tripCostSummary = computed(() => `$ ${props.tripCost.toLocaleString("en-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`)

const discountsSummary = computed(() => {
  return {
    value: `-$ ${props.totalDiscounts.toLocaleString("en-CA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }
})

const discountDetails = computed(() => {
  const discountLabelMap = {
    bcaa: "BCAA",
  };
  return Object.keys(props.discounts).map((discount) => {
    return {
      label: discountLabelMap[discount],
      value: `$ ${props.discounts[discount].toLocaleString("en-CA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
    };
  });
});

const accessFeeSummary = computed(() => `$ ${props.accessFee.toLocaleString("en-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`)

const pvrtSummary = computed(() => {
  return `$ ${props.pvrtCost.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
})

const pvrtDetails = computed(() => {
  return [
    {
      label: "PVRT days",
      value: `${props.pvrtDays}`,
    },
    {
      label: "PVRT rate",
      value: `$ ${Taxes.PVRT}`,
    },
  ];
});

const taxSummary = computed(() => {
  return `$ ${props.totalTax.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
})

const taxDetails = computed(() => {
  const taxLabelMap = {
    tripGst: "GST on trip",
    tripPst: "PST on trip",
    pvrtGst: "GST on PVRT",
    accessFeeGst: "GST on access fee",
    accessFeePst: "PST on access fee",
  };
  return Object.keys(props.taxes).map((tax) => {
    return {
      label: taxLabelMap[tax],
      value: `$ ${props.taxes[tax].toLocaleString("en-CA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
    };
  });
});

const totalCostSummary = computed(() => `$ ${props.totalCost.toLocaleString("en-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`)

const durationText = computed(() => {
  if (!props.tripDuration) return "Invalid time range";

  const dayLabel = props.tripDuration.days == 1 ? "day" : "days";
  const hourLabel = props.tripDuration.hours == 1 ? "hour" : "hours";
  const minuteLabel = props.tripDuration.minutes == 1 ? "minute" : "minutes";

  return `${props.tripDuration.days} ${dayLabel} ${props.tripDuration.hours} ${hourLabel} ${props.tripDuration.minutes} ${minuteLabel}`;
});

</script>

<template>
  <div class="tripSummary__duration">
    <div>Trip duration</div>
    <div class="tripSummary__durationText">{{ durationText }}</div>
  </div>
  <div class="tripSummary__container">
    <summary-item label="Trip Cost" :value="tripCostSummary" />
    <summary-item label="Discounts" :value="discountsSummary.value" :breakdown="discountDetails" />
    <summary-item label="Access fee" :value="accessFeeSummary" />
    <summary-item label="PVRT" :value="pvrtSummary" :breakdown="pvrtDetails" />
    <summary-item label="Tax" :value="taxSummary" :breakdown="taxDetails" />
    <summary-item label="Total Cost" :value="totalCostSummary" :is-total="true" />
  </div>
</template>

<style scoped lang="scss">
.tripSummary__duration {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .tripSummary__durationText {
    text-align: right
  }
}
</style>
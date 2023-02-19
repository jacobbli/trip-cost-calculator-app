<template>
  <div>
    {{ durationText }}
  </div>

  <div class="tripBillingTable__item">
    <div>Trip cost</div>
    <div>${{ tripCost.tripCost }}</div>
  </div>
  <div class="tripBillingTable__item">
    <div>Discounts</div>
    <div>${{ totalDiscounts }}</div>
  </div>
  <div class="tripBillingTable__item">
    <div>PVRT</div>
    <div>${{ pvrtCost }}</div>
  </div>
  <div class="tripBillingTable__item">
    <div>Tax</div>
    <div>${{ totalTax }}</div>
  </div>
  <div class="tripBillingTable__item">
    <div>Total cost</div>
    <div>${{ totalCost }}</div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  tripDuration: {
    type: Object,
  },
  tripCost: {
    type: Object,
  },
  discounts: {
    type: Object,
  },
  pvrtCost: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Object,
  },
});

const durationText = computed(() => {
  const dayLabel = props.tripDuration.days == 1 ? "day" : "days";
  const hourLabel = props.tripDuration.hours == 1 ? "hour" : "hours";
  const minuteLabel = props.tripDuration.minutes == 1 ? "minute" : "minutes";

  return `${props.tripDuration.days} ${dayLabel} ${props.tripDuration.hours} ${hourLabel} ${props.tripDuration.minutes} ${minuteLabel}`;
});

const totalDiscounts = computed(() => {
  return Object.values(props.discounts).reduce((prev, cur) => prev + cur);
});

const totalTax = computed(() => {
  return Object.values(props.tax).reduce((prev, cur) => prev + cur);
});

const totalCost = computed(() => {
  return props.tripCost.tripCost - totalDiscounts.value + totalTax.value;
});
</script>

<style scoped lang="scss">
.tripBillingTable__item {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
}
</style>

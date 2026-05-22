<script setup>
import { ref, defineProps } from "vue";
import TripCalculator from "./TripCalculator.vue";
import AdjustmentCalculator from "./AdjustmentCalculator.vue";


defineProps({
  pricingScheme: Object,
  service: Object
})

const startDatetime = ref(new Date());
const totalCost = ref(0)

function updateTotalCost(newTotalCost) {
  totalCost.value = newTotalCost
}

function updateStartDateTime(newStartDateTime) {
  startDatetime.value = newStartDateTime
}
</script>

<template>
  <div class="calculatorController__container">
      <trip-calculator :trip-cost="totalCost" :service="service" :pricing-scheme="pricingScheme"
        :start-date-time="startDatetime" :on-inputs-change="updateTotalCost"
        :on-start-date-time-change="updateStartDateTime" />

      <adjustment-calculator :start-datetime="startDatetime" :original-cost="totalCost" :pricing-scheme="pricingScheme"
        :service="service" />
  </div>
</template>

<style scoped lang="scss">
.calculatorController__container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

@media only screen and (min-width: 900px) {
  .calculatorController__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    // justify-content: center;
    // flex-wrap: wrap;
    gap: 20px;
  }
}
</style>

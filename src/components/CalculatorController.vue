<script setup>
import { ref, defineProps } from "vue";
import CostCalculator from "./CostCalculator.vue";
import AdjustmentCalculator from "./AdjustmentCalculator.vue";

defineProps({
  pricingScheme: Object
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
    <div class="costCalculator__container">
      <cost-calculator :trip-cost="totalCost" :on-total-cost-change="updateTotalCost"
        :on-start-date-time-change="updateStartDateTime" :pricing-scheme="pricingScheme"
        :start-date-time="startDatetime" />
    </div>

    <div class="costCalculator__adjustmentSummary">
      <adjustment-calculator :start-datetime="startDatetime" :original-cost="totalCost"
        :pricing-scheme="pricingScheme" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.calculatorController__container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;

}
</style>

<script setup>
import { ref } from "vue";
import CostCalculator from "./components/CostCalculator.vue";
import ServiceTabs from "./components/ServiceTabs.vue";
import BaseSelector from "./components/BaseSelector.vue";

import { Services } from "@/models/services";

const selectedService = ref(Services.CAR_SHARE);
const selectedPricingScheme = ref(selectedService.value.pricingSchemes[0]);

function selectService(service) {
  selectedService.value = service
  selectedPricingScheme.value = service.pricingSchemes[0]
}

function selectPricingScheme(pricingScheme) {
  selectedPricingScheme.value = pricingScheme
}

</script>
<template>
  <service-tabs :selected-service="selectedService" :select-service="selectService" />
  <base-selector v-if="selectedService.pricingSchemes.length > 1" :options="selectedService.pricingSchemes" :selected-option="selectedPricingScheme" :on-click="selectPricingScheme" />
  <cost-calculator :pricing-scheme="selectedPricingScheme"/>
</template>
<style>
body {
  padding: 0 0 24px 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #7a7a7a;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

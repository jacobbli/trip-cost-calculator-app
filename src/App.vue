<script setup>
import { ref } from "vue";
import CalculatorController from "./components/CalculatorController.vue";
import ServiceTabs from "./components/ServiceTabs.vue";
import PricingSchemeSelector from "./components/PricingSchemeSelector.vue";

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
  <pricing-scheme-selector :is-visible="selectedService.pricingSchemes.length > 1"
    :options="selectedService.pricingSchemes" :selected-option="selectedPricingScheme"
    :on-click="selectPricingScheme" />
  <calculator-controller :pricing-scheme="selectedPricingScheme" />
</template>
<style>
body {
  margin: 0;
  display: flex;
  justify-content: center;
}

#app {
  padding: 48px 8px;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;

  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (min-width: 600px) {
  #app {
    padding: 48px 8px;
  }
}
</style>

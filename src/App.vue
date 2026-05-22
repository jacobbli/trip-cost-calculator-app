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
  <div class="app__serviceSelector">
    <service-tabs :selected-service="selectedService" :select-service="selectService" />
  </div>
  <div class="app__pricingSchemeSelector">
    <pricing-scheme-selector :is-visible="selectedService.pricingSchemes.length > 1"
      :options="selectedService.pricingSchemes" :selected-option="selectedPricingScheme"
      :on-click="selectPricingScheme" />
  </div>
  <calculator-controller :pricing-scheme="selectedPricingScheme" :service="selectedService" />
</template>
<style>
* {
  box-sizing: border-box;
}

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
  gap: 16px;
}

.app__serviceSelector {
  width: 100%;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid hsl(0, 0%, 0%);
}
.app__pricingSchemeSelector {
  width: 100%;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid hsl(0, 0%, 76%);

}

@media only screen and (min-width: 600px) {
  #app {
    padding: 48px 8px;
  }
}
</style>

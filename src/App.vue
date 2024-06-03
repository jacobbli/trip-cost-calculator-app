<template>
  <service-selector :selected-service="selectedService" :select-service="selectService" />
  <cost-calculator :selected-service="selectedService"/>
</template>

<script setup>
import { ref } from "vue";
import CostCalculator from "./components/CostCalculator.vue";
import ServiceSelector from "./components/ServiceSelector.vue";

import { Services } from "@/models/services";

const selectedService = ref(Services.CAR_SHARE);

function selectService(service) {
  selectedService.value = service
}

</script>

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

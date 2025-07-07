<script setup>
import { defineProps } from "vue";
import { Services } from "@/models/services";

import BaseTab from "./BaseTab.vue";

import iconScooter from "@/icons/icon-scooter.vue";
import iconCar from "@/icons/icon-car.vue";
import iconBike from "@/icons/icon-bike.vue";

defineProps({
  selectedService: Services,
  selectService: Function
})

</script>

<template>
  <div class="serviceTabs__container">
    <base-tab @click="selectService(Services.CAR_SHARE)" class="serviceTabs__tab" label="Evo"
      :is-selected="selectedService.name == 'CAR_SHARE'">
      <icon-car />
    </base-tab>

    <base-tab @click="selectService(Services.EBIKE_SHARE)" class="serviceTabs__tab" label="Evolve"
      :is-selected="selectedService.name == 'EBIKE_SHARE'">
      <icon-bike />
      <icon-scooter />
    </base-tab>
  </div>
</template>

<style scoped lang="scss">
.serviceTabs__container {
  display: flex;
  gap: 48px;
}
</style>

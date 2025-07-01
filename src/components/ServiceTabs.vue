<script setup>
import { defineProps } from "vue";
import { Services } from "@/models/services";

import BaseTab from "./BaseTab.vue";

defineProps({
  selectedService: Services,
  selectService: Function
})

</script>

<template>
  <ul class="serviceTabs__container">
    <li @click="selectService(Services.CAR_SHARE)">
      <base-tab label="Evo" :is-selected="selectedService.name == 'CAR_SHARE'" />
    </li>
    <li @click="selectService(Services.EBIKE_SHARE)">
      <base-tab label="Evolve" :is-selected="selectedService.name == 'EBIKE_SHARE'" />
    </li>
  </ul>
</template>





<style scoped lang="scss">
.serviceTabs__container {
  display: flex;
  gap: 20px;


  li {
    list-style: none;
    cursor: pointer;
  }
}
</style>

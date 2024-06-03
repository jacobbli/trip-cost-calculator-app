<template>
    <form class="serviceSelector__container">
      <div class="serviceSelector__option" @click="selectService(Services.CAR_SHARE)">
        <input type="radio" id="serviceSelector__carShare" :checked="selectedService.name == 'CAR_SHARE'" />
        <label for="serviceSelector__carShare">Car Share</label>
      </div>

      <div id="serviceSelector__option" @click="selectService(Services.EBIKE_SHARE)">
        <input type="radio" id="serviceSelector__ebikeShare" :checked="selectedService.name == 'EBIKE_SHARE'"/>
        <label for="serviceSelector__ebikeShare">E-Bike Share</label>
      </div>
    </form>
</template>

<script setup>

import { defineProps } from "vue";
import { Services } from "@/models/services";

defineProps({
  selectedService: Services,
  selectService: Function
})


</script>

<style scoped lang="scss">
.serviceSelector__container {
  display: flex;
  gap:12px;

  padding: 24px 0 24px 0;
}
</style>

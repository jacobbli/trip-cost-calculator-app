<script setup>
import { defineProps } from "vue";
import DatetimeInput from "./DatetimeInput.vue";
import TripInputItem from "./TripInputItem.vue";

const props = defineProps({
  startDatetime: {
    type: Date,
  },
  endDatetime: {
    type: Date,
  },
  onChange: {
    type: Function,
  },
  isBcaaMember: {
    type: Boolean,
    default: false,
  },
  includeAccessFee: {
    type: Boolean,
    default: true,
  },
  hasSubscription: {
    type: Boolean,
    default: true
  },
  toggleBcaaMember: {
    type: Function,
  },
  toggleAccessFee: {
    type: Function,
  },
  toggleSubscription: {
    type: Function,
  },
  pricingScheme: Object
});

function changeDatetime(newStartDatetime, newEndDatetime) {
  props.onChange(newStartDatetime, newEndDatetime);
}
</script>

<template>
  <div class="tripInputs__container">
    <trip-input-item label="Start time">
      <datetime-input
        :datetime="startDatetime"
        :on-change="(newStartTime) => changeDatetime(newStartTime, endDatetime)"
      />
    </trip-input-item>

    <trip-input-item label="End time">
      <datetime-input
        :datetime="endDatetime"
        :on-change="(newEndTime) => changeDatetime(startDatetime, newEndTime)"
      />
    </trip-input-item>

    <trip-input-item label="BCAA member discount">
      <input
        class="tripInputs__checkbox"
        id="is-bcaa-member"
        type="checkbox"
        :checked="isBcaaMember"
        @change="toggleBcaaMember"
      />
    </trip-input-item>

    <trip-input-item label="Include access fee">
      <input
        class="tripInputs__checkbox"
        id="include-access-fee"
        type="checkbox"
        :checked="includeAccessFee"
        @change="toggleAccessFee"
      />
    </trip-input-item>

    <trip-input-item label="Has BCAA Mobility Plan Subscription" v-if="pricingScheme.subscriptionMinuteRate">
      <input
        class="tripInputs__checkbox"
        id="has subscription"
        type="checkbox"
        :checked="hasSubscription"
        @change="toggleSubscription"
      />
    </trip-input-item>
  </div>
</template>

<style scoped lang="scss">
.tripInputs__container {
  display: flex;
  flex-direction: column;
  row-gap: 18px;

  .tripInputs__checkbox {
    width: 14px;
    height: 14px;
    align-self: center;
  }
}
</style>

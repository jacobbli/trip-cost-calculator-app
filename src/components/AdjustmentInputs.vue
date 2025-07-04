<script setup>
import { defineProps } from "vue";
import DatetimeInput from "./DatetimeInput.vue";
import TripInputItem from "./TripInputItem.vue";

const props = defineProps({
  isBcaaMember: {
    type: Boolean,
    default: false,
  },
  includeAccessFee: {
    type: Boolean,
    default: true,
  },
  toggleBcaaMember: {
    type: Function,
  },
  toggleAccessFee: {
    type: Function,
  },
  onAdjustedEndTimeChange: {
    type: Function,
    required: true
  },
  adjustedEndDatetime: {
    Type: Date,
    required: true
  },
  pricingScheme: {
    type: Object,
    required: true
  },
  toggleSubscription: {
    type: Function,
    required: true
  },
  hasSubscription: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div class="adjustmentInputs__container">
    <trip-input-item label="Adjusted end time">
      <datetime-input :datetime="props.adjustedEndDatetime" :on-change="props.onAdjustedEndTimeChange" />
    </trip-input-item>

    <trip-input-item label="BCAA member discount">
      <input class="adjustmentInputs__checkbox" id="is-bcaa-member" type="checkbox" :checked="props.isBcaaMember"
        @change="props.toggleBcaaMember" />
    </trip-input-item>

    <trip-input-item label="Include access fee">
      <input class="adjustmentInputs__checkbox" id="include-access-fee" type="checkbox"
        :checked="props.includeAccessFee" @change="props.toggleAccessFee" />
    </trip-input-item>
    
    <trip-input-item label="Has BCAA Mobility Plan Subscription" v-if="props.pricingScheme.subscriptionMinuteRate">
      <input class="adjustmentInputs__checkbox" id="has subscription" type="checkbox" :checked="hasSubscription"
        @change="toggleSubscription" />
    </trip-input-item>
  </div>
</template>

<style scoped lang="scss">
.adjustmentInputs__container {
  display: flex;
  flex-direction: column;
  row-gap: 18px;

  .adjustmentInputs__checkbox {
    width: 14px;
    height: 14px;
    align-self: center;
  }
}
</style>

<script setup>
import { defineProps, computed, ref } from "vue";
import CostDetails from "./CostDetails.vue";

import IconMinus from "@/icons/icon-minus.vue";
import IconPlus from "@/icons/icon-plus.vue";
const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  breakdown: {
    type: Object,
  },
  isTotal: {
    type: Boolean,
    default: false,
  },
});

const isBreakdownVisible = ref(false)

const costSummaryItemClass = computed(() =>
  props.isTotal ? "summaryItem__total" : ""
);

function toggleBreakdown() {
  isBreakdownVisible.value = !isBreakdownVisible.value
}

</script>

<template>
  <div class="summaryItem__container" :class="costSummaryItemClass">
    <div class="summaryItem__content">
      <div class="summaryItem__label">
        {{ label }}
        <div v-if="breakdown" class="summaryItem__breakdownToggle" @click="toggleBreakdown">
          <icon-plus v-if="!isBreakdownVisible" class="summaryItem__breakdownToggleIcon" />
          <icon-minus v-else class="summaryItem__breakdownToggleIcon" />
          Click here to view details
        </div>
      </div>
      <div class="summaryItem__value">{{ value }}</div>
    </div>

    <div class="summaryItem__breakdown" v-if="isBreakdownVisible">
      <cost-details :items="breakdown" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.summaryItem__container {
  border-top: 1px solid hsl(0, 0%, 80%);

  .summaryItem__content {
    display: grid;
    grid-template-columns: 50% 1fr;

    padding: 5px 12px;

    .summaryItem__label {
      .summaryItem__breakdownToggle {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.7em;
        padding: 8px 0;
        cursor: pointer;

        .summaryItem__breakdownToggleIcon {
          width: 1.3em;
          height: 100%;
          vertical-align: bottom;
        }
      }
    }

    .summaryItem__value {
      text-align: right;
    }
  }

  &:hover {
    background-color: hsl(0, 0%, 95%);
  }

  .summaryItem__breakdown {
    padding: 4px 0 12px 0;
  }
}

.summaryItem__total {
  font-weight: bold;
  background-color: hsl(120, 38%, 92%);
  border-bottom: 5px solid hsl(0, 0%, 80%);


  &:hover {
    background-color: hsl(120, 38%, 82%);

  }
}
</style>

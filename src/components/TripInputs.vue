<template>
  <div class="trip-inputs-container">
    <div class="trip-inputs-item">
      <label>Start time</label>
      <datetime-input
        :datetime="startDateTime"
        :on-change="(newTime) => changeDatetime(newTime, 1)"
      />
    </div>
    <div class="trip-inputs-item">
      <label>End time</label>
      <datetime-input
        :datetime="endDateTime"
        :on-change="(newTime) => changeDatetime(newTime, 0)"
      />
    </div>
    <div class="trip-inputs-item">
      <label for="is-bcaa-member">BCAA member?</label>
      <input
        id="is-bcaa-member"
        type="checkbox"
        value="isBcaaMember"
        @change="toggleBcaaMember"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import DatetimeInput from "./DatetimeInput.vue";

const props = defineProps({
  onChange: {
    type: Function,
  },
  isBcaaMember: {
    type: Boolean,
    default: false,
  },
  toggleBcaaMember: {
    type: Function,
  },
});
const startDateTime = ref(new Date());
const endDateTime = ref(new Date());

onMounted(() => {
  if (props.onChange) props.onChange(startDateTime.value, endDateTime.value);
});

function changeDatetime(newTime, start = 1) {
  start ? (startDateTime.value = newTime) : (endDateTime.value = newTime);

  props.onChange(startDateTime.value, endDateTime.value);
}
</script>

<style scoped lang="scss">
.trip-inputs-container {
  display: flex;
  flex-direction: column;
  row-gap: 18px;

  .trip-inputs-item {
    display: grid;
    grid-template-columns: 0.5fr 1fr;

    input[type="datetime-local"] {
      max-width: 180px;
    }

    input[type="checkbox"] {
      justify-self: left;
    }
  }
}
</style>

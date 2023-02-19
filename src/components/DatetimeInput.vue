<template>
  <input
    type="datetime-local"
    v-model="datetimeString"
    @change="changeDatetime"
  />
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

const datetimeString = ref("");

const props = defineProps({
  datetime: {
    type: Date,
  },
  onChange: {
    type: Function,
  },
});

onMounted(() => {
  datetimeString.value = generateDatetimeString(props.datetime);
});

function generateDatetimeString(datetime) {
  const year = datetime.getFullYear();
  const month = String(datetime.getMonth() + 1).padStart(2, "0");
  const date = String(datetime.getDate()).padStart(2, "0");

  const hours = String(datetime.getHours()).padStart(2, "0");
  const minutes = String(datetime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}
function changeDatetime() {
  const newDatetime = new Date(datetimeString.value);
  props.onChange(newDatetime);
}
</script>

<style scoped lang="scss"></style>

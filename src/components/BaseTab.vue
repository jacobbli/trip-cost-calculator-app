<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    isSelected: {
        type: Boolean,
        required: true
    },
})

const isSelectedClass = computed(() => props.isSelected ? 'baseTab__isSelected' : '')
</script>

<template>
    <div :class="isSelectedClass">
        {{ label }}
    </div>
</template>

<style lang="scss" scoped>
.baseTab__isSelected {
    color: black;
    font-weight: bold;
    border-bottom: 2px solid black;
}
</style>
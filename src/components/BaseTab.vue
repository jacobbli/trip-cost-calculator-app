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
    <div class="baseTab__container" :class="isSelectedClass">
        <div class="baseTab__icons">
            <slot></slot>
        </div>
        <div>
            {{ label }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.baseTab__container {
    display: flex;
    column-gap: 8px;

    font-size: 1.2rem;
    color: gray;
    border-bottom: 2px solid transparent;
    cursor: pointer;

    transition: border-bottom 0.5s, color 0.5s;

    &:hover {
        border-bottom: 2px solid black;
        color: black;
    }

    .baseTab__icons{
        display: flex;
        align-items: center;
    }
}

.baseTab__isSelected {
    color: black;
    border-bottom: 2px solid black;
}
</style>
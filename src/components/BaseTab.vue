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
    position: relative;
    column-gap: 8px;

    font-size: 1.2rem;
    color: gray;
    cursor: pointer;

    &:hover {
        color: black;
        ::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            border-bottom: solid 2px #000;
            animation: border_anim 0.2s linear forwards;
        }
    }

    .baseTab__icons {
        display: flex;
        align-items: center;
    }
}

.baseTab__isSelected {
    color: black;
    ::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom: solid 2px #000;
        animation: border_anim 0.2s linear forwards;
    }
}

@keyframes border_anim {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}
</style>
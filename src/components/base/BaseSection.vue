<template>
    <div class="baseSection__container">
        <div class="baseSection__title">
            <slot name="title">

            </slot>
        </div>
        <div class="baseSection__content">
            <slot name="content">

            </slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.baseSection__container {
    width: 100%;

    .baseSection__title {
        font-size: 20px;
        font-weight: bold;
    }

    .baseSection__content {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 18px;

        padding-top: 12px;
    }
}
</style>
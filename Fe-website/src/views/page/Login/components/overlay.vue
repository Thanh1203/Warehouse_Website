<template>
<div class="tw-w-1/2 tw-h-full tw-bg-transparent tw-relative">
    <div class="tw-w-full tw-h-full tw-bg-transparent tw-flex tw-items-center">
        <Transition  name="fade" mode="out-in">
            <img v-if="isLogin" src="@/assets/images/warehouse.png" alt="image login">
            <img v-else src="@/assets/images/warehouse2.png" alt="image login">
        </Transition>
    </div>
</div>
</template>
<script lang="ts" setup>
defineProps({
    isLogin: {
        type: Boolean,
        required: true,
    }
})
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
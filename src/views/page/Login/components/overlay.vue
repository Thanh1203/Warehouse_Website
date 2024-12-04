<template>
<div class="w-1/2 h-full bg-transparent relative">
    <div class="w-full h-full bg-transparent flex items-center">
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
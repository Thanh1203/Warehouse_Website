<template>
    <div class="tw-w-full tw-min-h-screen tw-bg-[#e7e7e7] tw-py-10 tw-flex tw-items-center tw-justify-center">
        <div class="tw-bg-white tw-w-[1200px] tw-h-[700px] tw-rounded-xl tw-overflow-hidden tw-flex tw-relative">
            <SignUp @handleSwap="handleSwap" :class="!isSignUp ? '' : 'active-sign'"/>
            <Overlay class="overlay-signin" :class="isSignUp ? '' : 'active-overlay'" :isLogin="isSignUp"/>
            <SignIn @handleSwap="handleSwap" :class="isSignUp ? '' : 'active-sign'"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';

const SignIn = defineAsyncComponent(() => import("./components/signIn.vue"));
const SignUp = defineAsyncComponent(() => import("./components/signUp.vue"));
const Overlay = defineAsyncComponent(() => import("./components/overlay.vue"));

const isSignUp = ref<boolean>(false);

const handleSwap = () => {
    isSignUp.value = !isSignUp.value;
}

onMounted(() => {
    handleSwap()
})
</script>
<style scoped lang="scss">
.overlay-signin {
 position: absolute;
 top: 0;
 left: 0;
 transition: .8s ease-out;
 z-index: 9999;
}

.active-overlay {
    transform: translateX(100%);
    z-index: 9999;
    transition: .8s ease-out;
}

.active-sign {
    transition: .8s ease-out;
    opacity: 0;
    visibility: hidden;
}

</style>
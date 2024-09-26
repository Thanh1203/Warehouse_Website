<template>
<div class="tw-rounded-xl tw-bg-white tw-h-full tw-w-full tw-overflow-auto tw-px-6 tw-py-5">
    <div class="tw-w-full tw-flex tw-justify-between">
        <div class="tw-flex tw-flex-col tw-justify-start">
            <span class="tw-mb-2 tw-text-[18px] tw-text-base tw-font-medium">{{ title }}</span>
            <div class="tw-text-xs">
                <span class="tw-mr-2">{{ subTitle }}</span>
                <span>{{ number }}</span>
            </div>
        </div>
        <div class="tw-flex tw-items-center">
            <slot name="action"></slot>
        </div>
    </div>
    <div class="tw-mt-6">
        <slot name="body"></slot>
    </div>
</div>
</template>
<script setup lang="ts">
import VueTypes from "vue-types";
const props = defineProps({
    title: VueTypes.string.def(""),
    subTitle: VueTypes.string.def(""),
    number: VueTypes.string.def(""),
})
</script>
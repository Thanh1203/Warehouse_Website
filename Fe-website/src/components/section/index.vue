<template>
<div class="tw-w-full tw-h-full tw-overflow-hidden tw-p-4 tw-rounded-lg">
    <div class="tw-w-full tw-flex tw-justify-between">
        <div class="tw-flex tw-flex-col tw-justify-start">
            <span class="tw-mb-2 tw-text-xl tw-text-[#aab8c5] tw-font-semibold">{{ title }}</span>
            <div class="tw-text-xs tw-text-[#eef2f5]" v-if="subTitle">
                <span class="tw-mr-2">{{ subTitle }} :</span>
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
    number: VueTypes.number.def(null),
})
</script>
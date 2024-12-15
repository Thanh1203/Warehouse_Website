<template>
<div class="rounded-xl bg-white h-full w-full overflow-auto px-6 py-5">
    <div class="w-full flex justify-between">
        <div class="flex flex-col justify-start">
            <span class="mb-2 text-[18px] text-base font-medium">{{ title }}</span>
            <div class="text-xs">
                <span class="mr-2">{{ subTitle }}</span>
                <span v-if="number">{{ Number(number) || 'N/A' }} </span>
            </div>
        </div>
        <div class="flex gap-3 items-end">
            <slot name="action"></slot>
        </div>
    </div>
    <slot name="action-second"></slot>
    <div class="mt-6">
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
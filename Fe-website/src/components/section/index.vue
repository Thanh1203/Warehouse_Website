<template>
<div class="tw-w-full tw-rounded-lg tw-p-4 section">
    <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div>
            <div class="tw-mb-2 tw-font-semibold ">{{ title }}</div>
            <div class="tw-text-sm" v-if="subTitle">
                {{ subTitle }}: {{number}}
            </div>
        </div>
        <div>
            <slot name="action"></slot>
        </div>
    </div>
    <div class="tw-mt-4">
        <slot name="content"></slot>
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

<style lang="scss">
.section {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
}
</style>
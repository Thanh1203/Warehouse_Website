<template>
  <div class="section">
    <div class="w-full flex items-center justify-between gap-4 flex-wrap">
      <div>
        <div class="mb-2 font-semibold">{{ title }}</div>
        <div class="text-sm" v-if="subTitle">{{ subTitle }}: {{ number }}</div>
      </div>
      <div class="flex gap-4 justify-start">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="mt-4">
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
});
</script>

<template>
  <HeaderPage/>
  <div class="tw-w-full tw-relative tw-top-16 tw-overflow-hidden tw-overflow-y-auto tw-h-auto tw-min-h-full tw-p-6">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import HeaderPage from "@/components/header/index.vue";

</script>
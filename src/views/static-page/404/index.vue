<template>
  <div class="tw-w-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-h-[100vh]">
    <h1 class="title tw-mb-4">404 Not Found</h1>
    <div class="tw-mb-3">
      <p class="description">{{ translate('PageNotFound') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { translate } from "@/languages/i18n";
</script>

<style scoped lang="scss">
.title {
  color: $base-green-800;
  font-size: 28px;
}
.description {
  padding-bottom: 20px;
  font-size: 16px;
}
</style>

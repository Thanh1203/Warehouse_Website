<template>
  <div class="tw-py-4 tw-font-bold tw-overflow-hidden">
    <Empty :description="emptyText || translate('noData')" />
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { Empty } from 'ant-design-vue';

const props = defineProps({
  emptyText: {
    type: String
  }
})
</script>
<style lang="scss">
</style>

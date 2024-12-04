<template>
  <div class="py-4 font-bold overflow-hidden">
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

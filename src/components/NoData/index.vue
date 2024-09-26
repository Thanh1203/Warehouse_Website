<template>
  <div class="tw-py-4 tw-font-bold tw-overflow-hidden">
    <Empty class="shake" :description="emptyText || translate('noData')" />
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
<style lang="scss" scoped>
.shake {
  animation: shake 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  animation-iteration-count: 2;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0eg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>

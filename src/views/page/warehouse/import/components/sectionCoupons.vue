<template>
  <div class="tw-w-full section-ctn tw-p-4 tw-rounded-lg tw-mb-6">
    <div class="tw-mb-4 tw-font-semibold">{{ translate('common.coupons') }}</div>
    <a-select class="tw-w-full" :options="dataCoupons" :placeholder="translate('common.selectCoupon')"/>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const dataCoupons = ref<any[]>([
  {
    value: 30,
    label: "Phieu giam gia 30%",
  },
  {
    value: 20,
    label: "Phieu giam gia 20%",
  },
  {
    value: 10,
    label: "Phieu giam gia 10%",
  },
]);
</script>
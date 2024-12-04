<template>
  <div class="w-full section-ctn p-4 rounded-lg mb-6">
    <div class="mb-4 font-semibold">{{ translate('common.coupons') }}</div>
    <a-select class="w-full" :options="dataCoupons" :placeholder="translate('common.selectCoupon')"/>
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
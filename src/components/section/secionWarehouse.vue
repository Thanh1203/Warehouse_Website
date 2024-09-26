<template>
  <div class="tw-w-full tw-rounded-lg section-ctn tw-p-4 tw-mb-6">
    <div class="tw-mb-4 tw-font-semibold">{{ translate('warehouse.title') }}</div>
    <a-select class="tw-w-full" :placeholder="translate('warehouse.select')" :options="dataWarehouse" @select="handleSelect"/>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const dataWarehouse = ref<any[]>([
  {
    value: 1,
    label: "Kho hàng 1",
  },
  {
    value: 2,
    label: "Kho hàng 2",
  },
  {
    value: 3,
    label: "Kho hàng  3",
  },
]);

const handleSelect = (val) => {
  store.dispatch("warehouse/setWarehouse", val);
}
</script>
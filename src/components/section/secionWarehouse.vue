<template>
  <div class="w-full rounded-lg section-ctn p-4 mb-6">
    <div class="mb-4 font-semibold">{{ translate('warehouse.title') }}</div>
    <a-select class="w-full" :placeholder="translate('warehouse.select')" :options="dataWarehouse" @select="handleSelect"/>
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
<template>
  <div class="tw-p-4 tw-w-full tw-rounded-lg section-ctn tw-mb-6">
    <div class="tw-mb-4 tw-font-semibold">{{ translate('supplier.title') }}</div>
    <a-select class="tw-w-full" :options="dataSupplier" :placeholder="translate('supplier.select')" @select="handleSelect"/>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const dataSupplier = ref<any[]>([
  {
    value: 1,
    label: "Nhà cung cấp 1",
  },
  {
    value: 2,
    label: "Nhà cung cấp 2",
  },
  {
    value: 3,
    label: "Nhà cung cấp 3",
  },
]);

const handleSelect = (val) => {
  store.dispatch("warehouse/setSupplier", val);
}
</script>
<template>
  <div class="p-4 w-full rounded-lg section-ctn mb-6">
    <div class="mb-4 font-semibold">{{ translate('supplier.title') }}</div>
    <a-select class="w-full" :options="dataSupplier" :placeholder="translate('supplier.select')" @select="handleSelect"/>
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
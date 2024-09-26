<template>
  <div class="tw-p-4 tw-w-full tw-rounded-lg section-ctn tw-mb-6">
    <div class="tw-mb-4 tw-font-semibold">{{ translate('product.category') }}</div>
    <a-select class="tw-w-full" :options="dataSupplier" :placeholder="translate('product.selectCategory')"/>
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
    label: "Ngành hàng  1",
  },
  {
    value: 2,
    label: "Ngành hàng 2",
  },
  {
    value: 3,
    label: "Ngành hàng  3",
  },
])

const handleSelect = (val) => {
  store.dispatch("warehouse/getListProduct", val)
}
</script>
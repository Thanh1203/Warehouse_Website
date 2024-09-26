<template>
  <div class="tw-mb-6 tw-w-full tw-rounded-lg section-ctn tw-p-4">
    <div class="tw-mb-4 tw-font-semibold">{{ translate("product.title") }}</div>
    <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-gap-6">
      <a-select class="tw-w-full" :options="dataProduct" :fieldNames="{value: 'code' , label: 'name'}" v-model:value="selectedItem"  @select="handleSelectProduct" :placeholder="translate('inventory.search')">
        <template #suffixIcon>
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </template>
      </a-select>
      <a-button @click="handelSelectMutiple">
        <div class="tw-font-semibold">
          {{ translate('common.selectMultiple') }}
        </div>
      </a-button>
    </div>
  </div>


</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { defineAsyncComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const selectedItem = ref<any>(null)

const dataProduct = ref<any[]>([
  {
    code: "1",
    name: "Sản phẩm 1",
    unitPrice: 1000,
    quantity: 1
  },
  {
    code: "2",
    name: "Sản phẩm 2",
    unitPrice: 1000,
    quantity: 1
  },
  {
    code: "3",
    name: "Sản phẩm 3",
    unitPrice: 1000,
    quantity: 1
  },
]);

const handleSelectProduct = async (value, option) => {
  await store.dispatch("warehouse/setProductsSelected", option);
  selectedItem.value = null;
}

const handelSelectMutiple = () => {

}
</script>
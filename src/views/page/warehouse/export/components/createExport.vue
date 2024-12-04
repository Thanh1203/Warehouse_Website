<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="font-semibold text-2xl mb-6">{{ translate("warehouse.createExport") }}</div>
  
  <div class="w-full px-10 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
    <div>
      <SectionWarehouse/>
      <SectionCategory :type="'EXPORT'"/>
    </div>
    <div class="col-span-2">
      <SectionSelectProducts/>
      <SectionListImport/>
    </div>
    <div>
      <SectionInfo/>
      <SectionPayment @handleSubmit="submitPayment"/>

    </div>
  </div>
</template>
<script setup lang="ts">
import SectionBreadcrumb from "@/components/section-breadcrumb/index.vue";
import { translate } from "@/languages/i18n";
import { getEmptyProperties } from "@/utils/common";
import { defineAsyncComponent, reactive, ref } from 'vue';

const SectionWarehouse = defineAsyncComponent(() => import('@/components/section/secionWarehouse.vue'));
const SectionCategory = defineAsyncComponent(() => import('@/components/section/sectionCategory.vue'));

const SectionSelectProducts = defineAsyncComponent(() => import('./sectionSelectProducts.vue'));
const SectionListImport = defineAsyncComponent(() => import('./sectionListImport.vue'));

const SectionInfo = defineAsyncComponent(() => import('./sectionInfo.vue'));
const SectionPayment = defineAsyncComponent(() => import('./sectionPayment.vue'));


const listBreadCrumb = ref<any[]>([
  {
    title: translate("warehouse.export"),
    url: "/warehouse-export",
  },
  {
    title: translate("warehouse.createExport"),
    url: "/create-export",
  },
]);

const statePayment = reactive<any>({
  total: null,
  quantity: 0,
  couponsSelected: [],
});

const submitPayment = () => {
  const state = getEmptyProperties(statePayment);
  console.log(state);
}
</script>
<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="tw-font-semibold tw-text-2xl tw-mb-6">{{ translate("warehouse.createImport") }}</div>

  <div class="tw-w-full tw-px-10 tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-4 md:tw-gap-6">
    <div>
      <SectionWarehouse/>
      <SectionSupplier/>
      <SectionCategory :type="'IMPORT'"/>
    </div>
    <div class="tw-col-span-2">
      <SectionSelectProducts/>
      <SectionListImport/>
    </div>
    <div>
      <SectionInfo/>
      <SectionCoupons/>
      <SectionPayment @handleSubmit="submitPayment"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionBreadcrumb from "@/components/section-breadcrumb/index.vue";
import { translate } from "@/languages/i18n";
import { getEmptyProperties } from "@/utils/common";
import { defineAsyncComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const SectionSupplier = defineAsyncComponent(() => import('@/components/section/sectionSupplier.vue'));
const SectionWarehouse = defineAsyncComponent(() => import('@/components/section/secionWarehouse.vue'));
const SectionCategory = defineAsyncComponent(() => import('@/components/section/sectionCategory.vue'));

const SectionSelectProducts = defineAsyncComponent(() => import('./sectionSelectProducts.vue'));
const SectionListImport = defineAsyncComponent(() => import('./sectionListImport.vue'));

const SectionCoupons = defineAsyncComponent(() => import('./sectionCoupons.vue'));
const SectionPayment = defineAsyncComponent(() => import('./sectionPayment.vue'));
const SectionInfo = defineAsyncComponent(() => import('./sectionInfo.vue'));

const router = useRouter();
const store = useStore();

const listBreadCrumb = ref<any[]>([
  {
    title: translate("warehouse.import"),
    url: "/warehouse-import",
  },
  {
    title: translate("warehouse.createImport"),
    url: "/create-import",
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

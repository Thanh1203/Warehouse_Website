<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="font-semibold text-2xl mb-6">{{ translate("warehouse.createImport") }}</div>

  <div class="w-full px-10 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
    <div>
      <SectionWarehouse/>
      <SectionSupplier/>
      <SectionCategory :type="'IMPORT'"/>
    </div>
    <div class="col-span-2">
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

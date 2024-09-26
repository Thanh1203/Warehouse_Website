<template>
  <div class="tw-mb-6">
    <span class="tw-text-[#aab8c5] tw-text-2xl tw-font-semibold">{{ translate('reportCustomer.title') }}</span>
  </div>

  <div class="tw-w-full tw-mb-6 tw-p-4 tw-relative tw-border">
    <div class="tw-bg-[#2E3A45] tw-w-fit tw-h-fit tw-text-[#aab8c5] tw-p-1 tw-absolute tw-top-[-17px]">
      {{ translate('reportCustomer.NumberNewCustomers') }}
    </div>
    <Compo1/>
  </div>

  <Compo2/>

  <Compo3 :data="dataReportCustomer"/>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "vuex";

const Compo1 = defineAsyncComponent(() => import("./components/compo1.vue"));
const Compo2 = defineAsyncComponent(() => import("./components/compo2.vue"));
const Compo3 = defineAsyncComponent(() => import("./components/compo3.vue"));

const store = useStore();

const dataReportCustomer = computed(() => store.getters["report/reportCustomer"]);

const fetchData = async () => {
  await store.dispatch("report/fetchDataReportCustomer");
};

const fetchDataNewCustomerYear = async (params) => {
  await store.dispatch("report/fetchDataReportNewCustomerYear", params);
};

onMounted(async () => {
  const currentYear = dayjs().year();
  fetchDataNewCustomerYear(currentYear);
  fetchData();
});
</script>
<style scoped lang="scss"></style>

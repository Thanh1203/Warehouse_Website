<template>
  <div class="tw-mb-6">
    <span class="tw-text-[#aab8c5] tw-text-2xl tw-font-semibold">{{ translate('reportSale.title') }}</span>
  </div>

  <div class="tw-w-full tw-mb-6 tw-p-4 tw-relative tw-border">
    <div class="tw-bg-[#2E3A45] tw-w-fit tw-h-fit tw-text-[#aab8c5] tw-p-1 tw-absolute tw-top-[-17px]">
      {{ translate('reportSale.currentRevenue') }}
    </div>
    <Compo1/>
    <Compo2/>
  </div>

  <div class="tw-h-[70vh] tw-w-full tw-flex tw-gap-6 tw-bg-white tw-mt-6 tw-rounded-xl tw-p-4 tw-justify-around">
    <div class="tw-p-4 tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center">
      <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("RevenueStatisticsRegion") }}</div>
      <Chartpie v-if="!loading" :data="dataChartWarehouse"/>
      <a-skeleton v-else :loading="loading" active />
    </div>

  </div>

  <div class="tw-w-full tw-h-[70vh] tw-flex tw-flex-col tw-mt-6 tw-gap-x-6 tw-bg-white tw-rounded-xl tw-p-4">
    <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("RevenueEachMonth") }}</div>
    <div class="tw-grow">
      <Chartbar v-if="!loading" :data="dataChartRevenuaMonth" />
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>

  <div class="tw-w-full tw-h-[70vh] tw-flex tw-flex-col tw-mt-6 tw-gap-x-6 tw-bg-white tw-rounded-xl tw-p-4">
    <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("RevenueEachWarehouse") }}</div>
    <div class="tw-grow">
      <Chartbar v-if="!loading" :data="dataChartRevenuaWarehouse" />
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { MONTH_IN_YEAR } from "@/constants";
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import Chartpie from "@/components/Chartpie/index.vue";
import Chartbar from "@/components/Chartbar/index.vue";
import { getArrayRandColor } from "@/utils/common";
import { useStore } from "vuex";
import dayjs, { Dayjs } from "dayjs";

const Compo1 = defineAsyncComponent(() => import("./components/compo1.vue"));
const Compo2 = defineAsyncComponent(() => import("./components/compo2.vue"));

const store = useStore();

const loading = computed(() => store.getters["report/loading"]);
const dataReportRevenue = computed(() => store.getters["report/reportRevenue"]);
const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});
const dataChartRevenuaMonth = computed(() => ({
  labels: labelChart.value,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#1fe074",
      maxBarThickness: 20,
      minBarLength: 2,
      data: dataReportRevenue.value?.monthRenenue,
    },
  ],
}));

const dataChartWarehouse = computed(() =>({
  labels: dataReportRevenue.value?.areaWarehouseRenenue?.names,
  datasets: [
    {
      backgroundColor: getArrayRandColor(4),
      data: dataReportRevenue.value?.areaWarehouseRenenue?.totalValue,
    },
  ],
}));
const dataChartRevenuaWarehouse = computed(() => ({
  labels: dataReportRevenue.value?.warehouseRenenue?.codes,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#1fe074",
      maxBarThickness: 20,
      minBarLength: 2,
      data: dataReportRevenue.value?.warehouseRenenue?.totalValue,
    },
  ],
}));


// const fetchData = async (params) => {
//   await store.dispatch("report/fetchDataReportRevenue", params);
// }


// onMounted(async () => {
//   const currentYear = dayjs().year();
//   fetchData(currentYear);
// })
</script>
<style scoped lang="scss"></style>

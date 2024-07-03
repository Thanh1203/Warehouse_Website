<template>
  <div class="tw-mb-6">
    <span class="tw-text-[#aab8c5] tw-text-2xl tw-font-semibold">{{ translate('reportSale.title') }}</span>
  </div>

  <a-tabs v-model:activeKey="activeKey" type="card" class="new-tabs">
    <a-tab-pane key="1" :tab="translate('reportCommon.overview')">
      <CurrentReport/>
    </a-tab-pane>
    <a-tab-pane key="2" :tab="translate('reportCommon.detail')">
      <div></div>
    </a-tab-pane>
  </a-tabs>


  <!-- <div class="tw-w-full tw-mb-6 tw-p-4 tw-relative tw-border">
    <div class="tw-bg-[#2E3A45] tw-w-fit tw-h-fit tw-text-[#aab8c5] tw-p-1 tw-absolute tw-top-[-17px]">
      {{ translate('reportSale.currentRevenue') }}
    </div>
    <CurrentReport/>
  </div>
   -->

  <!--<a-tabs size="small" class="tw-text-[#eef2f5]">
    <a-tab-pane v-for="(item, idx) in listWarehouse" :key="idx" :tab="item.name">
      <DetailReport/>
    </a-tab-pane>
  </a-tabs> -->

  <!-- <div class="tw-h-[70vh] tw-w-full tw-flex tw-gap-6 tw-bg-white tw-mt-6 tw-rounded-xl tw-p-4 tw-justify-around">
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
  </div> -->

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

const DetailReport = defineAsyncComponent(() => import("./components/detailReport.vue"));
const CurrentReport = defineAsyncComponent(() => import("./components/currentReport.vue"));

const store = useStore();

const activeKey = ref('1');

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

const listWarehouse = [
  {
    name: "kho 1"
  },
  {
    name: "kho 2"
  },
  {
    name: "kho 3"
  }
]
</script>
<style scoped lang="scss"></style>

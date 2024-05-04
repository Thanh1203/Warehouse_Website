<template>
  <a-form class="tw-flex tw-rounded-xl tw-bg-white tw-px-6 tw-py-5 tw-mb-6 tw-gap-6">
    <a-form-item>
      <span class="tw-opacity-70 tw-mr-4">{{ translate("Year") }}</span>
      <a-date-picker picker="year" :allowClear="false" :placeholder="translate('SelectYear')" v-model:value="filterSearching"/>
    </a-form-item>
    <a-form-item>
      <AntdButton :type="'primary'" ghost @click="handleSetTimePresent">
        <template #icon>
          <font-awesome-icon :icon="['far', 'clock']" />
        </template>
        <span class="tw-ml-2">{{ translate("Present") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>

  <div class="tw-grid tw-w-full tw-gap-4 tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-3 tw-mt-6">
    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'coins']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalRevenue") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportRevenue?.totalRevenue" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'coins']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("AverageDailyRevenue") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportRevenue?.averageDailyRevenue" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'coins']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("AverageMonthlyRevenue") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportRevenue?.averageMonthlyRevenue" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>
  </div>

  <div class="tw-h-[70vh] tw-w-full tw-flex tw-gap-6 tw-bg-white tw-mt-6 tw-rounded-xl tw-p-4 tw-justify-around">
    <div class="tw-p-4 tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center">
      <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("RevenueStatisticsRegion") }}</div>
      <Chartpie v-if="!loading" :data="dataChartWarehouse"/>
      <a-skeleton v-else :loading="loading" active />
    </div>

    <div class="tw-p-4 tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center">
      <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("QuarterlyRevenue") }}</div>
      <Chartpie v-if="!loading" :data="dataChartQuarter" />
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
import AntdButton from "@/components/antd-button/index.vue";
import NumberAnimation from "vue-number-animation";
import { MONTH_IN_YEAR } from "@/constants";
import { computed, onMounted, ref, watch } from "vue";
import Chartpie from "@/components/Chartpie/index.vue";
import Chartbar from "@/components/Chartbar/index.vue";
import { getArrayRandColor } from "@/utils/common";
import { useStore } from "vuex";
import dayjs, { Dayjs } from "dayjs";

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
const dataChartQuarter = computed(() =>({
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      backgroundColor: getArrayRandColor(4),
      data: dataReportRevenue.value?.quaterlyRevenue,
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


const filterSearching = ref<Dayjs>(dayjs());

const handleSetTimePresent = () => {
  filterSearching.value = dayjs();
};

const theFormat = (number) => {
  return number.toLocaleString('en-US');
};

const fetchData = async (params) => {
  await store.dispatch("report/fetchDataReportRevenue", params);
}

watch(
  () => filterSearching.value,
  (val) => {
    fetchData(val.year());
  }
)

onMounted(async () => {
  const currentYear = dayjs().year();
  fetchData(currentYear);
})
</script>
<style scoped lang="scss"></style>

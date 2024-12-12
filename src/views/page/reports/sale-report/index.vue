<template>
  <a-form class="flex rounded-xl bg-white px-6 py-5 mb-6 gap-6">
    <a-form-item>
      <span class="opacity-70 mr-4">{{ translate("Year") }}</span>
      <a-date-picker picker="year" :allowClear="false" :placeholder="translate('SelectYear')" v-model:value="filterSearching"/>
    </a-form-item>
    <a-form-item>
      <AntdButton :type="'primary'" ghost @click="handleSetTimePresent">
        <template #icon>
          <font-awesome-icon :icon="['far', 'clock']" />
        </template>
        <span class="ml-2">{{ translate("Present") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>

  <div class="grid w-full gap-4 grid-cols-2 lg:gap-8 lg:grid-cols-3 mt-6">
    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
      <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'coins']" size="xl" style="color: #ffffff" />
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("TotalRevenue") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportRevenue?.totalRevenue" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
      <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'coins']" size="xl" style="color: #ffffff" />
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("AverageDailyRevenue") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportRevenue?.averageDailyRevenue" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
      <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'coins']" size="xl" style="color: #ffffff" />
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("AverageMonthlyRevenue") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportRevenue?.averageMonthlyRevenue" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>
  </div>

  <div class="h-[70vh] w-full flex gap-6 bg-white mt-6 rounded-xl p-4 justify-around">
    <div class="p-4 h-full flex flex-col justify-center items-center">
      <div class="mb-6 font-[700] text-[18px] text-[#001f3f]">{{ translate("RevenueStatisticsRegion") }}</div>
      <Chartpie v-if="!loading" :data="dataChartWarehouse"/>
      <a-skeleton v-else :loading="loading" active />
    </div>

    <div class="p-4 h-full flex flex-col justify-center items-center">
      <div class="mb-6 font-[700] text-[18px] text-[#001f3f]">{{ translate("QuarterlyRevenue") }}</div>
      <Chartpie v-if="!loading" :data="dataChartQuarter" />
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>

  <div class="w-full h-[70vh] flex flex-col mt-6 gap-x-6 bg-white rounded-xl p-4">
    <div class="mb-6 font-[700] text-[18px] text-[#001f3f]">{{ translate("RevenueEachMonth") }}</div>
    <div class="grow">
      <Chartbar v-if="!loading" :data="dataChartRevenuaMonth" />
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>

  <div class="w-full h-[70vh] flex flex-col mt-6 gap-x-6 bg-white rounded-xl p-4">
    <div class="mb-6 font-[700] text-[18px] text-[#001f3f]">{{ translate("RevenueEachWarehouse") }}</div>
    <div class="grow">
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

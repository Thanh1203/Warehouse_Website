<template>
  <a-form class="tw-flex tw-rounded-xl tw-bg-white tw-px-6 tw-py-5 tw-mb-6 tw-gap-6">
    <a-form-item>
      <span class="tw-opacity-70 tw-mr-4">{{ translate("Year") }}</span>
      <a-date-picker picker="year" :allowClear="false" :placeholder="translate('SelectYear')" />
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
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalRevenue") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("AverageDailyRevenue") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("AverageMonthlyRevenue") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>
  </div>

  <div class="tw-w-full tw-flex tw-justify-between tw-mt-6 tw-gap-x-6">
    <div class="tw-basis-1/4 tw-flex tw-flex-col tw-justify-between">
      <div class="tw-w-full tw-bg-white tw-rounded-xl tw-p-4">
        <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("QuarterlyRevenue") }}</div>
        <Chartpie :data="dataChartPie" />
      </div>
    </div>
    <div class="tw-basis-[70%] tw-p-4 tw-bg-white tw-rounded-xl">
      <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
        <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("RevenueEachMonth") }}</div>
        <div class="tw-grow">
          <Chartbar :data="dataChartBar" />
        </div>
      </div>
    </div>
  </div>

  <div class="tw-mt-6 tw-w-full tw-bg-white tw-p-6 tw-rounded-xl">
    <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("MonthlyRevenueDetails") }}</div>
    <a-form class="tw-flex tw-gap-6">
      <a-form-item>
        <span class="tw-opacity-70 tw-mr-4">{{ translate("Month") }}</span>
        <a-date-picker picker="month" :allowClear="false" :placeholder="translate('SelectMonth')" :format="'MM'" />
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
    <div class="tw-mt-6 tw-h-[500px]">
      <Chartbar :data="dataChartBar" />
    </div>
  </div>

  <div class="tw-w-full tw-flex tw-justify-between tw-mt-6 tw-gap-x-6">
    <div class="tw-basis-1/4 tw-flex tw-flex-col tw-justify-between">
      <div class="tw-w-full tw-bg-white tw-rounded-xl tw-p-4">
        <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("RevenueStatisticsRegion") }}</div>
        <Chartpie :data="dataChartPie" />
      </div>
    </div>
    <div class="tw-basis-[70%] tw-p-4 tw-bg-white tw-rounded-xl">
      <div class="tw-w-full tw-h-full tw-flex tw-flex-col">
        <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate("RevenuePerWarehouse") }}</div>
        <div class="tw-grow">
          <Chartbar :data="dataChartBar" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import NumberAnimation from "vue-number-animation";
import { MONTH_IN_YEAR } from "@/constants";
import { computed, ref } from "vue";
import Chartpie from "@/components/Chartpie/index.vue";
import Chartbar from "@/components/Chartbar/index.vue";
import { getArrayRandColor } from "@/utils/common";

const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const dataChartBar = {
  labels: labelChart.value,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#1fe074",
      maxBarThickness: 20,
      minBarLength: 2,
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

// char pie
const dataChartPie = ref({
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      backgroundColor: getArrayRandColor(4),
      data: [40, 40, 20, 60],
    },
  ],
});

const handleSetTimePresent = () => {};

const theFormat = (number) => {
  return number.toFixed(0);
};
</script>
<style scoped lang="scss"></style>

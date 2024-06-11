<template>
  <div class="tw-mt-4 tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 xl:tw-grid-cols-4 xl:tw-gap-8">
    <div class="tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-1 xl:tw-gap-6 tw-h-[464px] md:tw-h-[232px] xl:tw-h-[488px]">
      <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-h-full">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("CurrentRevenue") }}</div>
          <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
            <font-awesome-icon :icon="['fas', 'money-check-dollar']" size="xl" style="color: #727cf5" />
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-h-[calc(100%-49px)]">
          <div class="tw-text-[#aab8c5] tw-truncate">
            <NumberAnimation v-if="!loading" :from="0" :to="10000000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-4xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          </div>
        </div>
      </div>

      <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-h-full">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("ReturnCustomerRate") }}</div>
          <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
            <font-awesome-icon :icon="['fas', 'percent']" size="xl" style="color: #727cf5" />
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-justify-around tw-flex-wrap tw-gap-x-6 tw-h-[calc(100%-49px)]">
          <div class="tw-w-[120px] tw-h-[120px]">
            <ChartDoughnut :data="dataChartDoughnut"/>
          </div>
          <div v-if="!loading" class="tw-flex tw-items-center tw-truncate" :class="setTextColor(80)">
            <font-awesome-icon :icon="['fas', 'arrow-up']" size="xl" />
            <NumberAnimation :from="0" :to="80" :duration="1" autoplay easing="linear" :format="theFormatPercent" class="tw-text-4xl tw-ml-2" />
            <span class="tw-text-2xl tw-ml-1">%</span>
          </div>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 xl:tw-col-span-3">
      <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold tw-mb-6 tw-h-8">{{ translate("WeeklyRevenue") }}</div>
      <div class="tw-flex tw-justify-center tw-h-[400px]">
        <Chartbar v-if="!loading" :data="dataChartBar" />
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, ref } from "vue";
import NumberAnimation from "vue-number-animation";
import { getArrayRandColor, setBgColorChart, setTextColor } from "@/utils/common";
import { DAY_IN_WEEK } from "@/constants";
import Chartbar from "@/components/Chartbar/index.vue";
import ChartDoughnut from "@/components/ChartDoughnut/index.vue";

const props = defineProps({
  data: {
    type: Object,
  },
});

const loading = ref<boolean>(false);

const theFormat = (number) => {
  return number.toLocaleString("en-US");
};

const theFormatPercent = (number) => {
  return number.toFixed(2);
};

const labelChartBar = computed(() => {
  const result = [];
  DAY_IN_WEEK.forEach((e) => {
    result.push(translate(`dayInWeek.${e}`));
  })
  return result;
});

const dataChartBar = computed(() => ({
  labels: labelChartBar.value,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#11B588",
      data: [1000, 3000, 6000, 4000, 7000, 2000, 5000],
      tension: 0.4,
    },
  ],
}));

const bgColorChartDoughnut = computed(() => {
  const color = setBgColorChart(80);
  return ["#D3D3D3", color];
})

const dataChartDoughnut = computed(() => ({
  labels: ['', ''],
  datasets: [
    {
      backgroundColor: bgColorChartDoughnut.value,
      data: [20, 80]
    }
  ]
}));
</script>

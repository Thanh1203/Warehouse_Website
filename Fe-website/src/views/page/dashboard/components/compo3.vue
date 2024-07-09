<template>
  <div class="tw-mt-4 tw-grid tw-w-full tw-gap-4 tw-grid-cols-1 xl:tw-grid-cols-4 xl:tw-gap-8">
    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 xl:tw-col-span-3">
      <div class="tw-w-full tw-mb-6 tw-text-[#aab8c5] tw-font-semibold tw-flex tw-items-center tw-justify-between tw-h-8">
        <span class="tw-text-xl">{{ translate("Revenue") }}</span>

        <div class="tw-flex tw-items-center">
          <a-button class="tw-mr-2 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear">
            <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
          </a-button>

          <div class="tw-flex tw-items-center">
            <div class="tw-text-xl tw-mr-[-24px]">{{ translate("Year") }}</div>
            <a-date-picker class="date-picker-shedule tw-p-0 tw-m-0 tw-border-none" picker="year" v-model:value="formState.time" :bordered="false" :allowClear="false">
              <template #suffixIcon> </template>
            </a-date-picker>
          </div>

          <a-button class="tw-mr-1 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear">
            <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
          </a-button>
        </div>
      </div>
      <div class="tw-h-[50vh] tw-flex tw-justify-center">
        <Chartline v-if="!loading" :data="chartLine" />
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4">
      <div class="tw-text-[#aab8c5] tw-h-8 tw-mb-6 tw-font-semibold">
        <div class="tw-text-xl tw-truncate">{{ translate("ProductDistributionCategory") }}</div>
      </div>
      <div class="tw-h-[430px] tw-flex tw-justify-center tw-items-center">
        <Chartpie v-if="!loading" :data="chartPie" />
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MONTH_IN_YEAR } from "@/constants";
import { translate } from "@/languages/i18n";
import { getArrayRandColor } from "@/utils/common";
import dayjs, { Dayjs } from "dayjs";
import { computed, reactive, ref, watch } from "vue";
import Chartline from "@/components/Chartline/index.vue";
import Chartpie from "@/components/Chartpie/index.vue";

const loading = ref<boolean>(false);


const nextYear = () => {
  formState.time = dayjs(formState.time).add(1, "year");
};

const prevYear = () => {
  formState.time = dayjs(formState.time).subtract(1, "year");
};



const formState = reactive<{
  time: Dayjs;
}>({
  time: dayjs(),
});

watch(
  () => formState.time,
  () => {
    console.log(formState.time);
  }
)

//char line
const labelChartLine = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const chartLine = computed(() => ({
  labels: labelChartLine.value,
  datasets: [
    {
      label: translate("Revenue"),
      borderColor: "#6B74E0",
      data: [1802349, 2938475, 2129876, 2987623, 3098765, 4567812, 3893210, 4987654, 3998371, 3999876, 4999998, 5000000],
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const {ctx: context, chartArea} = chart;
        if (!chartArea) {
          // This case happens on initial chart load
          return null;
        }
        const gradient = context.createLinearGradient(0, 0, 0, chartArea.bottom);
        gradient.addColorStop(1, 'transparent');
        gradient.addColorStop(0, '#6B74E0');

        return gradient;
      },
      fill: true
    },
  ],
  radius: 0,
}));

// char pie
const chartPie = computed(() => ({
  labels: ["sp1", "sp2", "sp3"],
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: [30, 50, 20 ],
    },
  ],
}));
</script>

<template>
  <div class="tw-bg-[#37404a] tw-rounded-lg xl:tw-col-span-3">
    <div class="tw-w-full tw-mb-6 tw-text-[#aab8c5] tw-font-semibold tw-flex tw-items-center tw-justify-between tw-h-8">
      <span class="tw-text-xl">{{ translate("reportSale.orderQuantity") }}</span>

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
      <Chartline v-if="!loading" :data="chartLine" :ticks-limit="10"/>
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>
</template>
<script setup lang="ts">
import { DAY_IN_WEEK, MONTH_IN_YEAR } from "@/constants";
import { translate } from "@/languages/i18n";
import { computed, reactive, ref } from "vue";
import Chartline from "@/components/Chartline/index.vue";
import dayjs, { Dayjs } from "dayjs";

const loading = ref<boolean>(false);

const setData = () => {
  const data = [];
  let prev = 100;
  for (let i = 0; i < 1000; i++) {
    const randomChange = 5 - Math.random() * 10;
    prev = Math.max(0, prev + randomChange);
    data.push({ x: `${i} + 1`, y: prev });
  }
  return data;
};

const chartLine = computed(() => ({
  labels: setData().map((item) => item.x),
  datasets: [
    {
      label: translate("reportCommon.order"),
      borderColor: "#1DB589",
      data: setData().map((item) => item.y),
      radius: 0,
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const {ctx: context, chartArea} = chart;
        if (!chartArea) {
          return null;
        }
        const gradient = context.createLinearGradient(0, 0, 0, chartArea.bottom);
        gradient.addColorStop(1, 'transparent');
        gradient.addColorStop(0, '#1DB589');

        return gradient;
      },
      fill: true
    },
  ],
}));

const formState = reactive<{
  time: Dayjs;
}>({
  time: dayjs(),
});


const nextYear = () => {
  formState.time = dayjs(formState.time).add(1, "year");
};

const prevYear = () => {
  formState.time = dayjs(formState.time).subtract(1, "year");
};
</script>

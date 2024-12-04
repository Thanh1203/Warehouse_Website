<template>
  <div class="mt-4 grid w-full gap-4 grid-cols-1 xl:grid-cols-4 xl:gap-8">
    <div class="bg-[#37404a] rounded-lg p-4 xl:col-span-3">
      <div class="w-full mb-6 text-[#aab8c5] font-semibold flex items-center justify-between h-8">
        <span class="text-xl">{{ translate("Revenue") }}</span>

        <div class="flex items-center">
          <a-button class="mr-2 text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear">
            <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
          </a-button>

          <div class="flex items-center">
            <div class="text-xl mr-[-24px]">{{ translate("Year") }}</div>
            <a-date-picker class="date-picker-shedule p-0 m-0 border-none" picker="year" v-model:value="formState.time" :bordered="false" :allowClear="false">
              <template #suffixIcon> </template>
            </a-date-picker>
          </div>

          <a-button class="mr-1 text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear">
            <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
          </a-button>
        </div>
      </div>
      <div class="h-[50vh] flex justify-center">
        <Chartline v-if="!loading" :data="chartLine" />
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>

    <div class="bg-[#37404a] rounded-lg p-4">
      <div class="text-[#aab8c5] h-8 mb-6 font-semibold">
        <div class="text-xl truncate">{{ translate("ProductDistributionCategory") }}</div>
      </div>
      <div class="h-[430px] flex justify-center items-center">
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

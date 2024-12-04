<template>
  <div class="mb-6 h-8 flex justify-between">
    <div class="text-xl text-[#aab8c5] font-semibold">{{ translate("reportCustomer.NumberNewCustomers") }}</div>
    <div class="flex items-center">
      <a-button class="mr-2 text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear">
        <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
      </a-button>

      <div class="flex items-center">
        <div class="text-xl text-[#aab8c5] mr-[-24px]">{{ translate("Year") }}</div>
        <a-date-picker class="date-picker-shedule p-0 m-0 border-none" picker="year" v-model:value="formState.time" :bordered="false" :allowClear="false">
          <template #suffixIcon> </template>
        </a-date-picker>
      </div>

      <a-button class="mr-1 text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear">
        <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
      </a-button>
    </div>
  </div>
  <div class="h-[410px]">
    <Chartline :data="dataChartLine"/>
  </div>
</template>
<script setup lang="ts">
import Chartline from "@/components/Chartline/index.vue";
import { MONTH_IN_YEAR } from "@/constants";
import { translate } from "@/languages/i18n";
import dayjs, { Dayjs } from "dayjs";
import { computed, reactive } from "vue";

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

const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const dataChartLine = computed(() => ({
  labels: labelChart.value,
  datasets: [
    {
      barPercentage: 0.5,
      backgroundColor: "#6B74E0",
      borderColor: "#6B74E0",
      data: [300, 350, 320, 370, 340, 390, 360, 410, 380, 430, 400, 420],
      tension: 0.4,
    },
  ],
}));
</script>

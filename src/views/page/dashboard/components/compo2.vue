<template>
  <div class="mt-4 w-full grid gap-4 grid-cols-1 xl:grid-cols-4 xl:gap-8">
    <div class="w-full grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-1 xl:gap-6 h-[464px] md:h-[232px] xl:h-[488px]">
      <div class="bg-[#37404a] rounded-lg p-4 h-full">
        <div class="flex justify-between">
          <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("CurrentRevenue") }}</div>
          <div class="bg-[#464F74] p-3 rounded-lg">
            <font-awesome-icon :icon="['fas', 'money-check-dollar']" size="xl" style="color: #727cf5" />
          </div>
        </div>

        <div class="flex items-center h-[calc(100%-49px)]">
          <div class="text-[#aab8c5] truncate">
            <NumberAnimation v-if="!loading" :from="0" :to="100000000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-4xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          </div>
        </div>
      </div>

      <div class="bg-[#37404a] rounded-lg p-4 h-full">
        <div class="flex justify-between">
          <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("ReturnCustomerRate") }}</div>
          <div class="bg-[#464F74] p-3 rounded-lg">
            <font-awesome-icon :icon="['fas', 'percent']" size="xl" style="color: #727cf5" />
          </div>
        </div>

        <div class="flex items-center justify-around flex-wrap gap-x-6 h-[calc(100%-49px)]">
          <div class="w-[120px] h-[120px]">
            <ChartDoughnut :data="dataChartDoughnut"/>
          </div>
          <div v-if="!loading" class="flex items-center truncate" :class="setTextColor(80)">
            <font-awesome-icon :icon="['fas', 'arrow-up']" size="xl" />
            <NumberAnimation :from="0" :to="80" :duration="1" autoplay easing="linear" :format="theFormatPercent" class="text-4xl ml-2" />
            <span class="text-2xl ml-1">%</span>
          </div>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="bg-[#37404a] rounded-lg p-4 xl:col-span-3">
      <div class="text-xl text-[#aab8c5] font-semibold mb-6 h-8">{{ translate("WeeklyRevenue") }}</div>
      <div class="flex justify-center h-[400px]">
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

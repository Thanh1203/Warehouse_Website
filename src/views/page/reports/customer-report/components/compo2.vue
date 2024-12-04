<template>
  <div class="w-full mb-6 grid gap-4 grid-cols-1 lg:gap-8 lg:grid-cols-4">
    <div class="rounded-lg grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1">
      <div class="bg-[#37404a] h-[150px] p-4 rounded-lg flex flex-col justify-between">
        <div class="flex justify-between">
          <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("reportCustomer.total") }}</div>
          <div class="bg-[#464F74] p-3 rounded-lg">
            <font-awesome-icon :icon="['fas', 'user-group']" style="color: #727cf5" />
          </div>
        </div>
        <div class="text-[#aab8c5] mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="bg-[#37404a] h-[150px] p-4 rounded-lg flex flex-col justify-between">
        <div class="flex justify-between">
          <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("reportCustomer.TotalPurchases") }}</div>
          <div class="bg-[#464F74] p-3 rounded-lg">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" style="color: #727cf5" />
          </div>
        </div>
        <div class="text-[#aab8c5] mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="10000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="bg-[#37404a] rounded-lg p-4 h-[150px]">
        <div class="flex justify-between">
          <div class="text-[#8391a2] text-base truncate font-semibold">{{ translate("ReturnCustomerRate") }}</div>
          <div class="bg-[#464F74] p-3 rounded-lg">
            <font-awesome-icon :icon="['fas', 'percent']" style="color: #727cf5" />
          </div>
        </div>

        <div class="flex items-center gap-x-6 h-[calc(100%-48px)] relative">
          <div class="chartDoughnut-style absolute left-2">
            <ChartDoughnut :data="dataChartDoughnut"/>
          </div>
          <div v-if="!loading" class="flex items-center truncate ml-[104px] md:ml-[80px] lg:ml-[100px]" :class="setTextColor(80)">
            <font-awesome-icon :icon="['fas', 'arrow-up']" size="xl" />
            <NumberAnimation :from="0" :to="80" :duration="1" autoplay easing="linear" :format="theFormatPercent" class="text-4xl ml-2 md:text-xl" />
            <span class="text-2xl ml-1">%</span>
          </div>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

    </div>
    <div class="bg-[#37404a] rounded-lg p-4 lg:col-span-2">
      <ChartCustomerMonth v-if="!loading"/>
      <a-skeleton v-else :loading="loading" active />
    </div>
    <div class="bg-[#37404a] rounded-lg p-4 flex flex-col justify-between">
      <div class="mb-6 h-14 text-xl text-[#aab8c5] font-semibold">{{ translate("reportCustomer.StatisticsPurchases") }}</div>
      <div class="h-[380px] flex items-center justify-center">
        <Chartpie :data="dataChartPie" v-if="!loading"/>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import NumberAnimation from "vue-number-animation";
import ChartDoughnut from "@/components/ChartDoughnut/index.vue";
import { getArrayRandColor, setBgColorChart, setTextColor } from "@/utils/common";
import Chartpie from "@/components/Chartpie/index.vue";
import { PURCHASETIMES } from "@/constants";

const ChartCustomerMonth = defineAsyncComponent(() => import("./chartCustomerMonths.vue"));

const props = defineProps({
  data: {
    type: Object,
  },
});

const loading = ref<boolean>(false);

const theFormat = (number) => {
  return number.toLocaleString('en-US');
};

const theFormatPercent = (number) => {
  return number.toFixed(2);
};

const bgColorChartDoughnut = computed(() => {
  const color = setBgColorChart(80);
  return ["#D3D3D3", color];
});

const dataChartDoughnut = computed(() => ({
  labels: ['', ''],
  datasets: [
    {
      backgroundColor: bgColorChartDoughnut.value,
      data: [20, 80]
    }
  ]
}));

const labelChartPie = computed(() => {
  const result = [];
  PURCHASETIMES.forEach((e) => {
    result.push(translate(`pruchaseTimes.${e}`));
  });
  return result;
});

const dataChartPie = computed(() => ({
  labels: labelChartPie.value,
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: [10, 50, 40],
    },
  ],
}));

</script>
<style lang="scss">
.chartDoughnut-style {
  height: 80px;
  width: 80px;
}
@media screen and (min-width: 768px) and (max-width: 1280px) {
  .chartDoughnut-style {
      height: 60px; /* Chiều cao là 60px */
      width: 60px; /* Chiều rộng là 60px */
  }
}
</style>
<template>
  <div class="tw-w-full tw-mb-6 tw-grid tw-gap-4 tw-grid-cols-1 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-rounded-lg tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3 lg:tw-grid-cols-1">
      <div class="tw-bg-[#37404a] tw-h-[150px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("reportCustomer.total") }}</div>
          <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
            <font-awesome-icon :icon="['fas', 'user-group']" style="color: #727cf5" />
          </div>
        </div>
        <div class="tw-text-[#aab8c5] tw-mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="tw-bg-[#37404a] tw-h-[150px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("reportCustomer.TotalPurchases") }}</div>
          <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" style="color: #727cf5" />
          </div>
        </div>
        <div class="tw-text-[#aab8c5] tw-mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="10000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-h-[150px]">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("ReturnCustomerRate") }}</div>
          <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
            <font-awesome-icon :icon="['fas', 'percent']" style="color: #727cf5" />
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-gap-x-6 tw-h-[calc(100%-48px)] tw-relative">
          <div class="chartDoughnut-style tw-absolute tw-left-2">
            <ChartDoughnut :data="dataChartDoughnut"/>
          </div>
          <div v-if="!loading" class="tw-flex tw-items-center tw-truncate tw-ml-[104px] md:tw-ml-[80px] lg:tw-ml-[100px]" :class="setTextColor(80)">
            <font-awesome-icon :icon="['fas', 'arrow-up']" size="xl" />
            <NumberAnimation :from="0" :to="80" :duration="1" autoplay easing="linear" :format="theFormatPercent" class="tw-text-4xl tw-ml-2 md:tw-text-xl" />
            <span class="tw-text-2xl tw-ml-1">%</span>
          </div>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

    </div>
    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 lg:tw-col-span-2 tw-flex tw-flex-col tw-justify-between">
      <ChartCustomerMonth v-if="!loading"/>
      <a-skeleton v-else :loading="loading" active />
    </div>
    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-flex tw-flex-col tw-justify-between">
      <div class="tw-mb-6 tw-h-14 tw-text-xl tw-text-[#aab8c5] tw-font-semibold">{{ translate("reportCustomer.StatisticsPurchases") }}</div>
      <div class="tw-h-[380px] tw-flex tw-items-center tw-justify-center">
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
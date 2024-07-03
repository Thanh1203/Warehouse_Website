<template>
  <div class="tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 lg:tw-gap-8 tw-mb-6">
    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCommon.byWeek") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
          <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCommon.byMonth") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', !statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastMonth") }}</template>
          <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastMonth") }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCommon.byQuater") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="1500" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastQuater") }}</template>
          <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastQuater") }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCommon.byYear") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', !statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastYear") }}</template>
          <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastYear") }}</span>
        </a-tooltip>
      </div>
    </div>
  </div>

  <div class="tw-w-full tw-mb-6 tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-3 lg:tw-grid-cols-1">
      <div class="tw-w-full tw-h-[120px] tw-bg-[#37404a] tw-p-4 tw-rounded-lg">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-text-[#aab8c5] tw-font-semibold">
          {{ translate("reportSale.averageDaily") }}
          <div class="tw-rounded-full tw-bg-[#464F74] tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff" />
          </div>
        </div>

        <div class="tw-text-[#aab8c5] tw-mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="tw-w-full tw-h-[120px] tw-bg-[#37404a] tw-p-4 tw-rounded-lg">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-text-[#aab8c5] tw-font-semibold">
          {{ translate("reportSale.averageMonthly") }}
          <div class="tw-rounded-full tw-bg-[#464F74] tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff" />
          </div>
        </div>

        <div class="tw-text-[#aab8c5] tw-mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="tw-w-full tw-h-[120px] tw-bg-[#37404a] tw-p-4 tw-rounded-lg">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-text-[#aab8c5] tw-font-semibold">
          {{ translate("reportSale.averageQuarterly") }}
          <div class="tw-rounded-full tw-bg-[#464F74] tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff" />
          </div>
        </div>

        <div class="tw-text-[#aab8c5] tw-mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 lg:tw-col-span-3">
      <div class="tw-mb-3 tw-text-xl tw-text-[#aab8c5] tw-font-semibold">{{ translate("Revenue") }}</div>
      <div class="tw-w-full tw-h-[calc(100%-40px)]">
        <Chartline v-if="!loading" :data="dataChartLine" :showLegend="true" />
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>

  <div class="tw-mb-3 tw-text-[#aab8c5] tw-text-lg tw-font-bold">{{ translate("reportCommon.order") }}</div>

  <div class="tw-w-full tw-mb-6 tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 lg:tw-col-span-3">
      <div class="tw-mb-3 tw-text-xl tw-text-[#aab8c5] tw-font-semibold">{{ translate('reportSale.ordersByDay') }}</div>
       <div class="tw-w-full tw-h-[calc(100%-40px)]">
         <Chartline v-if="!loading" :data="chartLine" :ticks-limit="10"/>
         <a-skeleton v-else :loading="loading" active />
       </div>
    </div>

    <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-3 lg:tw-grid-cols-1">
      <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCommon.today") }}</div>
        <div class="tw-text-[#aab8c5] tw-mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
          <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceYesterday") }}</template>
            <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceYesterday") }}</span>
          </a-tooltip>
        </div>
      </div>
      <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCommon.byWeek") }}</div>
        <div class="tw-text-[#aab8c5] tw-mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
          <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
          </a-tooltip>
        </div>
      </div>
      <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCommon.byMonth") }}</div>
        <div class="tw-text-[#aab8c5] tw-mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
          <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastMonth") }}</span>
          </a-tooltip>
        </div>
      </div>
    </div>
  </div>

  <div class="tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 lg:tw-gap-8">
    <div class="tw-h-40 tw-bg-[#37404a] tw-rounded-lg tw-overflow-hidden">
      <div class="tw-w-full tw-h-[calc(100%-2.5rem)] tw-p-4 tw-flex">
        <div class="tw-grow">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportSale.directOrder") }}</div>
          <div class="tw-text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="tw-w-12 tw-flex tw-items-center tw-justify-center">
          <div class="tw-w-full tw-h-12 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'shop']" size="lg" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4" :class="[statusTemp ? 'tw-bg-[#00B050]' : 'tw-bg-[#FF0000]']">
        <div class="tw-text-sm tw-text-white">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="tw-text-white">{{ translate("reportCommon.sinceLastMonth") }}</span>
          </a-tooltip>
      </div>
    </div>

    <div class="tw-h-40 tw-bg-[#37404a] tw-rounded-lg tw-overflow-hidden">
      <div class="tw-w-full tw-h-[calc(100%-2.5rem)] tw-p-4 tw-flex">
        <div class="tw-grow">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportSale.onlineOrders") }}</div>
          <div class="tw-text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="tw-w-12 tw-flex tw-items-center tw-justify-center">
          <div class="tw-w-full tw-h-12 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'globe']" size="lg" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4" :class="[!statusTemp ? 'tw-bg-[#00B050]' : 'tw-bg-[#ff2323]']">
        <div class="tw-text-sm tw-text-white">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="tw-text-white">{{ translate("reportCommon.sinceLastMonth") }}</span>
          </a-tooltip>
      </div>
    </div>
    
    <div class="tw-h-40 tw-bg-[#37404a] tw-rounded-lg tw-overflow-hidden">
      <div class="tw-w-full tw-h-[calc(100%-2.5rem)] tw-p-4 tw-flex">
        <div class="tw-grow">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportSale.deliverySuccessful") }}</div>
          <div class="tw-text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="tw-w-12 tw-flex tw-items-center tw-justify-center">
          <div class="tw-w-full tw-h-12 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'truck-fast']" size="lg" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4" :class="[statusTemp ? 'tw-bg-[#00B050]' : 'tw-bg-[#FF0000]']">
        <div class="tw-text-sm tw-text-white">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="tw-text-white">{{ translate("reportCommon.sinceLastMonth") }}</span>
          </a-tooltip>
      </div>
    </div>

    <div class="tw-h-40 tw-bg-[#37404a] tw-rounded-lg tw-overflow-hidden">
      <div class="tw-w-full tw-h-[calc(100%-2.5rem)] tw-p-4 tw-flex">
        <div class="tw-grow">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportSale.ordersFailed") }}</div>
          <div class="tw-text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="tw-w-12 tw-flex tw-items-center tw-justify-center">
          <div class="tw-w-full tw-h-12 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'truck-fast']" size="lg" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4" :class="[!statusTemp ? 'tw-bg-[#00B050]' : 'tw-bg-[#ff2323]']">
        <div class="tw-text-sm tw-text-white">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="tw-text-white">{{ translate("reportCommon.sinceLastMonth") }}</span>
          </a-tooltip>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { translate } from "@/languages/i18n";
import { computed, ref } from "vue";
import NumberAnimation from "vue-number-animation";
import Chartline from "@/components/Chartline/index.vue";
import { DAY_IN_WEEK } from "@/constants";

const loading = ref<boolean>(false);
const statusTemp = ref<boolean>(true);

const theFormat = (number) => {
  return number.toLocaleString("en-US");
};

const labelChart = computed(() => {
  const result = [];
  DAY_IN_WEEK.forEach((e) => {
    result.push(translate(`dayInWeek.${e}`));
  });
  return result;
});

const dataChartLine = computed(() => ({
  labels: labelChart.value,
  datasets: [
    {
      label: translate("reportCommon.preWeek"),
      barPercentage: 0.5,
      backgroundColor: "#37CE97",
      borderColor: "#37CE97",
      data: [300, 350, 320, 370, 340, 390, 360],
      tension: 0.4,
    },
    {
      label: translate("reportCommon.currentWeek"),
      barPercentage: 0.5,
      backgroundColor: "#6B74E0",
      borderColor: "#6B74E0",
      data: [350, 390, 420, 360, 370, 400, 430],
      tension: 0.4,
    },
  ],
}));


const setData = () => {
  const data = [];
  let prev = 100;
  for (let i = 0; i < 1000; i++) {
    const randomChange = 5 - Math.random() * 10;
    prev = Math.max(0, prev + randomChange);
    data.push({ x: `Ngày ${i}`, y: prev });
  }
  return data;
};

const chartLine = computed(() => ({
  labels: setData().map((item) => item.x),
  datasets: [
    {
      label: translate("reportSale.orderQuantity"),
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
</script>

<template>

  <div class="tw-w-full tw-mb-6 tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#37404a] tw-rounded-lg tw-p-4 lg:tw-col-span-3">
      <div class="tw-flex tw-items-center tw-justify-between">
        <div class="tw-mb-3 tw-text-xl tw-text-[#aab8c5] tw-font-semibold">{{ translate('reportSale.ordersByQuarter') }}</div>
        <div class="tw-flex tw-items-center">
        <a-button class="tw-mr-2 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear">
          <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
        </a-button>

        <div class="tw-flex tw-items-center">
          <a-date-picker class="date-picker-quarter tw-p-0 tw-m-0 tw-border-none" picker="quarter" v-model:value="formState.time" :bordered="false" :allowClear="false">
            <template #suffixIcon> </template>
          </a-date-picker>
        </div>

        <a-button class="tw-mr-1 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear">
          <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
        </a-button>
      </div>
      </div>
       <div class="tw-w-full tw-h-[488px]">
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
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4">
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
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4">
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
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4">
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
            <font-awesome-icon :icon="['fas', 'exclamation']" size="lg" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-h-10 tw-flex tw-items-center tw-truncate tw-gap-3 tw-p-4">
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
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { computed, defineAsyncComponent, reactive, ref } from 'vue';
import Chartline from "@/components/Chartline/index.vue";
import NumberAnimation from "vue-number-animation";
import dayjs, { Dayjs } from 'dayjs';

const props = defineProps({
  data: Object,
});

const loading = ref<boolean>(false);
const statusTemp = ref<boolean>(true);

const theFormat = (number) => {
  return number.toLocaleString("en-US");
};

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

const formState = reactive<{
  time: Dayjs;
}>({
  time: dayjs(),
});

const nextYear = () => {
  formState.time = dayjs(formState.time).add(3, "month");
};

const prevYear = () => {
  formState.time = dayjs(formState.time).subtract(3, "month");
};
</script>
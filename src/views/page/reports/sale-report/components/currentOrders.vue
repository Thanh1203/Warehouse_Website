<template>

  <div class="w-full mb-6 grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-4">
    <div class="bg-[#37404a] rounded-lg p-4 lg:col-span-3">
      <div class="flex items-center justify-between">
        <div class="mb-3 text-xl text-[#aab8c5] font-semibold">{{ translate('reportSale.ordersByQuarter') }}</div>
        <div class="flex items-center">
        <a-button class="mr-2 text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear">
          <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
        </a-button>

        <div class="flex items-center">
          <a-date-picker class="date-picker-quarter p-0 m-0 border-none" picker="quarter" v-model:value="formState.time" :bordered="false" :allowClear="false">
            <template #suffixIcon> </template>
          </a-date-picker>
        </div>

        <a-button class="mr-1 text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear">
          <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
        </a-button>
      </div>
      </div>
       <div class="w-full h-[488px]">
         <Chartline v-if="!loading" :data="chartLine" :ticks-limit="10"/>
         <a-skeleton v-else :loading="loading" active />
       </div>
    </div>

    <div class="w-full grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-1">
      <div class="bg-[#37404a] h-[160px] p-4 rounded-lg">
        <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.today") }}</div>
        <div class="text-[#aab8c5] mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="flex items-center truncate gap-3">
          <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceYesterday") }}</template>
            <span class="text-[#8391a2]">{{ translate("reportCommon.sinceYesterday") }}</span>
          </a-tooltip>
        </div>
      </div>

      <div class="bg-[#37404a] h-[160px] p-4 rounded-lg">
        <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byWeek") }}</div>
        <div class="text-[#aab8c5] mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="flex items-center truncate gap-3">
          <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
          </a-tooltip>
        </div>
      </div>

      <div class="bg-[#37404a] h-[160px] p-4 rounded-lg">
        <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byMonth") }}</div>
        <div class="text-[#aab8c5] mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="flex items-center truncate gap-3">
          <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
            <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastMonth") }}</span>
          </a-tooltip>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
    <div class="h-40 bg-[#37404a] rounded-lg overflow-hidden">
      <div class="w-full h-[calc(100%-2.5rem)] p-4 flex">
        <div class="grow">
          <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportSale.directOrder") }}</div>
          <div class="text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="w-12 flex items-center justify-center">
          <div class="w-full h-12 bg-white rounded-full flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'shop']" size="lg" />
          </div>
        </div>
      </div>
      <div class="w-full h-10 flex items-center truncate gap-3 p-4">
        <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
          <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="h-40 bg-[#37404a] rounded-lg overflow-hidden">
      <div class="w-full h-[calc(100%-2.5rem)] p-4 flex">
        <div class="grow">
          <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportSale.onlineOrders") }}</div>
          <div class="text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="w-12 flex items-center justify-center">
          <div class="w-full h-12 bg-white rounded-full flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'globe']" size="lg" />
          </div>
        </div>
      </div>
      <div class="w-full h-10 flex items-center truncate gap-3 p-4">
        <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
          <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
        </a-tooltip>
      </div>
    </div>
    
    <div class="h-40 bg-[#37404a] rounded-lg overflow-hidden">
      <div class="w-full h-[calc(100%-2.5rem)] p-4 flex">
        <div class="grow">
          <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportSale.deliverySuccessful") }}</div>
          <div class="text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="w-12 flex items-center justify-center">
          <div class="w-full h-12 bg-white rounded-full flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'truck-fast']" size="lg" />
          </div>
        </div>
      </div>
      <div class="w-full h-10 flex items-center truncate gap-3 p-4">
        <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
          <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="h-40 bg-[#37404a] rounded-lg overflow-hidden">
      <div class="w-full h-[calc(100%-2.5rem)] p-4 flex">
        <div class="grow">
          <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportSale.ordersFailed") }}</div>
          <div class="text-[#aab8c5]">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        </div>
        <div class="w-12 flex items-center justify-center">
          <div class="w-full h-12 bg-white rounded-full flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'exclamation']" size="lg" />
          </div>
        </div>
      </div>
      <div class="w-full h-10 flex items-center truncate gap-3 p-4">
        <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
          <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
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
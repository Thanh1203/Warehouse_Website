<template>
  <div class="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 mb-6">
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

    <div class="bg-[#37404a] h-[160px] p-4 rounded-lg flex flex-col justify-between">
      <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byMonth") }}</div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="flex items-center truncate gap-3">
        <div :class="['text-sm', !statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastMonth") }}</template>
          <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastMonth") }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="bg-[#37404a] h-[160px] p-4 rounded-lg flex flex-col justify-between">
      <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byQuater") }}</div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="1500" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="flex items-center truncate gap-3">
        <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastQuater") }}</template>
          <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastQuater") }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="bg-[#37404a] h-[160px] p-4 rounded-lg flex flex-col justify-between">
      <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byYear") }}</div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="flex items-center truncate gap-3">
        <div :class="['text-sm', !statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp" />
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate("reportCommon.sinceLastYear") }}</template>
          <span class="text-[#8391a2]">{{ translate("reportCommon.sinceLastYear") }}</span>
        </a-tooltip>
      </div>
    </div>
  </div>

  <div class="w-full mb-6 grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-4">
    <div class="w-full grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-1">
      <div class="w-full h-[120px] bg-[#37404a] p-4 rounded-lg">
        <div class="w-full flex items-center justify-between text-[#aab8c5] font-semibold">
          {{ translate("reportSale.averageDaily") }}
          <div class="rounded-full bg-[#464F74] h-10 w-10 flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff" />
          </div>
        </div>

        <div class="text-[#aab8c5] mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="w-full h-[120px] bg-[#37404a] p-4 rounded-lg">
        <div class="w-full flex items-center justify-between text-[#aab8c5] font-semibold">
          {{ translate("reportSale.averageMonthly") }}
          <div class="rounded-full bg-[#464F74] h-10 w-10 flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff" />
          </div>
        </div>

        <div class="text-[#aab8c5] mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="w-full h-[120px] bg-[#37404a] p-4 rounded-lg">
        <div class="w-full flex items-center justify-between text-[#aab8c5] font-semibold">
          {{ translate("reportSale.averageQuarterly") }}
          <div class="rounded-full bg-[#464F74] h-10 w-10 flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff" />
          </div>
        </div>

        <div class="text-[#aab8c5] mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="bg-[#37404a] rounded-lg p-4 lg:col-span-3">
      <div class="mb-3 text-xl text-[#aab8c5] font-semibold">{{ translate("Revenue") }}</div>
      <div class="w-full h-[calc(100%-40px)]">
        <Chartline v-if="!loading" :data="dataChartLine" :showLegend="true" />
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { DAY_IN_WEEK } from '@/constants';
import { translate } from '@/languages/i18n';
import { computed, ref } from 'vue';
import NumberAnimation from "vue-number-animation";
import Chartline from "@/components/Chartline/index.vue";

const props = defineProps({
  data: Object,
});

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
</script>
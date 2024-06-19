<template>
  <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-3 lg:tw-grid-cols-1">
      <div class="tw-w-full tw-h-[120px] tw-bg-[#37404a] tw-p-4 tw-rounded-lg">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-text-[#aab8c5] tw-font-semibold">
          {{ translate('reportSale.averageDaily') }}
          <div class="tw-rounded-full tw-bg-[#bee6f9] tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff;" />
          </div>
        </div>

        <div class="tw-text-[#aab8c5] tw-mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="tw-w-full tw-h-[120px] tw-bg-[#37404a] tw-p-4 tw-rounded-lg">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-text-[#aab8c5] tw-font-semibold">
          {{ translate('reportSale.averageMonthly') }}
          <div class="tw-rounded-full tw-bg-[#bee6f9] tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff;" />
          </div>
        </div>

        <div class="tw-text-[#aab8c5] tw-mt-4">
          <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>

      <div class="tw-w-full tw-h-[120px] tw-bg-[#37404a] tw-p-4 tw-rounded-lg">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-text-[#aab8c5] tw-font-semibold">
          {{ translate('reportSale.averageQuarterly') }}
          <div class="tw-rounded-full tw-bg-[#bee6f9] tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center">
            <font-awesome-icon :icon="['fas', 'sack-dollar']" style="color: #ffffff;" />
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
        <Chartline :data="dataChartLine" :showLegend="true"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { computed, ref } from 'vue';
import NumberAnimation from "vue-number-animation";
import Chartline from "@/components/Chartline/index.vue";
import { DAY_IN_WEEK } from '@/constants';

const loading = ref<boolean>(false);

const theFormat = (number) => {
  return number.toLocaleString('en-US');
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
      label: translate('reportCommon.preWeek'),
      barPercentage: 0.5,
      backgroundColor: "#37CE97",
      borderColor: "#37CE97",
      data: [300, 350, 320, 370, 340, 390, 360],
      tension: 0.4,
    },
    {
      label: translate('reportCommon.currentWeek'),
      barPercentage: 0.5,
      backgroundColor: "#6B74E0",
      borderColor: "#6B74E0",
      data: [350, 390, 420, 360, 370, 400, 430],
      tension: 0.4,
    },
  ],
}));
</script>
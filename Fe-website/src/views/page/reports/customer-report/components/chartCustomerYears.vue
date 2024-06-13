<template>
  <div class="tw-w-full tw-h-[28px] tw-mb-6 tw-px-4">
    <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold ">{{ translate("reportCustomer.NumberNewCustomersYear") }}</div>
  </div>
  <div class="tw-h-[calc(100%-52px)] tw-grid tw-grid-cols-12">
    <div class="tw-flex tw-items-center tw-justify-center">
      <a-button @click="prevfiveYear" class="tw-flex tw-items-center tw-justify-center tw-text-white tw-border-none">
        <font-awesome-icon :icon="['fas', 'chevron-left']" size="2xl"/>
      </a-button>
    </div>
    <div class="tw-col-span-10">
      <Chartbar v-if="!loading" :data="dataChartBar" />
      <a-skeleton v-else :loading="loading" active />
    </div>
    <div class="tw-flex tw-items-center tw-justify-center">
      <a-button @click="nextfiveYear" class="tw-flex tw-items-center tw-justify-center tw-text-white tw-border-none">
        <font-awesome-icon :icon="['fas', 'chevron-right']" size="2xl"/>
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import Chartbar from "@/components/Chartbar/index.vue";
import { computed, ref } from "vue";

const loading = ref<boolean>(false);

const dataChartBar = computed(() => ({
  labels: [2019, 2020, 2021, 2022, 2023, 2024],
  datasets: [
    {
      backgroundColor: "#11B588",
      data: [100, 500, 1000, 1500, 2000, 900],
    },
  ],
}));
const nextfiveYear = () => {
};

const prevfiveYear = () => {
};
</script>

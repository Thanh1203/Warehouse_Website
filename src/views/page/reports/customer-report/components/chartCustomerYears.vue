<template>
  <div class="w-full h-[28px] mb-6 px-4">
    <div class="text-xl text-[#aab8c5] font-semibold">{{ translate("reportCustomer.NumberNewCustomersYear") }}</div>
  </div>
  <div class="h-[calc(100%-52px)] grid grid-cols-12">
    <div class="flex items-center justify-center">
      <a-button @click="prevfiveYear" class="flex items-center justify-center text-white border-none">
        <font-awesome-icon :icon="['fas', 'chevron-left']" size="2xl"/>
      </a-button>
    </div>
    <div class="col-span-10">
      <Chartbar v-if="!loading" :data="dataChartBar" />
      <a-skeleton v-else :loading="loading" active />
    </div>
    <div class="flex items-center justify-center">
      <a-button @click="nextfiveYear" class="flex items-center justify-center text-white border-none">
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

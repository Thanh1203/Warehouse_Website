<template>
  <div class="tw-grid tw-w-full tw-gap-4 tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-p-2">
        <font-awesome-icon :icon="['fas', 'database']" size="2xl" style="color: #000000" />
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalProducts2") }}</div>
        <div class="tw-font-[700] tw-text-[24px]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>
    
  </div>
  <!-- <div class="tw-flex tw-justify-between tw-gap-3 tw-flex-wrap">
    <div class="tw-bg-white tw-p-6 tw-rounded-lg tw-basis-1/5 tw-flex tw-items-center">
      <font-awesome-icon :icon="['fas', 'users-rectangle']" size="2xl" style="color: #000000" />
      <div class="tw-ml-4 tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("TotalCustomer") }}</span>
        <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-3 tw-text-[24px] tw-text-green-400">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-font-bold"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-white tw-p-6 tw-rounded-lg tw-basis-1/5 tw-flex tw-items-center">
      <font-awesome-icon :icon="['fas', 'users-rectangle']" size="2xl" style="color: #000000" />
      <div class="tw-ml-4 tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("Age") }} 16 - 25</span>
        <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-3 tw-text-[24px] tw-text-green-400">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-font-bold"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-white tw-p-6 tw-rounded-lg tw-basis-1/5 tw-flex tw-items-center">
      <font-awesome-icon :icon="['fas', 'users-rectangle']" size="2xl" style="color: #000000" />
      <div class="tw-ml-4 tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("Age") }} 25 - 35</span>
        <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-3 tw-text-[24px] tw-text-green-400">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-font-bold"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-white tw-p-6 tw-rounded-lg tw-basis-1/5 tw-flex tw-items-center">
      <font-awesome-icon :icon="['fas', 'users-rectangle']" size="2xl" style="color: #000000" />
      <div class="tw-ml-4 tw-flex tw-flex-col tw-items-start">
        <span>{{ translate("Age") }} 35 +</span>
        <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-3 tw-text-[24px] tw-text-green-400">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-font-bold"/>
        </div>
      </div>
    </div>
  </div>

  <div class="tw-w-full tw-h-[calc(100vh-192px)] tw-overflow-hidden tw-flex tw-mt-6 tw-gap-x-6">
    <div class="tw-basis-1/5 tw-bg-white tw-rounded-lg tw-flex tw-flex-col">
      <div class="tw-basis-1/2">
        <div class="tw-p-4">
          <span>{{ translate('AgeRatioCustomers') }}</span>
        </div>
        <Chartpie :data="dataChart" :options="BASE_OPS_CHART_PIE" class="tw-w-full"/>
      </div>
      <div class="tw-shrink-0">
        <div class="tw-p-4">
          <span>{{ translate('ReturnCustomerRate') }}</span>
        </div>
        <div class="tw-flex tw-items-center tw-justify-center">
          <span class="tw-text-[96px]">70<span>%</span></span>
        </div>
      </div>
    </div>
    <div class="tw-basis-4/5 tw-shrink tw-flex tw-flex-col tw-w-full tw-bg-white tw-rounded-lg">
      <div class="tw-basis-1/2"></div>
      <div class="tw-basis-1/2">

      </div>
    </div>
  </div> -->
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import { ref } from "vue";

const theFormat = (number) => {
  return number.toFixed(0);
};

const dataChart = ref({
  labels: ["16-25", "25-35", "35+"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
      data: [40, 40, 20],
    },
  ],
});
</script>
<style scoped lang="scss"></style>

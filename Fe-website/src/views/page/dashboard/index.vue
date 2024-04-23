<template>
  <div class="tw-grid tw-w-full tw-gap-4 tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalProducts2") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'users']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalCustomer") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'warehouse']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("NumberOfWarehouses2") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'percent']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("ReturnCustomerRate") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" />
        </div>
      </div>
    </div>
  </div>

  <div class="tw-w-full tw-flex tw-justify-between tw-mt-6 tw-gap-x-6">
    <div class="tw-basis-1/4 tw-flex tw-flex-col tw-justify-between">
      <div class="tw-w-full tw-bg-white tw-rounded-xl tw-p-4">
        <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate('productCategoryRatio') }}</div>
        <Chartpie :data="dataChartPie"/>
      </div>
      <div class="tw-mt-6 tw-w-full tw-bg-white tw-rounded-xl tw-p-4">
        <div class="tw-mb-3 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate('BestSellingProduct') }}</div>
        <div class="tw-flex tw-flex-col">
          <div class="tw-mb-2 tw-truncate">{{ translate('ProductName') }}: Bàn phím gamming</div>
          <div>{{ translate('Quantity') }} 1000000</div>
        </div>
      </div>
    </div>
    <div class=" tw-basis-[70%] tw-p-4 tw-bg-white tw-rounded-xl">
      <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f] tw-mb-2">{{ translate("Year") }} {{ filterYear.format("YYYY") }}</div>
      <div class="tw-mb-4">{{ translate('CurrentTotalRevenue') }}: {{ currentRevenue.toLocaleString('en-US') }} </div>
      <div class="tw-mt-6 tw-h-[calc(100vh-285px)]">
        <Chartbar :data="dataChartBar"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import { computed, onMounted, ref, watch } from "vue";
import { MONTH_IN_YEAR } from "@/constants";
import dayjs, { Dayjs } from "dayjs";
import Chartpie from "@/components/Chartpie/index.vue";
import Chartbar from "@/components/Chartbar/index.vue";
import { getArrayRandColor } from "@/utils/common";

const currentRevenue = computed(() => 1000000);

const filterYear = ref<Dayjs>(dayjs());

//char bar
const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const dataChartBar = {
  labels: labelChart.value,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#1fe074",
      maxBarThickness: 20,
      minBarLength: 2,
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

// char pie
const dataChartPie = ref({
  labels: ["Bàn phím", "Chuột", "Tai nghe"],
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: [40, 40, 20],
    },
  ],
});

const theFormat = (number) => {
  return number.toFixed(0);
};

watch(
  () => filterYear.value,
  (val) => {
    console.log(val.format("YYYY"));
  },
);
onMounted(() => {});
</script>
<style scoped lang="scss"></style>

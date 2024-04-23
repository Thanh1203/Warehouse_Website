<template>
<div class="tw-flex tw-w-full tw-h-full tw-justify-between">
  <div class="tw-basis-1/4 tw-grid tw-grid-cols-1 tw-gap-8 tw-h-full  ">
    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #FFFFFF;"/>
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
        <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalPurchases") }}</div>
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

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4">
      <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate('StatisticsPurchases') }}</div>
      <Chartpie :data="dataChartPie"/>
    </div>
  </div>

  <div class="tw-basis-[70%] tw-bg-white tw-p-6 tw-rounded-xl tw-flex tw-flex-col tw-gap-y-6">
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start">
      <div>
        <span class="tw-mr-3 tw-text-[14px]">{{ translate('SelectYear') }}</span>
        <a-date-picker v-model:value="yearSelected" picker="year" class="tw-max-w-[350px] tw-h-9"/>
      </div>
    </div>
    <div class="tw-w-full tw-grow tw-flex tw-flex-col">
      <div class="tw-text-[20px] tw-grow tw-flex tw-items-center tw-mb-4">{{ translate('NumberNewCustomers') }}: <span class="tw-font-[700]">{{ numberNewCustomer }}</span></div>
      <div class="tw-grow">
        <Chartline :data="dataChartLine"/>
      </div>
    </div>
    <div class="tw-w-full tw-grow tw-flex tw-flex-col">
      <div class="tw-text-[20px] tw-mb-4">{{ translate("NewCustomersEachYear") }}</div>
      <div class="tw-grow">
        <Chartbar :data="dataChartBar"/>
      </div>
    </div>
  </div>
</div>
<div class="tw-mt-6 tw-p-6 tw-bg-white tw-rounded-xl">
  <div class="tw-mb-6 tw-text-[18px]">{{ translate('ListPotentialCustomers') }}</div>
  <div class="tw-max-h-screen tw-overflow-hidden tw-overflow-y-auto">
    <AntdTable
      ref="table"
      key-field="id"
      :index-column="false"
      :columns="columns"
      :has-checkbox="false"
      :no-sort="true"
    >
  
    </AntdTable>
  </div>
</div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import { computed, onMounted, ref } from "vue";
import Chartpie from "@/components/Chartpie/index.vue";
import dayjs, { Dayjs } from "dayjs";
import Chartline from "@/components/Chartline/index.vue";
import { MONTH_IN_YEAR } from "@/constants";
import Chartbar from "@/components/Chartbar/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { getArrayRandColor } from "@/utils/common";

const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const yearSelected = ref<Dayjs>(dayjs());
const numberNewCustomer = ref(10000)
const dataChartPie = ref({
  labels: ["1 lần", "2 lần", "3 lần trở lên"],
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: [30, 30, 40],
    },
  ],
});
const dataChartLine = ref({
  labels: labelChart.value,
  datasets: [
    {
      backgroundColor: "#7df8be",
      borderColor: "#7df8be",
      data: [10, 80, 30, 50, 60, 20, 70, 90, 40, 55, 100, 120]
    }
  ]
});
const dataChartBar = ref({
  labels: [2019, 2020, 2021, 2022, 2023, 2024],
  datasets: [
    {
      backgroundColor: "#93bbff",
      data: [10, 80, 30, 50, 60, 20],
    },
  ],
});

const columns = ref<Array<any>>([
  {
    title: translate("CustomerCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("CustomerName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("Address"),
    dataIndex: "address",
    key: "address",
    align: "left",
  },
  {
    title: translate("NumberPurchases"),
    dataIndex: "totalBuy",
    key: "totalBuy",
    align: "left",
  },
  {
    title: translate("TotalValueOrders"),
    dataIndex: "totalOrder",
    key: "totalOrder",
    align: "left",
  }
])

const theFormat = (number) => {
  return number.toFixed(0);
};
</script>
<style scoped lang="scss"></style>

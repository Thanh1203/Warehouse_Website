<template>
  <div class="flex w-full h-full justify-between">
    <div class="basis-1/4 grid grid-cols-1 gap-8 h-full">
      <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
        <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
        </div>
        <div class="overflow-hidden">
          <div class="truncate font-600 text-[14px]">{{ translate("TotalCustomer") }}</div>
          <div class="font-[700] text-[24px] text-[#001f3f]">
            <NumberAnimation v-if="!loading" :from="0" :to="dataReportCustomer?.totalCustomer" :duration="1" autoplay easing="linear" :format="theFormat" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          </div>
        </div>
      </div>

      <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
        <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl" style="color: #ffffff" />
        </div>
        <div class="overflow-hidden">
          <div class="truncate font-600 text-[14px]">{{ translate("TotalPurchases") }}</div>
          <div class="font-[700] text-[24px] text-[#001f3f]">
            <NumberAnimation v-if="!loading" :from="0" :to="dataReportCustomer?.totalPurchase" :duration="1" autoplay easing="linear" :format="theFormat" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          </div>
        </div>
      </div>

      <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
        <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'percent']" size="xl" style="color: #ffffff" />
        </div>
        <div class="overflow-hidden">
          <div class="truncate font-600 text-[14px]">{{ translate("ReturnCustomerRate") }}</div>
          <div class="font-[700] text-[24px] text-[#001f3f]">
            <NumberAnimation
              v-if="!loading"
              :from="0"
              :to="dataReportCustomer?.rateReturn"
              :duration="1"
              autoplay
              easing="linear"
              :format="theFormat"
              :class="`text-[${setColor(100)}]`"
            />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          </div>
        </div>
      </div>

      <div class="bg-[#fff] rounded-xl p-4">
        <div class="mb-6 font-[700] text-[18px] text-[#001f3f]">{{ translate("StatisticsPurchases") }}</div>
        <Chartpie v-if="!loading" :data="dataChartPie" />
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>

    <div class="basis-[70%] bg-white p-6 rounded-xl flex flex-col gap-y-6">
      <div class="flex flex-col items-start justify-start">
        <div>
          <span class="mr-3 text-[14px]">{{ translate("SelectYear") }}</span>
          <a-date-picker v-model:value="yearSelected" picker="year" class="max-w-[350px] h-9" />
        </div>
      </div>
      <div class="w-full h-1/2 flex flex-col">
        <div class="text-[20px] grow flex items-center mb-4 gap-2">
          <span>{{ translate("NumberNewCustomers") }}:</span>
          <div v-if="!loadingNewCustomer">
            {{ dataReportNewCustomer?.totalNewCustomer }}
          </div>
          <a-skeleton-input v-else :loading="loadingNewCustomer" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="grow">
          <Chartline v-if="!loadingNewCustomer" :data="dataChartLine" />
          <a-skeleton v-else :loading="loadingNewCustomer" active />
        </div>
      </div>
      <div class="w-full grow h-1/2 flex flex-col">
        <div class="text-[20px] mb-4">{{ translate("NewCustomersEachYear") }}</div>
        <div class="grow">
          <Chartbar v-if="!loading" :data="dataChartBar" />
          <a-skeleton v-else :loading="loading" active />
        </div>
      </div>
    </div>
  </div>
  <div class="mt-6 p-6 bg-white rounded-xl">
    <div class="mb-6 text-[18px]">{{ translate("ListPotentialCustomers") }}</div>
    <div class="max-h-screen overflow-hidden overflow-y-auto">
      <AntdTable
        ref="table"
        key-field="id"
        :index-column="false"
        :columns="columns"
        :has-checkbox="false"
        
        v-if="!loading"
        :dataSource="dataReportCustomer?.dataPotentialCustomers"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'totalOrders' && record">
            <span>{{ record?.totalOrders.toLocaleString("en-US") }}</span>
          </template>
        </template>
      </AntdTable>
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import { computed, onMounted, ref, watch } from "vue";
import Chartpie from "@/components/Chartpie/index.vue";
import dayjs, { Dayjs } from "dayjs";
import Chartline from "@/components/Chartline/index.vue";
import { MONTH_IN_YEAR, PURCHASETIMES } from "@/constants";
import Chartbar from "@/components/Chartbar/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { getArrayRandColor, setColor } from "@/utils/common";
import { useStore } from "vuex";
import { debounce } from "vue-debounce";

const store = useStore();

const dataReportCustomer = computed(() => store.getters["report/reportCustomer"]);
const dataReportNewCustomer = computed(() => store.getters["report/reportNewCustomerYear"]);
const loading = computed(() => store.getters["report/loading"]);
const loadingNewCustomer = computed(() => store.getters["report/loadingNewCustomer"]);
const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});
const labelChartPie = computed(() => {
  const result = [];
  PURCHASETIMES.forEach((e) => {
    result.push(translate(`pruchaseTimes.${e}`));
  });
  return result;
});

const dataChartPie = computed(() => ({
  labels: labelChartPie.value,
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: dataReportCustomer.value?.dataRatioPurchase,
    },
  ],
}));
const dataChartLine = computed(() => ({
  labels: labelChart.value,
  datasets: [
    {
      backgroundColor: "#7df8be",
      borderColor: "#7df8be",
      data: dataReportNewCustomer.value?.dataNewCustomer,
    },
  ],
}));
const dataChartBar = computed(() => ({
  labels: [2019, 2020, 2021, 2022, 2023, 2024],
  datasets: [
    {
      backgroundColor: "#93bbff",
      data: dataReportCustomer.value?.dataNewCustomerYear,
    },
  ],
}));

const yearSelected = ref<Dayjs>(dayjs());
const columns = ref<Array<any>>([
  {
    title: translate("PhoneNumber"),
    dataIndex: "phoneNumber",
    key: "phoneNumber",
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
    dataIndex: "purchaseCount",
    key: "purchaseCount",
    align: "left",
  },
  {
    title: translate("TotalValueOrders"),
    dataIndex: "totalOrders",
    key: "totalOrders",
    align: "left",
  },
]);

const theFormat = (number) => {
  return number.toFixed(0);
};

const fetchData = async () => {
  // await store.dispatch("report/fetchDataReportCustomer");
};

const fetchDataNewCustomerYear = async (params) => {
  // await store.dispatch("report/fetchDataReportNewCustomerYear", params);
};

watch(
  () => yearSelected.value,
  debounce(() => {
    // fetchDataNewCustomerYear(yearSelected.value.year());
  }, 500),
);

onMounted(async () => {
  const currentYear = dayjs().year();
  // fetchDataNewCustomerYear(currentYear);
  // fetchData();
});
</script>
<style scoped lang="scss"></style>

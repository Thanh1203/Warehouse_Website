<template>
<div class="tw-flex tw-w-full tw-h-full tw-justify-between">
  <div class="tw-basis-1/4 tw-grid tw-grid-cols-1 tw-gap-8 tw-h-full">
    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalCustomer") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportCustomer?.totalCustomer" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
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
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportCustomer?.totalPurchase" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
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
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportCustomer?.rateReturn" :duration="1" autoplay easing="linear" :format="theFormat" :class="`tw-text-[${setColor(100)}]`"/>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4">
      <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate('StatisticsPurchases') }}</div>
      <Chartpie v-if="!loading" :data="dataChartPie"/>
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>

  <div class="tw-basis-[70%] tw-bg-white tw-p-6 tw-rounded-xl tw-flex tw-flex-col tw-gap-y-6">
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start">
      <div>
        <span class="tw-mr-3 tw-text-[14px]">{{ translate('SelectYear') }}</span>
        <a-date-picker v-model:value="yearSelected" picker="year" class="tw-max-w-[350px] tw-h-9"/>
      </div>
    </div>
    <div class="tw-w-full tw-h-1/2 tw-flex tw-flex-col">
      <div class="tw-text-[20px] tw-grow tw-flex tw-items-center tw-mb-4 tw-gap-2">
        <span>{{ translate('NumberNewCustomers') }}:</span>
        <div  v-if="!loadingNewCustomer">
          {{ dataReportNewCustomer?.totalNewCustomer }}
        </div>
        <a-skeleton-input v-else :loading="loadingNewCustomer" :paragraph="{ rows: 0 }" active size="small"/>
      </div>
      <div class="tw-grow">
        <Chartline v-if="!loadingNewCustomer" :data="dataChartLine"/>
        <a-skeleton v-else :loading="loadingNewCustomer" active />
      </div>
    </div>
    <div class="tw-w-full tw-grow tw-h-1/2 tw-flex tw-flex-col">
      <div class="tw-text-[20px] tw-mb-4">{{ translate("NewCustomersEachYear") }}</div>
      <div class="tw-grow">
        <Chartbar v-if="!loading" :data="dataChartBar"/>
        <a-skeleton v-else :loading="loading" active />
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
      v-if="!loading"
      :dataSource="dataReportCustomer?.dataPotentialCustomers"
    >
      <template #custom-body="{ column, record }">
        <template v-if="column.key === 'totalOrders' && record">
          <span>{{ record?.totalOrders.toLocaleString('en-US') }}</span>
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
  PURCHASETIMES.forEach(e => {
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
      data: dataReportNewCustomer.value?.dataNewCustomer
    }
  ]
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
  }
])

const theFormat = (number) => {
  return number.toFixed(0);
};

const fetchData = async () => {
  await store.dispatch("report/fetchDataReportCustomer");
}

const fetchDataNewCustomerYear = async (params) => {
  await store.dispatch("report/fetchDataReportNewCustomerYear", params);
}

watch(
  () => yearSelected.value,
  debounce(() => {
    fetchDataNewCustomerYear(yearSelected.value.year());
  }, 500)
)

onMounted(async () => {
  const currentYear = dayjs().year();
  fetchDataNewCustomerYear(currentYear)
  fetchData();
})
</script>
<style scoped lang="scss"></style>

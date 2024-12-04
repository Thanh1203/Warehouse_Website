<template>
  <a-form class="flex rounded-lg px-6 py-5 mb-6 bg-[#37404a]">
    <a-form-item class="min-w-[200px]">
      <div class="opacity-70 text-white">{{ translate("warehouse.select") }}</div>
      <a-select :placeholder="translate('Search')" v-model:value="filterWarehouse" :options="optionFake.map((e) => ({ value: e.id, label: e.name }))" class="mt-2 w-full" />
    </a-form-item>
  </a-form>

  <div class="mb-3 text-[#aab8c5] text-lg font-bold">{{ translate("Revenue") }}</div>

  <div class="w-full grid gap-4 grid-cols-1 xl:grid-cols-2 xl:gap-8 mb-6">
    <div class="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="h-[180px] bg-[#37404a] rounded-lg p-4 flex items-start">
        <div class="grow flex flex-col h-full">
          <div class="text-[#aab8c5] font-semibold truncate mb-6">{{ translate("reportSale.currentRevenue") }}</div>
          <div class="text-[#aab8c5] grow">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="mx-3">VND</span>
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
        <div class="w-10 h-10 rounded-full bg-[#464F74] flex items-center justify-center test-[#aab8c5]">
          <CashIcon class="text-[#727cf5]" />
        </div>
      </div>

      <div class="h-[180px] bg-[#37404a] rounded-lg p-4 flex items-start">
        <div class="grow flex flex-col h-full">
          <div class="text-[#aab8c5] font-semibold truncate mb-6">{{ translate("reportCommon.Growth") }}</div>
          <div class="text-[#aab8c5] grow">
            <NumberAnimation v-if="!loading" :from="0" :to="80" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="text-2xl font-semibold">%</span>
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
        <div class="w-10 h-10 rounded-full bg-[#464F74] flex items-center justify-center test-[#aab8c5]">
          <GrowthIcon class="text-[#727cf5]" />
        </div>
      </div>

      <div class="h-[180px] bg-[#37404a] rounded-lg p-4 flex items-start">
        <div class="grow flex flex-col h-full">
          <div class="text-[#aab8c5] font-semibold truncate mb-6">{{ translate("reportSale.directRevenue") }}</div>
          <div class="text-[#aab8c5] grow">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="mx-3">VND</span>
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
        <div class="w-10 h-10 rounded-full bg-[#464F74] flex items-center justify-center test-[#aab8c5]">
          <font-awesome-icon :icon="['fas', 'shop']" size="lg" style="color: #727cf5" />
        </div>
      </div>

      <div class="h-[180px] bg-[#37404a] rounded-lg p-4 flex items-start">
        <div class="grow flex flex-col h-full">
          <div class="text-[#aab8c5] font-semibold truncate mb-6">{{ translate("reportSale.onlineRevenue") }}</div>
          <div class="text-[#aab8c5] grow">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="mx-3">VND</span>
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
        <div class="w-10 h-10 rounded-full bg-[#464F74] flex items-center justify-center test-[#aab8c5]">
          <font-awesome-icon :icon="['fas', 'globe']" size="lg" style="color: #727cf5" />
        </div>
      </div>
    </div>

    <div class="w-full bg-[#37404a] rounded-lg p-4">
      <div class="flex items-center justify-between flex-wrap mb-3">
        <div class="text-[#aab8c5] text-lg font-bold truncate">{{ translate("reportSale.revenueEachMonth") }}</div>
        <div class="flex items-center">
          <a-button class="mr-2 text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear(1)">
            <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
          </a-button>

          <div class="flex items-center">
            <div class="text-xl text-[#aab8c5] mr-[-24px]">{{ translate("Year") }}</div>
            <a-date-picker class="date-picker-shedule p-0 m-0 border-none" picker="year" v-model:value="formState.year" :bordered="false" :allowClear="false">
              <template #suffixIcon> </template>
            </a-date-picker>
          </div>

          <a-button class="mr-1 text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear(1)">
            <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
          </a-button>
        </div>
      </div>

      <div class="w-full h-[300px]">
        <ChartBar :data="dataRevenueAnnual" :show-legend="true" />
      </div>
    </div>
  </div>

  <div class="w-full my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
    <PlatformReport />

    <IndustryReport />

    <div class="w-full bg-[#37404a] rounded-lg p-4 md:col-span-2 lg:col-span-1">
      <div class="w-full flex justify-between mb-4">
        <div class="mb-3 text-[#aab8c5] text-lg font-bold truncate">
          <a-tooltip>
            <template #title>{{ translate("reportSale.topSelling") }}</template>
            {{ translate("reportSale.topSelling") }}
          </a-tooltip>
        </div>

        <a-button class="!bg-[#464f5b] !rounded-lg" type="primary">
          <div class="w-[80px] flex items-center justify-between">
            {{ translate("reportCommon.export") }}
            <DowloadIcon />
          </div>
        </a-button>
      </div>

      <div class="w-full">
        <a-table
          v-if="!loading"
          key-field="id"
          :dataSource="dataTopSell"
          :columns="columns"
          :pagination="false"
          :sticky="true"
          class="h-[400px] overflow-hidden overflow-y-auto"
        >
          <template #emptyText>
            <a-empty :description="translate('noData')" />
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name' && record">
              <a-tooltip>
                <template #title>
                  <div class="text-[#aab8c5] text-base font-semibold">{{ record.name }}</div>
                  <div class="truncate text-[#8391a2]">{{ translate("product.price") }}: {{ record.price.toLocaleString("en-US") }} VND</div>
                  <div class="truncate text-[#8391a2]">{{ translate("Quantity") }}: {{ record.quantity }}</div>
                </template>
                <div class="text-[#aab8c5] text-base font-semibold">{{ record.name }}</div>
                <div class="truncate text-[#8391a2]">{{ translate("product.price") }}: {{ record.price.toLocaleString("en-US") }} VND</div>
                <div class="truncate text-[#8391a2]">{{ translate("Quantity") }}: {{ record.quantity }}</div>
              </a-tooltip>
            </template>

            <template v-if="column.key === 'revenue' && record"> {{ record.revenue.toLocaleString("en-US") }} VND </template>
          </template>
        </a-table>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>

  <div class="mb-3 text-[#aab8c5] text-lg font-bold">{{ translate("reportCommon.order") }}</div>

  <div class="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
    <div class="h-40 bg-[#37404a] rounded-lg p-4 flex items-start">
      <div class="grow flex flex-col h-full">
        <div class="text-[#aab8c5] font-semibold truncate mb-6">{{ translate("reportSale.todayOrders") }}</div>
        <div class="text-[#aab8c5] grow">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl font-semibold" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          <span class="mx-3">VND</span>
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
      <div class="w-10 h-10 rounded-full bg-[#464F74] flex items-center justify-center test-[#aab8c5]">
        <font-awesome-icon :icon="['fas', 'cart-plus']" size="lg" style="color: #727cf5" />
      </div>
    </div>

    <div class="h-40 bg-[#37404a] rounded-lg p-4 flex items-start">
      <div class="grow flex flex-col h-full">
        <div class="text-[#aab8c5] font-semibold truncate mb-6">{{ translate("reportSale.orderSuccessRate") }}</div>
        <div class="text-[#aab8c5] grow">
          <NumberAnimation v-if="!loading" :from="0" :to="90" :duration="1" autoplay easing="linear" :format="theFormatPercent" class="text-2xl font-semibold" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          <span class="mx-3">%</span>
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
      <div class="w-10 h-10 rounded-full bg-[#464F74] flex items-center justify-center test-[#aab8c5]">
        <font-awesome-icon :icon="['fas', 'percent']" size="lg" style="color: #727cf5" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import Chartline from "@/components/Chartline/index.vue";
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import dayjs, { Dayjs } from "dayjs";
import ChartBar from "@/components/Chartbar/index.vue";
import { MONTH_IN_YEAR } from "@/constants";
import GrowthIcon from "@/components/icons/growIcon.vue";
import CashIcon from "@/components/icons/cashIcon.vue";
import DowloadIcon from "@/components/icons/dowloadIcon.vue";

const PlatformReport = defineAsyncComponent(() => import("./platformReport.vue"));
const IndustryReport = defineAsyncComponent(() => import("./industryReport.vue"));

const filterWarehouse = ref(1);

const props = defineProps({
  data: {
    type: Object,
  },
});

const loading = ref<boolean>(false);
const statusTemp = ref<boolean>(true);

const theFormat = (number) => {
  return number.toLocaleString("en-US");
};

const theFormatPercent = (number) => {
  return number.toFixed(2);
};

const formState = reactive<{
  year: Dayjs;
}>({
  year: dayjs(),
});

const nextYear = (val) => {
  formState.year = dayjs(formState.year).add(1, "year");
};

const prevYear = (val) => {
  formState.year = dayjs(formState.year).subtract(1, "year");
};

const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const dataRevenueAnnual = computed(() => ({
  labels: labelChart.value,
  datasets: [
    {
      label: translate("reportSale.directRevenue"),
      barPercentage: 0.5,
      backgroundColor: "#6B74E0",
      data: [300, 350, 320, 370, 340, 390, 360, 410, 380, 430, 400, 420],
    },
    {
      label: translate("reportSale.onlineRevenue"),
      barPercentage: 0.5,
      backgroundColor: "#1DB589",
      data: [300, 350, 320, 370, 340, 390, 360, 410, 380, 430, 400, 420],
    },
  ],
}));

const columns = ref<any[]>([
  {
    title: translate("product.name"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("Revenue"),
    dataIndex: "revenue",
    key: "revenue",
    align: "left",
  },
]);

const optionFake = [
  {
    id: 1,
    name: "Cửa hàng 1",
  },
  {
    id: 2,
    name: "Cửa hàng 2",
  },
  {
    id: 3,
    name: "Cửa hàng 3",
  },
];

const dataTopSell = [
  {
    id: 1,
    name: "Sản phẩm 1",
    quantity: 1000,
    revenue: 9999,
    price: 1000,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    quantity: 1000,
    revenue: 9000,
    price: 1000,
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    quantity: 1000,
    revenue: 8000,
    price: 1000,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    quantity: 1000,
    revenue: 7000,
    price: 1000,
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    quantity: 1000,
    revenue: 6500,
    price: 1000,
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    quantity: 1000,
    revenue: 5000,
    price: 1000,
  },
  {
    id: 7,
    name: "Sản phẩm 7",
    quantity: 1000,
    revenue: 9999,
    price: 1000,
  },
  {
    id: 8,
    name: "Sản phẩm 8",
    quantity: 1000,
    revenue: 9000,
    price: 1000,
  },
  {
    id: 9,
    name: "Sản phẩm 9",
    quantity: 1000,
    revenue: 8000,
    price: 1000,
  },
  {
    id: 10,
    name: "Sản phẩm 10",
    quantity: 1000,
    revenue: 7000,
    price: 1000,
  },
  {
    id: 11,
    name: "Sản phẩm 11",
    quantity: 1000,
    revenue: 6500,
    price: 1000,
  },
  {
    id: 12,
    name: "Sản phẩm 12",
    quantity: 1000,
    revenue: 5000,
    price: 1000,
  },
];
</script>

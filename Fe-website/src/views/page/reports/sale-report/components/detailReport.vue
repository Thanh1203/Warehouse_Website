<template>
  <a-form class="tw-flex tw-rounded-lg tw-px-6 tw-py-5 tw-mb-6 tw-bg-[#37404a]">
    <a-form-item class="tw-min-w-[200px]">
      <div class="tw-opacity-70 tw-text-white">{{ translate("warehouse.select") }}</div>
      <a-select :placeholder="translate('Search')" v-model:value="filterWarehouse" :options="optionFake.map((e) => ({ value: e.id, label: e.name }))" class="tw-mt-2 tw-w-full" />
    </a-form-item>
  </a-form>

  <div class="tw-mb-3 tw-text-[#aab8c5] tw-text-lg tw-font-bold">{{ translate("Revenue") }}</div>

  <div class="tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 xl:tw-grid-cols-2 xl:tw-gap-8 tw-mb-6">
    <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
      <div class="tw-h-[180px] tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-flex tw-items-start">
        <div class="tw-grow tw-flex tw-flex-col tw-h-full">
          <div class="tw-text-[#aab8c5] tw-font-semibold tw-truncate tw-mb-6">{{ translate("reportSale.currentRevenue") }}</div>
          <div class="tw-text-[#aab8c5] tw-grow">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl tw-font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="tw-mx-3">VND</span>
          </div>
          <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
            <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
              <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
              <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
              5.27%
            </div>
            <a-tooltip>
              <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
              <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
            </a-tooltip>
          </div>
        </div>
        <div class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#464F74] tw-flex tw-items-center tw-justify-center tw-test-[#aab8c5]">
          <CashIcon class="tw-text-[#727cf5]" />
        </div>
      </div>

      <div class="tw-h-[180px] tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-flex tw-items-start">
        <div class="tw-grow tw-flex tw-flex-col tw-h-full">
          <div class="tw-text-[#aab8c5] tw-font-semibold tw-truncate tw-mb-6">{{ translate("reportCommon.Growth") }}</div>
          <div class="tw-text-[#aab8c5] tw-grow">
            <NumberAnimation v-if="!loading" :from="0" :to="80" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl tw-font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="tw-text-2xl tw-font-semibold">%</span>
          </div>
          <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
            <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
              <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
              <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
              5.27%
            </div>
            <a-tooltip>
              <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
              <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
            </a-tooltip>
          </div>
        </div>
        <div class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#464F74] tw-flex tw-items-center tw-justify-center tw-test-[#aab8c5]">
          <GrowthIcon class="tw-text-[#727cf5]" />
        </div>
      </div>

      <div class="tw-h-[180px] tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-flex tw-items-start">
        <div class="tw-grow tw-flex tw-flex-col tw-h-full">
          <div class="tw-text-[#aab8c5] tw-font-semibold tw-truncate tw-mb-6">{{ translate("reportSale.directRevenue") }}</div>
          <div class="tw-text-[#aab8c5] tw-grow">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl tw-font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="tw-mx-3">VND</span>
          </div>
          <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
            <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
              <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
              <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
              5.27%
            </div>
            <a-tooltip>
              <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
              <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
            </a-tooltip>
          </div>
        </div>
        <div class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#464F74] tw-flex tw-items-center tw-justify-center tw-test-[#aab8c5]">
          <font-awesome-icon :icon="['fas', 'shop']" size="lg" style="color: #727cf5" />
        </div>
      </div>

      <div class="tw-h-[180px] tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-flex tw-items-start">
        <div class="tw-grow tw-flex tw-flex-col tw-h-full">
          <div class="tw-text-[#aab8c5] tw-font-semibold tw-truncate tw-mb-6">{{ translate("reportSale.onlineRevenue") }}</div>
          <div class="tw-text-[#aab8c5] tw-grow">
            <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl tw-font-semibold" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
            <span class="tw-mx-3">VND</span>
          </div>
          <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
            <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
              <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
              <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
              5.27%
            </div>
            <a-tooltip>
              <template #title>{{ translate("reportCommon.sinceLastWeek") }}</template>
              <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceLastWeek") }}</span>
            </a-tooltip>
          </div>
        </div>
        <div class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#464F74] tw-flex tw-items-center tw-justify-center tw-test-[#aab8c5]">
          <font-awesome-icon :icon="['fas', 'globe']" size="lg" style="color: #727cf5" />
        </div>
      </div>
    </div>

    <div class="tw-w-full tw-bg-[#37404a] tw-rounded-lg tw-p-4">
      <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-mb-3">
        <div class="tw-text-[#aab8c5] tw-text-lg tw-font-bold tw-truncate">{{ translate("reportSale.revenueEachMonth") }}</div>
        <div class="tw-flex tw-items-center">
          <a-button class="tw-mr-2 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear(1)">
            <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
          </a-button>

          <div class="tw-flex tw-items-center">
            <div class="tw-text-xl tw-text-[#aab8c5] tw-mr-[-24px]">{{ translate("Year") }}</div>
            <a-date-picker class="date-picker-shedule tw-p-0 tw-m-0 tw-border-none" picker="year" v-model:value="formState.year" :bordered="false" :allowClear="false">
              <template #suffixIcon> </template>
            </a-date-picker>
          </div>

          <a-button class="tw-mr-1 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear(1)">
            <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
          </a-button>
        </div>
      </div>

      <div class="tw-w-full tw-h-[300px]">
        <ChartBar :data="dataRevenueAnnual" :show-legend="true" />
      </div>
    </div>
  </div>

  <div class="tw-w-full tw-my-6 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 lg:tw-gap-8">
    <PlatformReport />

    <IndustryReport />

    <div class="tw-w-full tw-bg-[#37404a] tw-rounded-lg tw-p-4 md:tw-col-span-2 lg:tw-col-span-1">
      <div class="tw-w-full tw-flex tw-justify-between tw-mb-4">
        <div class="tw-mb-3 tw-text-[#aab8c5] tw-text-lg tw-font-bold tw-truncate">
          <a-tooltip>
            <template #title>{{ translate("reportSale.topSelling") }}</template>
            {{ translate("reportSale.topSelling") }}
          </a-tooltip>
        </div>

        <a-button class="!tw-bg-[#464f5b] !tw-rounded-lg" type="primary">
          <div class="tw-w-[80px] tw-flex tw-items-center tw-justify-between">
            {{ translate("reportCommon.export") }}
            <DowloadIcon />
          </div>
        </a-button>
      </div>

      <div class="tw-w-full">
        <a-table
          v-if="!loading"
          key-field="id"
          :dataSource="dataTopSell"
          :columns="columns"
          :pagination="false"
          :sticky="true"
          class="tw-h-[400px] tw-overflow-hidden tw-overflow-y-auto"
        >
          <template #emptyText>
            <a-empty :description="translate('noData')" />
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name' && record">
              <a-tooltip>
                <template #title>
                  <div class="tw-text-[#aab8c5] tw-text-base tw-font-semibold">{{ record.name }}</div>
                  <div class="tw-truncate tw-text-[#8391a2]">{{ translate("product.price") }}: {{ record.price.toLocaleString("en-US") }} VND</div>
                  <div class="tw-truncate tw-text-[#8391a2]">{{ translate("Quantity") }}: {{ record.quantity }}</div>
                </template>
                <div class="tw-text-[#aab8c5] tw-text-base tw-font-semibold">{{ record.name }}</div>
                <div class="tw-truncate tw-text-[#8391a2]">{{ translate("product.price") }}: {{ record.price.toLocaleString("en-US") }} VND</div>
                <div class="tw-truncate tw-text-[#8391a2]">{{ translate("Quantity") }}: {{ record.quantity }}</div>
              </a-tooltip>
            </template>

            <template v-if="column.key === 'revenue' && record"> {{ record.revenue.toLocaleString("en-US") }} VND </template>
          </template>
        </a-table>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>

  <div class="tw-mb-3 tw-text-[#aab8c5] tw-text-lg tw-font-bold">{{ translate("reportCommon.order") }}</div>

  <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-4 lg:tw-gap-8">
    <div class="tw-h-40 tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-flex tw-items-start">
      <div class="tw-grow tw-flex tw-flex-col tw-h-full">
        <div class="tw-text-[#aab8c5] tw-font-semibold tw-truncate tw-mb-6">{{ translate("reportSale.todayOrders") }}</div>
        <div class="tw-text-[#aab8c5] tw-grow">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl tw-font-semibold" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          <span class="tw-mx-3">VND</span>
        </div>
        <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
          <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceYesterday") }}</template>
            <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceYesterday") }}</span>
          </a-tooltip>
        </div>
      </div>
      <div class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#464F74] tw-flex tw-items-center tw-justify-center tw-test-[#aab8c5]">
        <font-awesome-icon :icon="['fas', 'cart-plus']" size="lg" style="color: #727cf5" />
      </div>
    </div>

    <div class="tw-h-40 tw-bg-[#37404a] tw-rounded-lg tw-p-4 tw-flex tw-items-start">
      <div class="tw-grow tw-flex tw-flex-col tw-h-full">
        <div class="tw-text-[#aab8c5] tw-font-semibold tw-truncate tw-mb-6">{{ translate("reportSale.orderSuccessRate") }}</div>
        <div class="tw-text-[#aab8c5] tw-grow">
          <NumberAnimation v-if="!loading" :from="0" :to="90" :duration="1" autoplay easing="linear" :format="theFormatPercent" class="tw-text-2xl tw-font-semibold" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
          <span class="tw-mx-3">%</span>
        </div>
        <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
          <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
            <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp" />
            <font-awesome-icon :icon="['fas', 'arrow-down']" v-else />
            5.27%
          </div>
          <a-tooltip>
            <template #title>{{ translate("reportCommon.sinceYesterday") }}</template>
            <span class="tw-text-[#8391a2]">{{ translate("reportCommon.sinceYesterday") }}</span>
          </a-tooltip>
        </div>
      </div>
      <div class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#464F74] tw-flex tw-items-center tw-justify-center tw-test-[#aab8c5]">
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

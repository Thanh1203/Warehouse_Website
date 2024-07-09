<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { setOrdinalNum } from "@/utils/common";
import dayjs, { Dayjs } from "dayjs";
import { reactive } from "vue";

const formState = reactive<{
  year: Dayjs;
}>({
  year: dayjs(),
});

const nextYear = (val) => {
  formState.year = dayjs(formState.year).add(1, "month");
};

const prevYear = (val) => {
  formState.year = dayjs(formState.year).subtract(1, "month");
};

const datafakePlatfrom = [
  {
    id: 1,
    name: "Trực tiếp",
    revenueTotal: 99999,
    state: "up",
    statis: 30,
  },
  {
    id: 2,
    name: "Tik tok shop",
    revenueTotal: 8000,
    state: "up",
    statis: 30,
  },
  {
    id: 3,
    name: "Shopee",
    revenueTotal: 5000,
    state: "up",
    statis: 30,
  },
  {
    id: 4,
    name: "Lazada",
    revenueTotal: 4000,
    state: "down",
    statis: 30,
  },
  {
    id: 5,
    name: "Tiki",
    revenueTotal: 2000,
    state: "down",
    statis: 30,
  },
  {
    id: 6,
    name: "Amazon",
    revenueTotal: 1000,
    state: "down",
    statis: 30,
  },
];
</script>

<template>
  <div class="tw-w-full tw-bg-[#37404a] tw-rounded-lg tw-p-4">
    <div class="tw-w-full tw-flex tw-justify-between tw-mb-4">
      <div class="tw-mb-3 tw-text-[#aab8c5] tw-text-lg tw-font-bold tw-truncate">
        <a-tooltip>
          <template #title>{{ translate("reportSale.platformRevenue") }}</template>
          {{ translate("reportSale.platformRevenue") }}
        </a-tooltip>
      </div>

      <div class="tw-flex tw-items-center">
        <a-button class="tw-mr-2 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear(2)">
          <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
        </a-button>

        <div class="tw-flex tw-items-center">
          <a-date-picker class="date-picker-shedule tw-p-0 tw-m-0 tw-border-none" picker="month" v-model:value="formState.year" :bordered="false" :allowClear="false">
            <template #suffixIcon> </template>
          </a-date-picker>
        </div>

        <a-button class="tw-mr-1 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear(2)">
          <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
        </a-button>
      </div>
    </div>

    <div class="tw-w-full tw-h-[400px] tw-overflow-hidden tw-overflow-y-auto">
      <div v-for="(item, idx) in datafakePlatfrom" class="tw-w-full tw-h-20 tw-py-4 tw-border-b tw-border-[#464f5b] tw-flex">
        <div class="tw-h-full tw-w-12 tw-min-w-12 tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-semibold tw-text-[#aab8c5]">
          <img v-if="idx === 0" src="/src/assets/images/listIcon/1st.png" alt="1st" />
          <img v-if="idx === 1" src="/src/assets/images/listIcon/2nd.png" alt="2nd" />
          <img v-if="idx === 2" src="/src/assets/images/listIcon/3rd.png" alt="3rd" />
          <span v-if="idx > 2">{{ setOrdinalNum(idx + 1) }}</span>
        </div>
        <div class="tw-grow tw-pl-4 tw-pr-2 tw-truncate">
          <a-tooltip>
            <template #title>
              <div class="tw-text-[#aab8c5] tw-text-base tw-font-semibold tw-truncate">
                {{ item.name }}
              </div>
              <div class="tw-text-[#8391a2] tw-truncate">{{ translate("Revenue") }}: {{ item.revenueTotal.toLocaleString("en-US") }} VND</div>
            </template>
            <div class="tw-text-[#aab8c5] tw-text-base tw-font-semibold tw-truncate">
              {{ item.name }}
            </div>
            <div class="tw-text-[#8391a2] tw-truncate">{{ translate("Revenue") }}: {{ item.revenueTotal.toLocaleString("en-US") }} VND</div>
          </a-tooltip>
        </div>
        <div class="tw-h-full tw-w-32 tw-flex tw-flex-col tw-justify-center tw-truncate">
          <div v-if="item.state === 'up'" class="tw-text-[#0acf97]">
            <font-awesome-icon :icon="['fas', 'arrow-trend-up']" />
            <span class="tw-ml-2">{{ item.statis }}%</span>
          </div>
          <div v-if="item.state === 'down'" class="tw-text-[#fa5c7c]">
            <font-awesome-icon :icon="['fas', 'arrow-trend-down']" />
            <span class="tw-ml-2">{{ item.statis }}%</span>
          </div>
          <div class="tw-text-[#8391a2] tw-truncate">{{ translate("reportCommon.sinceLastMonth") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  <div class="w-full bg-[#37404a] rounded-lg p-4">
    <div class="w-full flex justify-between mb-4">
      <div class="mb-3 text-[#aab8c5] text-lg font-bold truncate">
        <a-tooltip>
          <template #title>{{ translate("reportSale.platformRevenue") }}</template>
          {{ translate("reportSale.platformRevenue") }}
        </a-tooltip>
      </div>

      <div class="flex items-center">
        <a-button class="mr-2 text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear(2)">
          <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
        </a-button>

        <div class="flex items-center">
          <a-date-picker class="date-picker-shedule p-0 m-0 border-none" picker="month" v-model:value="formState.year" :bordered="false" :allowClear="false">
            <template #suffixIcon> </template>
          </a-date-picker>
        </div>

        <a-button class="mr-1 text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear(2)">
          <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
        </a-button>
      </div>
    </div>

    <div class="w-full h-[400px] overflow-hidden overflow-y-auto">
      <div v-for="(item, idx) in datafakePlatfrom" class="w-full h-20 py-4 border-b border-[#464f5b] flex">
        <div class="h-full w-12 min-w-12 flex items-center justify-center text-xl font-semibold text-[#aab8c5]">
          <img v-if="idx === 0" src="/src/assets/images/listIcon/1st.png" alt="1st" />
          <img v-if="idx === 1" src="/src/assets/images/listIcon/2nd.png" alt="2nd" />
          <img v-if="idx === 2" src="/src/assets/images/listIcon/3rd.png" alt="3rd" />
          <span v-if="idx > 2">{{ setOrdinalNum(idx + 1) }}</span>
        </div>
        <div class="grow pl-4 pr-2 truncate">
          <a-tooltip>
            <template #title>
              <div class="text-[#aab8c5] text-base font-semibold truncate">
                {{ item.name }}
              </div>
              <div class="text-[#8391a2] truncate">{{ translate("Revenue") }}: {{ item.revenueTotal.toLocaleString("en-US") }} VND</div>
            </template>
            <div class="text-[#aab8c5] text-base font-semibold truncate">
              {{ item.name }}
            </div>
            <div class="text-[#8391a2] truncate">{{ translate("Revenue") }}: {{ item.revenueTotal.toLocaleString("en-US") }} VND</div>
          </a-tooltip>
        </div>
        <div class="h-full w-32 flex flex-col justify-center truncate">
          <div v-if="item.state === 'up'" class="text-[#0acf97]">
            <font-awesome-icon :icon="['fas', 'arrow-trend-up']" />
            <span class="ml-2">{{ item.statis }}%</span>
          </div>
          <div v-if="item.state === 'down'" class="text-[#fa5c7c]">
            <font-awesome-icon :icon="['fas', 'arrow-trend-down']" />
            <span class="ml-2">{{ item.statis }}%</span>
          </div>
          <div class="text-[#8391a2] truncate">{{ translate("reportCommon.sinceLastMonth") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

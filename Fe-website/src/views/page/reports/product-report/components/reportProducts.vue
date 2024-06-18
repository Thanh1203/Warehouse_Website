<template>
  <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-mb-4 tw-gap-4">
    <div class="new-switch-cus">
      <div :class="['new-switch-overlay', selectOption === 1 ? '' : 'new-switch-action']"></div>
      <a-button class="tw-border-none" type="text" @click="handleSelectSell(1)">
        <span class="tw-text-white">
          {{ translate("reportProduct.bestSelling") }}
        </span>
      </a-button>
      <a-button class="tw-border-none" type="text" @click="handleSelectSell(2)">
        <span class="tw-text-white">
          {{ translate("reportProduct.slowSelling") }}
        </span>
      </a-button>
    </div>
    <div class="tw-flex tw-items-center">
      <a-button class="tw-mr-2 tw-text-[#aab8c5] tw-pb-0" type="gray-hover" shape="circle" @click="prevYear">
        <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
      </a-button>

      <div class="tw-flex tw-items-center">
        <div class="tw-text-xl tw-text-[#aab8c5] tw-mr-2">{{ translate("Month") }}</div>
        <a-date-picker class="date-picker-shedule tw-p-0 tw-m-0 tw-border-none" picker="month" v-model:value="formState.time" :bordered="false" :allowClear="false">
          <template #suffixIcon> </template>
        </a-date-picker>
      </div>

      <a-button class="tw-mr-1 tw-text-[#aab8c5] tw-pb-0" type="gray-hover" shape="circle" @click="nextYear">
        <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
      </a-button>
    </div>
  </div>

  <div class="tw-w-full">
    <AntdTable ref="table" key-field="id" :index-column="true" :columns="columns" :has-checkbox="false" :no-sort="true" :dataSource="selectOption === 1 ? databest : dataslow" v-if="!loading"></AntdTable>
    <a-skeleton v-else :loading="loading" active />
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import dayjs, { Dayjs } from 'dayjs';
import { onMounted, reactive, ref, watch } from 'vue';
import AntdTable from "@/components/antd-table/index.vue";

const selectOption = ref<any>(1)
const loading = ref<boolean> (false);

const handleSelectSell = (val) => {
  selectOption.value = val
}

const formState = reactive<{
  time: Dayjs;
}>({
  time: dayjs(),
});

const nextYear = () => {
  formState.time = dayjs(formState.time).add(1, "month");
};

const prevYear = () => {
  formState.time = dayjs(formState.time).subtract(1, "month");
};

const columns = ref<Array<any>>([
  {
    title: translate("ProductName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
  },
]);


const databest = [
  {
    id: 1,
    name: "Sản phẩm 1",
    quantity: 1000,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    quantity: 1000,
  },
  {
    id: 3, 
    name: "Sản phẩm 3",
    quantity: 1000,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    quantity: 1000,
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    quantity: 1000,
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    quantity: 1000,
  }
]

const dataslow = [
{
    id: 1,
    name: "Sản phẩm 1",
    quantity: 10,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    quantity: 10,
  },
  {
    id: 3, 
    name: "Sản phẩm 3",
    quantity: 10,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    quantity: 10,
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    quantity: 10,
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    quantity: 10,
  }
]
</script>
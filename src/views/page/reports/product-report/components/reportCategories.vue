<template>
  <div class="tw-grid tw-grid-cols-1 tw-gap-4 xl:tw-grid-cols-2">
    <div class="tw-w-full tw-pr-2 tw-flex tw-items-center tw-justify-center">
      <Chartpie :data="dataCategory" :show-legend="false" v-if="!loading" />
      <a-skeleton v-else :loading="loading" active />
    </div>
    <div class="tw-w-full">
      <a-table v-if="!loading" key-field="id" :columns="columns" :dataSource="data" :pagination="false" :sticky="true" class="tw-h-[500px] tw-overflow-hidden tw-overflow-y-auto">
        <template #emptyText>
          <a-empty :description="translate('noData')" />
        </template>
      </a-table>
      <a-skeleton v-else :loading="loading" active />
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { getArrayRandColor } from "@/utils/common";
import { computed, ref } from "vue";
import Chartpie from "@/components/Chartpie/index.vue";

const loading = ref<boolean> (false);

const dataCategory = computed(() => ({
  labels: [
  "Chủng loại 01",
  "Chủng loại 02",
  "Chủng loại 03",
  "Chủng loại 04",
  "Chủng loại 05",
  "Chủng loại 06",
  "Chủng loại 07",
  "Chủng loại 08",
  "Chủng loại 09",
  "Chủng loại 10"
  ],
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: [23, 13, 12, 12, 11, 9, 8, 5, 5, 2]
    },
  ],
}));

const columns = ref<Array<any>>([
  {
    title: translate("CategoryName"),
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

const data = [
  {
    id: 1,
    name: "Chủng loại 01",
    quantity: 1000,
  },
  {
    id: 2,
    name: "Chủng loại 02",
    quantity: 950,
  },
  {
    id: 3,
    name: "Chủng loại 03",
    quantity: 900,
  },
  {
    id: 4,
    name: "Chủng loại 04",
    quantity: 850,
  },
  {
    id: 5,
    name: "Chủng loại 05",
    quantity: 800,
  },
  {
    id: 6,
    name: "Chủng loại 06",
    quantity: 750,
  },
  {
    id: 7,
    name: "Chủng loại 07",
    quantity: 700,
  },
  {
    id: 8,
    name: "Chủng loại 08",
    quantity: 650,
  },
  {
    id: 9,
    name: "Chủng loại 09",
    quantity: 600,
  },
  {
    id: 10,
    name: "Chủng loại 10",
    quantity: 550,
  },
];

</script>

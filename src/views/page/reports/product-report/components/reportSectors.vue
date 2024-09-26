<template>
  <div class="tw-grid tw-grid-cols-1 tw-gap-4 xl:tw-grid-cols-2">
    <div class="tw-w-full tw-pr-2 tw-flex tw-items-center tw-justify-center">
      <Chartpie :data="dataSector" :show-legend="false" v-if="!loading" />
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

const dataSector = computed(() => ({
  labels: [
  "Ngành hàng 01",
  "Ngành hàng 02",
  "Ngành hàng 03",
  "Ngành hàng 04",
  "Ngành hàng 05",
  ],
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: [40, 25, 20, 10, 5]
    },
  ],
}));

const columns = ref<Array<any>>([
  {
    title: translate("sectorsName"),
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
    name: "Ngành hàng 01",
    quantity: 1000,
  },
  {
    id: 2,
    name: "Ngành hàng 02",
    quantity: 950,
  },
  {
    id: 3,
    name: "Ngành hàng 03",
    quantity: 900,
  },
  {
    id: 4,
    name: "Ngành hàng 04",
    quantity: 850,
  },
  {
    id: 5,
    name: "Ngành hàng 05",
    quantity: 800,
  },
];

</script>

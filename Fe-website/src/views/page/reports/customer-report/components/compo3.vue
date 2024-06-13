<template>
  <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-4 xl:tw-grid-cols-2 xl:tw-gap-8">
    <div class="tw-bg-[#37404a] tw-py-4 tw-rounded-lg tw-h-[600px]">
      <ChartCustomerYears />
    </div>
    <div class="tw-bg-[#37404a] tw-p-4 tw-rounded-lg tw-h-[600px]">
      <div class="tw-w-full tw-h-[56px] tw-mb-6">
        <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold">{{ translate("reportCustomer.ListPotentialCustomers") }}</div>
      </div>
      <div class="tw-h-[calc(100%-80px)] tw-overflow-hidden tw-overflow-y-auto">
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="false"
          :columns="columns"
          :has-checkbox="false"
          :no-sort="true"
          v-if="!loading"
          :dataSource="data?.dataPotentialCustomers"
          class="tw-h-full"
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
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { translate } from "@/languages/i18n";
import AntdTable from "@/components/antd-table/index.vue";

const ChartCustomerYears = defineAsyncComponent(() => import("./chartCustomerYears.vue"));
const loading = ref<boolean>(false);

const props = defineProps({
  data: {
    type: Object,
  },
});

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
    width: "20%"
  },
  {
    title: translate("TotalValueOrders"),
    dataIndex: "totalOrders",
    key: "totalOrders",
    align: "left",
    width: "30%"
  },
]);
</script>

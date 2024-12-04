<template>
  <div class="w-full grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
    <div class="bg-[#37404a] py-4 rounded-lg h-[600px]">
      <ChartCustomerYears />
    </div>
    <div class="bg-[#37404a] p-4 rounded-lg h-[600px]">
      <div class="w-full h-[28px] mb-6">
        <div class="text-xl text-[#aab8c5] font-semibold">{{ translate("reportCustomer.ListPotentialCustomers") }}</div>
      </div>
      <div class="h-[calc(100%-52px)] overflow-hidden overflow-y-auto">
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="false"
          :columns="columns"
          :has-checkbox="false"
          :no-sort="true"
          v-if="!loading"
          :dataSource="dataPotentialCustomers"
          class="h-full"
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

const dataPotentialCustomers = [
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn A",
    address: "Hải dương",
    purchaseCount: "50",
    totalOrders: 100000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn B",
    address: "Chí linh",
    purchaseCount: "45",
    totalOrders: 95000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn C",
    address: "Hải phòng",
    purchaseCount: "40",
    totalOrders: 90000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn D",
    address: "Quảng ninh",
    purchaseCount: "35",
    totalOrders: 85000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn E",
    address: "Hà nội",
    purchaseCount: "30",
    totalOrders: 80000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn F",
    address: "Hải dương",
    purchaseCount: 20,
    totalOrders: 75000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn G",
    address: "Tp.Hồ Chí Minh",
    purchaseCount: 20,
    totalOrders: 70000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn H",
    address: "Bình dương",
    purchaseCount: 20,
    totalOrders: 65000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn I",
    address: "Hải dương",
    purchaseCount: 20,
    totalOrders: 60000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn K",
    address: "Hải dương",
    purchaseCount: 20,
    totalOrders: 55000000
  },
  {
    phoneNumber: "012345678",
    name: "Nguyễn Văn L",
    address: "Hải dương",
    purchaseCount: 20,
    totalOrders: 50000000
  }
]
</script>

<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="name-page">{{ translate("warehouse.export") }}</div>

  <div class="tw-w-full tw-rounded-lg tw-bg-white tw-p-4 section-ctn tw-mb-6 tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-4 lg:tw-gap-6">
    <div class="tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-sm tw-mb-3">{{ translate("warehouse.title") }}</div>
      <a-select :options="optionWh?.map((x) => ({ value: x.code, label: x.name }))" v-model:value="warehouseSelected" :placeholder="translate('warehouse.title')" />
    </div>
    <div class="tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-sm tw-mb-3">{{ translate("common.time") }}</div>
      <a-date-picker v-model:value="timeSelected" :placeholder="translate('common.selectTime')" />
    </div>
    <div class="tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-sm tw-mb-3">{{ translate("common.exportStatus") }}</div>
      <a-select :options="statusOption" v-model:value="exportStatusSelect" :placeholder="translate('common.exportStatus')" />
    </div>
  </div>

  <Section :title="translate('warehouse.listExport')" :subTitle="translate('warehouse.numberExport')" :number="dataImportOrder.length">
    <template #action>
      <div class="tw-flex tw-items-center tw-gap-4">
        <a-button type="text">
          <div class="tw-h-full tw-flex tw-items-center tw-gap-x-2">
            <dowloadIcon />
            {{ translate("common.importFile") }}
          </div>
        </a-button>
        <a-button type="primary" @click="handleCreateNew">
          <div class="tw-flex tw-items-center tw-gap-3">
            <plusCircle />
            {{ translate("warehouse.createExport") }}
          </div>
        </a-button>
      </div>
    </template>
    <template #content>
      <AntdTable
        :columns="columns"
        :dataSource="dataImportOrder"
        :isPagination="true"
        :isLoading="loadTable"
        :currentPage="currentPage"
        keyField="code"
        @onChange="onChangeTable"
        @onSelected="handleSelectRows"
      >
        <template #custom-body="{column, record}">
          <template v-if="column.key === 'status' && record">
            <a-tag v-if="record.status == 'Completed'" color="success">{{ translate('common.completed') }}</a-tag>
            <a-tag v-else color="processing">{{ translate('common.pending') }}</a-tag>
          </template>

          <template v-if="column.key === 'total' && record">
            {{ record.total.toLocaleString("en-US") }}
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>
</template>
<script setup lang="ts">
import SectionBreadcrumb from "@/components/section-breadcrumb/index.vue";
import { translate } from "@/languages/i18n";
import { Dayjs } from "dayjs";
import { onMounted, ref } from "vue";
import Section from "@/components/section/index.vue";
import dowloadIcon from "@/components/icons/dowloadIcon.vue";
import plusCircle from "@/components/icons/plusCircle.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const listBreadCrumb = ref<any[]>([
  {
    title: translate("warehouse.export"),
    url: "/warehouse-export",
  },
]);

const warehouseSelected = ref<string>(null);
const optionWh = [
  {
    code: "KH001",
    name: "Kho hàng A",
  },
  {
    code: "KH002",
    name: "Kho hàng B",
  },
  {
    code: "KH003",
    name: "Kho hàng C",
  },
];

onMounted(() => {
  warehouseSelected.value = optionWh[0].code;
});

const timeSelected = ref<Dayjs>();


const columns = ref<any[]>([
  {
    title: translate('warehouse.codeOrders'),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate('common.dateCreate'),
    dataIndex: "dateCreate",
    key: "dateCreate",
    align: "left",
  },
  {
    title: translate('warehouse.exportBranch'),
    dataIndex: "branch",
    key: "branch",
    align: "left",
  },
  {
    title: translate('common.status'),
    dataIndex: "status",
    key: "status",
    align: "left",
  },
  {
    title: translate("warehouse.staffCharge"),
    dataIndex: "staffName",
    key: "staffName",
    aligin: "left",
  },
  {
    title: translate('common.totalValue'),
    dataIndex: "total",
    key: "total",
    align: "left",
  },
]);

const dataImportOrder = [
  { code: 'ORD001', dateCreate: '2024-07-18', branch: 'Hanoi', status: 'Pending', staffName: 'Nguyen Van A', quantity: 100, total: 1000 },
  { code: 'ORD002', dateCreate: '2024-07-18', branch: 'Hanoi', status: 'Completed', staffName: 'Tran Thi B', quantity: 200, total: 2000 },
  { code: 'ORD003', dateCreate: '2024-07-18', branch: 'Ho Chi Minh', status: 'Pending', staffName: 'Le Van C', quantity: 150, total: 1500 },
  { code: 'ORD004', dateCreate: '2024-07-18', branch: 'Da Nang', status: 'Completed', staffName: 'Pham Thi D', quantity: 120, total: 1200 },
  { code: 'ORD005', dateCreate: '2024-07-18', branch: 'Hai Phong', status: 'Pending', staffName: 'Nguyen Van E', quantity: 130, total: 1300 },
  { code: 'ORD006', dateCreate: '2024-07-18', branch: 'Can Tho', status: 'Completed', staffName: 'Tran Thi F', quantity: 170, total: 1700 },
  { code: 'ORD007', dateCreate: '2024-07-18', branch: 'Hanoi', status: 'Pending', staffName: 'Le Van G', quantity: 110, total: 1100 },
  { code: 'ORD008', dateCreate: '2024-07-18', branch: 'Ho Chi Minh', status: 'Completed', staffName: 'Pham Thi H', quantity: 160, total: 1600 },
  { code: 'ORD009', dateCreate: '2024-07-18', branch: 'Da Nang', status: 'Pending', staffName: 'Nguyen Van I', quantity: 180, total: 1800 },
  { code: 'ORD010', dateCreate: '2024-07-18', branch: 'Hai Phong', status: 'Completed', staffName: 'Tran Thi J', quantity: 140, total: 1400 },
  { code: 'ORD011', dateCreate: '2024-07-18', branch: 'Can Tho', status: 'Pending', staffName: 'Le Van K', quantity: 190, total: 1900 },
  { code: 'ORD012', dateCreate: '2024-07-18', branch: 'Hanoi', status: 'Completed', staffName: 'Pham Thi L', quantity: 150, total: 1500 },
  { code: 'ORD013', dateCreate: '2024-07-18', branch: 'Ho Chi Minh', status: 'Pending', staffName: 'Nguyen Van M', quantity: 170, total: 1700 },
  { code: 'ORD014', dateCreate: '2024-07-18', branch: 'Da Nang', status: 'Completed', staffName: 'Tran Thi N', quantity: 160, total: 1600 },
  { code: 'ORD015', dateCreate: '2024-07-18', branch: 'Hai Phong', status: 'Pending', staffName: 'Le Van O', quantity: 180, total: 1800 },
  { code: 'ORD016', dateCreate: '2024-07-18', branch: 'Can Tho', status: 'Completed', staffName: 'Pham Thi P', quantity: 130, total: 1300 },
  { code: 'ORD017', dateCreate: '2024-07-18', branch: 'Hanoi', status: 'Pending', staffName: 'Nguyen Van Q', quantity: 110, total: 1100 },
  { code: 'ORD018', dateCreate: '2024-07-18', branch: 'Ho Chi Minh', status: 'Completed', staffName: 'Tran Thi R', quantity: 120, total: 1200 },
  { code: 'ORD019', dateCreate: '2024-07-18', branch: 'Da Nang', status: 'Pending', staffName: 'Le Van S', quantity: 190, total: 1900 },
  { code: 'ORD020', dateCreate: '2024-07-18', branch: 'Hai Phong', status: 'Completed', staffName: 'Pham Thi T', quantity: 100, total: 1000 },
  { code: 'ORD021', dateCreate: '2024-07-18', branch: 'Can Tho', status: 'Pending', staffName: 'Nguyen Van U', quantity: 200, total: 2000 },
  { code: 'ORD022', dateCreate: '2024-07-18', branch: 'Hanoi', status: 'Completed', staffName: 'Tran Thi V', quantity: 140, total: 1400 },
  { code: 'ORD023', dateCreate: '2024-07-18', branch: 'Ho Chi Minh', status: 'Pending', staffName: 'Le Van W', quantity: 130, total: 1300 },
  { code: 'ORD024', dateCreate: '2024-07-18', branch: 'Da Nang', status: 'Completed', staffName: 'Pham Thi X', quantity: 150, total: 1500 },
  { code: 'ORD025', dateCreate: '2024-07-18', branch: 'Hai Phong', status: 'Pending', staffName: 'Nguyen Van Y', quantity: 170, total: 1700 },
  { code: 'ORD026', dateCreate: '2024-07-18', branch: 'Can Tho', status: 'Completed', staffName: 'Tran Thi Z', quantity: 180, total: 1800 },
  { code: 'ORD027', dateCreate: '2024-07-18', branch: 'Hanoi', status: 'Pending', staffName: 'Le Van A1', quantity: 160, total: 1600 },
  { code: 'ORD028', dateCreate: '2024-07-18', branch: 'Ho Chi Minh', status: 'Completed', staffName: 'Pham Thi B1', quantity: 110, total: 1100 },
  { code: 'ORD029', dateCreate: '2024-07-18', branch: 'Da Nang', status: 'Pending', staffName: 'Nguyen Van C1', quantity: 150, total: 1500 },
  { code: 'ORD030', dateCreate: '2024-07-18', branch: 'Hai Phong', status: 'Completed', staffName: 'Tran Thi D1', quantity: 120, total: 1200 }
];


const currentPage = ref<number>(1);
const listSelected = ref<any[]>([]);
const loadTable = ref<boolean>(false);

const onChangeTable = (data: any) => {
  currentPage.value = data.current;
};

const handleSelectRows = (rows: any) => {
  listSelected.value = rows.value.map((x: any) => ({ code: x?.code }));
};

const exportStatusSelect = ref<string>(null);

const statusOption = ref<any[]>([
  {
    value: "Completed",
    label: translate('common.completed'),
  },
  {
    value: "Pending",
    label: translate('common.pending'),
  }
])

const handleCreateNew = () => {
  router.push("/create-export");
};
</script>
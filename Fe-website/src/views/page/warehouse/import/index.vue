<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="name-page">{{ translate("warehouse.import") }}</div>

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
      <div class="tw-text-sm tw-mb-3">{{ translate("common.importStatus") }}</div>
      <a-select :options="optionWh?.map((x) => ({ value: x.code, label: x.name }))" v-model:value="importStatusSelect" :placeholder="translate('common.importStatus')" />
    </div>
  </div>

  <Section :title="translate('warehouse.listImport')" :subTitle="translate('warehouse.numberImport')" :number="dataImportOrder.length">
    <template #action>
      <div class="tw-flex tw-items-center ">
        <a-button type="text">
          <div class="tw-h-full tw-flex tw-items-center tw-gap-x-2">
            <dowloadIcon />
            {{ translate("common.importFile") }}
          </div>
        </a-button>
        <a-button type="primary">
          <div class="tw-flex tw-items-center tw-gap-3">
            <plusCircle />
            {{ translate("warehouse.addImport") }}
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

const listBreadCrumb = ref<any>([
  {
    title: translate("warehouse.import"),
    url: "/warehouse-import",
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

const importStatusSelect = ref<string>(null);

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
    title: translate('warehouse.importBranch'),
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
    title: translate("warehouse.quantityImported"),
    dataIndex: "quantity",
    key: "quantity",
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


</script>
<!-- <template>
  <div class="tw-mb-6 tw-p-6 tw-bg-white tw-rounded-xl">
    <a-Tabs v-model:activeKey="activeKey" type="card" class="tw-h-[177px]" v-if="!loading">
      <a-tab-pane v-for="item in listWhInfo" :key="item.id" :tab="item.name">
        <TabWhInfo :data="item" />
      </a-tab-pane>
    </a-Tabs>

    <a-skeleton v-else active />
  </div>

  <div class="tw-w-full tw-flex tw-gap-6 tw-justify-between">
    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-basis-1/4">
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectDay") }}</div>
      <a-date-picker class="tw-mb-6" :placeholder="translate('SelectDay')" v-model:value="searchingDay" :allowClear="false" />
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectMonth") }}</div>
      <a-date-picker class="tw-mb-6" picker="month" :placeholder="translate('SelectMonth')" v-model:value="searchingMonth" :allowClear="false" />
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectYear") }}</div>
      <a-date-picker class="tw-mb-6" picker="year" :placeholder="translate('SelectYear')" v-model:value="searchingYear" :allowClear="false" />
      <AntdButton type="primary" class="tw-mb-6 tw-w-[200px]" @click="handleSubmitFilter">
        <span class="tw-text-sm tw-ml-2">{{ translate("LookUpImportHistory") }}</span>
      </AntdButton>
      <AntdButton :type="'text'" class="tw-mb-6" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </div>

    <div class="tw-grow tw-min-h-[calc(100vh-240px)]">
      <Section class="tw-w-full tw-bg-white tw-h-full" :title="translate('ImportHistory')">
        <template #action>
          <AntdButton type="primary" @click="goImportGodds">
            <span class="tw-text-sm tw-ml-2">{{ translate("ImportGoods") }}</span>
          </AntdButton>
        </template>
        <template #body>
          <AntdTable
            ref="table"
            key-field="id"
            :index-column="true"
            :columns="columns"
            :dataSource="listWHImport"
            class="tw-w-full tw-h-[60vh] tw-overflow-hidden tw-overflow-y-auto"
            v-if="!loadingImport"
          >
          </AntdTable>
          
          <a-skeleton v-else active />
        </template>
      </Section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import Section from "@/components/section/index.vue";
import { useStore } from "vuex";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import dayjs, { Dayjs } from "dayjs";
import { removeNullObjects } from "@/utils/common";
import { useRoute, useRouter } from "vue-router";
import TabWhInfo from "@/components/list-tab-warehouse/index.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const listWhInfo = computed(() => store.getters["warehouse/warehouseInfo"]);
const listWHImport = computed(() => store.getters["warehouse/warehouseImport"]);
const loading = computed(() => store.getters["warehouse/loading"]);
const loadingImport = computed(() => store.getters["warehouse/loadingImport"]);
const activeKey = ref<number>(0);
const columns = ref<Array<any>>([
  {
    title: translate("GoodsReceiptCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "totalProduct",
    key: "totalProduct",
    align: "left",
  },
  {
    title: translate("ImportDate"),
    dataIndex: "timeCreate",
    key: "timeCreate",
    align: "left",
  },
]);
const searchingDay = ref<Dayjs>();
const searchingMonth = ref<Dayjs>();
const searchingYear = ref<Dayjs>();

const disabledDeleteFilter = computed(() => false);

const handleClearFilter = () => {
  searchingDay.value = null;
  searchingMonth.value = null;
  searchingYear.value = null;
  fetchData({id: activeKey.value, params: null});
};

const handleSubmitFilter = () => {
  let params: any = {
    day: null,
    month: null,
    year: null,
  };

  if (searchingDay.value) {
    params.day = searchingDay.value.format("DD");
    params.month = searchingDay.value.format("MM");
    params.year = searchingDay.value.format("YYYY");
  }

  if (searchingMonth.value) {
    params.day = null;
    params.month = searchingMonth.value.format("MM");
    params.year = searchingMonth.value.format("YYYY");
  }

  if (searchingYear.value) {
    params.day = null;
    params.month = null;
    params.year = searchingYear.value.format("YYYY");
  }

  const payload = {
    id: activeKey.value,
    params: removeNullObjects(params)
  }

  fetchData(payload);
};

const goImportGodds = () => {
  router.push(`/import-goods/${activeKey.value}`);
};

const fetchData = async (params) => {
  await store.dispatch("warehouse/getHistoryImport", params);
};

watch(
  () => searchingDay.value,
  (val) => {
    if (val) {
      searchingMonth.value = null;
      searchingYear.value = null;
    }
  },
);

watch(
  () => searchingMonth.value,
  (val) => {
    if (val) {
      searchingDay.value = null;
      searchingYear.value = null;
    }
  },
);

watch(
  () => searchingYear.value,
  (val) => {
    if (val) {
      searchingDay.value = null;
      searchingMonth.value = null;
    }
  },
);

watch(
  () => activeKey.value,
  (val) => {
    fetchData({ id: val, params: null });
  },
);

onMounted(async () => {
  const temp = await store.dispatch("warehouse/getWarehouse", null);
  activeKey.value = temp?.data[0].id;
});
</script>
<style scoped lang="scss"></style> -->

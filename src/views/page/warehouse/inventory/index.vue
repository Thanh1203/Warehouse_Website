<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="name-page">{{ translate("warehouse.inventory") }}</div>

  <div class="w-full bg-white rounded-lg section-ctn p-4 mb-6">
    <div class="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 mb-6">
      <div class="flex flex-col justify-between">
        <div class="text-sm mb-3">{{ translate("warehouse.title") }}</div>
        <a-select :options="optionWh?.map((x) => ({ value: x.code, label: x.name }))" v-model:value="warehouseSelected" :placeholder="translate('warehouse.title')" />
      </div>
      <div class="flex flex-col justify-between">
        <div class="text-sm mb-3">{{ translate("inventory.category") }}</div>
        <a-select :options="optionWh?.map((x) => ({ value: x.code, label: x.name }))" v-model:value="categorySelected" :placeholder="translate('inventory.category')" />
      </div>
      <div class="flex flex-col justify-between">
        <div class="text-sm mb-3">{{ translate("product.type") }}</div>
        <a-select :options="optionWh?.map((x) => ({ value: x.code, label: x.name }))" v-model:value="proTypeSelected" :placeholder="translate('product.type')" />
      </div>
      <div class="flex flex-col justify-between">
        <div class="text-sm mb-3">{{ translate("supplier.title") }}</div>
        <a-select :options="optionWh?.map((x) => ({ value: x.code, label: x.name }))" v-model:value="supplierSelected" :placeholder="translate('supplier.title')" />
      </div>
    </div>
    <div class="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <div class="w-full flex items-center gap-4">
        <a-input-search :placeholder="translate('inventory.search')" enter-button v-model:value="filterSearching"/>
        <a-button type="text" danger :disabled="disabledClearSreach">
          <font-awesome-icon :icon="['fas', 'trash']" />
          <span class="ml-2">{{ translate('common.delete') }}</span>
        </a-button>
      </div>
      <div class="w-full flex items-center justify-end gap-4">
        <a-button type="text">
          <div class="h-full flex items-center gap-x-2">
            <eyeIcon />
            {{ translate("inventory.viewProductList") }}
          </div>
        </a-button>
        <a-button type="text">
          <div class="h-full flex items-center gap-x-2">
            <uploadIcon />
            {{ translate("common.exportFile") }}
          </div>
        </a-button>
        <a-button type="text">
          <div class="h-full flex items-center gap-x-2">
            <dowloadIcon />
            {{ translate("common.importFile") }}
          </div>
        </a-button>
      </div>
    </div>
  </div>

  <Section :title="translate('product.list')" :subTitle="translate('product.quantity')" :number="100">
    <template #action>
      <div class="flex items-center flex-wrap gap-4"></div>
      <a-radio-group v-model:value="stateProduct" class="mt-4">
        <a-radio-button value="1">{{ translate("common.all") }}</a-radio-button>
        <a-radio-button value="2">{{ translate("warehouse.available") }}</a-radio-button>
        <a-radio-button value="3">{{ translate("warehouse.soldOut") }}</a-radio-button>
      </a-radio-group>
    </template>
    <template #content>
      <AntdTable
        :columns="columns"
        :dataSource="dataInventory"
        :isPagination="true"
        :isLoading="loadTable"
        :currentPage="currentPage"
        @onChange="onChangeTable"
        @onSelected="handleSelectRows"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'name' && record">
            <a-tooltip>
              <template #title>{{ record.name }}</template>
              {{ record.name }}
            </a-tooltip>
          </template>

          <template v-if="column.key === 'skucode' && record">
            <a-tooltip>
              <template #title>{{ record.skucode }}</template>
              {{ record.skucode }}
            </a-tooltip>
          </template>

          <template v-if="column.key === 'barcode' && record">
            <a-tooltip>
              <template #title>{{ record.barcode }}</template>
              {{ record.barcode }}
            </a-tooltip>
          </template>

          <template v-if="column.key === 'price' && record">
            {{ record.price.toLocaleString("en-US") }}
          </template>

          <template v-if="column.key === 'cost' && record">
            {{ record.cost.toLocaleString("en-US") }}
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>
</template>
<script setup lang="ts">
import SectionBreadcrumb from "@/components/section-breadcrumb/index.vue";
import { translate } from "@/languages/i18n";
import { computed, onMounted, ref, watch } from "vue";
import Section from "@/components/section/index.vue";
import dowloadIcon from "@/components/icons/dowloadIcon.vue";
import uploadIcon from "@/components/icons/uploadIcon.vue";
import eyeIcon from "@/components/icons/eyeIcon.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { debounce } from "vue-debounce";

const listBreadCrumb = ref<any>([
  {
    title: translate("warehouse.inventory"),
    url: "/warehouse-inventory",
  },
]);

const warehouseSelected = ref<string>(null);
const categorySelected = ref<string>(null);
const proTypeSelected = ref<string>(null);
const supplierSelected = ref<string>(null);
const currentPage = ref<number>(1);
const loadTable = ref<boolean>(false);
const listSelected = ref<any[]>([]);

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

const filterSearching = ref<string>("");

const disabledClearSreach = computed(() => filterSearching.value.length === 0);

watch(
  () => filterSearching.value,
  debounce((val) => {
    console.log(val);
  },500)
)

const fetchAllDataInventory = (val) => {};

const fetchPortfolio = (val) => {
  console.log(val);
};

const fetchListInventory = (param) => {
  console.log(param);
};

watch(
  () => warehouseSelected.value,
  (val) => {
    fetchPortfolio(val);
  },
);

watch(
  () => categorySelected.value,
  (val) => {
    fetchListInventory(val);
  },
);

onMounted(() => {
  warehouseSelected.value = optionWh[0].code;
});

const stateProduct = ref("1");

const columns = ref<any[]>([
  {
    title: translate("product.name"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("product.sku"),
    dataIndex: "skucode",
    key: "skucode",
    align: "left",
  },
  {
    title: translate("product.barCode"),
    dataIndex: "barcode",
    key: "barcode",
    align: "left",
  },
  {
    title: translate("warehouse.inventory"),
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
  },
  {
    title: translate("inventory.canSold"),
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
  },
  {
    title: translate("product.price"),
    dataIndex: "price",
    key: "price",
    align: "left",
  },
  {
    title: translate("product.cost"),
    dataIndex: "cost",
    key: "cost",
    align: "left",
  },
]);

const onChangeTable = (data: any) => {
  currentPage.value = data.current;
};

const handleSelectRows = (rows: any) => {
  listSelected.value = rows.value.map((x: any) => ({ code: x?.code }));
};

let dataInventory = [
  { id: 1, name: "Sản phẩm 1", skucode: "SKU001", barcode: "123456789001", quantity: 50, cansold: 50, price: 100000, cost: 80000 },
  { id: 2, name: "Sản phẩm 2", skucode: "SKU002", barcode: "123456789002", quantity: 30, cansold: 30, price: 80000, cost: 60000 },
  { id: 3, name: "Sản phẩm 3", skucode: "SKU003", barcode: "123456789003", quantity: 40, cansold: 40, price: 120000, cost: 90000 },
  { id: 4, name: "Sản phẩm 4", skucode: "SKU004", barcode: "123456789004", quantity: 25, cansold: 25, price: 150000, cost: 110000 },
  { id: 5, name: "Sản phẩm 5", skucode: "SKU005", barcode: "123456789005", quantity: 60, cansold: 60, price: 90000, cost: 70000 },
  { id: 6, name: "Sản phẩm 6", skucode: "SKU006", barcode: "123456789006", quantity: 35, cansold: 35, price: 110000, cost: 85000 },
  { id: 7, name: "Sản phẩm 7", skucode: "SKU007", barcode: "123456789007", quantity: 45, cansold: 45, price: 130000, cost: 95000 },
  { id: 8, name: "Sản phẩm 8", skucode: "SKU008", barcode: "123456789008", quantity: 55, cansold: 55, price: 100000, cost: 75000 },
  { id: 9, name: "Sản phẩm 9", skucode: "SKU009", barcode: "123456789009", quantity: 20, cansold: 20, price: 140000, cost: 100000 },
  { id: 10, name: "Sản phẩm 10", skucode: "SKU010", barcode: "123456789010", quantity: 70, cansold: 70, price: 95000, cost: 72000 },
  { id: 11, name: "Sản phẩm 11", skucode: "SKU011", barcode: "123456789011", quantity: 15, cansold: 15, price: 160000, cost: 120000 },
  { id: 12, name: "Sản phẩm 12", skucode: "SKU012", barcode: "123456789012", quantity: 50, cansold: 50, price: 90000, cost: 68000 },
  { id: 13, name: "Sản phẩm 13", skucode: "SKU013", barcode: "123456789013", quantity: 25, cansold: 25, price: 110000, cost: 80000 },
  { id: 14, name: "Sản phẩm 14", skucode: "SKU014", barcode: "123456789014", quantity: 40, cansold: 40, price: 120000, cost: 90000 },
  { id: 15, name: "Sản phẩm 15", skucode: "SKU015", barcode: "123456789015", quantity: 30, cansold: 30, price: 130000, cost: 95000 },
  { id: 16, name: "Sản phẩm 16", skucode: "SKU016", barcode: "123456789016", quantity: 35, cansold: 35, price: 140000, cost: 105000 },
  { id: 17, name: "Sản phẩm 17", skucode: "SKU017", barcode: "123456789017", quantity: 60, cansold: 60, price: 80000, cost: 60000 },
  { id: 18, name: "Sản phẩm 18", skucode: "SKU018", barcode: "123456789018", quantity: 45, cansold: 45, price: 100000, cost: 75000 },
  { id: 19, name: "Sản phẩm 19", skucode: "SKU019", barcode: "123456789019", quantity: 55, cansold: 55, price: 110000, cost: 85000 },
  { id: 20, name: "Sản phẩm 20", skucode: "SKU020", barcode: "123456789020", quantity: 65, cansold: 65, price: 120000, cost: 90000 },
  { id: 21, name: "Sản phẩm 21", skucode: "SKU021", barcode: "123456789021", quantity: 30, cansold: 30, price: 130000, cost: 95000 },
  { id: 22, name: "Sản phẩm 22", skucode: "SKU022", barcode: "123456789022", quantity: 40, cansold: 40, price: 140000, cost: 105000 },
  { id: 23, name: "Sản phẩm 23", skucode: "SKU023", barcode: "123456789023", quantity: 50, cansold: 50, price: 90000, cost: 68000 },
  { id: 24, name: "Sản phẩm 24", skucode: "SKU024", barcode: "123456789024", quantity: 25, cansold: 25, price: 110000, cost: 80000 },
  { id: 25, name: "Sản phẩm 25", skucode: "SKU025", barcode: "123456789025", quantity: 35, cansold: 35, price: 120000, cost: 90000 },
  { id: 26, name: "Sản phẩm 26", skucode: "SKU026", barcode: "123456789026", quantity: 45, cansold: 45, price: 130000, cost: 95000 },
  { id: 27, name: "Sản phẩm 27", skucode: "SKU027", barcode: "123456789027", quantity: 55, cansold: 55, price: 140000, cost: 105000 },
  { id: 28, name: "Sản phẩm 28", skucode: "SKU028", barcode: "123456789028", quantity: 60, cansold: 60, price: 80000, cost: 60000 },
  { id: 29, name: "Sản phẩm 29", skucode: "SKU029", barcode: "123456789029", quantity: 45, cansold: 45, price: 100000, cost: 75000 },
  { id: 30, name: "Sản phẩm 30", skucode: "SKU030", barcode: "123456789030", quantity: 55, cansold: 55, price: 110000, cost: 85000 },
];
</script>
<style lang="scss"></style>

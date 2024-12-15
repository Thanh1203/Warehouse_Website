<template>
  <div class="bg-white px-6 py-5 mb-6 rounded-xl">
    <a-config-provider :locale="locale">
      <a-form class="grow" layout="vertical">
        <a-row :gutter="16">
          <a-col class="w-1/5">
            <a-form-item :label="translate('GoodsReceiptCode')">
              <a-input :placeholder="translate('Search')" v-model:value="filterSearching.code" />
            </a-form-item>
          </a-col>
          <a-col class="w-1/5">
            <a-form-item :label="translate('Warehouse')" class="mb-0">
              <a-select :placeholder="translate('Search')" v-model:value="filterSearching.warehouseId" :options="warehouses" />
            </a-form-item>
          </a-col>
          <a-col class="w-1/5">
            <a-form-item :label="translate('Supplier')" class="mb-0">
              <a-select :placeholder="translate('Search')" v-model:value="filterSearching.supplierId" :options="suppliers" />
            </a-form-item>
          </a-col>
          <a-col class="w-1/5">
            <a-form-item :label="translate('StaffCharge')" class="mb-0">
              <a-select :placeholder="translate('Search')" v-model:value="filterSearching.staffId" :options="personnel" />
            </a-form-item>
          </a-col>
          <a-col class="w-1/5">
            <a-form-item :label="translate('ImportDate')" class="mb-0">
              <a-date-picker :placeholder="translate('Search')" v-model:value="filterSearching.createAt" format="DD/MM/YYYY" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-config-provider>
    <div class="flex justify-end">
      <AntdButton :type="'text'" danger @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="ml-2">{{ translate("DeleteFilter") }}</span>
      </AntdButton>
    </div>
  </div>
  <Section :title="translate('ImportHistory')">
    <template #action>
      <AntdButton :type="'primary'" @click="handleOpenModalPurchase">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="text-sm ml-2">{{ translate("ImportGoods") }}</span>
      </AntdButton>
    </template>
    <template #body>
      <AntdTable
        ref="table"
        key-field="Id"
        :columns="columns"
        :data-source="purchaseOrders"
        :index-column="true"
        class="w-full h-[calc(100vh-334px)] overflow-hidden overflow-y-auto"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'Status' && record">
            <a-tag color="success">{{ translate(`${record.Status}`) }}</a-tag>
          </template>
          <template v-if="column.key === 'CreateAt' && record">
            {{ dayjs(record.CreateAt).format("DD/MM/YYYY") }}
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>

  <!-- nodal -->
  <PucharseOrder v-if="visibleModalPurchase" :isVisible="visibleModalPurchase" :titleModal="titleModal" @closeModal="handleCloseModal" />
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import dayjs, { Dayjs } from "dayjs";
import AntdTable from "@/components/antd-table/index.vue";
import { removeNullObjects } from "@/utils/common";
import { useRoute, useRouter } from "vue-router";
import viVN from "ant-design-vue/es/locale/vi_VN";
import "dayjs/locale/vi";
import { debounce } from "vue-debounce";
import Section from "@/components/section/index.vue";

const PucharseOrder = defineAsyncComponent(() => import("./components/PurchaseOrder.vue"));

dayjs.locale("vi");

const locale = ref(viVN);
const store = useStore();
const router = useRouter();
const route = useRoute();

const warehouses = computed(() => {
  const result = store.getters["warehouse/warehouseInfo"];
  return result.map((x) => ({ label: x.Code, value: x.Id }));
});
const suppliers = computed(() => {
  const result = store.getters["producer/producerData"];
  return result.filter((x) => x?.IsCollab === true).map((x) => ({ label: x?.Code, value: x?.Id }));
});
const personnel = computed(() => {
  const result = store.getters["personnel/personnelData"];
  return result.filter((x) => x?.Status === "ACTIVE").map((x) => ({ label: x?.Name, value: x?.Id }));
});

const filterSearching = reactive({
  code: "",
  warehouseId: null,
  supplierId: null,
  staffId: null,
  createAt: null,
  status: null,
});

const handleClearFilter = () => {
  filterSearching.code = "";
  filterSearching.warehouseId = null;
  filterSearching.supplierId = null;
  filterSearching.staffId = null;
  filterSearching.createAt = null;
  filterSearching.status = null;
};

const purchaseOrders = computed(() => store.getters["warehouse/historyImport"]);
const columns = ref<Array<any>>([
  {
    title: translate("GoodsReceiptCode"),
    dataIndex: "Code",
    key: "Code",
    align: "left",
  },
  {
    title: translate("StaffCharge"),
    dataIndex: "staffName",
    key: "staffName",
    align: "left",
  },
  {
    title: translate("common.Status"),
    dataIndex: "Status",
    key: "Status",
    align: "left",
  },
  {
    title: translate("ImportDate"),
    dataIndex: "CreateAt",
    key: "CreateAt",
    align: "left",
  },
]);

const titleModal = ref<string>("");
const visibleModalPurchase = ref<boolean>(false);

const handleOpenModalPurchase = () => {
  titleModal.value = translate("EnterWarehouse");
  visibleModalPurchase.value = true;
};

const handleCloseModal = () => {
  visibleModalPurchase.value = false;
};

watch(
  () => filterSearching,
  debounce(async () => {
    const params = {
      code: filterSearching.code,
      warehouseId: filterSearching.warehouseId,
      supplierId: filterSearching.supplierId,
      staffId: filterSearching.staffId,
      createAt: filterSearching.createAt ? dayjs(filterSearching.createAt).toISOString() : null,
      status: filterSearching.status,
    };
    await store.dispatch("warehouse/getHistoryImport", removeNullObjects(params));
  }, 500),
  { deep: true },
);

const fetchDataFilter = async () => {
  await Promise.all([
    store.dispatch("producer/getSupplier", null),
    store.dispatch("warehouse/getWarehouse", null),
    store.dispatch("personnel/getPersonnel", null),
    store.dispatch("product/getProduct", null),
  ]);
};

const fetchData = async (params) => {
  await store.dispatch("warehouse/getHistoryImport", params);
};

onMounted(async () => {
  await Promise.all([fetchDataFilter(), fetchData(null)]);
});
</script>
<style scoped lang="scss"></style>

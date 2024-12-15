<template>
  <div class="bg-white px-6 py-5 mb-6 rounded-xl">
    <a-form class="grow" layout="vertical">
      <a-row :gutter="16">
        <a-col class="w-1/4">
          <a-form-item :label="translate('Warehouse')">
            <a-select :placeholder="translate('Search')" v-model:value="filterSearching.warehouseId" :options="warehouses" />
          </a-form-item>
          <a-form-item :label="translate('ProductCode')">
            <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" />
          </a-form-item>
        </a-col>
        <a-col class="w-1/4">
          <a-form-item :label="translate('Supplier')">
            <a-select :placeholder="translate('Search')" v-model:value="filterSearching.supplierId" :options="suppliers" />
          </a-form-item>
          <a-form-item :label="translate('ProductName')">
            <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" />
          </a-form-item>
        </a-col>
        <a-col class="w-1/4">
          <a-form-item :label="translate('Category')">
            <a-select :placeholder="translate('Search')" v-model:value="filterSearching.categoryId" :options="categories" />
          </a-form-item>
        </a-col>
        <a-col class="w-1/4 flex flex-col justify-between">
          <a-form-item :label="translate('ProductClassify')">
            <a-select :placeholder="translate('Search')" v-model:value="filterSearching.classifyId" :options="classifies" />
          </a-form-item>
          <div class="mb-4">
            <AntdButton :type="'text'" danger @click="handleClearFilter">
              <template #icon>
                <font-awesome-icon :icon="['far', 'trash-can']" />
              </template>
              <span class="ml-2">{{ translate("DeleteFilter") }}</span>
            </AntdButton>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <Section :title="translate('ListProducts')" :subTitle="translate('TotalProducts')" :number="String(totalProduct)" class="w-full h-full bg-white overflow-hidden">
    <template #action>
      <AntdButton :type="'text'" danger class="mr-2" :disabled="disableDeleteMany" @click="handleDeleteProduct(listSelect, true)">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="text-sm ml-2"
          >{{ translate("Delete") }} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span
        >
      </AntdButton>
      <AntdButton :type="'primary'" @click="handleCreate">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="text-sm ml-2">{{ translate("AddNew") }}</span>
      </AntdButton>
    </template>
    <template #body>
      <AntdTable
        ref="table"
        key-field="Id"
        :index-column="true"
        :has-checkbox="true"
        :dataSource="products"
        :columns="columns"
        @onChange="handleTable"
        @onSelected="handleSelectRow"
        class="w-full h-[calc(100vh-380px)] overflow-hidden overflow-y-auto"
        v-if="!isLoading"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'Status' && record">
            <a-tag v-if="record.Status === 'ACTIVE'" color="success">{{ translate("common.active") }}</a-tag>
            <a-tag v-if="record.Status === 'DEACTIVE'" color="error">{{ translate("common.deactive") }}</a-tag>
          </template>
          <template v-if="column.key === 'CreateAt'">
            {{ dayjs(record.CreateAt).format("DD/MM/YYYY") }}
          </template>
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" type="text" shape="circle" @click="handleEdit(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" type="text" shape="circle" @click="handleDeleteProduct(record, false)">
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
      <a-skeleton v-else active />
    </template>
  </Section>
  <!-- modal -->
  <ModalCreate v-if="isVisibleModalCreate" :isVisible="isVisibleModalCreate" :form="formState" :isEdit="isEdit" :titleModal="titleModal" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { Modal, notification } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "vue-debounce";
import { removeNullObjects } from "@/utils/common";
import dayjs from "dayjs";

const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const warehouses = computed(() => {
  const result = store.getters["warehouse/warehouseInfo"];
  return result.map((x) => ({ label: x?.Code, value: x?.Id }));
});
const suppliers = computed(() => {
  const result = store.getters["producer/producerData"];
  return result.filter((x) => x?.IsCollab === true).map((x) => ({ label: x?.Code, value: x?.Id }));
});
const categories = computed(() => {
  const result = store.getters["category/categoryData"];
  return result.filter(x => x?.IsRestock === true && x?.SupplierId === filterSearching.supplierId && x?.WarehouseId === filterSearching.warehouseId).map(x => ({ label: x?.Code, value: x?.Id })); 
});
const classifies = computed(() => {
  const result = store.getters["classify/classifyData"];
  return result.filter(x => x?.IsRestock === true && x?.CategoryId === filterSearching.categoryId && x?.WarehouseId === filterSearching.warehouseId).map(x => ({ label: x?.Code, value: x?.Id }));
});

const filterSearching = reactive({
  keyword: "",
  code: "",
  warehouseId: null,
  supplierId: null,
  categoryId: null,
  classifyId: null,
  status: null,
});

const handleClearFilter = () => {
  filterSearching.keyword = "";
  filterSearching.code = "";
  filterSearching.warehouseId = null;
  filterSearching.supplierId = null;
  filterSearching.categoryId = null;
  filterSearching.classifyId = null;
  filterSearching.status = null;
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      name: filterSearching.keyword,
      code: filterSearching.code,
      warehouseId: filterSearching.warehouseId,
      supplierId: filterSearching.supplierId,
      categoryId: filterSearching.categoryId,
      classifyId: filterSearching.classifyId,
      status: filterSearching.status,
    };
    fetchData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

const listSelect = ref<Array<string | number>>([]);
const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const products = computed(() => store.getters["product/productData"]);
const totalProduct = computed(() => store.getters["product/totalElement"]);

const isVisibleModalCreate = ref<boolean>(false);
const titleModal = ref<string>("");
const isEdit = ref<boolean>(false);
const isLoading = computed(() => store.getters["product/loading"]);

const handleDeleteProduct = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "Products")),
    content: translate("NoDataRestore"),
    okText: translate("Agree"),
    cancelText: translate("Cancel"),
    centered: true,
    async onOk() {
      handleDelete(itemDelete);
    },
    onCancel() {},
  });
};

const handleDelete = async (itemDelete: any) => {
  let res;
  if (itemDelete.length > 1) {
    res = await store.dispatch("product/deleteProduct", {
      state: {productIds: itemDelete},
      params: {
        ...route.query,
      },
    });
  } else {
    res = await store.dispatch("product/deleteProduct", {
      state: {productIds: [itemDelete.Id]},
      params: {
        ...route.query,
      },
    });
  }
  listSelect.value = [];
  if (res.status === 403 || res.status === 500) {
    notification["error"]({
      message: translate("noti.deleteFail"),
    });
  } else {
    notification["success"]({
      message: translate("noti.deleteSuccess"),
    });
  }
};

const formState = reactive({
  id: null,
  code: "",
  name: "",
  categoryId: null,
  classifyId: null,
  supplierId: null,
  warehouseId: null,
  size: "",
  material: "",
  color: "",
  design: "",
  describe: "",
  status: "ACTIVE",
});

const handleCreate = () => {
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate("AddProductInfo");
  formState.id = null;
  formState.code = "";
  formState.name = "";
  formState.categoryId = null;
  formState.classifyId = null;
  formState.supplierId = null;
  formState.warehouseId = null;
  formState.size = "";
  formState.material = "";
  formState.color = "";
  formState.design = "";
  formState.describe = "";
  formState.status = "ACTIVE";
};

const columns = ref<Array<any>>([
  {
    title: translate("ProductCode"),
    dataIndex: "Code",
    key: "Code",
    align: "left",
  },
  {
    title: translate("ProductName"),
    dataIndex: "Name",
    key: "Name",
    align: "left",
  },
  {
    title: translate("Category"),
    dataIndex: "categoryCode",
    key: "categoryCode",
    align: "left",
  },
  {
    title: translate("Classify"),
    dataIndex: "classifyCode",
    key: "classifyCode",
    align: "left",
  },
  {
    title: translate("Supplier"),
    dataIndex: "supplierCode",
    key: "supplierCode",
    align: "left",
  },
  {
    title: translate("DateCreated"),
    dataIndex: "CreateAt",
    key: "CreateAt",
    align: "left",
  },
  {
    title: translate("common.Status"),
    dataIndex: "Status",
    key: "Status",
    aligin: "left",
    filters: [
      { text: `${translate("common.active")}`, value: 'ACTIVE' },
      { text: `${translate("common.deactive")}`, value: 'DEACTIVE' },
    ],
    filterMultiple: false,
    filteredValue: filterSearching.status ? [filterSearching.status] : null,
    width: 150,
  },
  {
    dataIndex: "action",
    key: "action",
    width: 80,
    align: "center",
    fixed: "right",
  },
]);

const handleTable = (pag: any, filter: any) => {
  filterSearching.status = filter.Status?.[0];
};

const handleSelectRow = (rows: any) => {
  listSelect.value = rows.map((x: any) => x?.Id);
};


const handleEdit = (item: any) => {
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateProductInfo");
  formState.id = item?.Id;
  formState.code = item?.Code;
  formState.name = item?.Name;
  formState.categoryId = item?.CategoryId;
  formState.classifyId = item?.ClassifyId;
  formState.supplierId = item?.SupplierId;
  formState.warehouseId = item?.WarehouseId;
  formState.size = item?.Size;
  formState.material = item?.Material;
  formState.color = item?.Color;
  formState.design = item?.Desgin;
  formState.describe = item?.Describe;
  formState.status = item?.Status;
};

const handleSubmitForm = async (state: any) => {
  let res;
  const data = {
    state,
    params: {
      ...route.query,
    },
  };
  if (isEdit.value) {
    res = await store.dispatch("product/updateProduct", data);
  } else {
    res = await store.dispatch("product/createProduct", data);
  }
  if (res.status === 403) {
    notification["error"]({
      message: translate("noti.createFail"),
    });
  } else {
    notification["success"]({
      message: translate("noti.createSuccess"),
    });
  }
  onCancel();
};
const onCancel = () => {
  isVisibleModalCreate.value = false;
};

const fetchDataFilter = async () => {
  await Promise.all([
    store.dispatch("producer/getSupplier", null),
    store.dispatch("category/getCategory", null),
    store.dispatch("classify/getClassify", null),
    store.dispatch("warehouse/getWarehouse", null),
  ]);
};

const fetchData = async (params) => {
  await store.dispatch("product/getProduct", params);
};

onMounted(async () => {
  await Promise.all([fetchDataFilter(), fetchData(null)]);
});
</script>
<style lang="scss"></style>

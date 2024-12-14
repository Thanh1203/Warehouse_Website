<template>
  <Section :title="translate('CategoryList')" :subTitle="translate('TotalCategories')" :number="String(totalCategory)" class="w-full h-full bg-white overflow-hidden">
    <template #action>
      <AntdButton :type="'text'" danger :disabled="disableDeleteMany" class="mr-2" @click="handleDeleteCategory(listSelect, true)">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="text-sm ml-2"
          >{{ translate("Delete") }} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span
        >
      </AntdButton>
      <AntdButton :type="'primary'" @click="handelCreate">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="text-sm ml-2">{{ translate("AddNew") }}</span>
      </AntdButton>
    </template>

    <template #action-second>
      <div class="flex gap-3 mt-3">
        <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" class="w-1/5" />
        <a-select
          class="w-1/6"
          :placeholder="translate('SelectWarehouse')"
          v-model:value="filterSearching.warehouseId"
          :options="warehouses.map((x) => ({ value: x.Id, label: x.Name }))"
        />
        <a-select
          class="w-1/6"
          :placeholder="translate('SelectSupplier')"
          v-model:value="filterSearching.supplierId"
          :options="suppliers.map((x) => ({ value: x.Id, label: x.Name }))"
        />
        <AntdButton :type="'text'" danger @click="handleClearFilter">
          <template #icon>
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </template>
          <span class="ml-2">{{ translate("DeleteFilter") }}</span>
        </AntdButton>
      </div>
    </template>

    <template #body>
      <AntdTable
        ref="table"
        key-field="Id"
        :index-column="true"
        :has-checkbox="true"
        :dataSource="categoryData"
        :columns="columns"
        @onChange="handleTable"
        @onSelected="handleSelectRow"
        class="w-full h-[calc(100vh-204px)] overflow-hidden overflow-y-auto"
        v-if="!loading"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'CreateAt' && record">
            {{ dayjs(record.CreateAt).format("DD/MM/YYYY") }}
          </template>
          <template v-if="column.key === 'IsRestock' && record">
            <a-tag v-if="record.IsRestock" color="success">{{ translate("common.active") }}</a-tag>
            <a-tag v-else color="error">{{ translate("common.deactive") }}</a-tag>
          </template>
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleUpdate(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteCategory(record, false)">
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
  <ModalCreate :isVisible="isVisibleModalCreate" :titleModal="titleModal" :form="formState" :isEdit="isEdit" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { ref, computed, reactive, watch, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import { Modal, notification } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { removeNullObjects } from "@/utils/common";
import { debounce } from "vue-debounce";
import dayjs from "dayjs";

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const categoryData = computed(() => store.getters["category/categoryData"]);
const totalCategory = computed(() => store.getters["category/totalElement"]);
const loading = computed(() => store.getters["category/loading"]);
const warehouses = computed(() => store.getters["warehouse/warehouseInfo"]);
const suppliers = computed(() => store.getters["producer/producerData"]);

const listSelect = ref<any>([]);
const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const filterSearching = reactive({
  keyword: "",
  supplierId: null,
  warehouseId: null,
  status: null,
});
const columns = ref<Array<any>>([
  {
    title: translate("CategoryCode"),
    dataIndex: "Code",
    key: "Code",
    align: "left",
  },
  {
    title: translate("CategoryName"),
    dataIndex: "Name",
    key: "Name",
    align: "left",
  },
  {
    title: translate("Supplier"),
    dataIndex: "supplierCode",
    key: "supplierCode",
    align: "left",
  },
  {
    title: translate("Warehouse"),
    dataIndex: "warehouseName",
    key: "warehouseName",
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
    dataIndex: "IsRestock",
    key: "IsRestock",
    aligin: "left",
    filters: [
      { text: `${translate("common.active")}`, value: true },
      { text: `${translate("common.deactive")}`, value: false },
    ],
    filterMultiple: false,
    filteredValue: filterSearching.status ? filterSearching.status : null,
    width: 150,
  },
  {
    dataIndex: "action",
    key: "action",
    width: 100,
    align: "center",
    fixed: "right",
  },
]);

const formState = reactive<any>({
  id: null,
  code: "",
  name: "",
  warehouseId: null,
  supplierId: null,
  isRestock: null,
});

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleClearFilter = () => {
  filterSearching.keyword = "";
  filterSearching.supplierId = null;
  filterSearching.warehouseId = null;
  filterSearching.status = null;
};

// close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
};

// handle data table
const handleSelectRow = (rows: any) => {
  listSelect.value = rows.map((x: any) => x?.Id);
};

// create, update, delete & view
const handelCreate = () => {
  formState.id = null;
  formState.code = "";
  formState.name = "";
  formState.warehouseId = null;
  formState.supplierId = null;
  formState.isRestock = true;
  isVisibleModalCreate.value = true;
  titleModal.value = translate("AddProductCategories");
  isEdit.value = false;
};

const handleUpdate = (item: any) => {
  formState.id = item.Id;
  formState.code = item.Code;
  formState.name = item.Name;
  formState.warehouseId = item.WarehouseId;
  formState.supplierId = item.SupplierId;
  formState.isRestock = item.IsRestock;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateProductCategories");
};

const handleSubmitForm = async (state: any) => {
  if (isEdit.value && state.id !== 0) {
    try {
      await store.dispatch("category/updateCategory", {
        state: state,
        params: {
          ...route.query,
        },
      });

      notification["success"]({
        message: translate("noti.updateSuccess"),
      });
    } catch (error) {
      console.log(error);
      notification["error"]({
        message: translate("noti.updateFail"),
      });
    }
  } else {
    try {
      await store.dispatch("category/createCategory", {
        state: state,
        params: {
          ...route.query,
        },
      });

      notification["success"]({
        message: translate("noti.createSuccess"),
      });
    } catch (error) {
      console.log(error);
      notification["error"]({
        message: translate("noti.createFail"),
      });
    }
  }

  onCancel();
};

const handleDeleteCategory = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "ProductCategory")),
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
  if (itemDelete.length > 1) {
    await store.dispatch("category/deleteCategory", {
      state: {categoryIds: itemDelete},
      params: {
        ...route.query,
      },
    });
  } else {
    await store.dispatch("category/deleteCategory", {
      state: {categoryIds: [itemDelete.Id]},
      params: {
        ...route.query,
      },
    });
  }
  listSelect.value = [];
  notification["success"]({
    message: translate("noti.deleteSuccess"),
  });
};

const fetData = async (params) => {
  await store.dispatch("category/getCategory", params);
};

const fetchDataFilter = async () => {
  await Promise.all([store.dispatch("warehouse/getWarehouse", null), store.dispatch("producer/getSupplier", null)]);
};

const handleTable = (pag: any, filter: any) => {
  filterSearching.status = filter.IsRestock?.[0];
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      name: filterSearching?.keyword,
      supplierId: filterSearching?.supplierId,
      warehouseId: filterSearching?.warehouseId,
      isRestock: filterSearching?.status,
    };
    console.log(params);
    fetData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  fetData(null);
  fetchDataFilter();
});
</script>
<style scoped lang="scss"></style>

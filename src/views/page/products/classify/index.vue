<template>
  <Section :title="translate('ClassificationList')" :subTitle="translate('TotalClassification')" :number="String(totalClassify)" class="w-full h-full bg-white overflow-hidden">
    <template #action>
      <AntdButton :type="'text'" danger :disabled="disableDeleteMany" class="mr-2" @click="handleDeleteClassify(listSelect, true)">
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

    <template #body>
      <div class="w-100 flex">
        <a-form layout="vertical" class="w-44 border-r pr-2">
          <a-form-item :label="translate('ClassificationName')" class="mb-2">
            <a-input :placeholder="translate('Search')" v-model:value="filterSearching.Keyword" />
          </a-form-item>
          <a-form-item :label="translate('ClassificationCode')" class="mb-2">
            <a-input :placeholder="translate('Search')" v-model:value="filterSearching.code" />
          </a-form-item>
          <a-form-item :label="translate('Warehouse')">
            <a-select :placeholder="translate('SelectWarehouse')" v-model:value="filterSearching.warehouseId" :options="warehouses.map((x) => ({ value: x.Id, label: x.Code }))"/>
          </a-form-item>
          <a-form-item :label="translate('Supplier')">
            <a-select :placeholder="translate('SelectSupplier')" v-model:value="filterSearching.supplierId" :options="suppliers.map((x) => ({ value: x.Id, label: x.Code }))"/>
          </a-form-item>
          <a-form-item :label="translate('Category')">
            <a-select :placeholder="translate('SelectCategory')" v-model:value="filterSearching.categoryId" :options="categories.map((x) => ({ value: x.Id, label: x.Code }))"/>
          </a-form-item>
          <AntdButton :type="'text'" danger @click="handleClearFilter">
            <template #icon>
              <font-awesome-icon :icon="['far', 'trash-can']" />
            </template>
            <span class="ml-2">{{ translate("DeleteFilter") }}</span>
          </AntdButton>
        </a-form>
        <div class="pl-2 grow">
          <AntdTable
            ref="table"
            key-field="Id"
            :index-column="true"
            :has-checkbox="true"
            :dataSource="classifyData"
            :columns="columns"
            @onSelected="handleSelectRow"
            class="w-full h-[calc(100vh-160px)] overflow-hidden overflow-y-auto"
            v-if="!loading"
          >
            <template #custom-body="{ column, record }">
              <template v-if="column.key === 'IsRestock' && record">
                <a-tag v-if="record.IsRestock" color="success">{{ translate("common.active") }}</a-tag>
                <a-tag v-else color="error">{{ translate("common.deactive") }}</a-tag>
              </template>
              <template v-if="column.key === 'CreateAt'">
                {{ dayjs(record.CreateAt).format("DD/MM/YYYY") }}
              </template>
              <template v-if="column.key === 'action'">
                <div class="action">
                  <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEdit(record)">
                    <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
                  </AntdButton>
                  <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteClassify(record, false)">
                    <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
                  </AntdButton>
                </div>
              </template>
            </template>
          </AntdTable>
          <a-skeleton v-else active />
        </div>
      </div>
    </template>
  </Section>

  <!-- modal -->
  <ModalCreate :isVisible="isVisibleModalCreate" :form="formState" :isEdit="isEdit" :titleModal="titleModal" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import Section from "@/components/section/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { Modal, notification } from "ant-design-vue";
import { removeNullObjects } from "@/utils/common";
import { debounce } from "vue-debounce";
import dayjs from "dayjs";

const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const classifyData = computed(() => store.getters["classify/classifyData"]);
const totalClassify = computed(() => store.getters["classify/totalElement"]);
const loading = computed(() => store.getters["classify/loading"]);
const warehouses = computed(() => store.getters["warehouse/warehouseInfo"]);
const suppliers = computed(() => store.getters["producer/producerData"]);
const categories = computed(() => store.getters["category/categoryData"]);

const listSelect = ref<any>([]);
const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const filterSearching = reactive<any>({
  Keyword: "",
  code: "",
  warehouseId: null,
  supplierId: null,
  categoryId: null,
  isRestock: null,
});
const columns = ref<Array<any>>([
  {
    title: translate("ClassificationCode"),
    dataIndex: "Code",
    key: "Code",
    align: "left",
  },
  {
    title: translate("ClassificationName"),
    dataIndex: "Name",
    key: "Name",
    align: "left",
  },
  {
    title: translate("Warehouse"),
    dataIndex: "warehouseCode",
    key: "warehouseCode",
    align: "left",
  },
  {
    title: translate("Supplier"),
    dataIndex: "supplierCode",
    key: "supplierCode",
    align: "left",
  },
  {
    title: translate("Category"),
    dataIndex: "categoryCode",
    key: "categoryCode",
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
    filteredValue: filterSearching.isRestock ? filterSearching.isRestock : null,
    width: 150,
  },
  {
    title: translate("DateCreated"),
    dataIndex: "CreateAt",
    key: "CreateAt",
    align: "left",
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
  categoryId: null,
  isRestock: null,
});

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

//close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
};

const handleSelectRow = (rows: any) => {
  listSelect.value = rows.map((x: any) => x?.Id);
};

//CRUD
const handelCreate = () => {
  formState.id = null;
  formState.code = "";
  formState.name = "";
  formState.warehouseId = null;
  formState.supplierId = null;
  formState.categoryId = null;
  formState.isRestock = true;
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate("AddClassification");
};

const handleEdit = (item: any) => {
  formState.id = item.Id;
  formState.code = item.Code;
  formState.name = item.Name;
  formState.warehouseId = item.WarehouseId;
  formState.supplierId = item.SupplierId;
  formState.categoryId = item.CategoryId;
  formState.isRestock = item.IsRestock;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("AddClassification");
};

const handleSubmitForm = async (state: any) => {
  if (isEdit.value && state.id !== 0) {
    const res = await store.dispatch("classify/updateClassify", {
      state: state,
      params: {
        ...route.query,
      },
    });
  
    if (res.status === 403) {
      notification["error"]({
        message: translate("noti.updateFail"),
      });
    } else {
      notification["error"]({
        message: translate("noti.updateFail"),
      });
    } 
  } else {
    const res = await store.dispatch("classify/createClassify", {
      state: state,
      params: {
        ...route.query,
      },
    });
    if (res.status === 403) {
      notification["error"]({
        message: translate("noti.createFail"),
      });
    } else {
      notification["success"]({
        message: translate("noti.createSuccess"),
      });
    }
  }

  onCancel();
};

const handleDeleteClassify = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "ProductClassify")),
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
    const temp = itemDelete.map((x: any) => x?.id);
    await store.dispatch("classify/deleteClassify", {
      state: temp,
      params: {
        ...route.query,
      },
    });
  } else {
    await store.dispatch("classify/deleteClassify", {
      state: [itemDelete.id],
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

const handleClearFilter = () => {
  filterSearching.Keyword = "";
  filterSearching.code = "";
  filterSearching.warehouseId = null;
  filterSearching.supplierId = null;
  filterSearching.categoryId = null;
  filterSearching.isRestock = null;
};

const fetchData = async (params) => {
  await store.dispatch("classify/getClassify", params);
};

const fetchDataFilter = async () => {
  await Promise.all([
    store.dispatch("warehouse/getWarehouse", null),
    store.dispatch("producer/getSupplier", null),
    store.dispatch("category/getCategory", null),
  ]);
}

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      name: filterSearching?.Keyword,
      code: filterSearching?.code,
      warehouseId: filterSearching?.warehouseId,
      supplierId: filterSearching?.supplierId,
      categoryId: filterSearching?.categoryId,
      isRestock: filterSearching?.isRestock,
    };
    fetchData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  fetchData(null);
  fetchDataFilter()
});
</script>

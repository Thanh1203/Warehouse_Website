<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("EnterWarehouseName") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[150px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("SelectNation") }}</span>
      <a-select :placeholder="translate('Nation')" v-model:value="filterSearching.nationSlected" :options="nationOption?.map((e) => ({ value: e, label: e }))" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[150px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("SelectArea") }}</span>
      <a-select
        :placeholder="translate('Area')"
        v-model:value="filterSearching.areaSelected"
        :options="areaOption?.map((e) => ({ value: e, label: e }))"
        :allowClear="true"
        class="tw-mt-2"
      />
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
  <Section
    :title="translate('WarehouseList')"
    :sub-title="translate('NumberOfWarehouses')"
    :number="String(totalWarehouse)"
    class="tw-w-full tw-h-full tw-bg-white tw-overflow-hidden"
  >
    <template #action>
      <AntdButton :type="'text'" danger class="tw-mr-2" :disabled="disableDeleteMany" @click="handleDeleteWarehouse(listSelect, true)">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-text-sm tw-ml-2">
          {{ translate("Delete") }} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span>
        </span>
      </AntdButton>
      <AntdButton :type="'primary'" @click="handleCreate">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="tw-text-sm tw-ml-2">{{ translate("AddNew") }}</span>
      </AntdButton>
    </template>
    <template #body>
      <AntdTable
        ref="table"
        key-field="id"
        :index-column="true"
        :columns="columns"
        :data-source="warehouseData"
        :has-checkbox="true"
        :no-sort="true"
        @onSelected="handleSelectRow"
        class="tw-w-full tw-h-[calc(100vh-294px)] tw-overflow-hidden tw-overflow-y-auto"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleViewRow(record)">
                <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #4caf50" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEditRow(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteWarehouse(record, false)">
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>
  <!-- modal -->
  <ModalCreate :is-visible="isVisibleModalCreate" :is-edit="isEdit" :form="formState" :title-modal="titleModal" @close-modal="closeModal" @handle-submit="handleSubmitForm" />
  <ModalInfo :is-visible="isVisibleModalInfo" @close-modal="closeModal" :state="formState" />
</template>
<script setup lang="ts">
import Section from "@/components/section/index.vue";
import { ref, watch, onMounted, defineAsyncComponent, reactive, computed } from "vue";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "vue-debounce";
import { Modal, notification } from "ant-design-vue";
import { checkDeleteItem, removeNullObjects } from "@/utils/common";

interface Columns {
  title?: string;
  dataIndex: string;
  key: string;
  ellipsis?: boolean;
  align?: string;
  width?: number | null;
  maxWidth?: number | null;
  fixed?: string;
  aligin?: string;
}

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));
const ModalInfo = defineAsyncComponent(() => import("./components/ModalInfo.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const warehouseData = computed(() => store.getters["warehouse/warehouseInfo"]);
const totalWarehouse = computed(() => store.getters["warehouse/totalWarehouse"]);
const nationOption = computed(() => store.getters["warehouse/nationData"]);
const areaOption = computed(() => store.getters["warehouse/areaData"]);

const isVisibleModalCreate = ref<boolean>(false);
const isVisibleModalInfo = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const listSelect = ref<Array<any>>([]);
const columns = ref<Array<Columns>>([
  {
    title: translate("WarehouseCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("warehouseName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("Nation"),
    dataIndex: "nation",
    key: "nation",
    align: "left",
  },
  {
    title: translate("Area"),
    dataIndex: "area",
    key: "area",
    align: "left",
  },
  {
    title: translate("StaffCharge"),
    dataIndex: "staffName",
    key: "staffName",
    aligin: "left",
  },
  {
    title: translate("DateCreated"),
    dataIndex: "timeCreate",
    key: "timeCreate",
    aligin: "left",
  },
  {
    dataIndex: "action",
    key: "action",
    width: 100,
    align: "center",
    fixed: "right",
  },
]);
const titleModal = ref<string>("");

const filterSearching = reactive({
  keyword: "",
  nationSlected: null,
  areaSelected: null,
});
const formState = reactive<any>({
  id: "",
  code: "",
  name: "",
  nation: "",
  area: "",
  address: "",
  companyId: null,
  staffId: null,
  allowDelete: true,
  timeCreate: "",
  staffName: "",
});

//filter
const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0 && filterSearching?.nationSlected === null && filterSearching?.areaSelected === null);

const handleClearFilter = () => {
  filterSearching.keyword = "";
  filterSearching.nationSlected = null;
  filterSearching.areaSelected = null;
};

// CRUD
const handleCreate = () => {
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  formState.id = 0;
  formState.code = "";
  formState.name = "";
  formState.nation = null;
  formState.area = null;
  formState.address = "";
  formState.companyId = null;
  formState.staffId = null;
  formState.allowDelete = true;
  titleModal.value = translate("CreateWarehouse");
};

const handleEditRow = (data: any) => {
  isEdit.value = true;
  isVisibleModalCreate.value = true;
  titleModal.value = translate("UpdateWarehouseInfo");
  formState.id = data?.id;
  formState.code = data?.code;
  formState.name = data?.name;
  formState.nation = data?.nation;
  formState.area = data?.area;
  formState.address = data?.address;
  formState.companyId = data?.companyId;
  formState.staffId = data?.staffId;
  formState.allowDelete = data?.allowDelete;
};

const handleSubmitForm = async (state: any) => {
  isVisibleModalCreate.value = false;
  if (isEdit.value && state.id !== 0) {
    try {
      await store.dispatch("warehouse/updateWarehouse", {
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
      await store.dispatch("warehouse/createWarehouse", {
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
};

const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => ({ id: x?.id, allowDelete: x?.allowDelete }));
};

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleDeleteWarehouse = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "Warehouse")),
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
  if (checkDeleteItem(itemDelete)) {
    if (itemDelete.length > 1) {
      const temp = itemDelete.map((x: any) => x?.id);
      await store.dispatch("warehouse/deleteWarehouse", {
        state: temp,
        params: {
          ...route.query,
        },
      });
    } else {
      await store.dispatch("warehouse/deleteWarehouse", {
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
  } else {
    notification["error"]({
      message: translate("noti.deleteWarehouseFail"),
    });
  }
};

const handleViewRow = (data: any) => {
  isVisibleModalInfo.value = true;
  formState.id = data?.id;
  formState.code = data?.code;
  formState.name = data?.name;
  formState.nation = data?.nation;
  formState.area = data?.area;
  formState.address = data?.address;
  formState.companyId = data?.companyId;
  formState.staffId = data?.staffId;
  formState.allowDelete = data?.allowDelete;
  formState.timeCreate = data?.timeCreate;
  formState.staffName = data?.staffName;
};

// close modal
const closeModal = () => {
  isVisibleModalCreate.value = false;
  isVisibleModalInfo.value = false;
};

const fetchData = async () => {
  await store.dispatch("warehouse/getNationData", null);
  await store.dispatch("warehouse/getAreaData", null);
};

const fetchWarehouse = async (params: any) => {
  await store.dispatch("warehouse/getWarehouse", params);
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      name: filterSearching?.keyword,
      nation: filterSearching?.nationSlected,
      area: filterSearching?.areaSelected,
    };
    fetchWarehouse(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  await fetchWarehouse(null);
  await fetchData();
});
</script>
<style scoped lang="scss"></style>

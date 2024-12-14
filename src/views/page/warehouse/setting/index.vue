<template>
  <Section :title="translate('WarehouseList')" :sub-title="translate('NumberOfWarehouses')" :number="String(totalWarehouse)" class="w-full h-full bg-white overflow-hidden">
    <template #action>
      <AntdButton :type="'primary'" @click="handleCreate">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="text-sm ml-2">{{ translate("AddNew") }}</span>
      </AntdButton>
    </template>
    <template #action-second>
      <div class="mt-3 w-1/4 flex gap-3">
        <a-input :placeholder="translate('EnterWarehouseName')" v-model:value="whFilter.name" />
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
        key-field="id"
        :index-column="true"
        :columns="columns"
        :data-source="warehouseData"
        class="w-full h-[calc(100vh-204px)] overflow-hidden overflow-y-auto"
        v-if="!loading"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'TimeCreate'">
            {{ dayjs(record.TimeCreate).format("DD/MM/YYYY") }}
          </template>
          <template v-if="column.key === 'action' && record">
            <div class="action">
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

      <a-skeleton v-else active />
    </template>
  </Section>
  <!-- modal -->
  <ModalCreate
    v-if="isVisibleModalCreate"
    :is-visible="isVisibleModalCreate"
    :is-edit="isEdit"
    :form="formState"
    :title-modal="titleModal"
    @close-modal="closeModal"
    @handle-submit="handleSubmitForm"
  />
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
import { removeNullObjects } from "@/utils/common";
import dayjs from "dayjs";

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const warehouseData = computed(() => store.getters["warehouse/warehouseInfo"]);
const totalWarehouse = computed(() => store.getters["warehouse/totalWarehouse"]);
const loading = computed(() => store.getters["warehouse/loading"]);

const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const listSelect = ref<Array<any>>([]);
const columns = ref<Array<any>>([
  {
    title: translate("WarehouseCode"),
    dataIndex: "Code",
    key: "Code",
    align: "left",
  },
  {
    title: translate("warehouseName"),
    dataIndex: "Name",
    key: "Name",
    align: "left",
  },
  {
    title: translate("StaffCharge"),
    dataIndex: "staffName",
    key: "staffName",
    aligin: "left",
  },
  {
    title: translate("Address"),
    dataIndex: "Address",
    key: "Address",
    align: "left",
  },
  {
    title: translate("DateCreated"),
    dataIndex: "TimeCreate",
    key: "TimeCreate",
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

const whFilter = reactive({
  name: "",
});

const handleClearFilter = () => {
  whFilter.name = "";
};

const formState = reactive<any>({
  id: null,
  code: "",
  name: "",
  address: "",
  staffId: null,
});

// CRUD
const handleCreate = () => {
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  formState.code = "";
  formState.name = "";
  formState.address = "";
  formState.staffId = null;
  titleModal.value = translate("CreateWarehouse");
};

const handleEditRow = (data: any) => {
  isEdit.value = true;
  isVisibleModalCreate.value = true;
  titleModal.value = translate("UpdateWarehouseInfo");
  formState.id = data?.Id;
  formState.code = data?.Code;
  formState.name = data?.Name;
  formState.address = data?.Address;
  formState.staffId = data?.StaffId;
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
  if (itemDelete.length > 1) {
    // const temp = itemDelete.map((x: any) => x?.Id);
    // await store.dispatch("warehouse/deleteWarehouse", {
    //   state: temp,
    //   params: {
    //     ...route.query,
    //   },
    // });
  } else {
    await store.dispatch("warehouse/deleteWarehouse", {
      state: itemDelete.Id,
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

// close modal
const closeModal = () => {
  isVisibleModalCreate.value = false;
};

const fetchWarehouse = async (params: any) => {
  await store.dispatch("warehouse/getWarehouse", params);
};

watch(
  () => whFilter,
  debounce(() => {
    const params = {
      name: whFilter?.name,
    };
    fetchWarehouse(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  await fetchWarehouse(null);
});
</script>
<style scoped lang="scss"></style>

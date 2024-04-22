<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("EmployeeCode") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.code" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("EnterEmployeeName") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.name" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[200px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("SelectArea") }}</span>
      <a-select :placeholder="translate('SelectArea')" v-model:value="filterSearching.address" :options="personnelAddress?.map((e) => ({ value: e, label: e }))" class="tw-mt-2" />
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
    :title="translate('PersonnelList')"
    :sub-title="translate('NumberOfPersonnel')"
    :number="String(totalPersonnel)"
    class="tw-w-full tw-h-full tw-bg-white tw-overflow-hidden"
  >
    <template #action>
      <AntdButton :type="'text'" danger class="tw-mr-2" :disabled="disableDeleteMany" @click="handleDeletePersonnel(listSelect, true)">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-text-sm tw-ml-2"
          >{{ translate("Delete") }}<span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span
        >
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
        :data-source="personnelData"
        :has-checkbox="true"
        :no-sort="true"
        @onSelected="handleSelectRow"
        class="tw-w-full tw-h-[calc(100vh-294px)] tw-overflow-hidden tw-overflow-y-auto"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEditRow(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeletePersonnel(record, false)">
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>

  <!-- modal -->
  <ModalCreate :title="titleModal" :isEdit="isEdit" :form="formState" :isVisible="isVisibleModalCreate" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
</template>
<script setup lang="ts">
import Section from "@/components/section/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, onMounted, defineAsyncComponent, reactive, computed } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "vue-debounce";
import { checkDeleteItem, removeNullObjects } from "@/utils/common";
import { Modal, notification } from "ant-design-vue";

interface FormState {
  id: string | number | null;
  code: string;
  name: string;
  role: string;
  address: string;
  companyId: number | null;
  allowDelete?: boolean;
}

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const personnelData = computed(() => store.getters["personnel/personnelData"]);
const totalPersonnel = computed(() => store.getters["personnel/totalPersonnel"]);
const personnelAddress = computed(() => store.getters["personnel/addressData"]);

const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const listSelect = ref<Array<any>>([]);
const columns = ref<Array<any>>([
  {
    title: translate("EmployeeCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("EmployeeName"),
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
    title: translate("Role"),
    dataIndex: "role",
    key: "role",
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

const filterSearching = reactive<any>({
  name: "",
  address: null,
  code: "",
});

const formState = reactive<FormState>({
  id: null,
  code: "",
  name: "",
  role: "",
  address: "",
  companyId: null,
});

//filter
const disabledDeleteFilter = computed(() => filterSearching?.name?.length === 0 && filterSearching?.code?.length === 0 && filterSearching?.address === null);

const handleClearFilter = () => {
  filterSearching.name = "";
  filterSearching.address = null;
  filterSearching.code = "";
};

//CRUD
const handleCreate = () => {
  formState.id = 0;
  formState.code = "";
  formState.name = "";
  formState.role = "";
  formState.address = "";
  formState.companyId = null;
  formState.allowDelete = true;
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate("AddEmployee");
};

const handleEditRow = (data: any) => {
  formState.id = data?.id;
  formState.code = data?.code;
  formState.name = data?.name;
  formState.role = data?.role;
  formState.address = data?.address;
  formState.companyId = data?.companyId;
  formState.allowDelete = data?.allowDeletes;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateEmployee");
};

const handleSubmitForm = async (state: any) => {
  isVisibleModalCreate.value = false;
  if (isEdit.value && state.id != 0) {
    try {
      await store.dispatch("personnel/updatePersonnel", {
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
      await store.dispatch("personnel/createPersonnel", {
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

const handleDeletePersonnel = (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "Personnel")),
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
      await store.dispatch("personnel/deletePersonnel", {
        state: temp,
        params: {
          ...route.query,
        },
      });
    } else {
      await store.dispatch("personnel/deletePersonnel", {
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

// close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
};

const fetchData = async (params) => {
  await store.dispatch("personnel/getPersonnel", params);
};

const fetchAddressPersonnel = async () => {
  await store.dispatch("personnel/getAddress", null);
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      code: filterSearching?.code,
      name: filterSearching?.name,
      address: filterSearching?.address,
    };
    fetchData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  await fetchData(null);
  await fetchAddressPersonnel();
});
</script>
<style scoped lang="scss"></style>

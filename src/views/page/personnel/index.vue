<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="section w-full mb-4 text-sm grid grid-cols-5 gap-4">
    <div>
      <span class="opacity-70">{{ translate("EmployeeName") }}</span>
      <a-input :placeholder="translate('common.Search')" v-model:value="filterSearching.name" class="mt-2" />
    </div>
    <div>
      <span class="opacity-70">{{ translate("PhoneNumber") }}</span>
      <a-input :placeholder="translate('common.Search')" v-model:value="filterSearching.phone" class="mt-2" />
    </div>
    <div>
      <span class="opacity-70">{{ translate("Role") }}</span>
      <a-input :placeholder="translate('common.Search')" v-model:value="filterSearching.role" class="mt-2" />
    </div>
    <div class="flex items-end justify-items-start">
      <a-button type="text" danger class="flex gap-2 items-center">
        <font-awesome-icon :icon="['far', 'trash-can']" />
        <span>{{ translate("common.Delete") }}</span>
      </a-button>
    </div>
  </div>
  <Section :title="translate('PersonnelList')" :sub-title="translate('NumberOfPersonnel')" :number="totalPersonnel">
    <template #action>
      <a-button type="text" danger class="flex gap-2 items-center">
        <font-awesome-icon :icon="['far', 'trash-can']" />
        <span>{{ translate("common.Delete") }}</span>
      </a-button>
      <a-button type="primary" class="flex gap-2 items-center">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span>{{ translate('AddNew') }}</span>
      </a-button>
    </template>

    <template #content>
      <a-table :columns="columns">

      </a-table>
    </template>
    <!-- <template #body>
      <AntdTable
        ref="table"
        key-field="id"
        :index-column="true"
        :columns="columns"
        :data-source="personnelData"
        :has-checkbox="true"
        :no-sort="true"
        @onSelected="handleSelectRow"
        class="w-full h-[calc(100vh-290px)] overflow-hidden overflow-y-auto"
        v-if="!loading"
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

      <a-skeleton v-else active />
    </template> -->
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
import SectionBreadcrumb from "@/components/section-breadcrumb/index.vue";

interface FormState {
  id: string | number | null;
  code: string;
  name: string;
  role: string;
  address: string;
  companyId: number | null;
  allowDelete?: boolean;
}

const listBreadCrumb = ref<any>([
  {
    title: translate("Personnel"),
    url: "/personnal",
  },
]);

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const personnelData = computed(() => store.getters["personnel/personnelData"]);
const totalPersonnel = computed(() => store.getters["personnel/totalPersonnel"]);
const personnelAddress = computed(() => store.getters["personnel/addressData"]);
const loading = computed(() => store.getters["personnel/loading"]);

const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const listSelect = ref<Array<any>>([]);
const columns = ref<Array<any>>([
  {
    title: translate("EmployeeName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("Role"),
    dataIndex: "role",
    key: "role",
    aligin: "left",
  },
  {
    title: translate("PhoneNumber"),
    dataIndex: "phone",
    key: "phone",
    aligin: "left",
  },
  {
    title: translate("Email"),
    dataIndex: "email",
    key: "email",
    aligin: "left",
  },
  {
    title: translate("Address"),
    dataIndex: "address",
    key: "address",
    align: "left",
  },
  {
    dataIndex: "action",
    key: "action",
    width: 150,
    align: "center",
    fixed: "right",
  },
]);

const filterSearching = reactive<any>({
  name: "",
  phone: "",
  role: "",
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

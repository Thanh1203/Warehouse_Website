<template>
  <Section :title="translate('PersonnelList')" :sub-title="translate('NumberOfPersonnel')" :number="String(totalPersonnel)" class="w-full h-full bg-white overflow-hidden">
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
        <a-input :placeholder="translate('EnterEmployeeName')" v-model:value="userFilter.name" />
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
        :data-source="personnelData"
        class="w-full h-[calc(100vh-204px)] overflow-hidden overflow-y-auto"
        @onChange="handleTable"
        v-if="!loading"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'Role'">
            {{ translate(`common.${record.Role.toLowerCase()}`) }}
          </template>
          <template v-if="column.key === 'CreateAt'">
            {{ dayjs(record.CreateAt).format("DD/MM/YYYY") }}
          </template>
          <template v-if="column.key === 'Status'">
            <a-tag v-if="record.Status === 'ACTIVE'" color="success">{{ translate("common.active") }}</a-tag>
            <a-tag v-if="record.Status === 'DEACTIVE'" color="error">{{ translate("common.deactive") }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEditRow(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>

      <a-skeleton v-else active />
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
import { removeNullObjects } from "@/utils/common";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const personnelData = computed(() => store.getters["personnel/personnelData"]);
const totalPersonnel = computed(() => store.getters["personnel/totalPersonnel"]);
const loading = computed(() => store.getters["personnel/loading"]);

const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const userFilter = reactive({
  name: "",
  phone: "",
  email: "",
  role: null,
  status: null,
});

const columns = ref<Array<any>>([
  {
    title: translate("EmployeeName"),
    dataIndex: "Name",
    key: "Name",
    align: "left",
  },
  {
    title: translate("Role"),
    dataIndex: "Role",
    key: "Role",
    aligin: "left",
    filters: [
      { text: `${translate("common.admin")}`, value: "Admin" },
      { text: `${translate("common.employee")}`, value: "Employee" },
    ],
    filterMultiple: false,
    filteredValue: userFilter.role ? [userFilter.role] : null,
  },
  {
    title: translate("PhoneNumber"),
    dataIndex: "Phone",
    key: "Phone",
    aligin: "left",
  },
  {
    title: translate("Email"),
    dataIndex: "Email",
    key: "Email",
    aligin: "left",
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
      { text: `${translate("common.active")}`, value: "ACTIVE" },
      { text: `${translate("common.deactive")}`, value: "DEACTIVE" },
    ],
    filterMultiple: false,
    filteredValue: userFilter.status ? [userFilter.status] : null,
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

const handleTable = (pag: any, filter: any) => {
  userFilter.role = filter.Role?.[0];
  userFilter.status = filter.Status?.[0];
};

const formState = reactive({
  id: null,
  name: "",
  role: null,
  address: "",
  phone: "",
  email: "",
  password: "",
  status: "",
});

const handleClearFilter = () => {
  userFilter.name = "";
  userFilter.role = null;
  userFilter.status = null;
  userFilter.email = "";
  userFilter.phone = "";
};

//CRUD
const handleCreate = () => {
  formState.name = "";
  formState.role = null;
  formState.address = "";
  formState.phone = "";
  formState.email = "";
  formState.password = "";
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate("AddEmployee");
};

const handleEditRow = (data: any) => {
  formState.id = data?.Id;
  formState.name = data?.Name;
  formState.role = data?.Role;
  formState.address = data?.Address;
  formState.phone = data?.Phone;
  formState.email = data?.Email;
  formState.status = data?.Status;
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

// close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
};

const fetchData = async (params: any) => {
  await store.dispatch("personnel/getPersonnel", params);
};

watch(
  () => userFilter,
  debounce(() => {
    const params = {
      name: userFilter?.name,
      status: userFilter?.status,
      role: userFilter?.role,
    };
    fetchData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  await fetchData(null);
});
</script>
<style scoped lang="scss"></style>

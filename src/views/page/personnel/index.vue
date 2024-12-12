<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="section w-full mb-4 text-sm grid grid-cols-5 gap-4">
    <div>
      <span class="opacity-70">{{ translate("EmployeeName") }}</span>
      <a-input :placeholder="translate('common.Search')" v-model:value="userFilter.name" class="mt-2" />
    </div>
    <div>
      <span class="opacity-70">{{ translate("PhoneNumber") }}</span>
      <a-input :placeholder="translate('common.Search')" v-model:value="userFilter.phone" class="mt-2" />
    </div>
    <div>
      <span class="opacity-70">{{ translate("Email") }}</span>
      <a-input :placeholder="translate('common.Search')" v-model:value="userFilter.email" class="mt-2" />
    </div>
    <div class="flex items-end justify-items-start">
      <a-button type="text" danger class="flex gap-2 items-center" @click="handleClearFilter">
        <font-awesome-icon :icon="['far', 'trash-can']" />
        <span>{{ translate("common.Delete") }}</span>
      </a-button>
    </div>
  </div>
  <Section :title="translate('PersonnelList')" :sub-title="translate('NumberOfPersonnel')" :number="totalRecord">
    <template #action>
      <a-button type="primary" class="flex gap-2 items-center" @click="handleCreate">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span>{{ translate('AddNew') }}</span>
      </a-button>
    </template>

    <template #content>
      <AntdTable
        :columns="columns"
        :dataSource="users"
        :isPagination="true"
        :isLoading="isLoading"
        :currentPage="currentPage"
        @onChange="handleTable"
      >
        <template #custom-body="{column, record}">
          <template v-if="column.key === 'Role'">
            {{ translate(`common.${record.Role.toLowerCase()}`) }}
          </template>
          <template v-if="column.key === 'Status'">
            <a-tag v-if="record.Status === 'ACTIVE'" color="success"> {{ translate('common.active') }}</a-tag>
            <a-tag v-if="record.Status === 'DEACTIVE'" color="error"> {{ translate('common.deactive') }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <div class="action">
              <a-button type="link" ><font-awesome-icon :icon="['far', 'edit']" /></a-button>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>

  <!-- modal -->
  <ModalCreate :title="titleModal" :form="formState" :isEdit="isEdit" :isVisible="isOpenModel" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
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

const store = useStore();
const isLoading = ref<boolean>(false);

const listBreadCrumb = ref<any>([
  {
    title: translate("Personnel"),
    url: "/personnal",
  },
]);

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));

//filter
const userFilter = reactive({
  name: "",
  phone: "",
  email: "",
  role: "",
  status: "",
});

const handleClearFilter = () => {
  userFilter.name = "";
  userFilter.phone = "";
  userFilter.email = "";
  userFilter.role = "";
  userFilter.status = "";
}

watch(() => userFilter, debounce(async (value) => {
  const query = removeNullObjects(value);
  await loadData(query);
}, 500), { deep: true });

// table
const users = computed(() => store.state.personnel.users);
const totalRecord = computed(() => store.state.personnel.totalRecord);
const currentPage = ref<number>(1);
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
      { text: `${translate('common.admin')}`, value: 'Admin' },
      { text: `${translate('common.employee')}`, value: 'Employee' },
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
    title: translate("Address"),
    dataIndex: "Address",
    key: "Address",
    align: "left",
  },
  {
    title: translate("common.Status"),
    dataIndex: "Status",
    key: "Status",
    aligin: "left",
    filters: [
      { text: `${translate('common.active')}`, value: 'ACTIVE' },
      { text: `${translate('common.deactive')}`, value: 'DEACTIVE' },
    ],
    filterMultiple: false,
    filteredValue: userFilter.status ? [userFilter.status] : null,
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

const handleTable = (pag:any, filter:any) => {
  userFilter.role = filter.Role?.[0];
  userFilter.status = filter.Status?.[0];
}

//modal
const titleModal = ref<string>("");
const isEdit = ref<boolean>(false);
const isOpenModel = ref<boolean>(false);

const formState = {
  name: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  role: null,
}

const handleCreate = () => {
  titleModal.value = translate("AddEmployee");
  isEdit.value = false;
  isOpenModel.value = true;
}

const onCancel= () => {
  isOpenModel.value = false;
};

const handleSubmitForm = async (result: any) => {
  try {
    await store.dispatch("personnel/createUser", result);
    notification.success({
      message: translate("Success"),
      description: translate("noti.createSuccess"),
    });
  } catch (error) {
    notification.error({
      message: translate("noti.fail"),
      description: translate("noti.createFail")
    });
  }
  isOpenModel.value = false;
}
// load data
const loadData = async(params:any) => {
  isLoading.value = true;
  await store.dispatch("personnel/fetchUser", params);
  isLoading.value = false;
}

onMounted(async () => {
  await loadData(null);
});
</script>
<style scoped lang="scss"></style>

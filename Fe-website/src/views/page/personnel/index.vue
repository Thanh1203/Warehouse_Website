<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate('EmployeeCode') }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("EnterEmployeeName") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[200px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("SelectArea") }}</span>
      <a-select :placeholder="translate('SelectArea')" v-model:value="filterSearching.locationSlected" :options="option2Fake" class="tw-mt-2" />
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
  <Section :title="translate('PersonnelList')" :sub-title="translate('NumberOfPersonnel')" :number="String(datafake?.length)">
    <template #action>
      <AntdButton :type="'text'" danger class="tw-mr-2" :disabled="disableDeleteMany" @click="handleDeleteMany">
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
      <AntdTable ref="table" key-field="id" :index-column="true" :columns="columns" :data-source="datafake" :has-checkbox="true" :no-sort="true" @onSelected="handleSelectRow">
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEditRow(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteSingle(record.id)">
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>

  <!-- modal -->
  <ModalCreate :title="titleModal" :isEdit="isEdit" :form="formState" :isVisible="isVisibleModalCreate" @closeModal="onCancel"/>
  <ModalConfirm :isVisible="isVisibleModalConfirm" :titleModal="titleModal" :isMany="confirmMany" @closeModal="onCancel" @handleSubmit="handleDelete" />

</template>
<script setup lang="ts">
import Section from "@/components/section/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, onMounted, defineAsyncComponent, reactive, computed } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";

interface FormState {
  id: string | number | null;
  code: string;
  name: string;
  workplace: string;
  warehoueName: string;
  role: string;
};

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));
const ModalConfirm = defineAsyncComponent(() => import("@/components/antd-modal-confirm/index.vue"));

const isVisibleModalConfirm = ref<boolean>(false);
const isVisibleModalCreate = ref<boolean>(false);
const confirmMany = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const listSelect = ref<Array<any>>([]);
const columns = ref<Array<any>>([
  {
    title: translate("EmployeeCode"),
    dataIndex: "id",
    key: "id",
    align: "left",
  },
  {
    title: translate("EmployeeName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("Area"),
    dataIndex: "workplace",
    key: "workplace",
    align: "left",
  },
  {
    title: translate("warehouseName"),
    dataIndex: "warehoueName",
    key: "warehoueName",
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

const filterSearching = reactive({
  keyword: "",
  locationSlected: null,
});

const formState = reactive<FormState>({
  id: null,
  code: "",
  name: "",
  workplace: "",
  warehoueName: "",
  role: "",
});

const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0 && filterSearching?.locationSlected === null);

const handleClearFilter = () => {
  filterSearching.keyword = "";
  filterSearching.locationSlected = null;
};

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => x?.id);
};

const handleDeleteSingle = (val: number) => {
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("Personnel");
  confirmMany.value = false;
};

const handleDeleteMany = () => {
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("Personnel");
  confirmMany.value = true;
};

const handleCreate = () => {
  formState.id = null;
  formState.code = "";
  formState.name = "";
  formState.workplace = null;
  formState.warehoueName = null;
  formState.role = "";
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate('AddEmployee');
};

const handleEditRow = (data: any) => {
  formState.id = data.id;
  formState.code = data.code;
  formState.name = data.name;
  formState.workplace = data.workplace;
  formState.warehoueName = data.warehoueName;
  formState.role = data.role;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate('AddEmployee');
};

const handleDelete = () => {};

const onCancel = () => {
  isVisibleModalCreate.value = false;
  isVisibleModalConfirm.value = false;
}
//data fake
const option2Fake = [
  {
    value: 1,
    label: "Hà nội",
  },
  {
    value: 2,
    label: "Hải dương",
  },
];

const datafake = [
  {
    id: "NV1",
    code: "NV1",
    name: "Nguyen Van A",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 1",
    role: "Quản lí",
  },
  {
    id: "NV2",
    code: "NV2",
    name: "Nguyen Van B",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 1",
    role: "Quản lí",
  },
  {
    id: "NV3",
    code: "NV3",
    name: "Nguyen Van C",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 2",
    role: "Quản lí",
  },
  {
    id: "NV4",
    code: "NV4",
    name: "Nguyen Van D",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 2",
    role: "Quản lí",
  },
  {
    id: "NV5",
    code: "NV5",
    name: "Nguyen Van E",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 3",
    role: "Quản lí",
  },
  {
    id: "NV6",
    code: "NV6",
    name: "Nguyen Van F",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 3",
    role: "Quản lí",
  },
  {
    id: "NV7",
    code: "NV7",
    name: "Nguyen Van G",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 4",
    role: "Quản lí",
  },
  {
    id: "NV8",
    code: "NV8",
    name: "Nguyen Van H",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 4",
    role: "Quản lí",
  },
  {
    id: "NV9",
    code: "NV9",
    name: "Nguyen Van I",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 5",
    role: "Quản lí",
  },
  {
    id: "NV10",
    code: "NV10",
    name: "Nguyen Van K",
    workplace: "Ha Noi",
    warehoueName: "Kho hàng 5",
    role: "Quản lí",
  },
];
</script>
<style scoped lang="scss"></style>

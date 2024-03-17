<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[300px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("Search") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.Keyword" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
      <AntdButton
        :type="'text'"
        danger
        :disabled="disabledDeleteFilter"
        @click="
          () => {
            filterSearching.Keyword = '';
          }
        "
      >
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
  <Section :title="translate('ManufacturerList')" :subTitle="translate('TotalManufacturers')" :number="String(datafake?.length)">
    <template #action>
      <AntdButton :type="'text'" danger :disabled="disableDeleteMany" class="tw-mr-2" @click="handleDeleteMany">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-text-sm tw-ml-2"
          >{{ translate("Delete") }} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span
        >
      </AntdButton>
      <AntdButton :type="'primary'" @click="handelCreate">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="tw-text-sm tw-ml-2">{{ translate("AddNew") }}</span>
      </AntdButton>
    </template>
    <template #body>
      <AntdTable ref="table" key-field="id" :index-column="true" :has-checkbox="true" :no-sort="true" :columns="columns" :dataSource="datafake" @onSelected="handleSelectRow">
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleUpdate(record)">
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
  <ModalCreate :isVisible="isVisibleModalCreate" :titleModal="titleModal" :isEdit="isEdit" :form="formState" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
  <ModalConfirm :isVisible="isVisibleModalConfirm" :titleModal="titleModal" :isMany="confirmMany" @closeModal="onCancel" @handleSubmit="handleDelete" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { notification } from "ant-design-vue";

interface FormState {
  id: string | number;
  code: string | number;
  name: string;
  origin: string;
}

const ModalConfirm = defineAsyncComponent(() => import("@/components/antd-modal-confirm/index.vue"));
const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));

const listSelect = ref<any>([]);
const isVisibleModalConfirm = ref<boolean>(false);
const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const confirmMany = ref<boolean>(false);
const titleModal = ref<string>("");
const idproducer = ref<string | number>("");
const columns = ref<Array<any>>([
  {
    title: translate("ManufacturerCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("ManufacturerName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("Origin"),
    dataIndex: "origin",
    key: "origin",
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

const filterSearching = reactive({
  Keyword: "",
});
const formState = reactive<FormState>({
  id: "",
  code: "",
  name: "",
  origin: "",
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.Keyword?.length === 0);

//handle table
const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => x?.id);
};

// CRUD
const handelCreate = () => {
  formState.id = "";
  formState.name = "";
  formState.origin = "";
  isVisibleModalCreate.value = true;
  titleModal.value = translate("AddManufacturer");
  isEdit.value = false;
};

const handleSubmitForm = (state: FormState) => {
  try {
    let temp: any = null;
    const params = { page: 1, size: 20 };
    if (!state.id) {
      console.log("create");
      notification["success"]({
        message: translate("noti.createSuccess"),
      });
    } else {
      console.log("update");
      notification["success"]({
        message: translate("noti.updateSuccess"),
      });
    }
  } catch (error) {
    console.log(error);
    notification["error"]({
      message: translate("noti.fail"),
    });
  }
  onCancel();
};

const handleUpdate = (item: FormState) => {
  formState.id = item.id;
  formState.code = item.code;
  formState.name = item.name;
  formState.origin = item.origin;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateManufacturerInfo");
};

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleDeleteMany = () => {
  isVisibleModalConfirm.value = true;
  confirmMany.value = true;
  titleModal.value = translate("Producer");
};

const handleDeleteSingle = (id: string | number) => {
  idproducer.value = id;
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("Producer");
  confirmMany.value = false;
};

const handleDelete = () => {
  notification["success"]({
    message: translate("Success"),
  });
  onCancel();
};

// close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
  isVisibleModalConfirm.value = false;
};
// data fake
const datafake = [
  {
    id: "NCC1",
    code: "NCC1",
    name: "ASUS",
    origin: "Đài Loan",
  },
  {
    id: "NCC2",
    code: "NCC2",
    name: "AKKO",
    origin: "Đài Loan",
  },
  {
    id: "NCC3",
    code: "NCC3",
    name: "DAREU",
    origin: "Trung Quốc",
  },
  {
    id: "NCC4",
    code: "NCC4",
    name: "E-DRA",
    origin: "Việt Nam",
  },
  {
    id: "NCC5",
    code: "NCC5",
    name: "FUHLEN",
    origin: "Trung Quốc",
  },
  {
    id: "NCC6",
    code: "NCC6",
    name: "MSI",
    origin: "Đài Loan",
  },
  {
    id: "NCC7",
    code: "NCC7",
    name: "RAZER",
    origin: "Mỹ",
  },
  {
    id: "NCC8",
    code: "NCC8",
    name: "LOGITECH",
    origin: "Thụy Sỹ",
  },
];
</script>

<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("CategoryName") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" class="tw-mt-2" />
    </a-form-item>
    <a-form-item>
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
  <Section :title="translate('CategoryList')" :subTitle="translate('TotalCategories')" :number="String(dataFake?.length)">
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
      <AntdTable ref="table" key-field="id" :index-column="true" :has-checkbox="true" :no-sort="true" :dataSource="dataFake" :columns="columns" @onSelected="handleSelectRow">
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleView(record)">
                <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #4caf50" />
              </AntdButton>
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
  <ModalCreate :isVisible="isVisibleModalCreate" :titleModal="titleModal" :form="formState" :isEdit="isEdit" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
  <ModalConfirm :isVisible="isVisibleModalConfirm" :titleModal="titleModal" :isMany="confirmMany" @closeModal="onCancel" @handleSubmit="handleDelete" />
  <ModalInfo :isVisible="isVisibleModalInfo" :titleModal="titleModal" :form="formState" @closeModal="onCancel" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { ref, computed, reactive } from "vue";
import { defineAsyncComponent } from "vue";
import { notification } from "ant-design-vue";

interface FormState {
  id: string | number;
  code: string | number;
  name: string;
  propertyExtend: string[] | number[];
}

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));
const ModalConfirm = defineAsyncComponent(() => import("@/components/antd-modal-confirm/index.vue"));
const ModalInfo = defineAsyncComponent(() => import("./components/ModalInfo.vue"));

const listSelect = ref<any>([]);
const isVisibleModalCreate = ref<boolean>(false);
const isVisibleModalConfirm = ref<boolean>(false);
const isVisibleModalInfo = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const confirmMany = ref<boolean>(false);
const titleModal = ref<string>("");
const idProduct = ref<string | number>("");
const columns = ref<Array<any>>([
  {
    title: "Mã chủng loại",
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: "Tên chủng loại",
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: "Ngày khởi tạo",
    dataIndex: "dateCreated",
    key: "dateCreated",
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
  keyword: "",
});

const formState = reactive<FormState>({
  id: "",
  code: "",
  name: "",
  propertyExtend: [],
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0);

const handleClearFilter = () => {
  filterSearching.keyword = "";
};
// close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
  isVisibleModalConfirm.value = false;
  isVisibleModalInfo.value = false;
};

// handle data table
const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => x?.id);
};

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

// create, update, delete & view
const handelCreate = () => {
  formState.id = "";
  formState.code = "";
  formState.name = "";
  formState.propertyExtend = [];
  isVisibleModalCreate.value = true;
  titleModal.value = translate("AddProductCategories");
  isEdit.value = false;
};

const handleUpdate = (item: FormState) => {
  formState.id = item.id;
  formState.code = item.code;
  formState.name = item.name;
  formState.propertyExtend = item.propertyExtend;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateProductCategories");
};

const handleDeleteMany = () => {
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("ProductCategory");
  confirmMany.value = true;
};

const handleDeleteSingle = (id: string | number) => {
  idProduct.value = id;
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("ProductCategory");
  confirmMany.value = false;
};

const handleSubmitForm = (state: FormState) => {
  try {
    let temp: any = null;
    const params = { page: 1, size: 20 };
    if (state.id) {
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

const handleDelete = () => {
  notification["success"]({
    message: translate("Success"),
  });
  onCancel();
};

const handleView = (item: FormState) => {
  isVisibleModalInfo.value = true;
  titleModal.value = "Chi tiết chủng loại";
  formState.code = item.code;
  formState.name = item.name;
  formState.propertyExtend = item.propertyExtend;
};

//datafake
const dataFake = [
  {
    id: "CL01",
    code: "CL01",
    name: "Bàn phím",
    dateCreated: "01/01/2024",
    propertyExtend: [],
  },
  {
    id: "CL02",
    code: "CL02",
    name: "Chuột",
    dateCreated: "01/01/2024",
    propertyExtend: [],
  },
  {
    id: "CL03",
    code: "CL03",
    name: "Tai nghe",
    dateCreated: "01/01/2024",
    propertyExtend: [],
  },
];
</script>
<style scoped lang="scss"></style>

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
  <Section :title="translate('ClassificationList')" :subTitle="translate('TotalClassification')" :number="String(dataFake.length)">
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
            <template v-if="column.key === 'action'">
              <div class="action">
                <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEdit(record)">
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
  <ModalCreate :isVisible="isVisibleModalCreate" :form="formState" :isEdit="isEdit" :titleModal="titleModal" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
  <ModalConfirm :isVisible="isVisibleModalConfirm" :titleModal="titleModal" :isMany="confirmMany" @closeModal="onCancel" @handleSubmit="handleDelete" />

</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import Section from "@/components/section/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";

const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));
const ModalConfirm = defineAsyncComponent(() => import("@/components/antd-modal-confirm/index.vue"));


const listSelect = ref<any>([]);
const isVisibleModalCreate = ref<boolean>(false);
const isVisibleModalConfirm = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const confirmMany = ref<boolean>(false);
const titleModal = ref<string>('');
const columns = ref<Array<any>>([
  {
    title: translate('ClassificationCode'),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate('ClassificationName'),
    dataIndex: "name",
    key: "name",
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
const formState = reactive({
  id: "",
  code: "",
  name: "",
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.Keyword?.length === 0);

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

//close modal
const onCancel = () => {
  isVisibleModalConfirm.value = false;
  isVisibleModalCreate.value = false;
}

const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => x?.id);
};

//CRUD
const handelCreate = () => {
  formState.id = "";
  formState.code = "";
  formState.name = "";
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate('AddClassification');
};

const handleEdit = (item: any) => {
  formState.id = item.id;
  formState.code = item.code;
  formState.name = item.name;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate('AddClassification');
};

const handleSubmitForm = () => {

};

const handleDeleteSingle = (item: any) => {
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("ProductClassify");
  confirmMany.value = false;
};

const handleDeleteMany = () => {
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("ProductClassify");
  confirmMany.value = true;
};

const handleDelete = () => {};

//data fake
const dataFake = [
  {
    id: "PL1",
    code: "PL1",
    name: "Văn phòng",
  },
  {
    id: "PL2",
    code: "PL2",
    name: "Gamming",
  },
  {
    id: "PL3",
    code: "PL3",
    name: "Custom",
  },
  {
    id: "PL4",
    code: "PL4",
    name: "Kiêm âm",
  },
]
</script>

<template>
  <Section :title="translate('SupplierList')" :subTitle="translate('TotalRecordSupplier')" :number="String(tottalSupplier)" class="w-full h-full bg-white overflow-hidden">
    <template #action>
      <AntdButton :type="'text'" danger :disabled="disableDeleteMany" class="mr-2" @click="handleDeleteSupplier(listSelect, true)">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="text-sm ml-2"
          >{{ translate("Delete") }} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span
        >
      </AntdButton>
      <AntdButton :type="'primary'" @click="handelCreate">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </template>
        <span class="text-sm ml-2">{{ translate("AddNew") }}</span>
      </AntdButton>
    </template>
    <template #action-second>
      <div class="mt-3 w-1/4 flex gap-3">
        <a-input :placeholder="translate('EnterSupplierName')" v-model:value="supplierFilter.Keyword"/>
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
        key-field="Id"
        :index-column="true"
        :has-checkbox="true"
        :columns="columns"
        :dataSource="producerData"
        @onSelected="handleSelectRow"
        class="w-full h-[calc(100vh-204px)] overflow-hidden overflow-y-auto"
        @onChange="handleTable"
        v-if="!loading"
        >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'CreateAt' && record">
            {{ dayjs(record.CreateAt).format("DD/MM/YYYY") }}
          </template>
          <template v-if="column.key === 'Status' && record">
            <a-tag v-if="record.IsCollab" color="success">{{ translate("Cooperating")}}</a-tag>
            <a-tag v-else color="error">{{ translate("StopCollaborating") }}</a-tag>
          </template>
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleUpdate(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteSupplier(record, false)">
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
  <ModalCreate :is-edit="isEdit" :isVisible="isVisibleModalCreate" :titleModal="titleModal" :form="formState" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { Modal, notification } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "vue-debounce";
import { removeNullObjects } from "@/utils/common";
import dayjs from "dayjs";

const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const producerData = computed(() => store.getters["producer/producerData"]);
const tottalSupplier = computed(() => store.getters["producer/totalElement"]);
const loading = computed(() => store.getters["producer/loading"]);

const listSelect = ref<any>([]);
const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const supplierFilter = reactive({
  Keyword: "",
  status: null,
});
const columns = ref<Array<any>>([
  {
    title: translate("SupplierCode"),
    dataIndex: "Code",
    key: "Code",
    align: "left",
  },
  {
    title: translate("SupplierName"),
    dataIndex: "Name",
    key: "Name",
    align: "left",
  },
  {
    title: translate("Origin"),
    dataIndex: "Origin",
    key: "Origin",
    align: "left",
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
      { text: `${translate('Cooperating')}`, value: true },
      { text: `${translate('StopCollaborating')}`, value: false },
    ],
    filterMultiple: false,
    filteredValue: supplierFilter.status ? supplierFilter.status : null,
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

const handleTable = (pag:any, filter:any) => {
  supplierFilter.status = filter.Status?.[0];
}

const handleClearFilter = () => {
  supplierFilter.Keyword = "";
  supplierFilter.status = null;
};

const formState = reactive({
  id: null,
  code: "",
  name: "",
  origin: "",
  isCollab: true,
});

const handleSelectRow = (rows: any) => {
  listSelect.value = rows.map((x: any) => x?.Id);
};

// CRUD
const handelCreate = () => {
  formState.name = "";
  formState.origin = "";
  formState.code = "";
  formState.isCollab = true;
  isVisibleModalCreate.value = true;
  titleModal.value = translate("AddManufacturer");
  isEdit.value = false;
};

const handleUpdate = (item) => {
  formState.id = item.Id;
  formState.code = item.Code;
  formState.name = item.Name;
  formState.origin = item.Origin;
  formState.isCollab = item.IsCollab;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateManufacturerInfo");
};

const handleSubmitForm = async (state) => {
  if (isEdit.value && state.id !== 0) {
    try {
      await store.dispatch("producer/updateSupplier", {
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
      await store.dispatch("producer/createSupplier", {
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

  onCancel();
};

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleDeleteSupplier = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "Supplier")),
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
    await store.dispatch("producer/deleteSupplier", {
      state: {
        supplierIds: itemDelete
      },
      params: {
        ...route.query,
      },
    });
  } else {
    await store.dispatch("producer/deleteSupplier", {
      state: {
        supplierIds: [itemDelete.Id]
      },
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
const onCancel = () => {
  isVisibleModalCreate.value = false;
};

const fetchData = async (params) => {
  await store.dispatch("producer/getSupplier", params);
};

watch(
  () => supplierFilter,
  debounce(() => {
    console.log(supplierFilter);
    const params = {
      name: supplierFilter?.Keyword,
      isCollab: supplierFilter?.status,
    };
    fetchData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  fetchData(null);
});
</script>

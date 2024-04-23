<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[300px] tw-h-[62px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("ManufacturerName") }}</span>
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
  <Section
    :title="translate('ManufacturerList')"
    :subTitle="translate('TotalManufacturers')"
    :number="String(tottalProducer)"
    class="tw-w-full tw-h-full tw-bg-white tw-overflow-hidden"
  >
    <template #action>
      <AntdButton :type="'text'" danger :disabled="disableDeleteMany" class="tw-mr-2" @click="handleDeleteProducer(listSelect, true)">
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
      <AntdTable
        ref="table"
        key-field="id"
        :index-column="true"
        :has-checkbox="true"
        :no-sort="true"
        :columns="columns"
        :dataSource="producerData"
        @onSelected="handleSelectRow"
        class="tw-w-full tw-h-[calc(100vh-290px)] tw-overflow-hidden tw-overflow-y-auto"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleUpdate(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteProducer(record, false)">
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>
  <!-- modal -->
  <ModalCreate :isVisible="isVisibleModalCreate" :titleModal="titleModal" :form="formState" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
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
import { checkDeleteItem, removeNullObjects } from "@/utils/common";

interface FormState {
  id: number;
  code: string | number;
  name: string;
  origin: string;
  allowDelete?: boolean;
}

const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const producerData = computed(() => store.getters["producer/producerData"]);
const tottalProducer = computed(() => store.getters["producer/totalElement"]);

const listSelect = ref<any>([]);
const isVisibleModalCreate = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
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
    title: translate("DateCreated"),
    dataIndex: "timeCreate",
    key: "timeCreate",
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
  id: 0,
  code: "",
  name: "",
  origin: "",
  allowDelete: true,
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.Keyword?.length === 0);

const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => ({ id: x?.id, allowDelete: x?.allowDelete }));
};

// CRUD
const handelCreate = () => {
  formState.id = 0;
  formState.name = "";
  formState.origin = "";
  formState.code = "";
  formState.allowDelete = true;
  formState.allowDelete = true;
  isVisibleModalCreate.value = true;
  titleModal.value = translate("AddManufacturer");
  isEdit.value = false;
};

const handleUpdate = (item: FormState) => {
  formState.id = item.id;
  formState.code = item.code;
  formState.name = item.name;
  formState.origin = item.origin;
  formState.allowDelete = item.allowDelete;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateManufacturerInfo");
};

const handleSubmitForm = async (state: FormState) => {
  if (isEdit.value && state.id !== 0) {
    try {
      await store.dispatch("producer/updateProducer", {
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
      await store.dispatch("producer/createProducer", {
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

const handleDeleteProducer = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "Producer")),
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
      await store.dispatch("producer/deleteProducer", {
        state: temp,
        params: {
          ...route.query,
        },
      });
    } else {
      await store.dispatch("producer/deleteProducer", {
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
      message: translate("noti.deleteProducerFail"),
    });
  }
};

// close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
};

const fetchData = async (params) => {
  await store.dispatch("producer/getProducer", params);
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      name: filterSearching?.Keyword,
    };
    fetchData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  fetchData(null);
});
</script>

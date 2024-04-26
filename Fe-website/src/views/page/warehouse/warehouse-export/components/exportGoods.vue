<template>
  <div class="tw-mb-6">
    <a-breadcrumb separator=">>" class="tw-flex tw-items-center">
      <a-breadcrumb-item>
        <RouterLink to="/">
          <font-awesome-icon :icon="['fas', 'house']" />
        </RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <RouterLink to="/warehouse-export">
          {{ translate("ExportWarehouse") }}
        </RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        {{ translate("ExportGoods") }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>

  <div class="tw-p-6 tw-bg-white tw-rounded-xl">
    <div class="tw-mb-6 tw-font-semibold tw-text-[20px]">
      {{ translate("ExportGoods") }}
    </div>

    <a-form class="tw-flex tw-items-end tw-gap-x-6 tw-mb-6">
      <a-form-item class="tw-max-w-[400px] tw-min-w-[130px]">
        <span class="tw-opacity-70">{{ translate("ProductCode") }}</span>
        <a-input class="tw-w-full tw-mt-2" v-model:value="filterSearching" />
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

    <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6 tw-mb-6">
      <div class="tw-basis-1/2 tw-p-4 tw-border tw-rounded-xl tw-shadow tw-shadow-blue-100">
        <div class="tw-mb-6 tw-font-semibold tw-flex tw-justify-between tw-gap-2 tw-flex-wrap">
          <span>{{ translate("ListProductsWarehouse") }}</span>
          <span class="tw-font-normal">{{ translate("ProductQuantity") }}: {{ datafake?.length }}</span>
        </div>
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="true"
          :columns="columnDataCurrent"
          :data-source="datafake"
          class="tw-w-full tw-h-[calc(100vh-330px)] tw-overflow-hidden tw-overflow-y-auto"
        >
          <template #custom-body="{ column, record }">
            <template v-if="column.key === 'action' && record">
              <AntdButton type="primary" danger shape="circle" @click="handleAdd(record)">
                <font-awesome-icon :icon="['fas', 'plus']" style="color: #ffffff" />
              </AntdButton>
            </template>
          </template>
        </AntdTable>
      </div>

      <div class="tw-basis-1/2 tw-p-4 tw-border tw-rounded-xl tw-shadow tw-shadow-blue-100">
        <div class="tw-mb-6 tw-font-semibold tw-flex tw-justify-between tw-gap-2 tw-flex-wrap">
          <span>{{ translate("ProductListUpdatedQuantity") }}</span>
          <span class="tw-font-normal">{{ translate("ProductQuantity") }}: {{ dataList?.length }}</span>
        </div>
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="true"
          :columns="columnDataUpdate"
          :data-source="dataList"
          class="tw-w-full tw-h-[calc(100vh-330px)] tw-overflow-hidden tw-overflow-y-auto"
        >
          <template #custom-body="{ column, record }">
            <template v-if="column.key === 'action' && record">
              <AntdButton type="primary" danger shape="circle" @click="handleDelete(record.id)">
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #fff" />
              </AntdButton>
            </template>
          </template>
        </AntdTable>
      </div>
    </div>

    <div class="tw-w-full tw-flex tw-items-center tw-justify-end">
      <AntdButton :type="'primary'" @click="handleSubmit()" :disabled="disabledHandleSubmit">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'upload']" />
        </template>
        <span class="tw-ml-2 tw-text-sm">{{ translate("ExportGoods") }}</span>
      </AntdButton>
    </div>
  </div>
  <!-- modal -->
  <ModalExport :is-visible="isVisibleModalQuantity" :form="state" @close-modal="cancelAdd" @handle-submit="handleAddProduct" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";

const ModalExport = defineAsyncComponent(() => import("./ModalExport.vue"));

const filterSearching = ref<string>("");
const isVisibleModalQuantity = ref<boolean>(false);
const dataList = ref<Array<any>>([]);

const state = reactive<any>({
  id: null,
  code: null,
  quantity: null,
});

const disabledDeleteFilter = computed(() => filterSearching.value?.length === 0);

const handleClearFilter = () => {
  filterSearching.value = "";
};

const columnDataCurrent = ref<Array<any>>([
  {
    title: translate("ProductCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("CurrentQuantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
  },
  {
    dataIndex: "action",
    key: "action",
    width: 80,
    align: "center",
    fixed: "right",
  },
]);
const columnDataUpdate = ref<Array<any>>([
  {
    title: translate("ProductCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("Quantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "left",
  },
  {
    dataIndex: "action",
    key: "action",
    width: 80,
    align: "center",
    fixed: "right",
  },
]);

const handleAdd = (item) => {
  state.id = item?.id;
  state.code = item?.code;
  state.quantity = null;
  isVisibleModalQuantity.value = true;
};

const cancelAdd = () => {
  state.id = null;
  state.code = null;
  state.quantity = null;
  isVisibleModalQuantity.value = false;
};

const checkData = (item) => {
  return dataList.value.find((e) => e.id === item.id);
};

const handleAddProduct = (data) => {
  const value = {
    id: data.id,
    code: data.code,
    quantity: Number(data.quantity),
  };
  if (checkData(data)) {
    dataList.value.map((item) => {
      if (item.id === data.id) {
        item.quantity += value.quantity;
      }
    });
  } else {
    dataList.value.push(value);
  }
  cancelAdd();
};

const handleDelete = (idItem) => {
  dataList.value = dataList.value.filter((ele) => ele?.id !== idItem);
};

const disabledHandleSubmit = computed(() => dataList.value?.length === 0);
const handleSubmit = () => {};

const datafake = [
  {
    id: 0,
    code: "code01",
    quantity: 100,
  },
  {
    id: 1,
    code: "code02",
    quantity: 50,
  },
  {
    id: 2,
    code: "code03",
    quantity: 150,
  },
  {
    id: 3,
    code: "code04",
    quantity: 100,
  },
  {
    id: 4,
    code: "code05",
    quantity: 50,
  },
  {
    id: 5,
    code: "code06",
    quantity: 150,
  },
];
</script>

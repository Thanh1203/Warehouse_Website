<template>
  <div class="tw-mb-6 tw-flex tw-gap-6 tw-items-center tw-justify-between">
    <span class="tw-font-semibold tw-text-[20px]">{{ translate("UpdateProductQuantity") }}</span>
    <a-alert type="error" :message="translate('ErrorNotConfigPrice')" banner v-if="!allHasUntiPrice" class="tw-rounded-xl tw-font-medium"/>
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
      </div>
      <AntdTable
        ref="table"
        key-field="id"
        :index-column="true"
        :columns="columnDataCurrent"
        :data-source="productInWh"
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
        <font-awesome-icon :icon="['far', 'floppy-disk']" />
      </template>
      <span class="tw-ml-2 tw-text-sm">{{ translate("Save") }}</span>
    </AntdButton>
  </div>
  <!-- modal -->
  <ModalImport :is-visible="isVisibleModalQuantity" :form="state" @close-modal="cancelAdd" @handle-submit="handleAddProduct" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import { debounce } from "vue-debounce";
import { removeNullObjects } from "@/utils/common";

const store = useStore();
const router = useRouter();
const route = useRoute();

const ModalImport = defineAsyncComponent(() => import("./ModalAdd.vue"));

const productInWh = computed(() => store.getters["product/productInWh"]);

const dataList = ref<Array<any>>([]);
const filterSearching = ref<string>("");
const isVisibleModalQuantity = ref<boolean>(false);
const allHasUntiPrice = ref<boolean>(true);

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
    idProduct: data.id,
    codeProduct: data.code,
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

const totalProductImport = (data) => {
  let restult = 0;
  data?.forEach(ele => {
    restult += ele?.quantity;
  });
  return restult;
};

const handleSubmit = async () => {
  const payload = {
    idWarehouse: Number(route.params?.id),
    DataUpdate: dataList.value,
    totalProduct: totalProductImport(dataList.value)
  }

  try {
    await store.dispatch("warehouse/updateGoods", payload);
    fetchProduct({ id: Number(route.params?.id) });
    notification["success"]({
      message: translate("noti.insertSuccess"),
      description: translate("PleaseConfigureSellingPrice"),
    });
  } catch (error) {
    console.log(error);
    notification["error"]({
      message: translate("noti.insertFail"),
    });
  }
  dataList.value = [];
};


watch(
  () => filterSearching.value,
  debounce(() => {
    const params = {
      code: filterSearching.value
    }
    const payload = {
      id: Number(route.params?.id),
      params: removeNullObjects(params)
    };
    fetchProduct(payload);
  }, 500)
)

const fetchProduct = async (params) => {
  const res = await store.dispatch("product/getProductInWh", params);
  allHasUntiPrice.value = res.allHasUntiPrice;
};

onMounted(async () => {
  await fetchProduct({id: route.params?.id});
});
</script>

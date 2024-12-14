<template>
  <div class="mb-6">
    <a-breadcrumb separator=">>" class="flex items-center">
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

  <div class="mb-6 p-6 bg-white rounded-xl">
    <div class="mb-6 font-semibold text-[20px]">
      {{ translate("ClientInformation") }}
    </div>

    <a-form class="flex items-end gap-x-6 mb-6">
      <a-form-item class="max-w-[400px] min-w-[130px]">
        <span class="opacity-70">{{ translate("PhoneNumber") }}</span>
        <a-input class="w-full mt-2" v-model:value="clientState.phoneNumber" />
      </a-form-item>
      <a-form-item>
        <span class="opacity-70">{{ translate("CustomerName") }}</span>
        <a-input class="w-full mt-2" v-model:value="clientState.name" />
      </a-form-item>
      <a-form-item>
        <span class="opacity-70">{{ translate("Address") }}</span>
        <a-input class="w-full mt-2" v-model:value="clientState.address" />
      </a-form-item>
    </a-form>
  </div>

  <div class="p-6 bg-white rounded-xl">
    <div class="mb-6 flex gap-6 items-center justify-between">
      <span class="font-semibold text-[20px]">{{ translate("ExportGoods") }}</span>
      <a-alert type="error" :message="translate('ErrorNotConfigPrice')" banner v-if="!allHasUntiPrice" class="rounded-xl font-medium"/>
    </div>

    <a-form class="flex items-end gap-x-6 mb-6">
      <a-form-item class="max-w-[400px] min-w-[130px]">
        <span class="opacity-70">{{ translate("ProductCode") }}</span>
        <a-input class="w-full mt-2" v-model:value="filterSearching" />
      </a-form-item>
      <a-form-item>
        <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
          <template #icon>
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </template>
          <span class="ml-2">{{ translate("Delete") }}</span>
        </AntdButton>
      </a-form-item>
    </a-form>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="basis-1/2 p-4 border rounded-xl shadow shadow-blue-100">
        <div class="mb-6 font-semibold flex justify-between gap-2 flex-wrap">
          <span>{{ translate("ListProductsWarehouse") }}</span>
        </div>
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="true"
          :columns="columnDataCurrent"
          :data-source="productInWh"
          class="w-full h-[calc(100vh-330px)] overflow-hidden overflow-y-auto"
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

      <div class="basis-1/2 p-4 border rounded-xl shadow shadow-blue-100">
        <div class="mb-6 font-semibold flex justify-between gap-2 flex-wrap">
          <span>{{ translate("ProductListUpdatedQuantity") }}</span>
        </div>
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="true"
          :columns="columnDataUpdate"
          :data-source="dataList"
          class="w-full h-[calc(100vh-330px)] overflow-hidden overflow-y-auto"
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

    <div class="w-full flex items-center justify-end">
      <AntdButton :type="'primary'" @click="handleSubmit()" :disabled="disabledHandleSubmit">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'upload']" />
        </template>
        <span class="ml-2 text-sm">{{ translate("ExportGoods") }}</span>
      </AntdButton>
    </div>
  </div>
  <!-- modal -->
  <ModalExport :is-visible="isVisibleModalQuantity" :form="state" :max-quantity="maxQuantity" @close-modal="cancelAdd" @handle-submit="handleAddProduct" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { debounce } from "vue-debounce";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import { removeNullObjects } from "@/utils/common";

const store = useStore();
const router = useRouter();
const route = useRoute();

const ModalExport = defineAsyncComponent(() => import("./ModalExport.vue"));

const productInWh = computed(() => store.getters["product/productInWh"]);

const dataList = ref<Array<any>>([]);
const filterSearching = ref<string>("");
const isVisibleModalQuantity = ref<boolean>(false);
const allHasUntiPrice = ref<boolean>(true);
const maxQuantity = ref<number>(0);
const state = reactive<any>({
  id: null,
  code: null,
  quantity: null,
});
const clientState = reactive<any>({
  phoneNumber: "",
  name: "",
  address: "",
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
  maxQuantity.value = item.quantity;
  isVisibleModalQuantity.value = true;
};

const cancelAdd = () => {
  state.id = null;
  state.code = null;
  state.quantity = null;
  isVisibleModalQuantity.value = false;
};

const checkData = (item) => {
  return dataList.value.find((e) => e.id === item.idProduct);
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
    dataUpdate: {
      idWarehouse: Number(route.params?.id),
      DataUpdate: dataList.value,
      totalProduct: totalProductImport(dataList.value)
    },
    customer: {
      phoneNumber: clientState.phoneNumber,
      name: clientState.name,
      address: clientState.address
    }
  }

  try {
    await store.dispatch("warehouse/goodsExport", payload);
    fetchProduct({ id: Number(route.params?.id) });
    notification["success"]({
      message: translate("noti.SuccessfulExport"),
    });
  } catch (error) {
    console.log(error);
    notification["error"]({
      message: translate("noti.FaildExport"),
    });
  }
  dataList.value = [];
  clientState.phoneNumber = "";
  clientState.name = "";
  clientState.address = "";
};

watch(
  () => clientState?.phoneNumber,
  debounce((val) => {

  }, 500)
)

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

<template>
  <a-form class="flex rounded-xl bg-white px-6 py-5 mb-6">
    <a-form-item class="w-[300px] !mr-3">
      <span class="opacity-70">{{ translate("ProductName") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.Keyword" class="mt-2" />
    </a-form-item>
    <a-form-item class="w-[250px] !mr-3">
      <span class="opacity-70">{{ translate("ProductClassify") }}</span>
      <a-select :placeholder="translate('Classify')" v-model:value="filterSearching.classifyId" class="mt-2" :options="classifyData.map((x) => ({value: x.id, label: x.name}))"/>
    </a-form-item>
    <a-form-item class="w-[200px] !mr-3">
      <span class="opacity-70">{{ translate("Supplier") }}</span>
      <a-select
        :placeholder="translate('Supplier')"
        v-model:value="filterSearching.producerId"
        :options="producerData.map((x) => ({ value: x.id, label: x.name }))"
        class="mt-2"
      />
    </a-form-item>
    <a-form-item class="flex items-end">
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
  <div class="w-full h-full flex bg-white p-6 rounded-xl product-Info overflow-hidden">
    <Section
      class="!w-[18%] !h-auto bg-transparent border border-solid mr-2"
      :title="translate('CategoryList')"
      :subTitle="translate('TotalCategories')"
      :number="String(totalCategory)"
    >
      <template #body>
        <a-menu
          mode="inline"
          @click="handleSelectCategory"
          :items="
            categoryData.map((x) => ({
              key: x.id,
              label: x.name,
            }))
          "
          v-model:selectedKeys="selectedKeys"
          v-if="!loadingCategory"
        />

        <a-skeleton v-else active />
      </template>
    </Section>
    <Section
      class="!w-[82%] h-[calc(100vh-223px)] bg-transparent border border-solid ml-2 overflow-hidden"
      :title="translate('ListProducts')"
      :subTitle="translate('TotalProducts')"
      :number="String(totalProduct)"
    >
      <template #action>
        <AntdButton :type="'text'" danger class="mr-2" :disabled="disableDeleteMany" @click="handleDeleteProduct(listSelect, true)">
          <template #icon>
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </template>
          <span class="text-sm ml-2"
            >{{ translate("Delete") }} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span
          >
        </AntdButton>
        <AntdButton :type="'primary'" @click="handleCreate">
          <template #icon>
            <font-awesome-icon :icon="['fas', 'plus']" />
          </template>
          <span class="text-sm ml-2">{{ translate("AddNew") }}</span>
        </AntdButton>
      </template>
      <template #body>
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="false"
          :has-checkbox="true"
          
          :dataSource="productData"
          :columns="columns"
          @onSelected="handleSelectRow"
          class="h-[calc(100vh-342px)] w-full overflow-hidden overflow-y-auto"
          v-if="!loadingProduct"
        >
          <template #custom-body="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="w-full py-4 my-[-16px] cursor-pointer viewByName" @click="handleView">
                <span class="viewByName_name">{{ record.name }}</span>
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <div class="action">
                <AntdButton class="action-btn" type="text" shape="circle" @click="handleEdit(record)">
                  <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
                </AntdButton>
                <AntdButton class="action-btn" type="text" shape="circle" @click="handleDeleteProduct(record, false)">
                  <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
                </AntdButton>
              </div>
            </template>
          </template>
        </AntdTable>

        <a-skeleton v-else active />
      </template>
    </Section>
  </div>
  <!-- modal -->
  <ModalCreate :isVisible="isVisibleModalCreate" :form="formState" :isEdit="isEdit" :titleModal="titleModal" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
  <ModalInfo :isVisible="isVisibleModalInfo" :titleModal="titleModal" :idProduct="idProduct" @closeModal="onCancel" />
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

const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));
const ModalInfo = defineAsyncComponent(() => import("./components/modalInfo.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const productData = computed(() => store.getters["product/productData"]);
const classifyData = computed(() => store.getters["classify/classifyData"]);
const producerData = computed(() => store.getters["producer/producerData"]);
const categoryData = computed(() => {
  const result = [...store.getters["category/categoryData"]];
  result.unshift(
    {
      id: "ALL",
      name: translate("All")
    }
  )
  return result;
});
const totalProduct = computed(() => store.getters["product/totalElement"]);
const totalCategory = computed(() => store.getters["category/totalElement"]);
const loadingCategory = computed(() => store.getters["category/loading"]);
const loadingProduct = computed(() => store.getters["product/loading"]);

const listSelect = ref<Array<string | number>>([]);
const idProduct = ref<string>("");
const titleModal = ref<string>("");
const selectedKeys = ref<string[]>(["ALL"]);
const isVisibleModalCreate = ref<boolean>(false);
const isVisibleModalInfo = ref<boolean>(false);
const confirmMany = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const columns = ref<Array<any>>([
  {
    title: translate("ProductCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("ProductName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("Category"),
    dataIndex: "categoryName",
    key: "categoryName",
    align: "left",
  },
  {
    title: translate("Classify"),
    dataIndex: "classifyName",
    key: "classifyName",
    align: "left",
  },
  {
    title: translate("Supplier"),
    dataIndex: "producerName",
    key: "producerName",
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
    width: 80,
    align: "center",
    fixed: "right",
  },
]);

const filterSearching = reactive({
  Keyword: "",
  producerId: null,
  classifyId: null,
  categoryId: null,
});
const formState = reactive<any>({
  id: "",
  code: "",
  name: "",
  categoryId: null,
  classifyId: null,
  producerId: null,
  size: "",
  material: "",
  connectionTypes: "",
  color: "",
  designs: "",
  describe: "",
  allowDelete: true,
});

const disabledDeleteFilter = computed(() => filterSearching?.Keyword?.length === 0 && filterSearching?.producerId === null && filterSearching?.classifyId === null);
const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleClearFilter = () => {
  filterSearching.Keyword = "";
  filterSearching.producerId = null;
  filterSearching.classifyId = null;
};

//handle product category
const handleSelectCategory = (item: any) => {
  selectedKeys.value = [item.key];
  if (selectedKeys.value[0] === "ALL") {
    filterSearching.categoryId = "";
  } else {
    filterSearching.categoryId = selectedKeys.value[0];
  }
};

// close modal
const onCancel = () => {
  isVisibleModalCreate.value = false;
  isVisibleModalInfo.value = false;
};

// handle data table
const handleSelectRow = (rows: any) => {
  listSelect.value = rows.value.map((x: any) => ({ id: x?.id, allowDelete: x?.allowDelete }));
};

// create, delete product
const handleCreate = () => {
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate("AddProductInfo");
  formState.id = 0;
  formState.code = "";
  formState.name = "";
  formState.categoryId = null;
  formState.classifyId = null;
  formState.producerId = null;
  formState.size = "";
  formState.material = "";
  formState.connectionTypes = "";
  formState.color = "";
  formState.designs = "";
  formState.describe = "";
  formState.allowDelete = true;
};

const handleEdit = (item: any) => {
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateProductInfo");
  formState.id = item.id;
  formState.code = item.code;
  formState.name = item.name;
  formState.categoryId = item.categoryId;
  formState.size = item.size;
  formState.material = item.material;
  formState.connectionTypes = item.connectionTypes;
  formState.color = item.color;
  formState.designs = item.designs;
  formState.describe = item.describe;
  formState.classifyId = item.classifyId;
  formState.producerId = item.producerId;
  formState.allowDelete = item.allowDelete;
};

const handleView = (item: any) => {
  isVisibleModalInfo.value = true;
  isEdit.value = false;
  titleModal.value = translate("ProductInformation");
  idProduct.value = item.id;
};

const handleSubmitForm = async (state: any) => {
  if (isEdit.value && state.id !== 0) {
    try {
      await store.dispatch("product/updateProduct", {
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
      await store.dispatch("product/createProduct", {
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

const handleDeleteProduct = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "Products")),
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
      await store.dispatch("product/deleteProduct", {
        state: temp,
        params: {
          ...route.query,
        },
      });
    } else {
      await store.dispatch("product/deleteProduct", {
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
      message: translate("noti.deleteProductFail"),
    });
  }
};

const fetchData = async () => {
  await store.dispatch("category/getCategory", null);
  await store.dispatch("classify/getClassify", null);
  await store.dispatch("producer/getSupplier", null);
};

const handleFetchProduct = async (params: any) => {
  await store.dispatch("product/getProduct", params);
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      categoryId: filterSearching.categoryId,
      classifyId: filterSearching.classifyId,
      producerId: filterSearching.producerId,
      name: filterSearching.Keyword
    };
    handleFetchProduct(removeNullObjects(params));
  }, 500),
  {deep: true},
);

onMounted(async () => {
  await fetchData();
  await handleFetchProduct(null);
});
</script>
<style lang="scss">
.product-Info {
  .ant-menu {
    border-top: 1px solid #e5e7eb !important;
    padding: 12px 0;
    .ant-menu-item {
      padding: 0 12px !important;
    }
  }
}
</style>

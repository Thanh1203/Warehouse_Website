<template>
  <a-form class="tw-flex tw-rounded-xl tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[300px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("CategoryName") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" class="tw-mt-2" />
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
  <Section :title="translate('CategoryList')" :subTitle="translate('TotalCategories')" :number="String(totalCategory)" class="tw-w-full tw-h-full tw-bg-white tw-overflow-hidden">
    <template #action>
      <AntdButton :type="'text'" danger :disabled="disableDeleteMany" class="tw-mr-2" @click="handleDeleteCategory(listSelect, true)">
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
        :dataSource="categoryData"
        :columns="columns"
        @onSelected="handleSelectRow"
        class="tw-w-full tw-h-[calc(100vh-290px)] tw-overflow-hidden tw-overflow-y-auto"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleView(record)">
                <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #4caf50" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleUpdate(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </AntdButton>
              <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteCategory(record, false)">
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
  <ModalInfo :isVisible="isVisibleModalInfo" :titleModal="titleModal" :form="formState" @closeModal="onCancel" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { ref, computed, reactive, watch, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import { Modal, notification } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { checkDeleteItem, removeNullObjects } from "@/utils/common";
import { debounce } from "vue-debounce";

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));
const ModalInfo = defineAsyncComponent(() => import("./components/ModalInfo.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const categoryData = computed(() => store.getters["category/categoryData"]);
const totalCategory = computed(() => store.getters["category/totalElement"]);

const listSelect = ref<any>([]);
const isVisibleModalCreate = ref<boolean>(false);
const isVisibleModalInfo = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const titleModal = ref<string>("");
const columns = ref<Array<any>>([
  {
    title: translate("CategoryCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("CategoryName"),
    dataIndex: "name",
    key: "name",
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
  keyword: "",
});
const formState = reactive<any>({
  id: "",
  code: "",
  name: "",
  allowDelete: true,
});

const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0);
const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleClearFilter = () => {
  filterSearching.keyword = "";
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

// create, update, delete & view
const handelCreate = () => {
  formState.id = 0;
  formState.code = "";
  formState.name = "";
  formState.allowDelete = true;
  isVisibleModalCreate.value = true;
  titleModal.value = translate("AddProductCategories");
  isEdit.value = false;
};

const handleUpdate = (item: any) => {
  formState.id = item.id;
  formState.code = item.code;
  formState.name = item.name;
  formState.allowDelete = item.allowDelete;
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateProductCategories");
};

const handleSubmitForm = async (state: any) => {
  if (isEdit.value && state.id !== 0) {
    try {
      await store.dispatch("category/updateCategory", {
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
      await store.dispatch("category/createCategory", {
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

const handleDeleteCategory = async (itemDelete: any, isMany: boolean) => {
  Modal.confirm({
    title: translate(translate(isMany ? "confirm.many" : "confirm.one", "ProductCategory")),
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
      await store.dispatch("category/deleteCategory", {
        state: temp,
        params: {
          ...route.query,
        },
      });
    } else {
      await store.dispatch("category/deleteCategory", {
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
      message: translate("noti.deleteCategoryFail"),
    });
  }
};

const handleView = (item: any) => {
  isVisibleModalInfo.value = true;
  titleModal.value = translate("DetailCategory");
  formState.code = item.code;
  formState.name = item.name;
};

const fetData = async (params) => {
  await store.dispatch("category/getCategory", params);
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      name: filterSearching?.keyword,
    };
    fetData(removeNullObjects(params));
  }, 500),
  { deep: true },
);

onMounted(async () => {
  fetData(null);
});
</script>
<style scoped lang="scss"></style>

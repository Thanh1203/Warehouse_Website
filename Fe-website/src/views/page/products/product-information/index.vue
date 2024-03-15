<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[300px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("Search") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.Keyword" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[250px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("ProductClassify") }}</span>
      <a-input :placeholder="translate('Classify')" v-model:value="filterSearching.Classify" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-w-[200px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("Producer") }}</span>
      <a-select
        :placeholder="translate('Producer')"
        v-model:value="filterSearching.producerCode"
        :options="dataFake2.map((x) => ({ value: x.id, label: x.name }))"
        class="tw-mt-2"
      />
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
  <div class="tw-w-full tw-h-full tw-flex tw-bg-white tw-p-6 tw-rounded-lg product-Info">
    <Section
      class="!tw-w-1/5 !tw-h-auto tw-bg-transparent tw-border tw-border-solid tw-mr-2"
      :title="translate('CategoryList')"
      :subTitle="translate('TotalCategories')"
      :number="String(dataFake3?.length)"
    >
      <template #body>
        <a-menu
          mode="inline"
          @click="handleSelectCategory"
          :items="
            dataFake3.map((x) => ({
              key: x.id,
              label: x.name,
            }))
          "
          v-model:selectedKeys="selectedKeys"
        />
      </template>
    </Section>
    <Section
      class="!tw-w-4/5 tw-bg-transparent tw-border tw-border-solid tw-ml-2"
      :title="translate('ListProducts')"
      :subTitle="translate('TotalProducts')"
      :number="String(dataFake4?.length)"
    >
      <template #action>
        <AntdButton :type="'text'" danger class="tw-mr-2" :disabled="disableDeleteMany" @click="handleDeleteMany">
          <template #icon>
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </template>
          <span class="tw-text-sm tw-ml-2"
            >{{ translate("Delete") }} <span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span
          >
        </AntdButton>
        <AntdButton :type="'primary'" @click="handleCreate">
          <template #icon>
            <font-awesome-icon :icon="['fas', 'plus']" />
          </template>
          <span class="tw-text-sm tw-ml-2">{{ translate("AddNew") }}</span>
        </AntdButton>
      </template>
      <template #body>
        <AntdTable ref="table" key-field="id" :index-column="false" :has-checkbox="true" :no-sort="true" :dataSource="dataFake4" :columns="columns" @onSelected="handleSelectRow">
          <template #custom-body="{ column, record }">
            <template v-if="column.key === 'action'">
              <div class="action">
                <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleView(record)">
                  <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #4caf50" />
                </AntdButton>
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
  </div>
  <!-- modal -->
  <ModalCreate :isVisible="isVisibleModalCreate" :form="formState" :isEdit="isEdit" :titleModal="titleModal" @closeModal="onCancel" @handleSubmit="handleSubmitForm" />
  <ModalInfo :isVisible="isVisibleModalInfo" :titleModal="titleModal" :idProduct="idProduct" @closeModal="onCancel" />
  <ModalConfirm :isVisible="isVisibleModalConfirm" :titleModal="titleModal" :isMany="confirmMany" @closeModal="onCancel" @handleSubmit="handleDelete" />
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { notification } from "ant-design-vue";

const ModalCreate = defineAsyncComponent(() => import("./components/modalCreate.vue"));
const ModalInfo = defineAsyncComponent(() => import("./components/modalInfo.vue"));
const ModalConfirm = defineAsyncComponent(() => import("@/components/antd-modal-confirm/index.vue"));

const listSelect = ref<Array<string | number>>([]);
const idProduct = ref<string>("");
const titleModal = ref<string>("");
const selectedKeys = ref<string[]>(["ALL"]);
const isVisibleModalCreate = ref<boolean>(false);
const isVisibleModalConfirm = ref<boolean>(false);
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
    dataIndex: "Classify",
    key: "Classify",
    align: "left",
  },
  {
    title: translate("Producer"),
    dataIndex: "Producer",
    key: "Producer",
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
  producerCode: null,
  Classify: null,
});
const formState = reactive({
  id: "",
  code: "",
  name: "",
  categoryCode: null,
  classifyCode: null,
  producerCode: null,
  Size: "",
  Material: "",
  ConnectionTypes: "",
  Color: "",
  Designs: "",
  Describe: "",
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.Keyword?.length === 0 && filterSearching?.producerCode === null && filterSearching?.Classify === null);

const handleClearFilter = () => {
  filterSearching.Keyword = "";
  filterSearching.producerCode = null;
  filterSearching.Classify = null;
};

//handle product category
const handleSelectCategory = (item: any) => {
  selectedKeys.value = [item.key];
  console.log(selectedKeys.value[0]);
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

// create, delete product
const handleCreate = () => {
  isVisibleModalCreate.value = true;
  isEdit.value = false;
  titleModal.value = translate("AddProductInfo");
  formState.id = "";
  formState.code = "";
  formState.name = "";
  formState.categoryCode = null;
  formState.Size = "";
  formState.Material = "";
  formState.ConnectionTypes = "";
  formState.Color = "";
  formState.Designs = "";
  formState.Describe = "";
  formState.classifyCode = null;
  formState.producerCode = null;
};

const handleEdit = (item: any) => {
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = translate("UpdateProductInfo");
  formState.id = item.id;
  formState.code = item.code;
  formState.name = item.name;
  formState.categoryCode = item.categoryCode;
  formState.Size = item.Size;
  formState.Material = item.Material;
  formState.ConnectionTypes = item.ConnectionTypes;
  formState.Color = item.Color;
  formState.Designs = item.Designs;
  formState.Describe = item.Describe;
  formState.classifyCode = item.classifyCode;
  formState.producerCode = item.producerCode;
};

const handleView = (item: any) => {
  isVisibleModalInfo.value = true;
  isEdit.value = false;
  titleModal.value = translate("ProductInformation");
  idProduct.value = item.id;
};

const handleDeleteSingle = (id: string) => {
  idProduct.value = id;
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("Products");
  confirmMany.value = false;
};

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleDeleteMany = () => {
  isVisibleModalConfirm.value = true;
  titleModal.value = translate("Products");
  confirmMany.value = true;
};

const handleSubmitForm = (state: any) => {
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

const handleDelete = () => {};

//data fake
const dataFake2 = [
  {
    id: "HgA",
    name: "Hãng A",
  },
  {
    id: "HgB",
    name: "Hãng B",
  },
  {
    id: "HgC",
    name: "Hãng C",
  },
];

const dataFake3 = [
  {
    id: "ALL",
    name: "Tất cả",
  },
  {
    id: "CL01",
    name: "Bàn phím",
  },
  {
    id: "CL02",
    name: "Chuột",
  },
  {
    id: "CL03",
    name: "Tai nghe",
  },
];

const dataFake4 = [
  {
    id: "SP01",
    code: "SP01",
    categoryCode: "CL01",
    categoryName: "Bàn phím",
    name: "Bàn phím 1",
    Color: "Trắng",
    Classify: "Văn phòng",
    Producer: "Hãng A",
    Size: "30 x 30",
    Material: "Nhựa, nhôm",
    ConnectionTypes: "3 mode",
    Designs: "TKL",
    Describe: "Bàn phím cơ văn phòng",
    classifyCode: "PL1",
    producerCode: "HgA",
  },
  {
    id: "SP02",
    code: "SP01",
    categoryCode: "CL01",
    categoryName: "Bàn phím",
    name: "Bàn phím 2",
    Color: "Trắng",
    Classify: "Gamming",
    Producer: "Hãng A",
    Size: "30 x 30",
    Material: "Nhôm",
    ConnectionTypes: "1 mode",
    Designs: "layout 75%",
    Describe: "Bàn phím cơ gamming",
    classifyCode: "PL2",
    producerCode: "HgA",
  },
  {
    id: "SP03",
    code: "SP01",
    categoryCode: "CL01",
    categoryName: "Bàn phím",
    name: "Bàn phím 3",
    Color: "Đen",
    Classify: "Custom",
    Producer: "Hãng A",
    Size: "40 x 40",
    Material: "Nhựa",
    ConnectionTypes: "3 mode",
    Designs: "full size",
    Describe: "Bàn phím cơ custom có hostswap",
    classifyCode: "PL3",
    producerCode: "HgA",
  },
  {
    id: "SP04",
    code: "SP01",
    categoryCode: "CL02",
    categoryName: "Chuột",
    name: "Chuột 1",
    Color: "Đen",
    Classify: "Gamming",
    Producer: "Hãng B",
    Size: "",
    Material: "Nhựa",
    ConnectionTypes: "2 mode",
    Designs: "Đối xứng",
    Describe: "Chuột gamming thiết kế đối xứng",
    classifyCode: "PL2",
    producerCode: "HgB",
  },
  {
    id: "SP05",
    code: "SP01",
    categoryCode: "CL02",
    categoryName: "Chuột",
    name: "Chuột 2",
    Color: "xám",
    Classify: "Văn phòng",
    Producer: "Hãng B",
    Size: "",
    Material: "Nhựa",
    ConnectionTypes: "dây USB",
    Designs: "Công thái học",
    Describe: "Chuột văn phòng thiết kế công thái học ôm tay",
    classifyCode: "PL1",
    producerCode: "HgB",
  },
  {
    id: "SP06",
    code: "SP01",
    categoryCode: "CL03",
    categoryName: "Tai nghe",
    name: "Tai nghe 1",
    Color: "xám",
    Classify: "Kiểm âm",
    Producer: "Hãng C",
    Size: "",
    Material: "Nhựa",
    ConnectionTypes: "2 mode",
    Designs: "In ear",
    Describe: "Tai nghe DJ kiểm âm",
    classifyCode: "PL4",
    producerCode: "HgC",
  },
];
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

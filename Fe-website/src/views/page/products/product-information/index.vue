<template>
  <a-form class="tw-flex tw-justify-start tw-items-start tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6 filter-section">
    <a-form-item class="tw-w-[300px]">
      <span class="tw-opacity-70">{{ translate('Search')}}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" />
    </a-form-item>
    <a-form-item class="tw-w-[250px]">
        <span class="tw-opacity-70">{{translate('ProductCategory')}}</span>
        <a-select :placeholder="translate('ProductCategory')" v-model:value="filterSearching.type" :options="dataFake1.map(ele => ({value: ele.id, label: ele.name}))"/>
    </a-form-item>
    <a-form-item class="tw-w-[200px]">
        <span class="tw-opacity-70">{{translate('Color')}}</span>
        <a-select :placeholder="translate('Color')" v-model:value="filterSearching.color" :options="dataFake2"/>
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter"  @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate('Delete') }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
  <div class="tw-w-full tw-h-full tw-flex tw-bg-white tw-p-6 tw-rounded-lg product-Info">
    <Section class="tw-w-1/5 tw-h-auto tw-bg-transparent tw-border tw-border-solid tw-mr-2" :title="'Danh sách chủng loại'" :subTitle="translate('TotalCategories')" :number="String(dataFake3?.length)">
      <template #body>
        <a-menu
          mode="inline"
          @click="handleSelectCategory"
          :items="dataFake3.map(x => ({
            key: x.id,
            label: x.name,
          }))"
        />
      </template>
    </Section>
    <Section class="tw-w-4/5 tw-bg-transparent tw-border tw-border-solid tw-ml-2" :title="'Danh sách sản phẩm'" :subTitle="translate('TotalProducts')" :number="String(dataFake4?.length)">
      <template #action>
        <AntdButton :type="'text'" danger class="tw-mr-2" :disabled="disableDeleteMany" @click="handleDeleteMany">
            <template #icon>
                <font-awesome-icon :icon="['far', 'trash-can']"/>
            </template>
            <span class="tw-text-sm tw-ml-2">{{translate('Delete')}}<span v-if="listSelect?.length > 0">({{ listSelect?.length }})</span></span>
        </AntdButton>
        <AntdButton :type="'primary'" @click="handleCreate">
            <template #icon>
                <font-awesome-icon :icon="['fas', 'plus']"/>
            </template>
            <span class="tw-text-sm tw-ml-2">{{translate('AddNew')}}</span>
        </AntdButton>
      </template>
      <template #body>
        <AntdTable
          ref="table"
          key-field="id"
          :index-column="true"
          :has-checkbox="true"
          :no-sort="true"
          :dataSource="dataFake4"
          :columns="columns"
          @onSelected="handleSelectRow"
        >
          <template #custom-body="{column, record}">
            <template v-if="column.key === 'action'">
              <div class="action">
                <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleView(record)">
                  <font-awesome-icon :icon="['fas', 'circle-info']" style="color: #4CAF50;" />
                </AntdButton>
                <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleEdit(record)">
                  <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001F3F;"/>
                </AntdButton>
                <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteSingle(record.id)">
                  <font-awesome-icon :icon="['far', 'trash-can']" style="color: #FF0000;" />
                </AntdButton>
              </div>
            </template>
          </template>
        </AntdTable>
      </template>
    </Section>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, reactive, ref } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { notification } from "ant-design-vue";

const listSelect = ref<Array<string | number>>([]);
const idProductCategory = ref<string | number>("");
const idProduct = ref<string | number>("");
const titleModal = ref<string>("");
const isVisibleModalCreate = ref<boolean>(false);
const isVisibleModalConfirm = ref<boolean>(false);
const isVisibleModalInfo = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const columns = ref<Array<any>>([
  {
    title: "Mã sản phẩm",
    dataIndex: 'id',
    key: 'id',
    align: "left",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: 'name',
    align: "left",
  },
  {
    title: "Chủng loại",
    dataIndex: "nameCategory",
    key: 'nameCategory',
    align: "left",
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
    key: 'color',
    align: "left",
  },
  {
    title: "Ngày tạo",
    dataIndex: "dayCreated",
    key: 'dayCreated',
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
  type: null,
  color: null,
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0 && filterSearching?.type === null && filterSearching?.color === null);

const handleClearFilter = () => {
  filterSearching.keyword = "";
  filterSearching.type = null;
  filterSearching.color = null;
};

//handle product category
const handleSelectCategory = (item: any) => {
  idProductCategory.value = item.key;
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
  titleModal.value = "Thêm mới sản phẩm";
};

const handleEdit = (item: any) => {
  isVisibleModalCreate.value = true;
  isEdit.value = true;
  titleModal.value = "Cập nhật thông tin sản phẩm";
};

const handleView = (item: any) => {
  isVisibleModalInfo.value = true;
  isEdit.value = false;
  titleModal.value = "Thông tin sản phẩm";
};

const handleDeleteSingle = (id: string | number) => {
  idProduct.value = id;
  isVisibleModalConfirm.value = true;
  titleModal.value = "Bạn có chắc chắn muốn xóa sản phẩm này";
};

const disableDeleteMany = computed(() => listSelect?.value?.length === 0);

const handleDeleteMany = () => {
  isVisibleModalConfirm.value = true;
  titleModal.value = "Bạn có chắc chắn muốn xóa sản phẩm này";
};

const handleSubmit = (state: any) => {
  if (!isEdit.value) {
    console.log('create');
  } else {
    console.log('update');
  };

  notification['success']({
    message: translate('Success'),
  });
}
//data fake
const dataFake1 = [
  {
      id: "CL01",
      name: "Bàn phím",
      dateCreated: "01/01/2024",
      listProperty: ["Màu sắc", "Kích thước"],
  },
  {
      id: "CL02",
      name: "Chuột",
      dateCreated: "01/01/2024",
      listProperty: ["Màu sắc", "Kích thước"],
  },
  {
      id: "CL03",
      name: "Tai nghe",
      dateCreated: "01/01/2024",
      listProperty: ["Màu sắc", "Kích thước"],
  }
];


const dataFake2 = [
  {
    value: "Trắng",
    label: "Trắng",
  },
  {
    value: "Đen",
    label: "Đen",
  },
  {
    value: "Hồng",
    label: "Hồng",
  }
];

const dataFake3 = [
  {
      id: "CL01",
      name: "Bàn phím",
      dateCreated: "01/01/2024",
      listProperty: ["Màu sắc", "Kích thước"],
  },
  {
      id: "CL02",
      name: "Chuột",
      dateCreated: "01/01/2024",
      listProperty: ["Màu sắc", "Kích thước"],
  },
  {
      id: "CL03",
      name: "Tai nghe",
      dateCreated: "01/01/2024",
      listProperty: ["Màu sắc", "Kích thước"],
  }
];

const dataFake4 = [
  {
    id: "SP01",
    typeCategory: "CL01",
    nameCategory: "Bàn phím",
    name: "Bàn phím 1",
    dayCreated: "01/01/2024",
    color: "Trắng",
  },
  {
    id: "SP02",
    typeCategory: "CL01",
    nameCategory: "Bàn phím",
    name: "Bàn phím 2",
    dayCreated: "01/01/2024",
    color: "Trắng",
  },
  {
    id: "SP03",
    typeCategory: "CL01",
    nameCategory: "Bàn phím",
    name: "Bàn phím 3",
    dayCreated: "01/01/2024",
    color: "Đen",
  },
  {
    id: "SP04",
    typeCategory: "CL02",
    nameCategory: "Chuột",
    name: "Chuột 1",
    dayCreated: "01/01/2024",
    color: "Đen",
  },
  {
    id: "SP05",
    typeCategory: "CL02",
    nameCategory: "Chuột",
    name: "Chuột 2",
    dayCreated: "01/01/2024",
    color: "xám",
  },
  {
    id: "SP06",
    typeCategory: "CL03",
    nameCategory: "Tai nghe",
    name: "Tai nghe 1",
    dayCreated: "01/01/2024",
    color: "xám",
  }
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

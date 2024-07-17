<template>
  <SectionBreadcrumb :list="listBreadCrumb" />

  <div class="name-page">{{ translate("warehouse.infor") }}</div>

  <Section :title="translate('warehouse.list')" :subTitle="translate('warehouse.number')" :number="10">
    <template #action>
      <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-4">
        <a-button type="primary" danger :disabled="disabledDeleteBtn" @click="handleDelete(listSelected)">
          <font-awesome-icon :icon="['fas', 'trash']" />
          <span class="tw-ml-3">
            {{translate("common.delete")}} 
            <span v-if="listSelected?.length > 0">({{ listSelected?.length }})</span>
          </span>
        </a-button>
        <a-button @click="handleImportFile">
          <div class="tw-h-full tw-flex tw-items-center tw-gap-x-2">
            <dowloadIcon />
            {{ translate("common.importFile") }}
          </div>
        </a-button>
        <a-button type="primary" @click="handleAddnew">{{ translate("warehouse.addNew") }}</a-button>
      </div>
      <div class="tw-mt-4 tw-flex tw-items-center tw-gap-4">
        <div class="tw-text-sm tw-min-w-max">{{ translate("common.search") }}:</div>
        <a-input-search :placeholder="translate('warehouse.insertName')" v-model:value="filterSearching"/>
      </div>
    </template>

    <template #content>
      <AntdTable
        :columns="columns"
        :dataSource="khoHang"
        :hasCheckbox="true"
        :currentPage="currentPage"
        :isPagination="true"
        :isLoading="loadTable"
        keyField="code"
        @onChange="onChangeTable"
        @onSelected="handleSelectRows"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'action' && record">
            <div class="action">
              <a-button class="action-btn" :type="'light-hover'" shape="circle"  @click="handleEditInfo(record)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001f3f" />
              </a-button>
              <a-button class="action-btn" :type="'light-hover'" shape="circle" @click="handleDelete(record)">
                <font-awesome-icon :icon="['far', 'trash-can']" style="color: #ff0000" />
              </a-button>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>

  <!-- modal -->
  <ModalAddNew :isVisible="isVisibleModalAddNew" :titleModal="titleModal" :form="formState" :isEdit="isEditInfo" @onCancel="onCancel"/>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import SectionBreadcrumb from "@/components/section-breadcrumb/index.vue";
import { computed, defineAsyncComponent, reactive, ref, watch } from "vue";
import Section from "@/components/section/index.vue";
import dowloadIcon from "@/components/icons/dowloadIcon.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { Modal, notification } from "ant-design-vue";
import { checkDeleteItem } from "@/utils/common";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "vue-debounce";

const store = useStore();
const route = useRoute();
const router = useRouter();

const ModalAddNew = defineAsyncComponent(() => import("./components/modalAddNew.vue"));

const listBreadCrumb = ref<any>([
  {
    title: translate("warehouse.infor"),
    url: "/warehouse-information",
  },
]);

const columns = ref<any[]>([
  {
    title: translate("warehouse.code"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("warehouse.name"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("warehouse.address"),
    dataIndex: "address",
    key: "address",
    align: "left",
  },
  {
    title: translate("warehouse.staffCharge"),
    dataIndex: "staffName",
    key: "staffName",
    aligin: "left",
  },
  {
    title: translate("DateCreated"),
    dataIndex: "timeCreate",
    key: "timeCreate",
    aligin: "left",
  },
  {
    dataIndex: "action",
    key: "action",
    width: 80,
    align: "center",
    fixed: "right",
  },
]);

const currentPage = ref<number>(1);
const loadTable = ref<boolean>(false);
const listSelected = ref<any[]>([]);

const onChangeTable = (data: any) => {
  currentPage.value = data.current;
};

const handleSelectRows = (rows: any) => {
  listSelected.value = rows.value.map((x: any) => ({ code: x?.code }));
};

const disabledDeleteBtn = computed(() => listSelected?.value?.length == 0);

watch(
  () => currentPage.value,
  (newVal, oldVal) => {
    if (newVal != oldVal) {
      console.log("change page");
    }
  },
);

const isVisibleModalAddNew = ref<boolean>(false);
const titleModal = ref<string>("");
const isEditInfo = ref<boolean>(false);

interface FormState {
  code: string, name: string, address: string, staffId: number
}

const formState = reactive<FormState>({
  code: "",
  name: "",
  address: "",
  staffId: null,
})

const handleAddnew = () => {
  isVisibleModalAddNew.value = true;
  titleModal.value = translate("warehouse.addNew");
  formState.code = "";
  formState.name = "";
  formState.address = "";
  formState.staffId = null;
};

const handleImportFile = () => {
  notification["info"]({
    message: "Chức năng đang trong giai đoạn phát triển",
  });
};

const handleEditInfo = (data: FormState) => {
  isEditInfo.value = true;
  isVisibleModalAddNew.value = true;
  titleModal.value = translate("common.edit");
  formState.code = data?.code;
  formState.name = data?.name;
  formState.address = data?.address;
  formState.staffId = data?.staffId;
};

const onCancel = () => {
  isVisibleModalAddNew.value = false;
  isEditInfo.value = false;
};

const handleDelete = async (itemDelete: any) => {
  Modal.confirm({
    title: translate(itemDelete.length > 1 ? "confirm.many" : "confirm.one", "warehouse.title"),
    content: translate("NoDataRestore"),
    okText: translate("Agree"),
    cancelText: translate("Cancel"),
    centered: true,
    async onOk() {
      handleDeleted(itemDelete);
    },
    onCancel() {},
  });
};

const handleDeleted = async (itemDelete: any) => {
  if (checkDeleteItem(itemDelete)) {
    if (itemDelete.length > 1) {
      const temp = itemDelete.map((x: any) => x?.id);
      // await store.dispatch("warehouse/deleteWarehouse", {
      //   state: temp,
      //   params: {
      //     ...route.query,
      //   },
      // });
    } else {
      // await store.dispatch("warehouse/deleteWarehouse", {
      //   state: [itemDelete.id],
      //   params: {
      //     ...route.query,
      //   },
      // });
    }
    listSelected.value = [];
    notification["success"]({
      message: translate("noti.deleteSuccess"),
    });
  } else {
    notification["error"]({
      message: translate("noti.deleteWarehouseFail"),
    });
  }
}

const filterSearching = ref<string>("");

watch(
  () => filterSearching.value,
  debounce((val) => {
    console.log(val);
  }, 500)
)

const khoHang = [
  { code: "KH001", name: "Kho A", address: "123 ABC Street", staffName: "John Doe", timeCreate: "2024-07-12" },
  { code: "KH002", name: "Kho B", address: "456 XYZ Avenue", staffName: "Jane Smith", timeCreate: "2024-07-11" },
  { code: "KH003", name: "Kho C", address: "789 QRS Road", staffName: "Michael Brown", timeCreate: "2024-07-10" },
  { code: "KH004", name: "Kho D", address: "321 LMN Lane", staffName: "Emily Johnson", timeCreate: "2024-07-09" },
  { code: "KH005", name: "Kho E", address: "654 UVW Boulevard", staffName: "David Wilson", timeCreate: "2024-07-08" },
  { code: "KH006", name: "Kho F", address: "987 RST Avenue", staffName: "Sarah Garcia", timeCreate: "2024-07-07" },
  { code: "KH007", name: "Kho G", address: "741 PQR Street", staffName: "Christopher Martinez", timeCreate: "2024-07-06" },
  { code: "KH008", name: "Kho H", address: "852 JKL Road", staffName: "Amanda Robinson", timeCreate: "2024-07-05" },
  { code: "KH009", name: "Kho I", address: "963 GHI Lane", staffName: "Matthew Clark", timeCreate: "2024-07-04" },
  {  code: "KH010", name: "Kho J", address: "159 DEF Boulevard", staffName: "Jessica Lewis", timeCreate: "2024-07-03" },
  {  code: "KH011", name: "Kho K", address: "357 WXY Avenue", staffName: "Daniel Walker", timeCreate: "2024-07-02" },
  {  code: "KH012", name: "Kho L", address: "258 NOP Street", staffName: "Ashley Hall", timeCreate: "2024-07-01" },
  {  code: "KH013", name: "Kho M", address: "753 BCD Road", staffName: "Kevin Young", timeCreate: "2024-06-30" },
  {  code: "KH014", name: "Kho N", address: "456 EFG Lane", staffName: "Michelle King", timeCreate: "2024-06-29" },
  {  code: "KH015", name: "Kho O", address: "987 HIJ Boulevard", staffName: "Robert Hernandez", timeCreate: "2024-06-28" },
  {  code: "KH016", name: "Kho P", address: "654 QWE Avenue", staffName: "Jennifer Moore", timeCreate: "2024-06-27" },
  {  code: "KH017", name: "Kho Q", address: "321 ZXC Street", staffName: "William Green", timeCreate: "2024-06-26" },
  {  code: "KH018", name: "Kho R", address: "852 TYU Road", staffName: "Linda Taylor", timeCreate: "2024-06-25" },
  {  code: "KH019", name: "Kho S", address: "963 VBN Lane", staffName: "Richard Martinez", timeCreate: "2024-06-24" },
  {  code: "KH020", name: "Kho T", address: "741 KLM Boulevard", staffName: "Karen Garcia", timeCreate: "2024-06-23" },
  {  code: "KH021", name: "Kho U", address: "852 PQR Avenue", staffName: "Mark Johnson", timeCreate: "2024-06-22" },
  {  code: "KH022", name: "Kho V", address: "963 STU Street", staffName: "Patricia Martinez", timeCreate: "2024-06-21" },
  {  code: "KH023", name: "Kho W", address: "357 WER Road", staffName: "Steven Davis", timeCreate: "2024-06-20" },
  {  code: "KH024", name: "Kho X", address: "258 YUI Lane", staffName: "Susan Rodriguez", timeCreate: "2024-06-19" },
  {  code: "KH025", name: "Kho Y", address: "159 FGH Boulevard", staffName: "Brian Thompson", timeCreate: "2024-06-18" },
  {  code: "KH026", name: "Kho Z", address: "456 JKL Avenue", staffName: "Dorothy Scott", timeCreate: "2024-06-17" },
  {  code: "KH027", name: "Kho AA", address: "987 MNO Street", staffName: "Edward Walker", timeCreate: "2024-06-16" },
  {  code: "KH028", name: "Kho BB", address: "741 PQS Road", staffName: "Lisa Hill", timeCreate: "2024-06-15" },
  {  code: "KH029", name: "Kho CC", address: "852 TUV Lane", staffName: "Jason Perez", timeCreate: "2024-06-14" },
  {  code: "KH030", name: "Kho DD", address: "963 WXY Boulevard", staffName: "Angela Young", timeCreate: "2024-06-13" },
];
</script>

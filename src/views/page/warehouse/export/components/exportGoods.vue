<template>
  <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="translate('ExportGoods')" @back="() => router.push({ path: '/warehouse-export' })" />
  <a-row :gutter="24">
    <a-col :span="6">
      <a-card class="bg-white" title="Thông tin chung" :bordered="false">
        <a-form layout="vertical">
          <a-form-item label="Mã phiếu xuất" required>
            <a-input v-model:value="formExport.code" placeholder="Mã phiếu xuất" />
          </a-form-item>
          <a-form-item label="Kho xuất" required>
            <a-select v-model:value="formExport.warehouseId" placeholder="Kho xuất" :options="warehouses" />
          </a-form-item>
          <a-form-item :label="translate('StaffCharge')" required>
            <a-select v-model:value="formExport.staffId" :placeholder="translate('Search')" :options="personnel" />
          </a-form-item>
        </a-form>
      </a-card>
      <a-card class="mt-6 bg-white" title="Bộ lọc" :bordered="false">
        <a-form layout="vertical">
          <a-form-item :label="translate('Supplier')">
            <a-select :placeholder="translate('Search')" v-model:value="filterSearching.supplierId" :options="suppliers" />
          </a-form-item>
          <a-form-item :label="translate('Category')">
            <a-select :placeholder="translate('Search')" v-model:value="filterSearching.categoryId" :options="categories" />
          </a-form-item>
          <a-form-item :label="translate('ProductClassify')">
            <a-select :placeholder="translate('Search')" v-model:value="filterSearching.classifyId" :options="classifies" />
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
    <a-col :span="12">
      <div class="bg-white rounded-xl p-4">
        <a-select class="w-full mb-6" v-model:value="detailExport.productId" placeholder="Sản phẩm" :options="products.map(x => ({value: x?.Id, label: x?.Name}))" @select="handelSelectProcut"/>
        <div>
          <a-card v-for="(item, index) in formExport.detail" :key="index" size="small" class="mb-4">
            <div class="flex justify-between items-end">
              <a-card-meta :title="item.name" :description="`${translate('UnitPrice')}: ${item.price}`" />
              <a-input-number v-model="item.quantity" @change="updateTotal(item, index)" :placeholder="translate('Quantity')" />
              <p>{{ item.total }}</p>
              <a-button type="text" danger  @click="handleRemoveProduct(index)">{{ translate('Delete') }}</a-button>
            </div>
          </a-card>
        </div>
      </div>
    </a-col>
    <a-col :span="6">
      <a-card class="bg-white" title="Thông tin khách hàng" :bordered="false">
        <template #extra>
          <AntdButton :type="'primary'" @click="handleCreateCustomer">
            <template #icon>
              <font-awesome-icon :icon="['fas', 'plus']" />
            </template>
            <span class="text-sm ml-2">{{ translate("AddNew") }}</span>
          </AntdButton>
        </template>
        <a-form layout="vertical">
          <a-form-item label="Số điện thoại">
            <a-select show-search v-model:value="formExport.customerId" placeholder="Số điện thoại" :options="customers" @search="handleSearchCus"/>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card class="bg-white my-6" title="Hóa đơn">
        <p>Tổng tiền khách phải trả:  {{totalAmount}}</p>
      </a-card>

      <a-button type="primary" class="w-full" @click="handleSubmit">{{ translate('ExportGoods') }}</a-button>
    </a-col>
  </a-row>

  <AddNewCustomer :is-visible="visibleModalCustomer" :form="customerForm" @close-modal="closeModal" @handle-submit="handleSubmitCustomer" />
</template>

<script setup lang="ts">
import { translate } from "@/languages/i18n";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import AntdButton from "@/components/antd-button/index.vue";
import ConstantAPI from "@/services/ConstantAPI";
import { DataService } from "@/services/request";
import { debounce } from "lodash";

const AddNewCustomer = defineAsyncComponent(() => import("./addNewCustomer.vue"));

const store = useStore();
const route = useRoute();
const router = useRouter();

const warehouses = computed(() => {
  const result = store.getters["warehouse/warehouseInfo"];
  return result.map((x) => ({ label: x.Code, value: x.Id }));
});
const suppliers = computed(() => {
  const result = store.getters["producer/producerData"];
  return result.filter((x) => x?.IsCollab === true).map((x) => ({ label: x?.Code, value: x?.Id }));
});
const personnel = computed(() => {
  const result = store.getters["personnel/personnelData"];
  return result.filter((x) => x?.Status === "ACTIVE").map((x) => ({ label: x?.Name, value: x?.Id }));
});
const categories = computed(() => {
  const result = store.getters["category/categoryData"];
  return result.filter((item: any) => item.IsRestock === true && item.WarehouseId === formExport.warehouseId).map((item: any) => ({ label: item.Code, value: item.Id }));
});
const classifies = computed(() => {
  const result = store.getters["classify/classifyData"];
  return result
    .filter((x) => x?.IsRestock === true && x?.CategoryId === filterSearching.categoryId && x?.WarehouseId === formExport.warehouseId)
    .map((x) => ({ label: x?.Code, value: x?.Id }));
});
const products = computed(() => store.getters["product/productData"]);

const filterSearching = reactive({
  name: "",
  code: "",
  warehouseId: null,
  supplierId: null,
  categoryId: null,
  classifyId: null,
  status: null,
});

watch(
  filterSearching,
  debounce((val) => {
    fetchDataProduct(val);
  }, 500),
  { deep: true }
);

const detailExport = reactive({
  productId: null,
  quantity: 0,
  price: 0,
  total: 0,
  name: ''
});

const formExport = reactive({
  code: "",
  customerId: null,
  warehouseId: null,
  staffId: null,
  total: 0,
  discount: null,
  detail: [],
});

const customerForm = reactive({
  phone: "",
  name: "",
  address: "",
  email: "",
  warehouseId: null,
});
const visibleModalCustomer = ref<boolean>(false);

const handleCreateCustomer = () => {
  visibleModalCustomer.value = true;
  customerForm.warehouseId = formExport.warehouseId;
};

const handleSubmitCustomer = async (state) => {
  const result = await DataService.post("customers", state, {});
  closeModal();
};

const customers = ref<any>([]);

const handleSearchCus = debounce(async (val: string) => {
  const resultCus = await DataService.get("customers", {keyword: val}, {});
  customers.value = resultCus.data.map(x => ({ label: x.Name, value: x.Id }));
}, 300);

const fetchDataCustomer = async () => {
  const resultCus = await DataService.get("customers", null, {});
  customers.value = resultCus.data.map(x => ({ label: x.Name, value: x.Id }));
};

const closeModal = () => {
  visibleModalCustomer.value = false;
};

const handelSelectProcut = (val) => {
  detailExport.productId = val; 
  detailExport.name = products.value.find(x => x.Id === val)?.Name;
  detailExport.price = products.value.find(x => x.Id === val)?.Price;
  const existingIndex = formExport.detail.findIndex((x) => x.productId === val);
  if (existingIndex !== -1) {
    detailExport.quantity = formExport.detail[existingIndex].quantity;
    detailExport.price = formExport.detail[existingIndex].price;
  } else {
    formExport.detail.push({ ...detailExport });
  }
}

const handleRemoveProduct = (index) => {
  formExport.detail.splice(index, 1);
};

const updateTotal = (item, idx) => {
  formExport.detail[idx].total = item.quantity * item.price;

};

const totalAmount = computed(() => {
  return formExport.detail.reduce((acc, item) => acc + item.total, 0);
});

const handleSubmit = async () => {

}

const fetchDataFilter = async () => {
  await Promise.all([
    store.dispatch("producer/getSupplier", null),
    store.dispatch("category/getCategory", null),
    store.dispatch("classify/getClassify", null),
    store.dispatch("warehouse/getWarehouse", null),
    store.dispatch("personnel/getPersonnel", null),
  ]);
};

const fetchDataProduct = async (params) => {
  await store.dispatch("product/getProduct", params);
};

onMounted(async () => {
  await fetchDataFilter();
  await fetchDataProduct(null);
  await fetchDataCustomer();
});
</script>

<style lang="scss" scoped></style>

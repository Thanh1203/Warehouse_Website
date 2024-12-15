<template>
  <BaseModal :width="'1000px'" :visible="isVisible" :title="titleModal" @cancel="$emit('closeModal')" style="top: 20px">
    <a-form class="mb-6" :labelCol="{ span: 5 }">
      <a-form-item :label="translate('GoodsReceiptCode')" required>
        <a-input :placeholder="translate('GoodsReceiptCode')" v-model:value="v$.code.$model" :status="v$.code.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="GoodsReceiptCode" :validator="v$.code.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Supplier')" required>
        <a-select :placeholder="translate('Supplier')" :options="suppliers" v-model:value="v$.supplierId.$model" :status="v$.supplierId.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="Supplier" :validator="v$.supplierId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Warehouse')" required>
        <a-select
          :placeholder="translate('Warehouse')"
          :options="warehouses"
          v-model:value="v$.warehouseId.$model"
          :status="v$.warehouseId.$error ? 'error' : ''"
        />
        <ErrorMess :params="[64]" title="Warehouse" :validator="v$.warehouseId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('StaffCharge')" required>
        <a-select :placeholder="translate('StaffCharge')" :options="personnels" v-model:value="v$.staffId.$model" :status="v$.staffId.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="StaffCharge" :validator="v$.staffId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('ProductCode')" required>
        <a-select
          :placeholder="translate('ProductCode')"
          v-model:value="vDetail$.productId.$model"
          :options="products.map((x) => ({ label: x?.Code, value: x?.Id }))"
          :status="vDetail$.quantity.$error ? 'error' : ''"
        />
        <ErrorMess :params="[64]" title="ProductCode" :validator="vDetail$.productId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Quantity')" required>
        <a-input-number class="w-full" :placeholder="translate('Quantity')" v-model:value="vDetail$.quantity.$model" :status="vDetail$.quantity.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="Quantity" :validator="vDetail$.quantity.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('UnitPrice')" required>
        <a-input-number class="w-full" :placeholder="translate('UnitPrice')" v-model:value="vDetail$.price.$model" :status="vDetail$.price.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="UnitPrice" :validator="vDetail$.price.$error[0]?.$validator" />
      </a-form-item>
    </a-form>
    <div class="flex justify-end">
      <a-button type="primary" @click="handleAddProduct">{{ translate('AddToList') }}</a-button>
    </div>
    <a-divider />
    <div class="flex flex-col gap-4">
      <a-card v-for="(item, index) in state.detail" :key="index" size="small">
        <div class="flex justify-between items-end">
          <a-card-meta :title="item.code" :description="`${translate('Quantity')}: ${item.quantity} - ${translate('UnitPrice')}: ${item.price} - ${translate('common.totalAmount')}: ${item.total}`" />
          <a-button type="text" danger  @click="handleRemoveProduct(index)">{{ translate('Delete') }}</a-button>
        </div>
      </a-card>
    </div>
    <div class="flex justify-end mt-4 text-lg gap-4">
      <span>
        {{ translate("common.moneyToPay") }}:
      </span>
        <span>{{ sumTotalOrder }}</span>
      </div>
    <template #footer>
      <AntdButton :type="'primary'" @click="handleSubmit()" class="mt-6">
        <template #icon>
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
        </template>
        <span class="ml-2 text-sm">{{ translate("Save") }}</span>
      </AntdButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import AntdButton from "@/components/antd-button/index.vue";
import { minValue, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ErrorMess from "@/components/error-mess/index.vue";
import { notification } from "ant-design-vue";

const emit = defineEmits(["closeModal"]);

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  titleModal: {
    type: String,
    required: true,
  },
});

const store = useStore();

const detailState = reactive({
  productId: null,
  code: null,
  quantity: 0,
  price: 0,
  total: 0,
  status: "RECEIVED",
});

const state = reactive({
  supplierId: null,
  warehouseId: [],
  staffId: null,
  status: "RECEIVED",
  total: 0,
  detail: [],
  code: null,
});

const rules = {
  supplierId: { required },
  warehouseId: { required },
  staffId: { required },
  status: {},
  total: {},
  detail: { required, $each: {} },
  code: { required },
};

const detailRules = {
  productId: { required },
  quantity: { required, minValue: minValue(1) },
  price: { required, minValue: minValue(1) },
  total: {},
  status: {},
};

const v$ = useVuelidate(rules, state);
const vDetail$ = useVuelidate(detailRules, detailState);

const suppliers = computed(() => {
  const result = store.getters["producer/producerData"];
  return result.filter((x) => x?.IsCollab === true).map((x) => ({ label: x?.Code, value: x?.Id }));
});
const warehouses = computed(() => {
  const result = store.getters["warehouse/warehouseInfo"];
  return result.map((x) => ({ label: x?.Code, value: x?.Id }));
});
const personnels = computed(() => {
  const result = store.getters["personnel/personnelData"];
  return result.map((x) => ({ label: x?.Name, value: x?.Id }));
});
const products = computed(() => {
  const result = store.getters["product/productData"];
  return result.filter((x) => x?.SupplierId === state.supplierId && x?.WarehouseId === state.warehouseId);
});
const sumTotal = computed(() => {
  return detailState.price * detailState.quantity;
});
const sumTotalOrder = computed(() => {
  return state.detail.reduce((acc, cur) => acc + cur.total, 0);
});

const handleAddProduct = async () => {
  vDetail$.value.$touch();
  if (vDetail$.value.$invalid) {
    return false;
  }
  detailState.total = sumTotal.value;
  detailState.code = products.value.find((x) => x?.Id === detailState.productId)?.Code;
  const existingIndex = state.detail.findIndex((item) => item.productId === detailState.productId);
  if (existingIndex !== -1) {
    state.detail[existingIndex] = { ...detailState };
  } else {
    state.detail.push({ ...detailState });
  }
};

const handleRemoveProduct = (index) => {
  state.detail.splice(index, 1);
};

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  const data = {
    ...state,
    total: sumTotalOrder.value,
  };
  const result = await store.dispatch("warehouse/insertGoods", data);
  if (result.statusText === "Created") {
    notification["success"]({
      message: translate("noti.createSuccess"),
    });
  } else {
    notification["error"]({
      message: translate("noti.createFail"),
    });
  }
  emit("closeModal");
};
</script>

<style scoped></style>
style

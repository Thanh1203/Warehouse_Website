<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <a-form class="mb-6" model="horizontal" :labelCol="{span: 5}">
      <a-form-item :label="translate('ClassificationCode')" required>
        <a-input :placeholder="translate('ClassificationCode')" :status="v$.code.$error ? 'error' : ''" v-model:value="v$.code.$model"/>
        <ErrorMess :params="[64]" title="ClassificationCode" :validator="v$.code.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('ClassificationName')" required>
        <a-input :placeholder="translate('ClassificationName')" :status="v$.name.$error ? 'error' : ''" v-model:value="v$.name.$model"/>
        <ErrorMess :params="[64]" title="ClassificationName" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Warehouse')" required>
        <a-select :placeholder="translate('SelectWarehouse')" v-model:value="v$.warehouseId.$model" :options="warehouses"/>
        <ErrorMess :params="[64]" title="Warehouse" :validator="v$.warehouseId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Supplier')" required>
        <a-select :placeholder="translate('SelectSupplier')" v-model:value="v$.supplierId.$model" :options="suppliers"/>
        <ErrorMess :params="[64]" title="Supplier" :validator="v$.supplierId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Category')" required>
        <a-select :placeholder="translate('SelectCategory')" v-model:value="v$.categoryId.$model" :options="categories"/>
        <ErrorMess :params="[64]" title="Category" :validator="v$.categoryId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('common.Status')">
        <a-radio-group v-model:value="v$.isRestock.$model" required>
          <a-radio :value="true">{{ translate("common.active")}}</a-radio>
          <a-radio :value="false">{{ translate("common.deactive") }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <template #footer>
      <AntdButton :type="'primary'" @click="handleSubmit">
        <template #icon>
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
        </template>
        <span class="ml-2 text-sm">{{ translate("Save") }}</span>
      </AntdButton>
    </template>
  </BaseModal>
</template>
<script lang="ts" setup>
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";
import { computed, reactive, watch } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ErrorMess from "@/components/error-mess/index.vue";
import { useStore } from "vuex";

const emit = defineEmits(["closeModal", "handleSubmit"]);
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  isEdit: {
    type: Boolean,
    required: true,
  },
  titleModal: {
    type: String,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});
const store = useStore();

const state = reactive({
  id: props.form?.id,
  code: props.form?.code,
  name: props.form?.name,
  warehouseId: props.form?.warehouseId,
  supplierId: props.form?.supplierId,
  categoryId: props.form?.categoryId,
  isRestock: props.form?.isRestock,
});

const rules = {
  code: { required },
  name: { required },
  warehouseId: { required },
  supplierId: { required },
  categoryId: { required },
  isRestock: {},
};

const v$ = useVuelidate(rules, state);

const warehouses = computed(() => {
  const result = store.getters["warehouse/warehouseInfo"]
  return result.map((item: any) => ({ label: item.Code, value: item.Id }));
});
const suppliers = computed(() => {
  const result = store.getters["producer/producerData"];
  return result.filter((item: any) => item.IsCollab === true).map((item: any) => ({ label: item.Code, value: item.Id }));
});
const categories = computed(() => {
  const result = store.getters["category/categoryData"];
  return result.filter((item: any) => item.IsRestock === true && item.WarehouseId === state.warehouseId).map((item: any) => ({ label: item.Code, value: item.Id }));
});

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  try {
    emit("handleSubmit", state);
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (state.id = val.id), (state.code = val.code), (state.name = val.name), (state.warehouseId = val.warehouseId), (state.supplierId = val.supplierId), (state.categoryId = val.categoryId), (state.isRestock = val.isRestock);
  },
  {
    deep: true,
  },
);
</script>

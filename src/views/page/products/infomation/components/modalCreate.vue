<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')" style="top: 20px">
    <a-form class="mb-6" :model="state" :labelCol="{span: 5}"> 
      <a-form-item :label="translate('ProductCode')" required>
        <a-input :placeholder="translate('ProductCode')" :status="v$.code.$error ? 'error' : ''" :disabled="isEdit" class="mt-2" v-model:value="v$.code.$model" />
        <ErrorMess :params="[64]" title="ProductCode" :validator="v$.code.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('ProductName')" required>
        <a-input :placeholder="translate('ProductName')" class="mt-2" v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="ProductName" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Supplier')" required>
        <a-select
          :placeholder="translate('Supplier')"
          class="mt-2 w-full"
          v-model:value="v$.supplierId.$model"
          :options="suppliers"
          :status="v$.supplierId.$error ? 'error' : ''"
        />
        <ErrorMess :params="[64]" title="Supplier" :validator="v$.supplierId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Warehouse')" required>
        <a-select
          :placeholder="translate('Warehouse')"
          class="mt-2 w-full"
          v-model:value="v$.warehouseId.$model"
          :options="warehouses"
          :status="v$.warehouseId.$error ? 'error' : ''"
        />
        <ErrorMess :params="[64]" title="Warehouse" :validator="v$.warehouseId.$errors[0]?.$validator" />

      </a-form-item>
      <a-form-item :label="translate('ProductCategory')" required>
        <a-select
          :placeholder="translate('ProductCategory')"
          class="mt-2 w-full"
          v-model:value="v$.categoryId.$model"
          :options="categories"
          :status="v$.categoryId.$error ? 'error' : ''"
        />
        <ErrorMess :params="[64]" title="ProductCategory" :validator="v$.categoryId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Classify')" required>
        <a-select
          :placeholder="translate('Classify')"
          class="mt-2 w-full"
          v-model:value="v$.classifyId.$model"
          :options="classifies"
          :status="v$.classifyId.$error ? 'error' : ''"
        />
        <ErrorMess :params="[64]" title="Classify" :validator="v$.classifyId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Size')">
        <a-input :placeholder="translate('Size')" class="mt-2" v-model:value="v$.Size.$model" />
      </a-form-item>
      <a-form-item :label="translate('Material')">
        <a-input :placeholder="translate('Material')" class="mt-2" v-model:value="v$.Material.$model" />
      </a-form-item>
      <a-form-item :label="translate('Color')">
        <a-input :placeholder="translate('Color')" class="mt-2" v-model:value="v$.Color.$model" />
      </a-form-item>
      <a-form-item :label="translate('Designs')">
        <a-input :placeholder="translate('Designs')" class="mt-2 w-full" v-model:value="v$.Designs.$model" />
      </a-form-item>
      <a-form-item :label="translate('common.Status')">
        <a-radio-group v-model:value="v$.status.$model">
          <a-radio value="ACTIVE">{{ translate("common.active")}}</a-radio>
          <a-radio value="DEACTIVE">{{ translate("common.deactive") }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="translate('Describe')">
        <a-textarea class="w-full" :showCount="true" :maxlength="100" :auto-size="{ minRows: 3 }" :placeholder="translate('Describe')" v-model:value="v$.Describe.$model" />
      </a-form-item>
    </a-form>
    <template #footer>
      <AntdButton :type="'primary'" @click="handleSubmit()">
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
import AntdButton from "@/components/antd-button/index.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { computed, onMounted, reactive, watch } from "vue";
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

const rules = {
  code: {
    required,
  },
  name: {
    required,
  },
  warehouseId: {
    required,
  },
  categoryId: {
    required,
  },
  classifyId: {
    required,
  },
  supplierId: {
    required,
  },
  Size: {},
  Material: {},
  Color: {},
  Designs: {},
  Describe: {},
  status: {}
};

const state = reactive({
  id: props.form?.id,
  code: props.form?.code,
  name: props.form?.name,
  categoryId: props.form?.categoryId,
  classifyId: props.form?.classifyId,
  supplierId: props.form?.supplierId,
  warehouseId: props.form?.warehouseId,
  Size: props.form?.size,
  Material: props.form?.material,
  Color: props.form?.color,
  Designs: props.form?.designs,
  Describe: props.form?.describe,
  status: props?.form?.status,
});

const v$ = useVuelidate(rules, state);

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

const store = useStore();

const suppliers = computed(() => {
  const result = store.getters["producer/producerData"];
  return result.filter(x => x?.IsCollab === true).map(x => ({ label: x?.Code, value: x?.Id }));
});
const warehouses = computed(() => {
  const result = store.getters["warehouse/warehouseInfo"];
  return result.map(x => ({ label: x?.Code, value: x?.Id }));
})
const categories = computed(() => {
  const result = store.getters["category/categoryData"];
  return result.filter(x => x?.IsRestock === true && x?.SupplierId === state.supplierId && x?.WarehouseId === state.warehouseId).map(x => ({ label: x?.Code, value: x?.Id })); 
});
const classifies = computed(() => {
  const result = store.getters["classify/classifyData"];
  return result.filter(x => x?.IsRestock === true && x?.CategoryId === state.categoryId && x?.WarehouseId === state.warehouseId).map(x => ({ label: x?.Code, value: x?.Id }));
});

watch(() => [state.supplierId, state.warehouseId], () => {
  state.categoryId = null;
  state.classifyId = null;
}, {deep: true});

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (state.code = val.code),
      (state.name = val.name),
      (state.categoryId = val.categoryId),
      (state.classifyId = val.classifyId),
      (state.supplierId = val.supplierId),
      (state.warehouseId = val.warehouseId),
      (state.Size = val.size),
      (state.Material = val.material),
      (state.Color = val.color),
      (state.Designs = val.designs),
      (state.Describe = val.describe),
      (state.status = val.status),
      (state.id = val.id);
  },
  {
    deep: true,
  },
);
</script>

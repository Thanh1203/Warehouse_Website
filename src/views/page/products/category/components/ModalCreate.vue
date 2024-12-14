<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" :maskClosable="false" @cancel="$emit('closeModal')">
    <a-form class="w-full mb-6" model="horizontal" :labelCol="{span: 5}">
      <a-form-item :label="translate('CategoryCode')" required>
        <a-input v-model:value="v$.code.$model" :status="v$.code.$error ? 'error' : ''" :placeholder="translate('CategoryCode')" :disabled="isEdit" />
        <ErrorMess :params="[64]" title="CategoryCode" :validator="v$.code.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('CategoryName')" required>
        <a-input v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" :placeholder="translate('CategoryName')" />
        <ErrorMess :params="[64]" title="CategoryName" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Supplier')" required>
        <a-select class="w-1/6" :placeholder="translate('SelectSupplier')" v-model:value="v$.supplierId.$model"  :options="suppliers.map(x => ({value: x.Id, label: x.Name}))"/>
        <ErrorMess :params="[64]" title="Supplier" :validator="v$.supplierId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Warehouse')" required>
        <a-select class="w-1/6" :placeholder="translate('SelectWarehouse')" v-model:value="v$.warehouseId.$model" :options="warehouses.map(x => ({ value: x.Id, label: x.Name }))"/>
        <ErrorMess :params="[64]" title="Warehouse" :validator="v$.warehouseId.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('common.Status')">
        <a-radio-group v-model:value="v$.isRestock.$model">
          <a-radio :value="true">{{ translate("common.active")}}</a-radio>
          <a-radio :value="false">{{ translate("common.deactive") }}</a-radio>
        </a-radio-group>
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
<script lang="ts" setup>
import BaseModal from "@/components/antd-modal/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, defineAsyncComponent, reactive, computed, onMounted } from "vue";
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { DEFAULT_PROPERTY } from "@/constants";
import { useStore } from "vuex";

const emit = defineEmits(["closeModal", "handleSubmit"]);
const props = defineProps({
  isVisible: {
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
  isEdit: {
    type: Boolean,
    required: true,
  },
});
const store = useStore();

const formState = reactive<any>({
  id: props.form?.id,
  code: props.form?.code,
  name: props.form?.name,
  supplierId: props.form?.supplierId,
  warehouseId: props.form?.warehouseId,
  isRestock: props.form?.isRestock,
});

const rules = {
  code: {
    required,
  },
  name: {
    required,
  },
  supplierId: {
    required,
  },
  warehouseId: {
    required,
  },
  isRestock: {},
};

const v$ = useVuelidate(rules, formState);

const warehouses = computed(() => store.getters["warehouse/warehouseInfo"]);
const suppliers = computed(() => {
  const result =  store.getters["producer/producerData"];
  return result.filter((x) => x.IsCollab === true);
});

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  try {
    emit("handleSubmit", formState);
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (formState.id = val.id), (formState.code = val.code), (formState.name = val.name), (formState.supplierId = val.supplierId), (formState.warehouseId = val.warehouseId), (formState.isRestock = val.isRestock);
  },
  {
    deep: true,
  },
);
</script>

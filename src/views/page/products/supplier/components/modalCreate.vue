<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" :maskClosable="false" @cancel="$emit('closeModal')">
    <a-form class="mb-6" model="horizontal" :labelCol="{span: 5}">
      <a-form-item :label="translate('SupplierCode')" required class="!mb-4">
        <a-input :placeholder="translate('SupplierCode')" class="w-full" :status="v$.code.$error ? 'error' : ''" v-model:value="v$.code.$model" :disabled="isEdit"/>
        <ErrorMess :params="[64]" title="SupplierCode" :validator="v$.code.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('SupplierName')" required class="!mb-4">
        <a-input :placeholder="translate('SupplierName')" class="w-full" :status="v$.name.$error ? 'error' : ''" v-model:value="v$.name.$model" />
        <ErrorMess :params="[64]" title="SupplierName" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Origin')" required class="!mb-4">
        <a-input :placeholder="translate('Origin')" class="w-full" v-model:value="v$.origin.$model" />
      </a-form-item>
      <a-form-item v-if="isEdit" :label="translate('common.Status')" required>
        <a-radio-group v-model:value="v$.isCollab.$model">
          <a-radio :value="true">{{ translate("Cooperating")}}</a-radio>
          <a-radio :value="false">{{ translate("StopCollaborating") }}</a-radio>
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
<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import { reactive, watch } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ErrorMess from "@/components/error-mess/index.vue";
import { STR_UPPER_CASE } from "@/utils/common";

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

const formState = reactive({
  id: props?.form?.id,
  code: props?.form?.code,
  name: props?.form?.name,
  origin: props?.form?.origin,
  isCollab: props?.form?.isCollab,
});

const rules = {
  code: { required },
  name: { required },
  origin: {},
  isCollab: { required },
};

const v$ = useVuelidate(rules, formState);

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  const state = {
    id: formState.id,
    code: formState.code,
    name: formState.name,
    origin: STR_UPPER_CASE(formState.origin),
    isCollab : formState.isCollab,
  };
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
    (formState.code = val.code), (formState.name = val.name), (formState.origin = val.origin), (formState.isCollab = val.isCollab), (formState.id = val.id);
  },
  {
    deep: true
  },
);
</script>

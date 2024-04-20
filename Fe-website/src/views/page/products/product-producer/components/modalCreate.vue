<template>
  <BaseModal :width="'1000px'" :visible="isVisible" :title="titleModal" :defaultFooter="false" :maskClosable="false" @cancel="$emit('closeModal')">
    <a-form class="tw-w-full tw-mb-6">
      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-3 tw-flex tw-flex-col tw-items-start tw-justify-start">
          <span class="tw-mb-2">{{ translate("ManufacturerCode") }}<span class="required-star">*</span></span>
          <a-input :placeholder="translate('ManufacturerCode')" v-model:value="v$.code.$model" :status="v$.code.$error ? 'error' : ''" />
          <ErrorMess :params="[64]" :title="translate('ManufacturerCode')" :validator="v$.code.$errors[0]?.$validator" />
        </div>
        <div class="tw-basis-1/2 tw-ml-3 tw-flex tw-flex-col tw-items-start tw-justify-start">
          <span class="tw-mb-2">{{ translate("ManufacturerName") }}<span class="required-star">*</span></span>
          <a-input :placeholder="translate('ManufacturerName')" v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" />
          <ErrorMess :params="[64]" :title="translate('ManufacturerName')" :validator="v$.name.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-start">
        <div class="tw-basis-1/2 tw-mr-3 tw-flex tw-flex-col tw-items-start tw-justify-start">
          <span class="tw-mb-2">{{ translate("Origin") }}</span>
          <a-input :placeholder="translate('Origin')" v-model:value="v$.origin.$model" />
        </div>
        <div class="tw-basis-1/2 tw-ml-3"></div>
      </div>
    </a-form>
    <template #footer>
      <AntdButton :type="'primary'" @click="handleSubmit()">
        <template #icon>
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
        </template>
        <span class="tw-ml-2 tw-text-sm">{{ translate("Save") }}</span>
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
});

const formState = reactive({
  id: props?.form?.id,
  code: props?.form?.code,
  name: props?.form?.name,
  origin: props?.form?.origin,
  allowDelete: props?.form?.allowDelete,
});

const rules = {
  code: { required },
  name: { required },
  origin: {},
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
    allowDelete: formState.allowDelete,
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
    (formState.code = val.code), (formState.name = val.name), (formState.origin = val.origin), (formState.allowDelete = val.allowDelete), (formState.id = val.id);
  },
  {
    deep: true
  },
);
</script>

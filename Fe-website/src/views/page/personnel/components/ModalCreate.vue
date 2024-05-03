<template>
  <BaseModal :visible="isVisible" :title="title" :default-footer="false" @cancel="$emit('closeModal')">
    <a-form @submit.prevent="handleSubmit" class="tw-mb-6">

      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
          <span>{{ translate("EmployeeCode") }}<span class="required-star">*</span></span>
          <div class="tw-mt-2 tw-w-full">
            <a-input :disabled="isEdit" :placeholder="translate('EmployeeCode')" v-model:value="v$.code.$model" :status="v$.code.$error ? 'error' : ''" />
          </div>
          <ErrorMess :params="[64]" title="EmployeeCode" :validator="v$.code.$errors[0]?.$validator" />
        </div>
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-ml-4">
          <span>{{ translate("EmployeeName") }}<span class="required-star">*</span></span>
          <div class="tw-mt-2 tw-w-full">
            <a-input :placeholder="translate('EmployeeName')" v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" />
          </div>
          <ErrorMess title="EmployeeName" :validator="v$.name.$errors[0]?.$validator" />
        </div>
      </div>

      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
          <span>{{ translate("Role") }}<span class="required-star">*</span></span>
          <div class="tw-w-full tw-mt-2">
            <a-input :placeholder="translate('Role')" v-model:value="v$.role.$model" :status="v$.role.$error ? 'error' : ''" />
          </div>
          <ErrorMess title="Role" :validator="v$.role.$errors[0]?.$validator" />
        </div>

        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-ml-4">
          <span>{{ translate("Address") }}</span>
          <div class="tw-mt-2 tw-w-full">
            <a-input :placeholder="translate('Address')" v-model:value="v$.address.$model" />
          </div>
        </div>
      </div>

    </a-form>
    <template #footer>
      <AntdButton :type="'primary'" @click="handleSubmit">
        <template #icon>
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
        </template>
        <span class="tw-ml-2 tw-text-sm">{{ translate("Save") }}</span>
      </AntdButton>
    </template>
  </BaseModal>
</template>
<script lang="ts" setup>
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
  isEdit: {
    type: Boolean,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const state = reactive({
  id: props?.form?.id,
  code: props?.form?.code,
  name: props?.form?.name,
  role: props?.form?.role,
  address: props?.form?.address,
  companyId: props?.form?.companyId,
  allowDelete: props?.form?.allowDelete,
});

const rules = {
  code: {
    required,
    vi: function validateInput(input: string) {
      const regex = /^[a-zA-Z0-9\u00C0-\u1EF9\s]+$/;
      return regex.test(input);
    },
  },
  name: {
    required,
    vi: function validateInput(input: string) {
      const regex = /^[a-zA-Z0-9\u00C0-\u1EF9\s]+$/;
      return regex.test(input);
    },
  },
  address: {

  },
  role: {
    required,
  },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  console.log(state);
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  const stateResult = {
    id: state.id,
    code: state?.code,
    name: STR_UPPER_CASE(state?.name),
    role: STR_UPPER_CASE(state?.role),
    address: STR_UPPER_CASE(state?.address),
    companyId: state?.companyId,
    allowDelete: state?.allowDelete,
  }
  emit("handleSubmit", stateResult);
};

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (state.code = val.code), (state.name = val.name), (state.role = val.role), (state.address = val.address), (state.allowDelete = val.allowDelete), (state.id = val.id), (state.companyId = val.companyId);
  },
  {
    deep: true,
  },
);

// data fake
const datafake1 = [
  {
    id: 1,
    name: "Hà nội"
  }
]

const datafake2 = [
  {
    id: 1,
    name: "Kho hàng 1"
  }
]
</script>

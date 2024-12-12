<template>
  <BaseModal :visible="isVisible" :title="title" :default-footer="false" @cancel="$emit('closeModal')">
    {{ props.form.id }}
    <a-form :model="state" layout="vertical">
      <a-form-item class="!mb-2" :label="translate('EmployeeName')">
        <a-input v-model:value="v$.name.$model" :placeholder="translate('EnterEmployeeName')" :status="v$.name.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="EmployeeName" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item class="!mb-2" label="Email">
        <a-input v-model:value="v$.email.$model" :placeholder="translate('EnterEmail')" :status="v$.email.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="Email" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item class="!mb-2" :label="translate('PhoneNumber')">
        <a-input v-model:value="v$.phone.$model" :placeholder="translate('EnterPhoneNumber')" :status="v$.phone.$error ? 'error' : ''" />
        <ErrorMess :params="[64]" title="PhoneNumber" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item class="!mb-2" :label="translate('Address')">
        <a-input v-model:value="v$.address.$model" :placeholder="translate('EnterAddress')" />
      </a-form-item>
      <a-form-item class="!mb-2" :label="translate('Role')">
        <a-select v-model:value="v$.role.$model" :placeholder="translate('SelectRole')" :status="v$.role.$error ? 'error' : ''">
          <a-select-option value="Admin">{{ translate("common.admin") }}</a-select-option>
          <a-select-option value="Employee">{{ translate("common.employee") }}</a-select-option>
        </a-select>
        <ErrorMess :params="[64]" title="Role" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item class="!mb-2" :label="translate('PassWord')">
        <a-input-password v-model:value="v$.password.$model" :placeholder="translate('EnterPass')" />
      </a-form-item>
    </a-form>
    <template #footer>
      <AntdButton :type="'primary'" class="mt-4" @click="handleSubmit">
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
import AntdButton from "@/components/antd-button/index.vue";
import { reactive, watch } from "vue";
import { email, required } from "@vuelidate/validators";
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
  name: props?.form?.name,
  email: props?.form?.email,
  phone: props?.form?.phone,
  role: props?.form?.role || null,
  address: props?.form?.address,
  password: props?.form?.password || "admin",
  status: props?.form?.status,
});

const rules = {
  name: {
    required,
    vi: function validateInput(input: string) {
      const regex = /^[a-zA-Z0-9\u00C0-\u1EF9\s]+$/;
      return regex.test(input);
    },
  },
  email: {
    required,
    email,
  },
  phone: {
    required,
    vi: function validateInput(input: string) {
      const regex = /^[0-9]+$/;
      return regex.test(input);
    },
  },
  address: {},
  role: {
    required,
  },
  password: {},
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  const currentState = {
    name: STR_UPPER_CASE(state?.name),
    role: STR_UPPER_CASE(state?.role),
    address: STR_UPPER_CASE(state?.address),
    email: state?.email,
    phone: state?.phone,
    password: state?.password,
  };  
  if (!props.isEdit) {
    emit("handleSubmit", currentState);
  } else {
    const stateResult = {
      ...currentState,
      id: props.form?.id,
      status: state?.status,
    };
    emit("handleSubmit", stateResult);
  }
};

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (state.name = val.name), (state.role = val.role), (state.address = val.address), (state.email = val.email), (state.phone = val.phone), (state.password = val.password);
  },
  {
    deep: true,
  },
);
</script>

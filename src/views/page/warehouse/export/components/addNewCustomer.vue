<template>
  <BaseModal :visible="isVisible" :title="'Thêm mới khách hàng'" :defaultFooter="false" :maskClosable="false" @cancel="$emit('closeModal')">
    <a-form class="mb-6" :labelCol="{span: 5}">
      <a-form-item :label="translate('Name')" required>
        <a-input v-model:value="v$.name.$model" placeholder="Nhập tên" :status="v$.name.$error ? 'error' : ''"/>
        <ErrorMess :params="[64]" title="Name" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('PhoneNumber')" required>
        <a-input v-model:value="v$.phone.$model" placeholder="Nhập số điện thoại" :status="v$.phone.$error ? 'error' : ''"/>
        <ErrorMess :params="[64]" title="PhoneNumber" :validator="v$.phone.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Address')" required>
        <a-input v-model:value="v$.address.$model" placeholder="Nhập địa chỉ"  :status="v$.address.$error ? 'error' : ''"/>
        <ErrorMess :params="[64]" title="Address" :validator="v$.address.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Email')" :validateStatus="v$.email.$error ? 'error' : ''" :help="v$.email.$error ? translate('Invalid email') : ''">
        <a-input v-model:value="v$.email.$model" placeholder="Nhập email" />
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

<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import { reactive, watch } from "vue";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ErrorMess from "@/components/error-mess/index.vue";

const emit = defineEmits(["closeModal", "handleSubmit"]);

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  name: props.form.name,
  phone: props.form.phone,
  address: props.form.address,
  email: props.form.email,
  warehouseId: props.form.warehouseId,
});

const rules = {
  name: { required },
  phone: { required },
  address: { required },
  email: { email },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  emit("handleSubmit", state);
};

watch(() => props.form, (value) => {
  state.name = value.name;
  state.phone = value.phone;
  state.address = value.address;
  state.email = value.email;
  state.warehouseId = value.warehouseId;
}, {deep: true});
</script>

<style scoped>
/* Add any custom styles here */
</style>
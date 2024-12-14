<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <a-form @submit.prevent="handleSubmit" model="horizontal" :labelCol="{span: 5}" class="mb-6">
      <a-form-item :label="translate('WarehouseCode')" required class="!mb-4">
        <a-input :placeholder="translate('WarehouseCode')" class="w-full" :status="v$.code.$error ? 'error' : ''" v-model:value="v$.code.$model" :disabled="isEdit"/>
        <ErrorMess :params="[64]" title="WarehouseCode" :validator="v$.code.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Name')" required class="!mb-4">
        <a-input :placeholder="translate('Name')" class="w-full" :status="v$.name.$error ? 'error' : ''" v-model:value="v$.name.$model" />
        <ErrorMess :params="[64]" title="Name" :validator="v$.name.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('Address')" required class="!mb-4">
        <a-input :placeholder="translate('Address')" class="w-full" :status="v$.address.$error ? 'error' : ''" v-model:value="v$.address.$model" />
        <ErrorMess :params="[64]" title="Address" :validator="v$.address.$errors[0]?.$validator" />
      </a-form-item>
      <a-form-item :label="translate('StaffCharge')" required>
        <a-select :placeholder="translate('StaffCharge')" class="w-full" v-model:value="v$.staffId.$model" :options="personnelOption?.map(e => ({value: e.Id, label: e.Name}))"/>
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
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { ref, watch, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
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
  titleModal: {
    type: String,
    required: true,
  },
});

const store = useStore();

const state: any = reactive({
  id: props?.form?.id,
  code: props?.form?.code,
  name: props?.form?.name,
  address: props?.form?.address,
  staffId: props?.form?.staffId,
});

const rules = {
  code: {
    required,
  },
  name: {
    required,
  },
  address: {
    required,
  },
  staffId: {
    required,
  }
};

const v$ = useVuelidate(rules, state);

const personnelOption = computed(() => store.getters["personnel/personnelData"]);

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
      (state.id = val.id),
      (state.code = val.code),
      (state.name = val.name),
      (state.address = val.address),
      (state.staffId = val.staffId)
  },
  {
    deep: true, immediate: true
  },
);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  const stateResult = {
    id: state.id,
    code: state?.code,
    name: state?.name,
    address: STR_UPPER_CASE(state?.address),
    staffId: state?.staffId,
  }
  emit("handleSubmit", stateResult);
};

onMounted(async () => {
  await store.dispatch("personnel/getPersonnel", null);
})
</script>

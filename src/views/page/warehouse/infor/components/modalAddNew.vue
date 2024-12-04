<template>
  <BaseModal :visible="isVisible" :title="titleModal" @cancel="handleCancel">
    <template #body-modal>
      <a-form layout="vertical" ref="formRef" :rules="rules" :model="state">
        <div class="mb-6 w-full flex justify-between gap-x-6">
          <a-form-item class="w-full" :label="translate('warehouse.code')" required name="code">
            <a-input :placeholder="translate('warehouse.code')" v-model:value="state.code" :disabled="isEdit" />
          </a-form-item>
          <a-form-item class="w-full" :label="translate('warehouse.name')" required name="name">
            <a-input :placeholder="translate('warehouse.name')" v-model:value="state.name" />
          </a-form-item>
        </div>
        <div class="w-full flex justify-between gap-x-6">
          <a-form-item class="w-2/3" :label="translate('warehouse.address')" required name="address">
            <a-input :placeholder="translate('warehouse.address')" v-model:value="state.address" />
          </a-form-item>
          <a-form-item class="w-1/3" :label="translate('warehouse.staffCharge')">
            <a-select :placeholder="translate('warehouse.staffCharge')" :options="optionsFake?.map((e) => ({ value: e.id, label: e.name }))" v-model:value="state.staffId" />
          </a-form-item>
        </div>
      </a-form>
    </template>
    <template #footer>
      <a-button type="primary" @click="handleSubmit">
        <div class="h-full flex items-center gap-x-2">
          <dowloadIcon />
          {{ translate("common.save") }}
        </div>
      </a-button>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";
import { Rule } from "ant-design-vue/es/form";
import { reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import dowloadIcon from "@/components/icons/dowloadIcon.vue";

const emit = defineEmits(["onCancel"]);

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
    default: false,
  },
});

const store = useStore();

const state: any = reactive({
  code: props?.form?.code,
  name: props?.form?.name,
  address: props?.form?.address,
  staffId: props?.form?.staffId,
});

const rules: Record<string, Rule[]> = {
  code: [{ required: true, message: translate("warehouse.validCode"), trigger: "blur" }],
  name: [{ required: true, message: translate("warehouse.validName"), trigger: "blur" }],
  address: [{ required: true, message: translate("warehouse.validAddress"), trigger: "blur" }],
};

const optionsFake = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Smith",
  },
  {
    id: 3,
    name: "Michael Brown",
  },
];

const formRef = ref();

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log(state);
      handleCancel();
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const handleCancel = () => {
  formRef.value.resetFields();
  emit("onCancel");
};

watch(
  () => props.form,
  (val) => {
    (state.code = val.code), (state.name = val.name), (state.staffId = val.staffId), (state.address = val.address);
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

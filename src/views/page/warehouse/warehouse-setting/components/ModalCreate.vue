<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <a-form @submit.prevent="handleSubmit" class="tw-mb-6">
      <div class="tw-w-full tw-flex tw-items-start tw-justify-between tw-mb-6">
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
          <span class="tw-mb-2">{{ translate("WarehouseCode") }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('WarehouseCode')" class="tw-w-full" :status="v$.code.$error ? 'error' : ''" v-model:value="v$.code.$model" :disabled="isEdit"/>
            <ErrorMess :params="[64]" title="WarehouseCode" :validator="v$.code.$errors[0]?.$validator" />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start">
          <span class="tw-mb-2">{{ translate("Name") }}<span class="required-star">*</span></span>
          <a-input :placeholder="translate('Name')" class="tw-w-full" :status="v$.name.$error ? 'error' : ''" v-model:value="v$.name.$model" />
          <ErrorMess :params="[64]" title="Name" :validator="v$.name.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-mb-6">
        <span class="tw-mb-2">{{ translate("Location") }}<span class="required-star">*</span></span>

        <div class="tw-w-full tw-border tw-p-4 tw-rounded-xl">

          <div class="tw-w-full tw-flex tw-items-start tw-justify-between tw-mb-6">
            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
              <span class="tw-mb-2">{{ translate("Nation") }}<span class="required-star">*</span></span>
              <a-input class="tw-w-full" :placeholder="translate('Nation')" :status="v$.nation.$error ? 'error' : ''" v-model:value="v$.nation.$model" />
              <ErrorMess :params="[64]" title="Nation" :validator="v$.nation.$errors[0]?.$validator" />
            </div>

            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
              <span class="tw-mb-2">{{ translate("Area") }}<span class="required-star">*</span></span>
              <a-input class="tw-w-full" :status="v$.area.$error ? 'error' : ''" v-model:value="v$.area.$model" :placeholder="translate('Area')" />
              <ErrorMess :params="[64]" title="Area" :validator="v$.area.$errors[0]?.$validator" />
            </div>

          </div>

          <div class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
            <span class="tw-mb-2">{{ translate("Address") }}<span class="required-star">*</span></span>
            <a-input :placeholder="translate('Address')" class="tw-w-full" :status="v$.address.$error ? 'error' : ''" v-model:value="v$.address.$model" />
            <ErrorMess :params="[64]" title="Address" :validator="v$.address.$errors[0]?.$validator" />
          </div>
        </div>
      </div>
      <div class="tw-flex tw-items-start tw-justify-between">
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-center tw-mr-4 tw-w-full">
          <div class="tw-mb-2 tw-flex tw-items-center tw-w-full">
            <span>{{ translate("StaffCharge") }}</span>
          </div>
          <a-select :placeholder="translate('StaffCharge')" class="tw-w-full" v-model:value="v$.staffId.$model" :options="personnelOption?.map(e => ({value: e.id, label: e.name}))"/>
        </div>
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
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { ref, watch, onMounted, defineAsyncComponent, reactive, computed } from "vue";
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
  nation: props?.form?.nation,
  area: props?.form?.area,
  address: props?.form?.address,
  staffId: props?.form?.staffId,
  allowDelete: props?.form?.allowDelete,
});

const rules = {
  code: {
    required,
  },
  name: {
    required,
  },
  nation: {
    required,
  },
  area: {
    required,
  },
  address: {
    required,
  },
  staffId: {}
};

const v$ = useVuelidate(rules, state);

const personnelOption = computed(() => store.getters["personnel/personnelData"]);

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
      (state.code = val.code),
      (state.name = val.name),
      (state.nation = val.nation),
      (state.area = val.area),
      (state.address = val.address),
      (state.staffId = val.staffId),
      (state.id = val.id),
      (state.allowDelete = val.allowDelete)
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
    nation: STR_UPPER_CASE(state?.nation),
    area: STR_UPPER_CASE(state?.area),
    address: STR_UPPER_CASE(state?.address),
    staffId: state?.staffId,
    allowDelete: state?.allowDelete,
  }
  emit("handleSubmit", stateResult);
};

onMounted(async () => {
  await store.dispatch("personnel/getPersonnel", null);
})
</script>

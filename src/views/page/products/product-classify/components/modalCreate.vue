<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <a-form class="mb-6">
      <div class="w-full flex items-start mb-6">
        <div class="basis-1/2 mr-2 flex flex-col justify-start items-start">
          <span>{{ translate("ClassificationCode") }}<span class="required-star">*</span></span>
          <div class="w-full mt-2">
            <a-input :placeholder="translate('ClassificationCode')" :status="v$.code.$error ? 'error' : ''" v-model:value="v$.code.$model"/>
          </div>
          <ErrorMess :params="[64]" title="ClassificationCode" :validator="v$.code.$errors[0]?.$validator" />
        </div>
        <div class="basis-1/2 ml-2 flex flex-col justify-start items-start">
          <span>{{ translate("ClassificationName") }}<span class="required-star">*</span></span>
          <div class="w-full mt-2">
            <a-input :placeholder="translate('ClassificationName')" :status="v$.name.$error ? 'error' : ''" v-model:value="v$.name.$model"/>
          </div>
          <ErrorMess :params="[64]" title="ClassificationName" :validator="v$.name.$errors[0]?.$validator" />
        </div>
      </div>
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
<script lang="ts" setup>
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";
import { reactive, watch } from "vue";
import AntdButton from "@/components/antd-button/index.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ErrorMess from "@/components/error-mess/index.vue";

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

const state = reactive({
  id: props.form?.id,
  code: props.form?.code,
  name: props.form?.name,
  allowDelete: props?.form?.allowDelete,
});

const rules = {
  code: { required },
  name: { required },
};

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

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (state.id = val.id), (state.code = val.code), (state.name = val.name), (state.allowDelete = val.allowDelete);
  },
  {
    deep: true,
  },
);
</script>

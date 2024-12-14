<template>
  <BaseModal :width="'500px'" :visible="isVisible" :title="translate('ProductQuantity')" centered  @cancel="$emit('closeModal')" :defaultFooter="false" :maskClosable="false">
    <a-form @submit.prevent="handleSubmit" class="mb-6">
      <a-form-item>
        <span class="opacity-70">{{ translate('Quantity') }}</span>
        <a-input class="w-full mt-2" v-model:value="v$.quantity.$model" :placeholder="translate('ProductQuantity')"/>
        <ErrorMess :params="[64]" title="Quantity" :validator="v$.quantity.$errors[0]?.$validator" />
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
import { required } from "@vuelidate/validators";
import { REGEX_POSITIVE_INTERGER } from "@/constants";
import useVuelidate from "@vuelidate/core";
import ErrorMess from "@/components/error-mess/index.vue";

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

const emit = defineEmits(["closeModal", "handleSubmit"]);

const state = reactive({
  id: props?.form?.id,
  code: props?.form?.code,
  quantity: props?.form?.quantity,
});

const rules = {
  quantity: {
    required,
    positiveInteger: (value) => {
      if (value === undefined || value === null || value === "") {
        return true;
      }
      return REGEX_POSITIVE_INTERGER.test(value);
    },
  },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  emit('handleSubmit', state);
};

watch(
  () => props?.form,
  (val) => {
    v$.value.$reset();
    (state.id = val?.id), (state.code = val?.code), (state.quantity = val?.quantity)
  },
  {
    deep: true, immediate: true
  },
);
</script>
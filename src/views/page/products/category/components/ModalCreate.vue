<template>
  <BaseModal :width="'1000px'" :visible="isVisible" :title="titleModal" :defaultFooter="false" :maskClosable="false" @cancel="$emit('closeModal')">
    <a-form class="w-full mb-6">
      <div class="w-full flex items-start mb-6">
        <div class="basis-1/2 flex flex-col items-start justify-start mr-3">
          <span class="mb-2">{{ translate("CategoryCode") }}<span class="required-star">*</span></span>
          <a-input v-model:value="v$.code.$model" :status="v$.code.$error ? 'error' : ''" :placeholder="translate('CategoryCode')" :disabled="isEdit" />
          <ErrorMess :params="[64]" title="CategoryCode" :validator="v$.code.$errors[0]?.$validator" />
        </div>
        <div class="basis-1/2 flex flex-col items-start justify-start">
          <span class="mb-2">{{ translate("CategoryName") }}<span class="required-star">*</span></span>
          <a-input v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" :placeholder="translate('CategoryName')" />
          <ErrorMess :params="[64]" title="CategoryName" :validator="v$.name.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="w-full flex flex-col items-start mb-6">
        <span>{{ translate("DefaultProperties") }}:</span>
        <div class="w-full mt-2 flex items-center justify-between">
          <div v-for="(item, idx) in propsDefault" :key="idx" class="max-w-[150px] px-4 py-2 border border-slate-700 flex justify-center items-center rounded-xl">
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="w-full flex flex-col items-start">
        <span class="mb-2">{{ translate("CustomProperties") }}:</span>
        <a-select mode="tags" class="w-full" v-model:value="v$.propertyExtend.$model" :placeholder="translate('EnterProperty')" />
      </div> -->
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
<script lang="ts" setup>
import BaseModal from "@/components/antd-modal/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, defineAsyncComponent, reactive, computed, onMounted } from "vue";
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { DEFAULT_PROPERTY } from "@/constants";

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

const formState = reactive<any>({
  id: props.form?.id,
  code: props.form?.code,
  name: props.form?.name,
  allowDelete: props?.form?.allowDelete,
});

const rules = {
  code: {
    required,
  },
  name: {
    required,
  },
};

const v$ = useVuelidate(rules, formState);

const propsDefault = computed(() => Object.values(DEFAULT_PROPERTY)?.map((x) => ({ value: x, label: translate(`${x}`) })));

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return false;
  }
  try {
    emit("handleSubmit", formState);
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (formState.id = val.id), (formState.code = val.code), (formState.name = val.name), (formState.allowDelete = val.allowDelete);
  },
  {
    deep: true,
  },
);
</script>

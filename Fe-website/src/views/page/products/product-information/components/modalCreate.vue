<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <a-form class="tw-mb-6">
      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("ProductCode") }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('ProductCode')" :status="v$.code.$error ? 'error' : ''" :disabled="isEdit" class="tw-mt-2" v-model:value="v$.code.$model" />
          </div>
          <ErrorMess :params="[64]" title="ProductCode" :validator="v$.code.$errors[0]?.$validator" />
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("ProductName") }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('ProductName')" class="tw-mt-2" v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" />
          </div>
          <ErrorMess :params="[64]" title="ProductName" :validator="v$.name.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("ProductCategory") }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-select
              :placeholder="translate('ProductCategory')"
              class="tw-mt-2 tw-w-full"
              v-model:value="v$.categoryId.$model"
              :options="categoryData.map((x) => ({ value: x.id, label: x.name }))"
              :status="v$.categoryId.$error ? 'error' : ''"
            />
          </div>
          <ErrorMess :params="[64]" title="ProductCategory" :validator="v$.categoryId.$errors[0]?.$validator" />
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("Classify") }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-select
              :placeholder="translate('Classify')"
              class="tw-mt-2 tw-w-full"
              v-model:value="v$.classifyId.$model"
              :options="classifyData.map((x) => ({ value: x.id, label: x.name }))"
              :status="v$.classifyId.$error ? 'error' : ''"
            />
          </div>
          <ErrorMess :params="[64]" title="Classify" :validator="v$.classifyId.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("Producer") }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-select
              :placeholder="translate('Producer')"
              class="tw-mt-2 tw-w-full"
              v-model:value="v$.producerId.$model"
              :options="producerData.map((x) => ({ value: x.id, label: x.name }))"
              :status="v$.producerId.$error ? 'error' : ''"
            />
          </div>
          <ErrorMess :params="[64]" title="Producer" :validator="v$.producerId.$errors[0]?.$validator" />
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("Size") }}</span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('Size')" class="tw-mt-2" v-model:value="v$.Size.$model" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("Material") }}</span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('Material')" class="tw-mt-2" v-model:value="v$.Material.$model" />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("ConnectionTypes") }}</span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('ConnectionTypes')" class="tw-mt-2" v-model:value="v$.ConnectionTypes.$model" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("Color") }}</span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('Color')" class="tw-mt-2" v-model:value="v$.Color.$model" />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate("Designs") }}</span>
          <div class="tw-w-full">
            <a-input :placeholder="translate('Designs')" class="tw-mt-2 tw-w-full" v-model:value="v$.Designs.$model" />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-mb-6">
        <span>{{ translate("Describe") }}</span>
        <div class="tw-mt-2 tw-w-full">
          <a-textarea class="tw-w-full" :showCount="true" :maxlength="100" :auto-size="{ minRows: 3 }" :placeholder="translate('Describe')" v-model:value="v$.Describe.$model" />
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
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { computed, onMounted, reactive, watch } from "vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { useStore } from "vuex";

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

const rules = {
  code: {
    required,
  },
  name: {
    required,
  },
  categoryId: {
    required,
  },
  classifyId: {
    required,
  },
  producerId: {
    required,
  },
  Size: {},
  Material: {},
  ConnectionTypes: {},
  Color: {},
  Designs: {},
  Describe: {},
};

const state = reactive({
  id: props.form?.id,
  code: props.form?.code,
  name: props.form?.name,
  categoryId: props.form?.categoryId,
  classifyId: props.form?.classifyId,
  producerId: props.form?.producerId,
  Size: props.form?.size,
  Material: props.form?.material,
  ConnectionTypes: props.form?.connectionTypes,
  Color: props.form?.color,
  Designs: props.form?.designs,
  Describe: props.form?.describe,
  allowDelete: props?.form?.allowDelete,
});

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

const store = useStore();

const classifyData = computed(() => store.getters["classify/classifyData"]);
const producerData = computed(() => store.getters["producer/producerData"]);
const categoryData = computed(() => store.getters["category/categoryData"]);

const fetchData = async () => {
  await store.dispatch("category/getCategory", null);
  await store.dispatch("classify/getClassify", null);
  await store.dispatch("producer/getProducer", null);
};

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (state.code = val.code),
      (state.name = val.name),
      (state.categoryId = val.categoryId),
      (state.classifyId = val.classifyId),
      (state.producerId = val.producerId),
      (state.Size = val.size),
      (state.Material = val.material),
      (state.ConnectionTypes = val.connectionTypes),
      (state.Color = val.color),
      (state.Designs = val.designs),
      (state.Describe = val.describe),
      (state.allowDelete = val.allowDelete),
      (state.id = val.id);
  },
  {
    deep: true,
  },
);
</script>

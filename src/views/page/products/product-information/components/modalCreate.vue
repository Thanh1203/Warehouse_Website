<template>
  <BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <a-form class="mb-6">
      <div class="w-full flex items-start mb-6">
        <div class="basis-1/2 mr-2 flex flex-col justify-start items-start">
          <span>{{ translate("ProductCode") }}<span class="required-star">*</span></span>
          <div class="w-full">
            <a-input :placeholder="translate('ProductCode')" :status="v$.code.$error ? 'error' : ''" :disabled="isEdit" class="mt-2" v-model:value="v$.code.$model" />
          </div>
          <ErrorMess :params="[64]" title="ProductCode" :validator="v$.code.$errors[0]?.$validator" />
        </div>
        <div class="basis-1/2 ml-2 flex flex-col justify-start items-start">
          <span>{{ translate("ProductName") }}<span class="required-star">*</span></span>
          <div class="w-full">
            <a-input :placeholder="translate('ProductName')" class="mt-2" v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''" />
          </div>
          <ErrorMess :params="[64]" title="ProductName" :validator="v$.name.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="w-full flex items-start mb-6">
        <div class="basis-1/2 mr-2 flex flex-col justify-start items-start">
          <span>{{ translate("ProductCategory") }}<span class="required-star">*</span></span>
          <div class="w-full">
            <a-select
              :placeholder="translate('ProductCategory')"
              class="mt-2 w-full"
              v-model:value="v$.categoryId.$model"
              :options="categoryData.map((x) => ({ value: x.id, label: x.name }))"
              :status="v$.categoryId.$error ? 'error' : ''"
            />
          </div>
          <ErrorMess :params="[64]" title="ProductCategory" :validator="v$.categoryId.$errors[0]?.$validator" />
        </div>
        <div class="basis-1/2 ml-2 flex flex-col justify-start items-start">
          <span>{{ translate("Classify") }}<span class="required-star">*</span></span>
          <div class="w-full">
            <a-select
              :placeholder="translate('Classify')"
              class="mt-2 w-full"
              v-model:value="v$.classifyId.$model"
              :options="classifyData.map((x) => ({ value: x.id, label: x.name }))"
              :status="v$.classifyId.$error ? 'error' : ''"
            />
          </div>
          <ErrorMess :params="[64]" title="Classify" :validator="v$.classifyId.$errors[0]?.$validator" />
        </div>
      </div>
      <div class="w-full flex items-start mb-6">
        <div class="basis-1/2 mr-2 flex flex-col justify-start items-start">
          <span>{{ translate("Producer") }}<span class="required-star">*</span></span>
          <div class="w-full">
            <a-select
              :placeholder="translate('Producer')"
              class="mt-2 w-full"
              v-model:value="v$.producerId.$model"
              :options="producerData.map((x) => ({ value: x.id, label: x.name }))"
              :status="v$.producerId.$error ? 'error' : ''"
            />
          </div>
          <ErrorMess :params="[64]" title="Producer" :validator="v$.producerId.$errors[0]?.$validator" />
        </div>
        <div class="basis-1/2 ml-2 flex flex-col justify-start items-start">
          <span>{{ translate("Size") }}</span>
          <div class="w-full">
            <a-input :placeholder="translate('Size')" class="mt-2" v-model:value="v$.Size.$model" />
          </div>
        </div>
      </div>
      <div class="w-full flex items-start mb-6">
        <div class="basis-1/2 mr-2 flex flex-col justify-start items-start">
          <span>{{ translate("Material") }}</span>
          <div class="w-full">
            <a-input :placeholder="translate('Material')" class="mt-2" v-model:value="v$.Material.$model" />
          </div>
        </div>
        <div class="basis-1/2 ml-2 flex flex-col justify-start items-start">
          <span>{{ translate("ConnectionTypes") }}</span>
          <div class="w-full">
            <a-input :placeholder="translate('ConnectionTypes')" class="mt-2" v-model:value="v$.ConnectionTypes.$model" />
          </div>
        </div>
      </div>
      <div class="w-full flex items-start mb-6">
        <div class="basis-1/2 mr-2 flex flex-col justify-start items-start">
          <span>{{ translate("Color") }}</span>
          <div class="w-full">
            <a-input :placeholder="translate('Color')" class="mt-2" v-model:value="v$.Color.$model" />
          </div>
        </div>
        <div class="basis-1/2 ml-2 flex flex-col justify-start items-start">
          <span>{{ translate("Designs") }}</span>
          <div class="w-full">
            <a-input :placeholder="translate('Designs')" class="mt-2 w-full" v-model:value="v$.Designs.$model" />
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col justify-start items-start mb-6">
        <span>{{ translate("Describe") }}</span>
        <div class="mt-2 w-full">
          <a-textarea class="w-full" :showCount="true" :maxlength="100" :auto-size="{ minRows: 3 }" :placeholder="translate('Describe')" v-model:value="v$.Describe.$model" />
        </div>
      </div>
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

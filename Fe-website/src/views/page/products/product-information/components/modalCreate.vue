<template>
  <BaseModal
    :visible="isVisible"
    :title="titleModal"
    :defaultFooter="false"
    @cancel="$emit('closeModal')"
  >
    <a-form class="tw-mb-6">
      <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('ProductCode') }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-input
              :placeholder="translate('ProductCode')"
              :disabled="isEdit"
              class="tw-mt-2"
              v-model:value="v$.code.$model"
            />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('ProductName') }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-input
              :placeholder="translate('ProductName')"
              class="tw-mt-2"
              v-model:value="v$.name.$model"
            />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('ProductCategory') }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-select
              :placeholder="translate('ProductCategory')"
              class="tw-mt-2 tw-w-full"
              v-model:value="v$.categoryCode.$model"
              :options="dataFake2.map((x) => ({ value: x.id, label: x.name }))"
            />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('Classify') }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-select
              :placeholder="translate('Classify')"
              class="tw-mt-2 tw-w-full"
              v-model:value="v$.classifyCode.$model"
              :options="dataFake"
            />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('Producer') }}<span class="required-star">*</span></span>
          <div class="tw-w-full">
            <a-select
              :placeholder="translate('Producer')"
              class="tw-mt-2 tw-w-full"
              v-model:value="v$.producerCode.$model"
              :options="dataFake3.map(x => ({value: x.id, label: x.name}))"
            />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('Size') }}</span>
          <div class="tw-w-full">
            <a-input
              :placeholder="translate('Size')"
              class="tw-mt-2"
              v-model:value="v$.Size.$model"
            />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('Material') }}</span>
          <div class="tw-w-full">
            <a-input
              :placeholder="translate('Material')"
              class="tw-mt-2"
              v-model:value="v$.Material.$model"
            />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('ConnectionTypes') }}</span>
          <div class="tw-w-full">
            <a-input
              :placeholder="translate('ConnectionTypes')"
              class="tw-mt-2"
              v-model:value="v$.ConnectionTypes.$model"
            />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div class="tw-basis-1/2 tw-mr-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('Color') }}</span>
          <div class="tw-w-full">
            <a-input
              :placeholder="translate('Color')"
              class="tw-mt-2"
              v-model:value="v$.Color.$model"
            />
          </div>
        </div>
        <div class="tw-basis-1/2 tw-ml-2 tw-flex tw-flex-col tw-justify-start tw-items-start">
          <span>{{ translate('Designs') }}</span>
          <div class="tw-w-full">
            <a-input
              :placeholder="translate('Designs')"
              class="tw-mt-2 tw-w-full"
              v-model:value="v$.Designs.$model"
            />
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start tw-mb-6">
        <span>{{ translate('Describe') }}</span>
        <div class="tw-mt-2 tw-w-full">
          <a-textarea
            class="tw-w-full"
            :showCount="true"
            :maxlength="100"
            :auto-size="{ minRows: 3 }"
            :placeholder="translate('Describe')"
            v-model:value="v$.Describe.$model"
          />
        </div>
      </div>
    </a-form>
    <template #footer>
      <AntdButton :type="'primary'" @click="handleSubmit()">
        <template #icon>
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
        </template>
        <span class="tw-ml-2 tw-text-sm">{{ translate('Save') }}</span>
      </AntdButton>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/antd-modal/index.vue'
import { translate } from '@/languages/i18n'
import AntdButton from '@/components/antd-button/index.vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { reactive, watch } from 'vue'

const emit = defineEmits(['closeModal', 'handleSubmit'])
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  },
  titleModal: {
    type: String,
    required: true
  },
  form: {
    type: Object,
    required: true
  }
})

const rules = {
  code: {
    required
  },
  name: {
    required
  },
  categoryCode: {
    required
  },
  classifyCode: {
    required
  },
  producerCode: {
    required
  },
  Size: {},
  Material: {},
  ConnectionTypes: {},
  Color: {},
  Designs: {},
  Describe: {},
}

const state = reactive({
  id: props.form?.id,
  code: props.form?.code,
  name: props.form?.name,
  categoryCode: props.form?.categoryCode,
  classifyCode: props.form?.classifyCode,
  producerCode: props.form?.producerCode,
  Size: props.form?.Size,
  Material: props.form?.Material,
  ConnectionTypes: props.form?.ConnectionTypes,
  Color: props.form?.Color,
  Designs: props.form?.Designs,
  Describe: props.form?.Describe,
})

const v$ = useVuelidate(rules, state)

const handleSubmit = () => {
  v$.value.$touch()
  if (v$.value.$invalid) {
    return false
  }
  try {
    emit('handleSubmit', state)
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => props.form,
  (val) => {
    v$.value.$reset();
    (state.code = val.code),
    (state.name = val.name),
    (state.categoryCode = val.categoryCode),
    (state.classifyCode = val.classifyCode),
    (state.producerCode = val.producerCode),
    (state.Size = val.Size),
    (state.Material = val.Material),
    (state.ConnectionTypes = val.ConnectionTypes),
    (state.Color = val.Color),
    (state.Designs = val.Designs),
    (state.Describe = val.Describe)
  },
  {
    deep: true
  }
)

const dataFake = [
  {
    value: 'PL1',
    label: 'Văn phòng'
  },
  {
    value: 'PL2',
    label: 'Gamming'
  },
  {
    value: 'PL3',
    label: 'Custom'
  },
  {
    value: 'PL4',
    label: 'Kiểm âm'
  }
]

const dataFake2 = [
  {
    id: 'CL01',
    name: 'Bàn phím'
  },
  {
    id: 'CL02',
    name: 'Chuột'
  },
  {
    id: 'CL03',
    name: 'Tai nghe'
  }
]

const dataFake3 = [
  {
    id: 'HgA',
    name: "Hãng A",
  },
  {
    id: 'HgB',
    name: "Hãng B",
  },
  {
    id: 'HgC',
    name: "Hãng C",
  },
]
</script>

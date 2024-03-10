<template>
  <BaseModal
    :width="'1000px'"
    :visible="isVisible"
    :title="titleModal"
    :defaultFooter="false"
    :maskClosable="false"
    @cancel="$emit('closeModal')"
  >
    <a-form class="tw-w-full tw-mb-6">
      <div class="tw-w-full tw-flex tw-items-start tw-justify-center tw-mb-6">
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-3">
          <span class="tw-mb-2"
            >{{ translate('CategoryCode') }}<span class="required-star">*</span></span
          >
          <a-input
            v-model:value="v$.id.$model"
            :status="v$.id.$error ? 'error' : ''"
            :placeholder="translate('CategoryCode')"
            :disabled="isEdit"
          />
          <ErrorMess
            :params="[64]"
            :title="translate('CategoryCode')"
            :validator="v$.id.$errors[0]?.$validator"
          />
        </div>
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start">
          <span class="tw-mb-2"
            >{{ translate('CategoryName') }}<span class="required-star">*</span></span
          >
          <a-input
            v-model:value="v$.name.$model"
            :status="v$.name.$error ? 'error' : ''"
            :placeholder="translate('CategoryName')"
          />
          <ErrorMess
            :params="[64]"
            :title="translate('CategoryName')"
            :validator="v$.name.$errors[0]?.$validator"
          />
        </div>
      </div>
      <div class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-center">
        <span class="tw-mb-2"
          >{{ translate('Properties') }}<span class="required-star">*</span></span
        >
        <a-select
          mode="tags"
          class="tw-w-full"
          v-model:value="v$.listProperty.$model"
          :placeholder="translate('EnterProperty')"
          :options="propsOptions"
          :status="v$.listProperty.$error ? 'error' : ''"
        />
        <ErrorMess
          :params="[64]"
          :title="translate('Properties')"
          :validator="v$.listProperty.$errors[0]?.$validator"
        />
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
<script lang="ts" setup>
import BaseModal from '@/components/antd-modal/index.vue'
import AntdButton from '@/components/antd-button/index.vue'
import ErrorMess from '@/components/error-mess/index.vue'
import { translate } from '@/languages/i18n'
import { ref, watch, defineAsyncComponent, reactive, computed, onMounted } from 'vue'
import { required, maxLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import NoData from '@/components/NoData/index.vue'
import { STR_UPPER_CASE } from '@/utils/common'
import { DEFAULT_PROPERTY } from '@/constants'

interface FormState {
  id: string | number
  name: string
  listProperty: string[]
}

const emit = defineEmits(['closeModal', 'handleSubmit'])
const props = defineProps({
  isVisible: {
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
  },
  isEdit: {
    type: Boolean,
    required: true
  }
})

const nameProperty = ref<string>('')
const isvalidLisProps = ref<boolean>(false)

const formState = reactive<FormState>({
  id: props?.form?.id,
  name: props?.form?.name,
  listProperty: props?.form?.listProperty
})

const rules = {
  id: {
    required
  },
  name: {
    required
  },
  listProperty: {
    required
  }
}

const v$ = useVuelidate(rules, formState)

const checkProps = () => {
  if (formState?.listProperty?.length === 0) {
    isvalidLisProps.value = true
    return false
  }
  return true
}

const propsOptions = computed(
  () => Object.values(DEFAULT_PROPERTY)?.map((x) => ({ value: x, label: translate(`${x}`) }))
)

const handleSubmit = () => {
  v$.value.$touch()
  if (v$.value.$invalid || !checkProps()) {
    return false
  }
  try {
    emit('handleSubmit', formState)
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => formState?.listProperty,
  (val) => {
    if (val.length !== 0) {
      isvalidLisProps.value = false
    }
  },
  {
    deep: true
  }
)

watch(
  () => props.form,
  (val) => {
    v$.value.$reset()
    ;(formState.name = val.name),
      (formState.id = val.id),
      (formState.listProperty = val.listProperty)
  },
  {
    deep: true
  }
)
</script>

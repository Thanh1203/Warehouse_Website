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
        <div class="tw-w-full tw-flex tw-items-start tw-mb-6">
            <div class="tw-basis-1/2 tw-mr-3 tw-flex tw-flex-col tw-items-start tw-justify-start">
                <span class="tw-mb-2">{{ translate('SupplierCode') }}<span class="required-star">*</span></span>
                <a-input/>
            </div>
            <div class="tw-basis-1/2 tw-ml-3 tw-flex tw-flex-col tw-items-start tw-justify-start">
                <span class="tw-mb-2">{{ translate('SupplierName') }}<span class="required-star">*</span></span>
                <a-input/>
            </div>
        </div>
        <div class="tw-w-full tw-flex tw-items-start">
            <div class="tw-basis-1/2 tw-mr-3 tw-flex tw-flex-col tw-items-start tw-justify-start">
                <span class="tw-mb-2">{{ translate('SupplierOrigin') }}</span>
                <a-input/>
            </div>
            <div class="tw-basis-1/2 tw-ml-3"></div>
        </div>
    </a-form>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/antd-modal/index.vue'
import { translate } from '@/languages/i18n';

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
</script>
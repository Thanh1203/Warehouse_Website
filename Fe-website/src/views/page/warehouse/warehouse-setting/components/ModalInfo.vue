<template>
  <BaseModal
    :visible="isVisible"
    :title="translate('WarehouseInformation')"
    :defaultFooter="false"
    :width="'600px'"
    @cancel="$emit('closeModal')"
  >
    <div class="tw-mb-4 tw-w-full tw-flex">
      <div class="tw-basis-1/3 tw-flex tw-items-start tw-justify-between tw-font-medium">
        <span>{{ translate('warehouseName') }}</span>
        <span>:</span>
      </div>
      <div class="tw-pl-3 tw-basis-2/3 tw-flex tw-items-start">
        <span>{{ state.warehouseName }}</span>
      </div>
    </div>
    <div class="tw-mb-4 tw-w-full tw-flex">
      <div class="tw-basis-1/3 tw-flex tw-items-start tw-justify-between tw-font-medium">
        <span>{{ translate('Nation') }}</span>
        <span>:</span>
      </div>
      <div class="tw-pl-3 tw-basis-2/3 tw-flex tw-items-start">
        <span>{{ state.Nation }}</span>
      </div>
    </div>
    <div class="tw-mb-4 tw-w-full tw-flex">
      <div class="tw-basis-1/3 tw-flex tw-items-start tw-justify-between tw-font-medium">
        <span>{{ translate('Address') }}</span>
        <span>:</span>
      </div>
      <div class="tw-pl-3 tw-basis-2/3 tw-flex tw-items-start">
        <span>{{ state.describe + ' ' + state.Area }}</span>
      </div>
    </div>
    <div class="tw-mb-4 tw-w-full tw-flex">
      <div class="tw-basis-1/3 tw-flex tw-items-start tw-justify-between tw-font-medium">
        <span>{{ translate('Acreage') }}</span>
        <span>:</span>
      </div>
      <div class="tw-pl-3 tw-basis-2/3 tw-flex tw-items-start">
        <span>{{ state.Acreage }} (m<sup>2</sup>)</span>
      </div>
    </div>
    <div class="tw-mb-4 tw-w-full tw-flex">
      <div class="tw-basis-1/3 tw-flex tw-item-start tw-justify-between tw-font-medium">
        <span>{{ translate('Tankage') }}</span>
        <span>:</span>
      </div>
      <div class="tw-pl-3 tw-basis-2/3 tw-flex tw-item-start">
        <span>{{ state.Tankage }} (m<sup>3</sup>)</span>
      </div>
    </div>
    <div class="tw-mb-4 tw-w-full tw-flex">
      <div class="tw-basis-1/3 tw-flex tw-item-start tw-justify-between tw-font-medium">
        <span>{{ translate('DateCreated') }}</span>
        <span>:</span>
      </div>
      <div class="tw-pl-3 tw-basis-2/3 tw-flex tw-item-start">
        <span>{{ state.DateCreated }}</span>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/antd-modal/index.vue'
import { translate } from '@/languages/i18n'

const emit = defineEmits(['closeModal'])

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  state: {
    type: Object,
    required: true
  }
})
</script>

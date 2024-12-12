<template>
  <BaseModal
    :visible="isVisible"
    :title="translate('WarehouseInformation')"
    :defaultFooter="false"
    :width="'600px'"
    @cancel="$emit('closeModal')"
  >
    <div class="mb-4 w-full flex">
      <div class="basis-1/3 flex items-start justify-between font-medium">
        <span>{{ translate('warehouseName') }}</span>
        <span>:</span>
      </div>
      <div class="pl-3 basis-2/3 flex items-start">
        <span>{{ state.name }}</span>
      </div>
    </div>
    <div class="mb-4 w-full flex">
      <div class="basis-1/3 flex items-start justify-between font-medium">
        <span>{{ translate('Nation') }}</span>
        <span>:</span>
      </div>
      <div class="pl-3 basis-2/3 flex items-start">
        <span>{{ state.nation }}</span>
      </div>
    </div>
    <div class="mb-4 w-full flex">
      <div class="basis-1/3 flex items-start justify-between font-medium">
        <span>{{ translate('Area') }}</span>
        <span>:</span>
      </div>
      <div class="pl-3 basis-2/3 flex items-start">
        <span>{{ state.area }}</span>
      </div>
    </div>
    <div class="mb-4 w-full flex">
      <div class="basis-1/3 flex items-start justify-between font-medium">
        <span>{{ translate('Address') }}</span>
        <span>:</span>
      </div>
      <div class="pl-3 basis-2/3 flex items-start">
        <span>{{ state.address }}</span>
      </div>
    </div>
    <div class="mb-4 w-full flex">
      <div class="basis-1/3 flex items-start justify-between font-medium">
        <span>{{ translate('StaffCharge') }}</span>
        <span>:</span>
      </div>
      <div class="pl-3 basis-2/3 flex items-start">
        <span>{{ state.staffName }}</span>
      </div>
    </div>
    <div class="mb-4 w-full flex">
      <div class="basis-1/3 flex item-start justify-between font-medium">
        <span>{{ translate('DateCreated') }}</span>
        <span>:</span>
      </div>
      <div class="pl-3 basis-2/3 flex item-start">
        <span>{{ state.timeCreate }}</span>
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

<template>
  <BaseModal
    :width="'600px'"
    :visible="isVisible"
    :defaultFooter="false"
    :maskClosable="true"
    :title="titleModal"
    @cancel="$emit('closeModal')"
  >
    <div class="tw-w-full tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>Mã chủng loại</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-flex tw-items-start">{{ form.id }}</div>
    </div>
    <div class="tw-mt-4 tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>Tên chủng loại</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-flex tw-iem-start">{{ form.name }}</div>
    </div>
    <div class="tw-mt-4 tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>Ngày tạo</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-flex tw-iem-start">{{ form.dateCreated }}</div>
    </div>
    <div class="tw-mt-4 tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>Thuộc tính</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-flex tw-flex-col tw-items-start tw-justify-start">
        <div v-for="(item, idx) in form.listProperty" :class="idx !== 0 ? 'tw-mt-3' : ''">
          {{ item }}
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/antd-modal/index.vue'

const emit = defineEmits(['closeModal'])
defineProps({
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
  }
})
</script>

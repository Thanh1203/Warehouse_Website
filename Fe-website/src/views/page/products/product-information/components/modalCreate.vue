<template>
  <BaseModal
    :visible="isVisible"
    :title="titleModal"
    :defaultFooter="false"
    @cancel="$emit('closeModal')"
  >
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/antd-modal/index.vue'

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
  }
})
</script>

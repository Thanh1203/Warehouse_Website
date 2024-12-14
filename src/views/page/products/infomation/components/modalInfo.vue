<template>
  <BaseModal :width="'600px'" :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("ProductCode") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("ProductName") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("ProductCategory") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("ProductClassify") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("Supplier") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("Size") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("Material") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("Designs") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
    <div class="mb-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("Describe") }}</span>
        <span class="mr-4">:</span>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";

const emit = defineEmits(["closeModal"]);
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  titleModal: {
    type: String,
    required: true,
  },
  idProduct: {
    type: String,
    required: true,
  },
});
</script>

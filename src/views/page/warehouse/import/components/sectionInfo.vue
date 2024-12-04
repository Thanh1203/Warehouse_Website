<template>
  <div class="w-full rounded-lg p-4 section-ctn mb-6">
    <div class="mb-4 font-semibold">{{ translate("common.additionalInfo") }}</div>
    <a-form layout="vertical" ref="formRef">
      <a-form-item :label="translate('warehouse.staffCharge')" required class="!mb-4">
        <a-select :placeholder="translate('staff.select')"/>
      </a-form-item>
      <a-form-item :label="translate('inventory.importDate')" required class="!mb-4">
        <a-date-picker :placeholder="translate('inventory.importDate')" class="w-full"/>
      </a-form-item>
      <a-form-item :label="translate('inventory.purchaseCode')" required class="!mb-4">
        <a-input :placeholder="translate('inventory.enterPurchaseCode')"/>
      </a-form-item>
      <a-form-item :label="translate('inventory.referenceCode')" required class="!mb-4">
        <a-input :placeholder="translate('inventory.enterReferenceCode')"/>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { ref } from 'vue';


</script>
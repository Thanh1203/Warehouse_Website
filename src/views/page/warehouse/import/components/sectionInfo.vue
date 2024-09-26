<template>
  <div class="tw-w-full tw-rounded-lg tw-p-4 section-ctn tw-mb-6">
    <div class="tw-mb-4 tw-font-semibold">{{ translate("common.additionalInfo") }}</div>
    <a-form layout="vertical" ref="formRef">
      <a-form-item :label="translate('warehouse.staffCharge')" required class="!tw-mb-4">
        <a-select :placeholder="translate('staff.select')"/>
      </a-form-item>
      <a-form-item :label="translate('inventory.importDate')" required class="!tw-mb-4">
        <a-date-picker :placeholder="translate('inventory.importDate')" class="tw-w-full"/>
      </a-form-item>
      <a-form-item :label="translate('inventory.purchaseCode')" required class="!tw-mb-4">
        <a-input :placeholder="translate('inventory.enterPurchaseCode')"/>
      </a-form-item>
      <a-form-item :label="translate('inventory.referenceCode')" required class="!tw-mb-4">
        <a-input :placeholder="translate('inventory.enterReferenceCode')"/>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { ref } from 'vue';


</script>
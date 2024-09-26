<template>
  <a-descriptions :title="translate('WarehouseInformation')">
    <a-descriptions-item :label="translate('WarehouseCode')">{{ data?.code }}</a-descriptions-item>
    <a-descriptions-item :label="translate('warehouseName')">{{ data?.name }}</a-descriptions-item>
    <a-descriptions-item :label="translate('Nation')">{{ data?.nation }}</a-descriptions-item>

    <a-descriptions-item :label="translate('Area')">{{ data?.area }}</a-descriptions-item>
    <a-descriptions-item :label="translate('Address')">{{ data?.address }}</a-descriptions-item>
    <a-descriptions-item :label="translate('StaffCharge')">{{ data?.staffName }}</a-descriptions-item>
  </a-descriptions>
</template>
<script lang="ts" setup>
import { translate } from "@/languages/i18n";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

</script>

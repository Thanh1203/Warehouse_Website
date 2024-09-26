<template>
  <div class="tw-w-full section-ctn tw-p-4 tw-rounded-lg">
    <div class="tw-mb-4 tw-font-semibold">{{ translate("common.payment") }}</div>
    <div class="tw-w-full tw-mb-4">
      <div class="tw-flex tw-items-start tw-justify-between tw-pb-3">
        <div>{{ translate('product.quantity') }}</div>
        <div>{{ products }} {{ translate('product.title') }}</div>
      </div>
      <div class="tw-flex tw-items-start tw-justify-between tw-pb-3">
        <div>{{ translate('common.totalAmount') }}</div>
        <div>{{ totalAmount.toLocaleString('en-US') }} đ</div>
      </div>
    </div>
    <div class="tw-w-full tw-flex tw-items-center tw-justify-end tw-pt-4">
      <a-button type="primary" @click="$emit('handleSubmit')">
        {{ translate('warehouse.createImport') }}
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { ref } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(["handleSubmit"]);

const store = useStore();

const totalAmount = ref(120000);
const products = ref(50);

</script>
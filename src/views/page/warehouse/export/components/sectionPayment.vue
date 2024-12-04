<template>
  <div class="w-full section-ctn p-4 rounded-lg">
    <div class="mb-4 font-semibold">{{ translate("common.payment") }}</div>
    <div class="w-full mb-4">
      <div class="flex items-start justify-between pb-3">
        <div>{{ translate('product.quantity') }}</div>
        <div>{{ products }} {{ translate('product.title') }}</div>
      </div>
      <div class="flex items-start justify-between pb-3">
        <div>{{ translate('common.totalAmount') }}</div>
        <div>{{ totalAmount.toLocaleString('en-US') }} đ</div>
      </div>
    </div>
    <div class="w-full flex items-center justify-end pt-4">
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
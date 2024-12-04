<template>
  <div class="w-full grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
    <div class="w-full bg-[#37404a] rounded-lg p-4">
      <div class="text-xl text-[#aab8c5] font-semibold mb-4">{{ translate('reportProduct.sectorS') }}</div>
      <div class="pb-2 mb-4 border-b border-[#e2e8ed]">{{ translate('numberSectors') }} : 10</div>
      <ReportSectors/>
    </div>

    <div class="w-full bg-[#37404a] rounded-lg p-4">
      <div class="text-xl text-[#aab8c5] font-semibold mb-2">{{ translate('reportProduct.categoryS') }}</div>
      <div class="pb-2 mb-4 border-b border-[#e2e8ed]">{{ translate('NumberCategories') }} : 10</div>
      <ReportCategories/>
    </div>

    <div class="w-full bg-[#37404a] rounded-lg p-4">
      <div class="text-xl text-[#aab8c5] font-semibold mb-4">{{ translate('reportProduct.classifyS') }}</div>
      <div class="pb-2 mb-4 border-b border-[#e2e8ed]">{{ translate('numberSectors') }} : 10</div>
      <ReportClassifies/>
    </div>

    <div class="w-full bg-[#37404a] rounded-lg p-4">
      <div class="text-xl text-[#aab8c5] font-semibold mb-4">{{ translate('reportProduct.productRanking') }}</div>
      <ReportProducts/>
    </div>

  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { defineAsyncComponent } from 'vue';

const ReportCategories = defineAsyncComponent(() => import("./reportCategories.vue"));
const ReportSectors = defineAsyncComponent(() => import("./reportSectors.vue"));
const ReportClassifies = defineAsyncComponent(() => import("./reportClassifies.vue"));
const ReportProducts = defineAsyncComponent(() => import("./reportProducts.vue"));
</script>

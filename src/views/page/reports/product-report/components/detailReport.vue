<template>
  <div class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-4 md:tw-gap-8 md:tw-grid-cols-2">
    <div class="tw-w-full tw-bg-[#37404a] tw-rounded-lg tw-p-4">
      <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold tw-mb-4">{{ translate('reportProduct.sectorS') }}</div>
      <div class="tw-pb-2 tw-mb-4 tw-border-b tw-border-[#e2e8ed]">{{ translate('numberSectors') }} : 10</div>
      <ReportSectors/>
    </div>

    <div class="tw-w-full tw-bg-[#37404a] tw-rounded-lg tw-p-4">
      <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold tw-mb-2">{{ translate('reportProduct.categoryS') }}</div>
      <div class="tw-pb-2 tw-mb-4 tw-border-b tw-border-[#e2e8ed]">{{ translate('NumberCategories') }} : 10</div>
      <ReportCategories/>
    </div>

    <div class="tw-w-full tw-bg-[#37404a] tw-rounded-lg tw-p-4">
      <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold tw-mb-4">{{ translate('reportProduct.classifyS') }}</div>
      <div class="tw-pb-2 tw-mb-4 tw-border-b tw-border-[#e2e8ed]">{{ translate('numberSectors') }} : 10</div>
      <ReportClassifies/>
    </div>

    <div class="tw-w-full tw-bg-[#37404a] tw-rounded-lg tw-p-4">
      <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold tw-mb-4">{{ translate('reportProduct.productRanking') }}</div>
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

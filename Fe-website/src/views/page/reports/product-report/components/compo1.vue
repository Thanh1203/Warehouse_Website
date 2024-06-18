<template>
  <div class="tw-w-full tw-mb-6 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-5 tw-bg-[#37404a] tw-rounded-lg tw-overflow-hidden tw-border tw-border-[#464f5b]">    
    <div class="tw-h-[140px] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-between md:tw-col-span-2 lg:tw-col-span-1 grid-border-item">
      <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
      <div class="tw-text-[#aab8c5]">
        <NumberAnimation v-if="!loading" :from="0" :to="10000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate">{{ translate("Products") }}</div>
    </div>
    <div class="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 md:tw-col-span-2 lg:tw-col-span-4 lg:tw-grid-cols-4">
      <div class="tw-h-[140px] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="tw-text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="300" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate">{{ translate("Category") }}</div>
      </div>
      <div class="tw-h-[140px] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="tw-text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate">{{ translate("Classify") }}</div>
      </div>
      <div class="tw-h-[140px] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="tw-text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate">{{ translate("reportProduct.provider") }}</div>
      </div>
      <div class="tw-h-[140px] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="tw-text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="10" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate">{{ translate("reportProduct.sector") }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { ref } from "vue";
import NumberAnimation from "vue-number-animation";

const props = defineProps({
  data: {
    type: Object,
  },
});

const loading = ref<boolean> (false);

const theFormat = (number) => {
  return number.toLocaleString('en-US');
};
</script>

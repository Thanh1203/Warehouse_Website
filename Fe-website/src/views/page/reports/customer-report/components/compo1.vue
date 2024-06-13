<template>
  <div class="tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCustomer.byWeek") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCustomer.sinceLastWeek') }}</template>
          <span class="tw-text-[#8391a2]">{{ translate('reportCustomer.sinceLastWeek') }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCustomer.byMonth") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', !statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCustomer.sinceLastMonth') }}</template>
          <span class="tw-text-[#8391a2]">{{ translate('reportCustomer.sinceLastMonth') }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCustomer.byQuater") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="1500" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCustomer.sinceLastQuater') }}</template>
          <span class="tw-text-[#8391a2]">{{ translate('reportCustomer.sinceLastQuater') }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[160px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold tw-w-full tw-h-12">{{ translate("reportCustomer.byYear") }}</div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="tw-flex tw-items-center tw-truncate tw-gap-3">
        <div :class="['tw-text-sm', !statusTemp ? 'tw-text-[#0acf97]' : 'tw-text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCustomer.sinceLastYear') }}</template>
          <span class="tw-text-[#8391a2]">{{ translate('reportCustomer.sinceLastYear') }}</span>
        </a-tooltip>
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

const loading = ref<boolean>(false);
const statusTemp = ref<boolean>(true);

const theFormat = (number) => {
  return number.toLocaleString('en-US');
};
</script>

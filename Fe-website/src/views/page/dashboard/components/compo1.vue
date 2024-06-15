<template>
  <div class="tw-grid tw-w-full tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#37404a] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("reportProduct.total") }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="10000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("reportCustomer.total") }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'address-book']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="5000" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("NumberOfWarehouses2") }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'warehouse']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="5" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
    </div>

    <div class="tw-bg-[#37404a] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate("NumberOfPersonnel") }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'users']" size="xl" style="color: #727cf5" />
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="10" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
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

const theFormat = (number) => {
  return number.toLocaleString('en-US');
};

</script>

<template>
  <BaseModal :width="'600px'" :visible="isVisible" :defaultFooter="false" :maskClosable="true" :title="titleModal" @cancel="$emit('closeModal')">
    <div class="tw-w-full tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>{{ translate("CategoryCode") }}</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-flex tw-items-start">{{ form.code }}</div>
    </div>
    <div class="tw-mt-4 tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>{{ translate("CategoryName") }}</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-flex tw-iem-start">{{ form.name }}</div>
    </div>
    <div class="tw-w-full tw-mt-4 tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>{{ translate("DefaultProperties") }}</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-mt-2 tw-flex tw-items-center tw-justify-sart tw-flex-wrap tw-gap-4">
        <div v-for="(item, idx) in propsDefault" :key="idx" class="tw-max-w-[150px] tw-px-4 tw-py-2 tw-mb-3 tw-border tw-border-slate-700 tw-flex tw-justify-center tw-items-center tw-rounded-xl ">
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="tw-mt-4 tw-flex tw-items-start tw-justify-between">
      <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
        <span>{{ translate("CustomProperties") }}</span>
        <span class="tw-mr-4">:</span>
      </div>
      <div class="tw-w-2/3 tw-flex tw-flex-col tw-items-start tw-justify-start">
        <div v-for="(item, idx) in form.propertyExtend" :class="idx !== 0 ? 'tw-mt-3' : ''">
          {{ item }}
        </div>
      </div>
    </div> -->
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import { DEFAULT_PROPERTY } from "@/constants";
import { translate } from "@/languages/i18n";
import { computed } from "vue";

const emit = defineEmits(["closeModal"]);
defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  titleModal: {
    type: String,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});

const propsDefault = computed(() => Object.values(DEFAULT_PROPERTY)?.map((x) => ({ value: x, label: translate(`${x}`) })));
</script>

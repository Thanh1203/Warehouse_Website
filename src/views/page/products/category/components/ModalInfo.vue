<template>
  <BaseModal :width="'600px'" :visible="isVisible" :defaultFooter="false" :maskClosable="true" :title="titleModal" @cancel="$emit('closeModal')">
    <div class="w-full flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("CategoryCode") }}</span>
        <span class="mr-4">:</span>
      </div>
      <div class="w-2/3 flex items-start">{{ form.code }}</div>
    </div>
    <div class="mt-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("CategoryName") }}</span>
        <span class="mr-4">:</span>
      </div>
      <div class="w-2/3 flex iem-start">{{ form.name }}</div>
    </div>
    <div class="w-full mt-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("DefaultProperties") }}</span>
        <span class="mr-4">:</span>
      </div>
      <div class="w-2/3 mt-2 flex items-center justify-sart flex-wrap gap-4">
        <div v-for="(item, idx) in propsDefault" :key="idx" class="max-w-[150px] px-4 py-2 mb-3 border border-slate-700 flex justify-center items-center rounded-xl ">
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="mt-4 flex items-start justify-between">
      <div class="w-1/3 flex items-start justify-between">
        <span>{{ translate("CustomProperties") }}</span>
        <span class="mr-4">:</span>
      </div>
      <div class="w-2/3 flex flex-col items-start justify-start">
        <div v-for="(item, idx) in form.propertyExtend" :class="idx !== 0 ? 'mt-3' : ''">
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

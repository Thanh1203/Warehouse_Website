<template>
  <div class="tw-w-full tw-p-6 tw-mb-6 tw-bg-white tw-rounded-xl">
    <div class="tw-mb-2 tw-font-semibold tw-text-[20px]">{{ translate('Language') }}</div>
    <div class="tw-flex tw-gap-6 tw-flex-wrap">
      <div>{{ translate('SelectLanguage') }}</div>
      <a-select 
        class="tw-w-[150px]"
        :options="optionsLanguare"
        v-model:value="currentLanguage"
      >
      </a-select>
      <AntdButton :disabled="!isSelectLanguage" @click="handleReload">
        <span>{{ translate('Reload') }}</span>
      </AntdButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { ref, watch } from 'vue';
import AntdButton from "@/components/antd-button/index.vue";

const currentLanguage = ref<string>(localStorage.getItem("language") || "vi");
const isSelectLanguage = ref<boolean>(false);

const optionsLanguare = ref<Array<any>>([
  {
    value: "vi",
    label: `VI (${translate('Vietnamese')})`
  },
  {
    value: "en",
    label: `EN (${translate('English')})`
  }
]);

const handleReload = () => {
  window.location.reload();
}

watch(
  () => currentLanguage.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isSelectLanguage.value = !isSelectLanguage.value;
      localStorage.setItem("language", newVal);
    }
  }
)

</script>
<style scoped lang="scss"></style>
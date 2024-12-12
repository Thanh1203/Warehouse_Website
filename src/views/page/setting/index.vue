<template>
  <div class="w-full p-6 mb-6 bg-white rounded-xl">
    <div class="mb-2 font-semibold text-[20px]">{{ translate('Language') }}</div>
    <div class="flex gap-6 flex-wrap">
      <div>{{ translate('SelectLanguage') }}</div>
      <a-select 
        class="w-[150px]"
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
import { setLanguage } from '@/utils';

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
      setLanguage(newVal);
    }
  }
)

</script>
<style scoped lang="scss"></style>
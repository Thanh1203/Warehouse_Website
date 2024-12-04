<template>
  <div class="w-full mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 bg-[#37404a] rounded-lg overflow-hidden border border-[#464f5b]">    
    <div class="h-[140px] p-4 flex flex-col items-center justify-between md:col-span-2 lg:col-span-1 grid-border-item">
      <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
      <div class="text-[#aab8c5]">
        <NumberAnimation v-if="!loading" :from="0" :to="10000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="text-[#8391a2] text-base truncate">{{ translate("Products") }}</div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 md:col-span-2 lg:col-span-4 lg:grid-cols-4">
      <div class="h-[140px] p-4 flex flex-col items-center justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="300" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="text-[#8391a2] text-base truncate">{{ translate("Category") }}</div>
      </div>
      <div class="h-[140px] p-4 flex flex-col items-center justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="100" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="text-[#8391a2] text-base truncate">{{ translate("Classify") }}</div>
      </div>
      <div class="h-[140px] p-4 flex flex-col items-center justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="text-[#8391a2] text-base truncate">{{ translate("reportProduct.provider") }}</div>
      </div>
      <div class="h-[140px] p-4 flex flex-col items-center justify-between grid-border-item">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #8391a2" />
        <div class="text-[#aab8c5]">
          <NumberAnimation v-if="!loading" :from="0" :to="10" :duration="1" autoplay easing="linear" :format="theFormat" class="text-2xl" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
        <div class="text-[#8391a2] text-base truncate">{{ translate("reportProduct.sector") }}</div>
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

<template>
  <div class="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:gap-8 lg:grid-cols-4">
    <div class="bg-[#37404a] h-[160px] p-4 rounded-lg">
      <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byWeek") }}</div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="1000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="flex items-center truncate gap-3">
        <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCommon.sinceLastWeek') }}</template>
          <span class="text-[#8391a2]">{{ translate('reportCommon.sinceLastWeek') }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="bg-[#37404a] h-[160px] p-4 rounded-lg flex flex-col justify-between">
      <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byMonth") }}</div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="flex items-center truncate gap-3">
        <div :class="['text-sm', !statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCommon.sinceLastMonth') }}</template>
          <span class="text-[#8391a2]">{{ translate('reportCommon.sinceLastMonth') }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="bg-[#37404a] h-[160px] p-4 rounded-lg flex flex-col justify-between">
      <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byQuater") }}</div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="1500" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="flex items-center truncate gap-3">
        <div :class="['text-sm', statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCommon.sinceLastQuater') }}</template>
          <span class="text-[#8391a2]">{{ translate('reportCommon.sinceLastQuater') }}</span>
        </a-tooltip>
      </div>
    </div>

    <div class="bg-[#37404a] h-[160px] p-4 rounded-lg flex flex-col justify-between">
      <div class="text-[#8391a2] text-base truncate font-semibold w-full h-12">{{ translate("reportCommon.byYear") }}</div>
      <div class="text-[#aab8c5] mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="2000" :duration="1" autoplay easing="linear" :format="theFormat" class="text-xl" />
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
      </div>
      <div class="flex items-center truncate gap-3">
        <div :class="['text-sm', !statusTemp ? 'text-[#0acf97]' : 'text-[#fa5c7c]']">
          <font-awesome-icon :icon="['fas', 'arrow-up']" v-if="!statusTemp"/>
          <font-awesome-icon :icon="['fas', 'arrow-down']" v-else/>
          5.27%
        </div>
        <a-tooltip>
          <template #title>{{ translate('reportCommon.sinceLastYear') }}</template>
          <span class="text-[#8391a2]">{{ translate('reportCommon.sinceLastYear') }}</span>
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

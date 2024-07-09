<template>
  <div class="tw-mb-6">
    <span class="tw-text-[#aab8c5] tw-text-2xl tw-font-semibold">{{ translate('reportSale.title') }}</span>
  </div>

  <a-tabs v-model:activeKey="activeKey" type="card" class="new-tabs">
    <a-tab-pane key="1" :tab="translate('reportCommon.overview')">
      <CurrentReport/>
    </a-tab-pane>
    <a-tab-pane key="2" :tab="translate('reportCommon.detail')">
      <DetailReport/>
    </a-tab-pane>
  </a-tabs>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import {defineAsyncComponent, ref } from "vue";
import { useStore } from "vuex";

const DetailReport = defineAsyncComponent(() => import("./components/detailReport.vue"));
const CurrentReport = defineAsyncComponent(() => import("./components/currentReport.vue"));

const store = useStore();

const activeKey = ref('2');

// const fetchData = async (params) => {
//   await store.dispatch("report/fetchDataReportRevenue", params);
// }


// onMounted(async () => {
//   const currentYear = dayjs().year();
//   fetchData(currentYear);
// })

</script>
<style scoped lang="scss"></style>

<template>
  <div class="mb-6">
    <span class="text-[#aab8c5] text-2xl font-semibold">{{ translate('reportProduct.title') }}</span>
  </div>

  <Compo1/>

  <div class="w-full border-[#464f5b]">
    <div class="mb-3 text-[#aab8c5] text-lg">{{ translate('warehouse.list') }}</div>
      <a-tabs size="small" class="text-[#eef2f5]">
        <a-tab-pane v-for="(item, idx) in listWarehouse" :key="idx" :tab="item.name">
          <DetailReport/>
        </a-tab-pane>
      </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";

const Compo1 = defineAsyncComponent(() => import("./components/compo1.vue"));
const DetailReport = defineAsyncComponent(() => import('./components/detailReport.vue'));

// const store = useStore(); 

// const fetchData = async () => {
//   await store.dispatch("report/fetchDataReportProduct");
// };

// const fecthDataSaleProduct = async (params) => {
//   await store.dispatch("report/fetchSaleProduct", params);
// }


const listWarehouse = [
  {
    name: "kho 1"
  },
  {
    name: "kho 2"
  },
  {
    name: "kho 3"
  }
]
</script>
<style scoped lang="scss"></style>

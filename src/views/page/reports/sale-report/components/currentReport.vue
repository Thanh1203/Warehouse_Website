<template>
  <div class="mb-3 text-[#aab8c5] text-lg font-bold">{{ translate("Revenue") }}</div>
  <CurrentRevenue/>
  
  <div class="mb-3 text-[#aab8c5] text-lg font-bold">{{ translate("reportCommon.order") }}</div>
  <CurrentOrders/>

</template>
<script lang="ts" setup>
import { translate } from "@/languages/i18n";
import {defineAsyncComponent } from "vue";

const CurrentRevenue = defineAsyncComponent(() => import("./currentRevenue.vue"));
const CurrentOrders = defineAsyncComponent(() => import("./currentOrders.vue"));

</script>

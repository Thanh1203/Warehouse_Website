<template>
  <div class="tw-mb-6">
    <span class="tw-text-[#aab8c5] tw-text-2xl tw-font-semibold">{{ translate('Dashboard') }}</span>
  </div>

  <!-- <Compo1/>

  <Compo2/>

  <Compo3/> -->
  
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";

const store = useStore();

const Compo1 = defineAsyncComponent(() => import("./components/compo1.vue"));
const Compo2 = defineAsyncComponent(() => import("./components/compo2.vue"));
const Compo3 = defineAsyncComponent(() => import("./components/compo3.vue"));

// const dataDashboard = computed(() => store.getters["dashboard/dashboardData"]);
// const loading = computed(() => store.getters["dashboard/loading"]);

// const fetchData = async () => {
//   await store.dispatch("dashboard/getDataDashboard");
// };

// onMounted( async() => {
//   await fetchData();
// });
</script>
<style scoped lang="scss"></style>

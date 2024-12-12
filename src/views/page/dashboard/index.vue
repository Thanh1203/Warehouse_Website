<template>
  <div class="grid w-full gap-4 grid-cols-2 lg:gap-8 lg:grid-cols-4">
    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4 h-[89px]">
      <div class="rounded-full bg-[#bee6f9] min-w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("TotalProducts2") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalProduct" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4 h-[89px]">
      <div class="rounded-full bg-[#bee6f9] min-w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'users']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("TotalCustomer") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalCustomer" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4 h-[89px]">
      <div class="rounded-full bg-[#bee6f9] min-w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'warehouse']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("NumberOfWarehouses2") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalWarehouse" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4 h-[89px]">
      <div class="rounded-full bg-[#bee6f9] min-w-14 m-h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'percent']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("ReturnCustomerRate") }}</div>
        <div class="font-[700] text-[24px]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.rateReturn" :duration="1" autoplay easing="linear" :format="theFormat" :class="`text-[${setColor(dataDashboard?.rateReturn)}]`"/>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-between mt-6 gap-x-6">
    <div class="basis-1/4 flex flex-col gap-y-6 ">
      <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4 w-full items-center">
        <div class="rounded-full bg-[#bee6f9] w-8 h-8 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'users']" style="color: #FFFFFF;"/>
        </div>
        <div class="overflow-hidden flex items-center gap-x-3">
          <span class="truncate font-600 text-[14px]">{{ translate("NumberOfPersonnel") }}</span>
          <span class="font-[700] text-[24px] text-[#001f3f]">
            <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.tottalPersonnal" :duration="1" autoplay easing="linear" :format="theFormat" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
          </span>
        </div>
      </div>

      <div class="w-full h-full rounded-xl p-4 flex flex-col bg-white grow">
        <div class="mb-6 font-[700] text-[18px] text-[#001f3f]">{{ translate('productCategoryRatio') }}</div>
        <div class="grow flex" :class="!loading ? 'items-center' : 'items-start'">
          <Chartpie v-if="!loading" :data="chartPie"/>
          <a-skeleton v-else :loading="loading" active />
        </div>
      </div>
    </div>
    <div class=" basis-[70%] p-4 bg-white rounded-xl">
      <div class="font-[700] text-[24px] text-[#001f3f] mb-2">{{ translate("Year") }} {{ currentYear.format("YYYY") }}</div>
      <div class="mb-4 flex items-center gap-2">
        <span>{{ translate('CurrentTotalRevenue') }}:</span>
        <div  v-if="!loading">
          {{ dataDashboard?.totalRevenue?.toLocaleString('en-US') || 'NA' }}
        </div>
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      <div class="mt-6 h-[calc(100vh-285px)]">
        <Chartbar v-if="!loading" :data="chartBar"/>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import { computed, onMounted, ref, watch } from "vue";
import { MONTH_IN_YEAR } from "@/constants";
import dayjs, { Dayjs } from "dayjs";
import Chartpie from "@/components/Chartpie/index.vue";
import Chartbar from "@/components/Chartbar/index.vue";
import { getArrayRandColor, setColor } from "@/utils/common";
import { useStore } from "vuex";

const store = useStore();

const dataDashboard = computed(() => store.getters["dashboard/dashboardData"]);
const loading = computed(() => store.getters["dashboard/loading"]);
const currentYear = ref<Dayjs>(dayjs());
//char bar
const labelChart = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const chartBar = computed(() => ({
  labels: labelChart.value,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#1fe074",
      maxBarThickness: 20,
      minBarLength: 2,
      data: dataDashboard.value?.dataRenenue,
    },
  ],
}));

// char pie
const chartPie = computed(() => ({
  labels: dataDashboard.value?.dataCategoryRatio?.names,
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: dataDashboard.value?.dataCategoryRatio?.ratios,
    },
  ],
}));

const theFormat = (number) => {
  return number.toFixed(0);
};


const fetchData = async () => {
  await store.dispatch("dashboard/getDataDashboard");
};

onMounted( async() => {
  await fetchData();
});
</script>
<style scoped lang="scss"></style>

<template>
  <div class="tw-grid tw-w-full tw-gap-4 tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4 tw-h-[89px]">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-min-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalProducts2") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalProduct" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4 tw-h-[89px]">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-min-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'users']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("TotalCustomer") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalCustomer" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4 tw-h-[89px]">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-min-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'warehouse']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("NumberOfWarehouses2") }}</div>
        <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalWarehouse" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4 tw-h-[89px]">
      <div class="tw-rounded-full tw-bg-[#bee6f9] tw-min-w-14 tw-m-h-14 tw-flex tw-items-center tw-justify-center">
        <font-awesome-icon :icon="['fas', 'percent']" size="xl" style="color: #FFFFFF;"/>
      </div>
      <div class="tw-overflow-hidden">
        <div class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("ReturnCustomerRate") }}</div>
        <div class="tw-font-[700] tw-text-[24px]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.rateReturn" :duration="1" autoplay easing="linear" :format="theFormat" :class="`tw-text-[${setColor(dataDashboard?.rateReturn)}]`"/>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>
  </div>

  <div class="tw-w-full tw-flex tw-justify-between tw-mt-6 tw-gap-x-6">
    <div class="tw-basis-1/4 tw-flex tw-flex-col tw-gap-y-6 ">
      <div class="tw-bg-[#fff] tw-rounded-xl tw-p-4 tw-flex tw-gap-x-4 tw-w-full tw-items-center">
        <div class="tw-rounded-full tw-bg-[#bee6f9] tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center">
          <font-awesome-icon :icon="['fas', 'users']" style="color: #FFFFFF;"/>
        </div>
        <div class="tw-overflow-hidden tw-flex tw-items-center tw-gap-x-3">
          <span class="tw-truncate tw-font-600 tw-text-[14px]">{{ translate("NumberOfPersonnel") }}</span>
          <span class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f]">
            <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.tottalPersonnal" :duration="1" autoplay easing="linear" :format="theFormat" />
            <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
          </span>
        </div>
      </div>

      <div class="tw-w-full tw-h-full tw-rounded-xl tw-p-4 tw-flex tw-flex-col tw-bg-white tw-grow">
        <div class="tw-mb-6 tw-font-[700] tw-text-[18px] tw-text-[#001f3f]">{{ translate('productCategoryRatio') }}</div>
        <div class="tw-grow tw-flex" :class="!loading ? 'tw-items-center' : 'tw-items-start'">
          <Chartpie v-if="!loading" :data="chartPie"/>
          <a-skeleton v-else :loading="loading" active />
        </div>
      </div>
    </div>
    <div class=" tw-basis-[70%] tw-p-4 tw-bg-white tw-rounded-xl">
      <div class="tw-font-[700] tw-text-[24px] tw-text-[#001f3f] tw-mb-2">{{ translate("Year") }} {{ currentYear.format("YYYY") }}</div>
      <div class="tw-mb-4 tw-flex tw-items-center tw-gap-2">
        <span>{{ translate('CurrentTotalRevenue') }}:</span>
        <div  v-if="!loading">
          {{ dataDashboard?.totalRevenue.toLocaleString('en-US') }}
        </div>
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      <div class="tw-mt-6 tw-h-[calc(100vh-285px)]">
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

<template>
  <div class="tw-mb-6">
    <span class="tw-text-[#aab8c5] tw-text-2xl tw-font-semibold">{{ translate('Dashboard') }}</span>
  </div>

  <div class="tw-grid tw-w-full tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-gap-8 lg:tw-grid-cols-4">
    <div class="tw-bg-[#001529] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate('TotalProducts2') }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #727cf5;"/>
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalProduct" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl"/>
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
      </div>
    </div>

    <div class="tw-bg-[#001529] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate('TotalCustomer') }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'address-book']" size="xl" style="color: #727cf5;"/>
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalCustomer" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl"/>
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
      </div>
    </div>
     
    <div class="tw-bg-[#001529] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate('NumberOfWarehouses2') }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'warehouse']" size="xl" style="color: #727cf5;"/>
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalWarehouse" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl"/>
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
      </div>
    </div>

    <div class="tw-bg-[#001529] tw-h-[140px] tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate('NumberOfPersonnel') }}</div>
        <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
          <font-awesome-icon :icon="['fas', 'users']" size="xl" style="color: #727cf5;"/>
        </div>
      </div>
      <div class="tw-text-[#aab8c5] tw-mb-6">
        <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.tottalPersonnal" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl"/>
        <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
      </div>
    </div>
  </div>

  <div class="tw-mt-6 tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 xl:tw-grid-cols-4 xl:tw-gap-8">
    <div class="tw-w-full tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-1 xl:tw-gap-6">
      <div class="tw-bg-[#001529] tw-rounded-lg tw-p-4 tw-h-[140px] tw-flex tw-flex-col tw-justify-between">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate('CurrentRevenue') }}</div>
          <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
            <font-awesome-icon :icon="['fas', 'money-check-dollar']" size="xl" style="color: #727cf5;"/>
          </div>
        </div>

        <div class="tw-text-[#aab8c5] tw-mb-6">
          <NumberAnimation v-if="!loading" :from="0" :to="dataDashboard?.totalRevenue" :duration="1" autoplay easing="linear" :format="theFormatPrice" class="tw-text-2xl"/>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>

      <div class="tw-bg-[#001529] tw-rounded-lg tw-p-4 tw-h-[140px] tw-flex tw-flex-col tw-justify-between" :class="setTextColor(dataDashboard?.rateReturn)">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-[#8391a2] tw-text-base tw-truncate tw-font-semibold">{{ translate('ReturnCustomerRate') }}</div>
          <div class="tw-bg-[#464F74] tw-p-3 tw-rounded-lg">
            <font-awesome-icon :icon="['fas', 'percent']" size="xl" style="color: #727cf5;"/>
          </div>
        </div>
        <div class="tw-mb-6">
          <div v-if="!loading" class="tw-flex tw-items-center tw-truncate" :class="setTextColor(dataDashboard?.rateReturn)">
            <font-awesome-icon :icon="['fas', 'arrow-up']" />
            <NumberAnimation  :from="0" :to="dataDashboard?.rateReturn" :duration="1" autoplay easing="linear" :format="theFormat" class="tw-text-2xl tw-ml-2"/>
            <span class="tw-text-2xl tw-ml-1">%</span>
          </div>
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small"/>
        </div>
      </div>
    </div>

    <div class="tw-bg-[#001529] tw-rounded-lg tw-p-4 xl:tw-col-span-3 tw-h-[304px]">
      <div class="tw-text-xl tw-text-[#aab8c5] tw-font-semibold tw-mb-6 tw-h-8">{{ translate('WeeklyRevenue') }}</div>
      <div class="tw-flex tw-justify-center tw-h-[216px]">
        <Chartbar v-if="!loading" :data="chartBar"/>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>

  <div class="tw-mt-6 tw-grid tw-w-full tw-gap-4 tw-grid-cols-1 xl:tw-grid-cols-4 xl:tw-gap-8">
    <div class="tw-bg-[#001529] tw-rounded-lg tw-p-4 xl:tw-col-span-3">
      <div class="tw-w-full tw-mb-6 tw-text-[#aab8c5] tw-font-semibold tw-flex tw-items-center tw-justify-between tw-h-8">
        <span class="tw-text-xl">{{ translate('Revenue') }}</span>

        <div class="tw-flex tw-items-center">
          <a-button class="tw-mr-2 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="prevYear">
            <font-awesome-icon :icon="['fas', 'circle-chevron-left']" size="xl" />
          </a-button>
          
          <div class="tw-flex tw-items-center">
            <div class="tw-text-xl tw-mr-[-24px]">{{ translate('Year') }}</div>
            <a-date-picker
              class="date-picker-shedule tw-p-0 tw-m-0 tw-border-none"
              picker="year"
              v-model:value="formState.time"
              :bordered="false"
              :allowClear="false"
            >
              <template #suffixIcon> </template>
            </a-date-picker>
          </div>

          <a-button class="tw-mr-1 tw-text-[#aab8c5]" type="gray-hover" shape="circle" @click="nextYear">
            <font-awesome-icon :icon="['fas', 'circle-chevron-right']" size="xl" />
          </a-button>
        </div>
      </div>
      <div class="tw-h-[50vh] tw-flex tw-justify-center">
        <Chartline v-if="!loading" :data="chartLine"/>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>

    <div class="tw-bg-[#001529] tw-rounded-lg tw-p-4">
      <div class="tw-text-[#aab8c5] tw-h-8 tw-mb-6 tw-font-semibold">
        <div class="tw-text-xl tw-truncate">{{ translate('ProductDistributionCategory') }}</div>
      </div>
      <div class="tw-h-[50vh] tw-flex tw-justify-center">
        <Chartpie v-if="!loading" :data="chartPie"/>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { MONTH_IN_YEAR, DAY_IN_WEEK } from "@/constants";
import dayjs, { Dayjs } from "dayjs";
import Chartpie from "@/components/Chartpie/index.vue";
import Chartline from "@/components/Chartline/index.vue";
import Chartbar from "@/components/Chartbar/index.vue";
import { getArrayRandColor, setTextColor } from "@/utils/common";
import { useStore } from "vuex";

const store = useStore();

const dataDashboard = computed(() => store.getters["dashboard/dashboardData"]);
const loading = computed(() => store.getters["dashboard/loading"]);

const formState = reactive<{
  time: Dayjs;
}>({
  time: dayjs(),
});
//char bar
const labelChartLine = computed(() => {
  const result = [];
  MONTH_IN_YEAR.forEach((e) => {
    result.push(translate(`datetime.${e}`));
  });
  return result;
});

const chartLine = computed(() => ({
  labels: labelChartLine.value,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#6B74E0",
      borderColor: "#6B74E0",
      data: dataDashboard.value?.dataRenenue,
      tension: 0.4,
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

// chart line
const labelChartBar = computed(() => {
  const result = [];
  DAY_IN_WEEK.forEach((e) => {
    result.push(translate(`dayInWeek.${e}`));
  })
  return result;
});

const chartBar = computed(() => ({
  labels: labelChartBar.value,
  datasets: [
    {
      barPercentage: 0.5,
      label: translate("Revenue"),
      backgroundColor: "#10CD97",
      borderColor: "#10CD97",
      data: dataDashboard.value?.dataRenenue,
      tension: 0.4,
    },
  ],
}));

const theFormat = (number) => {
  return number.toFixed(0);
};

const theFormatPrice = (number) => {
  return number.toLocaleString('en-US');
}

const nextYear = () => {
  formState.time = dayjs(formState.time).add(1, "year");
};

const prevYear = () => {
  formState.time = dayjs(formState.time).subtract(1, "year");
};

const fetchData = async () => {
  await store.dispatch("dashboard/getDataDashboard");
};

watch(
  () => formState.time,
  () => {
    console.log(formState.time);
  }
)

onMounted( async() => {
  await fetchData();
});
</script>
<style scoped lang="scss"></style>

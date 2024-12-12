<template>
  <div class="grid w-full gap-4 grid-cols-2 lg:gap-8 lg:grid-cols-4">
    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
      <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("TotalProducts2") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportProduct?.totalProduct" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
      <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("NumberCategories") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportProduct?.totalCategory" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
      <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'database']" size="xl" style="color: #ffffff" />
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("NumberClassifications") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportProduct?.totalClassifies" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>

    <div class="bg-[#fff] rounded-xl p-4 flex gap-x-4">
      <div class="rounded-full bg-[#bee6f9] w-14 h-14 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'industry']" size="xl" style="color: #ffffff" />
      </div>
      <div class="overflow-hidden">
        <div class="truncate font-600 text-[14px]">{{ translate("NumberManufacturers") }}</div>
        <div class="font-[700] text-[24px] text-[#001f3f]">
          <NumberAnimation v-if="!loading" :from="0" :to="dataReportProduct?.totalProducer" :duration="1" autoplay easing="linear" :format="theFormat" />
          <a-skeleton-input v-else :loading="loading" :paragraph="{ rows: 0 }" active size="small" />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl p-6">
      <div class="font-[700]">{{ translate("CategoryStatistics") }}</div>
      <div class="mt-6 flex justify-center">
        <Chartpie :data="dataCategory" :show-legend="false" v-if="!loading" />
        <a-skeleton v-else :loading="loading" active />
      </div>
      <div class="mt-6 max-h-[50vh] overflow-hidden overflow-y-auto">
        <AntdTable ref="table" key-field="id" :index-column="false" :columns="categoryColumns" :has-checkbox="false"  :dataSource="dataReportProduct?.categoryList" v-if="!loading"> </AntdTable>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
    <div class="bg-white rounded-xl p-6">
      <div class="font-[700]">{{ translate("ClassificationStatistics") }}</div>
      <div class="mt-6 flex justify-center">
        <Chartpie :data="dataClassify" :show-legend="false" v-if="!loading"/>
        <a-skeleton v-else :loading="loading" active />
      </div>
      <div class="mt-6 max-h-[50vh] overflow-hidden overflow-y-auto">
        <AntdTable ref="table" key-field="id" :index-column="false" :columns="classifyColumns" :has-checkbox="false"  :dataSource="dataReportProduct?.classifyList" v-if="!loading"> </AntdTable>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
    <div class="bg-white rounded-xl p-6">
      <div class="font-[700]">{{ translate("ManufacturerStatistics") }}</div>
      <div class="mt-6 flex justify-center">
        <Chartpie :data="dataProducer" :show-legend="false" v-if="!loading"/>
        <a-skeleton v-else :loading="loading" active />
      </div>
      <div class="mt-6 max-h-[50vh] overflow-hidden overflow-y-auto">
        <AntdTable ref="table" key-field="id" :index-column="false" :columns="producerColumns" :has-checkbox="false"  :dataSource="dataReportProduct?.producerList" v-if="!loading"> </AntdTable>
        <a-skeleton v-else :loading="loading" active />
      </div>
    </div>
  </div>

  <a-form class="mt-6 w-full bg-white rounded-xl p-6 flex gap-4">
    <a-form-item class="">
      <div class="opacity-70 mb-2">{{ translate("Month") }}</div>
      <a-date-picker picker="month" :format="'MM'" :placeholder="translate('SelectMonth')" v-model:value="filterSearching.monthSelect"/>
    </a-form-item>
    <a-form-item class="">
      <div class="opacity-70 mb-2">{{ translate("Year") }}</div>
      <a-date-picker picker="year" :allowClear="false" :placeholder="translate('SelectYear')" v-model:value="filterSearching.yearSelect"/>
    </a-form-item>
    <a-form-item class="flex items-end !mr-3">
      <AntdButton :type="'primary'" ghost @click="handleSetTimePresent" :disabled="disableSetTime">
        <template #icon>
          <font-awesome-icon :icon="['far', 'clock']" />
        </template>
        <span class="ml-2">{{ translate("Present") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>

  <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div class="bg-white rounded-xl p-6">
      <div class="font-[700]">{{ translate("ListBestSellingProducts") }}</div>
      <div class="mt-6 h-screen overflow-hidden overflow-y-auto">
        <AntdTable ref="table" key-field="id" :index-column="true" :columns="sellProductColumns" :has-checkbox="false"  :dataSource="dataReportSaleProduct?.topSaleProduct" v-if="!loadingSaleProduct"></AntdTable>
        <a-skeleton v-else :loading="loadingSaleProduct" active />
      </div>
    </div>
    <div class="bg-white rounded-xl p-6">
      <div class="font-[700]">{{ translate("ListSlowSellingProducts") }}</div>
      <div class="mt-6 h-screen overflow-hidden overflow-y-auto">
        <AntdTable ref="table" key-field="id" :index-column="true" :columns="sellProductColumns" :has-checkbox="false"  :dataSource="dataReportSaleProduct?.excessInventory" v-if="!loadingSaleProduct"></AntdTable>
        <a-skeleton v-else :loading="loadingSaleProduct" active />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import NumberAnimation from "vue-number-animation";
import Chartpie from "@/components/Chartpie/index.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { getArrayRandColor } from "@/utils/common";
import AntdTable from "@/components/antd-table/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import { useStore } from "vuex";
import dayjs, { Dayjs } from "dayjs";

const store = useStore();

const dataReportProduct = computed(() => store.getters["report/reportProduct"]);
const loading = computed(() => store.getters["report/loading"]);
const loadingSaleProduct = computed(() => store.getters["report/loadingSaleProduct"]);
const dataReportSaleProduct = computed(() => store.getters["report/reportSaleProduct"]);
const dataCategory = computed(() => ({
  labels: dataReportProduct.value?.dataCategoryRatio?.names,
  datasets: [
    {
      backgroundColor: getArrayRandColor(3),
      data: dataReportProduct.value?.dataCategoryRatio?.ratios,
    },
  ],
}));
const dataClassify = computed(() => ({
  labels: dataReportProduct.value?.dataClassifyRatio?.names,
  datasets: [
    {
      backgroundColor: getArrayRandColor(4),
      data: dataReportProduct.value?.dataClassifyRatio?.ratios,
    },
  ],
}));
const dataProducer = computed(() => ({
  labels: dataReportProduct.value?.dataProducerRatio?.names,
  datasets: [
    {
      backgroundColor: getArrayRandColor(9),
      data: dataReportProduct.value?.dataProducerRatio?.ratios,
    },
  ],
}));
const categoryColumns = ref<Array<any>>([
  {
    title: translate("CategoryName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
  },
]);
const classifyColumns = ref<Array<any>>([
  {
    title: translate("ClassificationName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
  },
]);
const producerColumns = ref<Array<any>>([
  {
    title: translate("ManufacturerName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
  },
]);
const sellProductColumns = ref<Array<any>>([
  {
    title: translate("ProductName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
  },
]);

const filterSearching = reactive<{
  monthSelect: Dayjs | null
  yearSelect: Dayjs
}>({
  monthSelect: null,
  yearSelect: dayjs(),
}); 

const theFormat = (number) => {
  return number.toFixed(0);
};

const disableSetTime = computed(() => filterSearching.yearSelect.year() === dayjs().year() && filterSearching.monthSelect == null);

const handleSetTimePresent = () => {
  filterSearching.yearSelect = dayjs();
  filterSearching.monthSelect = null
};

const fetchData = async () => {
  await store.dispatch("report/fetchDataReportProduct");
};

const fecthDataSaleProduct = async (params) => {
  await store.dispatch("report/fetchSaleProduct", params);
}

watch(
  () => filterSearching.yearSelect,
  (val) => {
    filterSearching.monthSelect = null;
    const params = {
      year: val.year()
    };
    fecthDataSaleProduct(params);
  }, { deep: true }
);

watch(
  () => filterSearching.monthSelect,
  (val) => {
    if (val !== null) {
      const params = {
        year: val.year(),
        month: val.month() + 1,
      };
      fecthDataSaleProduct(params);
    }
  }, {deep: true}
)

onMounted(async () => {
  await fetchData();
  await fecthDataSaleProduct({year: dayjs().year()})
});
</script>
<style scoped lang="scss"></style>

<template>
  <div class="tw-mb-6 tw-p-6 tw-bg-white tw-rounded-xl">
    <a-Tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in listWhInfo" :key="item.id" :tab="item.name">
        <TabWhInfo :data="item" />
      </a-tab-pane>
    </a-Tabs>
  </div>

  <div class="tw-w-full tw-h-[510px] tw-flex tw-gap-6 tw-justify-between">
    <div class="tw-bg-white tw-rounded-xl tw-p-6">
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectDay") }}</div>
      <a-date-picker class="tw-mb-6" :placeholder="translate('SelectDay')" />
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectMonth") }}</div>
      <a-date-picker class="tw-mb-6" picker="month" :placeholder="translate('SelectMonth')" />
      <div class="tw-opacity-70 tw-mb-2">{{ translate("Selectquarter") }}</div>
      <a-date-picker class="tw-mb-6" picker="quarter" :placeholder="translate('Selectquarter')" />
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectYear") }}</div>
      <a-date-picker class="tw-mb-6" picker="year" :placeholder="translate('SelectYear')" />
      <AntdButton type="primary" class="tw-mb-6" @click="handleSubmitFilter">
        <span class="tw-text-sm tw-ml-2">{{ translate("LookUpExportHistory") }}</span>
      </AntdButton>
      <AntdButton :type="'text'" class="tw-mb-6" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </div>

    <div class="tw-grow tw-h-full">
      <Section class="tw-w-full tw-bg-white tw-h-full" :title="translate('ExportHistory')">
        <template #action>
          <AntdButton type="primary" @click="goToExportGoods">
            <span class="tw-text-sm tw-ml-2">{{ translate("ExportGoods") }}</span>
          </AntdButton>
        </template>
        <template #body>
          <AntdTable ref="table" key-field="id" :index-column="true" :columns="columns" class="tw-w-full tw-h-full tw-overflow-hidden tw-overflow-y-auto"> </AntdTable>
        </template>
      </Section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import Section from "@/components/section/index.vue";
import { useStore } from "vuex";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import dayjs, { Dayjs } from "dayjs";
import { removeNullObjects } from "@/utils/common";
import { useRouter } from "vue-router";

const TabWhInfo = defineAsyncComponent(() => import("./components/TabWarehouse.vue"));

const store = useStore();
const router = useRouter();

const listWhInfo = computed(() => store.getters["warehouse/warehouseInfo"]);

const activeKey = ref<number>(0);
const columns = ref<Array<any>>([
  {
    title: translate("GoodsReceiptCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "productQuantity",
    key: "productQuantity",
    align: "left",
  },
  {
    title: translate("ImportDate"),
    dataIndex: "importDate",
    key: "importDate",
    align: "left",
  },
  {
    title: translate("TotalValueOrder"),
    dataIndex: "totalValueOrder",
    key: "totalValueOrder",
    align: "left",
  },
]);
const searchingDay = ref<Dayjs>();
const searchingMonth = ref<Dayjs>();
const searchingQuarter = ref<Dayjs>();
const searchingYear = ref<Dayjs>();

const disabledDeleteFilter = computed(() => false);

const handleClearFilter = () => {
  searchingDay.value = null;
  searchingMonth.value = null;
  searchingQuarter.value = null;
  searchingYear.value = null;
};

const handleSubmitFilter = () => {
  let params: any = {
    day: null,
    month: null,
    year: null,
    isQuarter: false,
  };

  if (searchingDay.value) {
    params.day = searchingDay.value.format("DD");
    params.month = searchingDay.value.format("MM");
    params.year = searchingDay.value.format("YYYY");
    params.isQuarter = false;
  }

  if (searchingMonth.value) {
    params.day = null;
    params.month = searchingMonth.value.format("MM");
    params.year = searchingMonth.value.format("YYYY");
    params.isQuarter = false;
  }

  if (searchingQuarter.value) {
    params.day = null;
    params.month = searchingQuarter.value.format("MM");
    params.year = searchingQuarter.value.format("YYYY");
    params.isQuarter = true;
  }

  if (searchingYear.value) {
    params.day = null;
    params.month = null;
    params.year = searchingYear.value.format("YYYY");
    params.isQuarter = false;
  }

  fetchData(removeNullObjects(params));
};

const goToExportGoods = () => {
  router.push(`/export-goods/${activeKey.value}`);
};

const fetchData = (params) => {
  console.log(params);
};

watch(
  () => searchingDay.value,
  (val) => {
    if (val) {
      searchingMonth.value = null;
      searchingQuarter.value = null;
      searchingYear.value = null;
    }
  },
);

watch(
  () => searchingMonth.value,
  (val) => {
    if (val) {
      searchingDay.value = null;
      searchingQuarter.value = null;
      searchingYear.value = null;
    }
  },
);

watch(
  () => searchingQuarter.value,
  (val) => {
    if (val) {
      searchingDay.value = null;
      searchingMonth.value = null;
      searchingYear.value = null;
    }
  },
);

watch(
  () => searchingYear.value,
  (val) => {
    if (val) {
      searchingDay.value = null;
      searchingMonth.value = null;
      searchingQuarter.value = null;
    }
  },
);

onMounted(async () => {
  const temp = await store.dispatch("warehouse/getWarehouse", null);
  activeKey.value = temp?.data[0].id;
});
</script>
<style scoped lang="scss"></style>

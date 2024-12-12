<template>
  <div class="mb-6 p-6 bg-white rounded-xl">
    <a-Tabs v-model:activeKey="activeKey" type="card" class="h-[177px]" v-if="!loading">
      <a-tab-pane v-for="item in listWhInfo" :key="item.id" :tab="item.name">
        <TabWhInfo :data="item" />
      </a-tab-pane>
    </a-Tabs>
    <a-skeleton v-else active />
  </div>

  <div class="w-full flex gap-6 justify-between">
    <div class="bg-white rounded-xl p-6 basis-1/4">
      <div class="opacity-70 mb-2">{{ translate("SelectDay") }}</div>
      <a-date-picker class="mb-6" :placeholder="translate('SelectDay')" v-model:value="searchingDay" :allowClear="false" />
      <div class="opacity-70 mb-2">{{ translate("SelectMonth") }}</div>
      <a-date-picker class="mb-6" picker="month" :placeholder="translate('SelectMonth')" v-model:value="searchingMonth" :allowClear="false" />
      <div class="opacity-70 mb-2">{{ translate("SelectYear") }}</div>
      <a-date-picker class="mb-6" picker="year" :placeholder="translate('SelectYear')" v-model:value="searchingYear" :allowClear="false" />
      <AntdButton type="primary" class="mb-6 w-[200px]" @click="handleSubmitFilter">
        <span class="text-sm ml-2">{{ translate("LookUpExportHistory") }}</span>
      </AntdButton>
      <AntdButton :type="'text'" class="mb-6" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </div>

    <div class="grow min-h-[calc(100vh-240px)]">
      <Section class="w-full bg-white h-full" :title="translate('ExportHistory')">
        <template #action>
          <AntdButton type="primary" @click="goToExportGoods">
            <span class="text-sm ml-2">{{ translate("ExportGoods") }}</span>
          </AntdButton>
        </template>
        <template #body>
          <AntdTable
            ref="table"
            key-field="id"
            :index-column="true"
            :columns="columns"
            :data-source="listWHExport"
            class="w-full h-[60vh] overflow-hidden overflow-y-auto"
            v-if="!loadingExport"
          >
          </AntdTable>

          <a-skeleton v-else active />
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
import { useRoute, useRouter } from "vue-router";
import TabWhInfo from "@/components/list-tab-warehouse/index.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const listWhInfo = computed(() => store.getters["warehouse/warehouseInfo"]);
const listWHExport = computed(() => store.getters["warehouse/warehouseExport"]);
const loading = computed(() => store.getters["warehouse/loading"]);
const loadingExport = computed(() => store.getters["warehouse/loadingExport"]);

const activeKey = ref<number>(0);
const columns = ref<Array<any>>([
  {
    title: translate("GoodsIssueCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("ProductQuantity"),
    dataIndex: "totalProduct",
    key: "totalProduct",
    align: "left",
  },
  {
    title: translate("ImportDate"),
    dataIndex: "timeCreate",
    key: "timeCreate",
    align: "left",
  },
  {
    title: translate("TotalValueOrder"),
    dataIndex: "totalValue",
    key: "totalValue",
    align: "left",
  },
]);
const searchingDay = ref<Dayjs>();
const searchingMonth = ref<Dayjs>();
const searchingYear = ref<Dayjs>();

const disabledDeleteFilter = computed(() => false);

const handleClearFilter = () => {
  searchingDay.value = null;
  searchingMonth.value = null;
  searchingYear.value = null;
  fetchData({ id: activeKey.value, params: null });
};

const handleSubmitFilter = () => {
  let params: any = {
    day: null,
    month: null,
    year: null,
  };

  if (searchingDay.value) {
    params.day = searchingDay.value.format("DD");
    params.month = searchingDay.value.format("MM");
    params.year = searchingDay.value.format("YYYY");
  }

  if (searchingMonth.value) {
    params.day = null;
    params.month = searchingMonth.value.format("MM");
    params.year = searchingMonth.value.format("YYYY");
  }

  if (searchingYear.value) {
    params.day = null;
    params.month = null;
    params.year = searchingYear.value.format("YYYY");
  }
  const payload = {
    id: activeKey.value,
    params: removeNullObjects(params),
  };

  fetchData(payload);
};

const goToExportGoods = () => {
  router.push(`/export-goods/${activeKey.value}`);
};

const fetchData = async (params) => {
  await store.dispatch("warehouse/getWarehouseExport", params);
};

watch(
  () => searchingDay.value,
  (val) => {
    if (val) {
      searchingMonth.value = null;
      searchingYear.value = null;
    }
  },
);

watch(
  () => searchingMonth.value,
  (val) => {
    if (val) {
      searchingDay.value = null;
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
    }
  },
);

watch(
  () => activeKey.value,
  (val) => {
    fetchData({ id: val, params: null });
  },
);

onMounted(async () => {
  const temp = await store.dispatch("warehouse/getWarehouse", null);
  activeKey.value = temp?.data[0].id;
});
</script>
<style scoped lang="scss"></style>

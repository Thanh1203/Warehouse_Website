<template>
  <div class="tw-mb-6 tw-p-6 tw-bg-white tw-rounded-xl">
    <a-Tabs v-model:activeKey="activeKey" type="card" class="tw-h-[177px]" v-if="!loading">
      <a-tab-pane v-for="item in listWhInfo" :key="item.id" :tab="item.name">
        <TabWhInfo :data="item" />
      </a-tab-pane>
    </a-Tabs>

    <a-skeleton v-else active />
  </div>

  <div class="tw-w-full tw-flex tw-gap-6 tw-justify-between">
    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-basis-1/4">
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectDay") }}</div>
      <a-date-picker class="tw-mb-6" :placeholder="translate('SelectDay')" v-model:value="searchingDay" :allowClear="false" />
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectMonth") }}</div>
      <a-date-picker class="tw-mb-6" picker="month" :placeholder="translate('SelectMonth')" v-model:value="searchingMonth" :allowClear="false" />
      <div class="tw-opacity-70 tw-mb-2">{{ translate("SelectYear") }}</div>
      <a-date-picker class="tw-mb-6" picker="year" :placeholder="translate('SelectYear')" v-model:value="searchingYear" :allowClear="false" />
      <AntdButton type="primary" class="tw-mb-6 tw-w-[200px]" @click="handleSubmitFilter">
        <span class="tw-text-sm tw-ml-2">{{ translate("LookUpImportHistory") }}</span>
      </AntdButton>
      <AntdButton :type="'text'" class="tw-mb-6" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </div>

    <div class="tw-grow tw-min-h-[calc(100vh-240px)]">
      <Section class="tw-w-full tw-bg-white tw-h-full" :title="translate('ImportHistory')">
        <template #action>
          <AntdButton type="primary" @click="goImportGodds">
            <span class="tw-text-sm tw-ml-2">{{ translate("ImportGoods") }}</span>
          </AntdButton>
        </template>
        <template #body>
          <AntdTable
            ref="table"
            key-field="id"
            :index-column="true"
            :columns="columns"
            :dataSource="listWHImport"
            class="tw-w-full tw-h-[60vh] tw-overflow-hidden tw-overflow-y-auto"
            v-if="!loading"
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
const listWHImport = computed(() => store.getters["warehouse/warehouseImport"]);
const loading = computed(() => store.getters["warehouse/loading"]);

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
]);
const searchingDay = ref<Dayjs>();
const searchingMonth = ref<Dayjs>();
const searchingYear = ref<Dayjs>();

const disabledDeleteFilter = computed(() => false);

const handleClearFilter = () => {
  searchingDay.value = null;
  searchingMonth.value = null;
  searchingYear.value = null;
  fetchData({id: activeKey.value, params: null});
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
    params: removeNullObjects(params)
  }

  fetchData(payload);
};

const goImportGodds = () => {
  router.push(`/import-goods/${activeKey.value}`);
};

const fetchData = async (params) => {
  await store.dispatch("warehouse/getHistoryImport", params);
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

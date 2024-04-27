<template>
  <div class="tw-mb-6 tw-p-6 tw-bg-white tw-rounded-xl">
    <a-Tabs v-model:activeKey="activeKey" type="card" class="tw-h-[177px]">
      <a-tab-pane v-for="item in listWhInfo" :key="item.id" :tab="item.name">
        <TabWhInfo :data="item" />
      </a-tab-pane>
    </a-Tabs>
  </div>

  <a-form class="tw-mb-6 tw-px-6 tw-py-5 tw-bg-white tw-rounded-xl tw-flex">
    <a-form-item class="tw-w-[300px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("ProductCode") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.code" class="tw-mt-2" />
    </a-form-item>

    <a-form-item class="tw-w-[300px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("ProductName") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.name" class="tw-mt-2" />
    </a-form-item>

    <a-form-item class="tw-flex tw-items-end">
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter" @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>

  <Section :title="translate('ListProducts')" :subTitle="translate('TotalProducts')" :number="String(totalProduct)">
    <template #body> 
      <AntdTable
        class="tw-h-[50vh] tw-w-full tw-overflow-hidden tw-overflow-y-auto"
        :columns="columns"
        ref="table"
        key-field="id"
        :index-column="true"
        :has-checkbox="false"
        :no-sort="true"
        :dataSource="dataFake"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'unitPrice' && record">
            <div>
              <a-input v-if="checkRowUpdate(record.id)" v-model:value="untiPriceState"/>
              <template v-else>
                {{ record.unitPrice }}
              </template>
            </div>
          </template>

          <template v-if="column.key === 'action' && record">
            <div v-if="!checkRowUpdate(record.id)">
              <AntdButton type="link" @click="handleEditUnitPrice(record.id)">
                {{ translate('EditUnitPrice') }}
              </AntdButton>
            </div>
            <div v-else class="tw-flex tw-gap-4">
              <AntdButton danger ghost @click="cancelEdit">
                {{ translate('Cancel') }}
              </AntdButton>
              
              <AntdButton type="primary" ghost @click="submitEdit">
                {{ translate('Save') }}
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import TabWhInfo from "@/components/list-tab-warehouse/index.vue";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";

const store = useStore();

const listWhInfo = computed(() => store.getters["warehouse/warehouseInfo"]);
const totalProduct = computed(() => 100);

const editUnitPrice = ref<number|null>(null);
const activeKey = ref<number>(0);
const columns = ref<Array<any>>([
  {
    title: translate("ProductCode"),
    dataIndex: "code",
    key: "code",
    align: "left",
  },
  {
    title: translate("ProductName"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("UnitPrice"),
    dataIndex: "unitPrice",
    key: "unitPrice",
    align: "left",
  },
  {
    dataIndex: "action",
    key: "action",
    width: 150,
    align: "center",
    fixed: "right",
  },
]);
const untiPriceState = ref<number | null>(100);

const filterSearching = reactive<any>({
  name: "",
  code: "",
});

const disabledDeleteFilter = computed(() => filterSearching?.name?.length === 0 && filterSearching?.code?.length === 0);

const handleClearFilter = () => {
  filterSearching.name = "";
  filterSearching.code = "";
};

const checkRowUpdate = (id) => {
  return id === editUnitPrice.value;
}

const handleEditUnitPrice = (id) => {
  editUnitPrice.value = id;
};

const cancelEdit = () => {
  editUnitPrice.value = null;
  untiPriceState.value = null;
};

const submitEdit = () => {
  editUnitPrice.value = null;
};

onMounted(async () => {
  const temp = await store.dispatch("warehouse/getWarehouse", null);
  activeKey.value = temp?.data[0].id;
});

const dataFake = [
  {
    id: 1,
    code: "sp01",
    name: "spp01",
    unitPrice: 100,
  },
  {
    id: 2,
    code: "sp02",
    name: "spp02",
    unitPrice: 100,
  },
  {
    id: 3,
    code: "sp03",
    name: "spp03",
    unitPrice: 100,
  },
  {
    id: 4,
    code: "sp04",
    name: "spp04",
    unitPrice: 100,
  },
  {
    id: 5,
    code: "sp05",
    name: "spp05",
    unitPrice: 100,
  },
  {
    id: 6,
    code: "sp06",
    name: "spp05",
    unitPrice: 100,
  },
]
</script>

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

  <Section :title="translate('ListProducts')" :subTitle="translate('TotalProducts')" :number="String(productConfigUnitPrice?.length)">
    <template #body>
      <AntdTable
        class="tw-h-[50vh] tw-w-full tw-overflow-hidden tw-overflow-y-auto"
        :columns="columns"
        ref="table"
        key-field="id"
        :index-column="true"
        :has-checkbox="false"
        :no-sort="true"
        :dataSource="productConfigUnitPrice"
      >
        <template #custom-body="{ column, record }">
          <template v-if="column.key === 'unitPrice' && record">
            <div>
              <div v-if="checkRowUpdate(record.id)">
                <a-input v-model:value="v$.valUnitPrice.$model" class="tw-mb-2" />
                <ErrorMess :params="[64]" :title="translate('UnitPrice')" :validator="v$.valUnitPrice.$errors[0]?.$validator" />
              </div>
              <template v-else>
                {{ record.unitPrice }}
              </template>
            </div>
          </template>

          <template v-if="column.key === 'action' && record">
            <div v-if="!checkRowUpdate(record.id)">
              <AntdButton type="link" @click="handleEditUnitPrice(record)">
                {{ translate("EditUnitPrice") }}
              </AntdButton>
            </div>
            <div v-else class="tw-flex tw-gap-4">
              <AntdButton danger ghost @click="cancelEdit">
                {{ translate("Cancel") }}
              </AntdButton>

              <AntdButton type="primary" ghost @click="submitEdit">
                {{ translate("Save") }}
              </AntdButton>
            </div>
          </template>
        </template>
      </AntdTable>
    </template>
  </Section>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import TabWhInfo from "@/components/list-tab-warehouse/index.vue";
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import Section from "@/components/section/index.vue";
import AntdTable from "@/components/antd-table/index.vue";
import { debounce } from "vue-debounce";
import { removeNullObjects } from "@/utils/common";
import { useRoute, useRouter } from "vue-router";
import { REGEX_POSITIVE_INTERGER } from "@/constants";
import useVuelidate from "@vuelidate/core";
import ErrorMess from "@/components/error-mess/index.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const listWhInfo = computed(() => store.getters["warehouse/warehouseInfo"]);
const productConfigUnitPrice = computed(() => store.getters["product/productConfigUnitPrice"]);

const editUnitPrice = ref<number | null>(null);
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
const unitPriceSate = reactive<any>({
  valUnitPrice: 0,
});

const filterSearching = reactive<any>({
  name: "",
  code: "",
});

const rules = {
  valUnitPrice: {
    positiveInteger: (value) => {
      if (value === undefined || value === null || value === "") {
        return true;
      }
      return REGEX_POSITIVE_INTERGER.test(value);
    },
  },
};

const v$ = useVuelidate(rules, unitPriceSate);

const disabledDeleteFilter = computed(() => filterSearching?.name?.length === 0 && filterSearching?.code?.length === 0);

const handleClearFilter = () => {
  filterSearching.name = "";
  filterSearching.code = "";
};

const checkRowUpdate = (id) => {
  return id === editUnitPrice.value;
};

const handleEditUnitPrice = (item) => {
  editUnitPrice.value = item.id;
  unitPriceSate.valUnitPrice = item.unitPrice;
};

const cancelEdit = () => {
  editUnitPrice.value = null;
  unitPriceSate.valUnitPrice = null;
};

const submitEdit = async () => {
  if (unitPriceSate.valUnitPrice) {
    const payload = {
      id: activeKey.value,
      params: {
        ...route.query,
      },
      state: {
        productId: editUnitPrice.value,
        untiPirce: unitPriceSate.valUnitPrice,
      },
    };
    await store.dispatch("product/updateUnitPrice", removeNullObjects(payload));
  }
  editUnitPrice.value = null;
  unitPriceSate.valUnitPrice = null;
};

const fetchProductInWh = async (params) => {
  await store.dispatch("product/getProductConfigUnitPrice", params);
};

watch(
  () => filterSearching,
  debounce(() => {
    const params = {
      code: filterSearching?.code,
      name: filterSearching?.name,
    };
    const payload = {
      id: activeKey.value,
      params: removeNullObjects(params),
    };
    fetchProductInWh(payload);
  }, 500),
  { deep: true },
);

watch(
  () => activeKey.value,
  (val) => {
    fetchProductInWh({ id: val });
  },
);

onMounted(async () => {
  const temp = await store.dispatch("warehouse/getWarehouse", null);
  activeKey.value = temp?.data[0].id;
});
</script>

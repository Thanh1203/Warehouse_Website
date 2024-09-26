<template>
  <div class="tw-mb-6 tw-w-full tw-rounded-lg section-ctn tw-p-4">
    <div class="tw-mb-4 tw-font-semibold tw-flex tw-items-center tw-justify-between">
      <div>{{ translate("product.list") }}</div>
      <a-button type="text" danger :disabled="disabledDeleteBtn" @click="handleDelete(listSelected)">
        <font-awesome-icon :icon="['fas', 'trash']" />
        <span class="tw-ml-3">
          {{ translate("common.delete") }}
          <span v-if="listSelected?.length > 0">({{ listSelected?.length }})</span>
        </span>
      </a-button>
    </div>
    <AntdTable
      :columns="columns"
      :dataSource="dataProduct"
      :isPagination="true"
      :isLoading="loadTable"
      :hasCheckbox="true"
      :currentPage="currentPage"
      keyField="code"
      @onSelected="handleSelectRows"
    >
      <template #custom-body="{ column, record }">
        <template v-if="column.key === 'quantity' && record">
          <a-input-number v-model:value="record.quantity"/>
        </template>

        <template v-if="column.key === 'unitPrice' && record">
          <a-input-number v-model:value="record.unitPrice"/>
        </template>
      </template>
    </AntdTable>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, ref } from "vue";
import AntdTable from "@/components/antd-table/index.vue";
import { useStore } from "vuex";

const store = useStore();

const currentPage = ref<number>(1);
const loadTable = ref<boolean>(false);

const columns = ref<any[]>([
  {
    title: translate("product.title"),
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: translate("common.quantity"),
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: "30%",
  },
  {
    title: translate("product.unitPrice"),
    dataIndex: "unitPrice",
    key: "unitPrice",
    align: "center",
    width: "30%",
  },
]);

const dataProduct = computed(() => store.getters["warehouse/productsSelected"]);

const listSelected = ref<any[]>([]);

const handleSelectRows = (rows: any) => {
  listSelected.value = rows.value.map((x: any) => x?.code);
};

const disabledDeleteBtn = computed(() => listSelected?.value?.length == 0);

const handleDelete = (val) => {
  store.dispatch("warehouse/deleteProductsSelected", val);
}
</script>

<template>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
    :rowKey="keyField"
    :sticky="sticky"
    :rowSelection="rowSelection"
    :loading="isLoading"
    @change="onChange"
  >
    <template #bodyCell="{column, record}">
      <slot name="custom-body" :column="column" :record="record"></slot>
    </template>
    <template #emptyText>
      <a-empty :description="translate('noData')" />
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, ref } from "vue";
import VueTypes from "vue-types";

const props = defineProps({
  title: VueTypes.string.def(null),
  columns: VueTypes.array.def([]),
  dataSource: VueTypes.array.def([]),
  keyField: VueTypes.string.def("id"),
  sticky: VueTypes.bool.def(true),
  hasCheckbox: VueTypes.bool.def(false),
  checkStrictly: VueTypes.bool.def(true),
  pagesize: VueTypes.number.def(10),
  currentPage: VueTypes.number.def(1),
  isPagination: VueTypes.bool.def(true),
  isLoading: VueTypes.bool.def(false),
});

const emit = defineEmits(["onSelected", "onChange"]);

const selectRows = ref<any[]>([]);

const rowSelection = props.hasCheckbox
  ? ref({
      checkStrictly: props.checkStrictly,
      onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
        selectRows.value = selectedRows;
        emit("onSelected", selectRows);
      },
      onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
        selectRows.value = selectedRows;
        emit("onSelected", selectRows);
      },
    })
  : null;

const onChange = (pagination, filters, sorter, extra) => {
  emit("onChange", pagination, filters, sorter, extra);
};

const pagination = computed(() => {
  if (props.isPagination) {
    return {
      total: props.dataSource.length,
      current: props.currentPage,
      pageSize: props.pagesize,
    };
  } else {
    return false;
  }
});
</script>

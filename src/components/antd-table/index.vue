<template>
  <a-table :columns="tableColumns" :data-source="dataSource" :pagination="pagination" :rowSelection="rowSelection" :sticky="sticky" :customRow="customRow" :rowKey="keyField">
    <template #bodyCell="{ column, record }">
      <slot name="custom-body" :column="column" :record="record"></slot>
    </template>
    <!-- <template v-if="title" #title>{{ title }}</template>
    <template #headerCell="{ column }">
      <slot name="custom-header" :column="column">
        <div>{{ column.title }}</div>
      </slot>
    </template> -->
    <!-- <slot name="custom-column"></slot> -->
    <template #emptyText>
      <a-empty :description="translate('noData')" />
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import VueTypes from "vue-types";
import { translate } from "@/languages/i18n";

const emit = defineEmits(["onSelected", "onRowClicked"]);

const props = defineProps({
  title: VueTypes.string,
  columns: VueTypes.array.def([]),
  dataSource: VueTypes.array.def([]),
  keyField: VueTypes.string.def("id"),
  hasCheckbox: VueTypes.bool.def(false),
  pagination: VueTypes.bool.def(false),
  indexColumn: VueTypes.bool.def(false),
  noSort: VueTypes.bool.def(false),
  pageSize: VueTypes.number.def(10),
  checkStrictly: VueTypes.bool.def(true),
  sticky: VueTypes.bool.def(true),
});

const page = ref(1);
const size = ref(props.pageSize);
const selectedRows = ref<Array<any>>([]);

const tableColumns = computed(() => {
  if (!props.columns.length) return null;
  if (props.indexColumn)
    return [
      {
        title: "STT",
        align: "center",
        width: 80,
        customRender({ index }: any) {
          return index + 1 + (page.value - 1) * size.value;
        },
      },
      ...props.columns,
    ];
  return props.columns;
});

const rowSelection = props.hasCheckbox
  ? ref({
      checkStrictly: props.checkStrictly,
      onSelect: (record: any, selected: any, row: Array<any>) => {
        selectedRows.value = row;
        emit("onSelected", selectedRows);
      },
      onSelectAll: (selected: any, rows: Array<any>) => {
        selectedRows.value = rows;
        emit("onSelected", selectedRows);
      },
    })
  : null;

const customRow = (record: any) => {
  return {
    onClick: () => {
      emit("onRowClicked", record);
    },
  };
};
</script>

<template>
  <a-table 
  :columns="tableColumns" 
  :data-source="dataSource" 
  :pagination="pagination"
  :rowSelection="rowSelection"
  :sticky="sticky"
  :rowKey="keyField"
  :loading="isLoading"
  @change="onChange"
  >
    <template #bodyCell="{column, record}">
      <slot name="custom-body" :column="column" :record="record"></slot>
    </template>
    <template #emptyText>
      <a-empty :description="translate('noData')" />
    </template>>
  </a-table>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, ref, watch } from "vue";
import VueTypes from "vue-types";

const emit = defineEmits(["onSelected", "onChange"]);

const props = defineProps({
  title: VueTypes.string,
  columns: VueTypes.array.def([]),
  dataSource: VueTypes.array.def([]),
  keyField: VueTypes.string.def("id"),
  hasCheckbox: VueTypes.bool.def(false),
  pagination: VueTypes.bool.def(false),
  indexColumn: VueTypes.bool.def(false),
  pageSize: VueTypes.number.def(10),
  checkStrictly: VueTypes.bool.def(true),
  sticky: VueTypes.bool.def(true),
  isLoading: VueTypes.bool.def(false),
});

const page = ref(1);
const size = ref(props.pageSize);
const selectRows = ref<Array<any>>([]);

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

const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  emit("onChange", pagination, filters, sorter, extra);
};

const rowSelection = computed(() => {
  if (!props.hasCheckbox) return null;
  return {
    checkStrictly: props.checkStrictly,
    onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
      selectRows.value = selectedRows;
      emit("onSelected", selectRows.value);
    },
    onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
      selectRows.value = selectedRows;
      emit("onSelected", selectRows.value);
    },
  };
});

</script>
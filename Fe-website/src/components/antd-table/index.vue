<template>
  <a-table/>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import VueTypes from "vue-types";

const props = defineProps({
  columns: VueTypes.array.def([]),
  dataSource: VueTypes.array.def([]),
  keyField: VueTypes.string.def("id"),
  hasCheckbox: VueTypes.bool.def(false),
  pagination: VueTypes.bool.def(false),
  indexColumn: VueTypes.bool.def(false),
  noSort: VueTypes.bool.def(false),

});
</script>
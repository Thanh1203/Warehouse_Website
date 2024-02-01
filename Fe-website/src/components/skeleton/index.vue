<template>
  <a-skeleton active :paragraph="{ rows: rows }" />
</template>
<script setup lang="ts">
const props = defineProps({
  rows: { type: Number, default: 3 },
});
</script>
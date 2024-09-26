<template>
  <component  :is="route.meta?.layout || 'div'">
    <RouterView/>
  </component>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<style scoped>
</style>

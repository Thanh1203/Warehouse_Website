<template>
  <HeaderPage/>
  <div class="w-full relative top-16 overflow-hidden overflow-y-auto h-auto min-h-full p-6">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import HeaderPage from "@/components/header/index.vue";

</script>
<template>
<div class="tw-flex">
  <SlideMenu/>
  <div class="tw-grow">
    <HeaderPage/>
    <div class="tw-bg-[#2E3A45] tw-p-6 tw-overflow-hidden tw-overflow-y-auto tw-min-h-[calc(100dvh-70px)]">
      <slot></slot>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import SlideMenu from "@/components/slide-menu/index.vue"
import HeaderPage from "@/components/header/index.vue";
</script>

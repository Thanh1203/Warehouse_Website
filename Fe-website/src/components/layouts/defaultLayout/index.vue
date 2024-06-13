<template>
<div class="tw-flex">
  <SlideMenu/>
  <div class="tw-grow tw-overflow-hidden tw-overflow-y-auto tw-h-screen">
    <HeaderPage class="tw-fixed tw-z-[9999] tw-w-[calc(100%-90px)]"/>
    <div class="tw-bg-[#2E3A45] tw-p-6 tw-mt-[70px]">
      <slot></slot>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import SlideMenu from "@/components/slide-menu/index.vue"
import HeaderPage from "@/components/header/index.vue";
</script>

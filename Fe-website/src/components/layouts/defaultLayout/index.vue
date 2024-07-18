<template>
  <HeaderPage/>
  
  <div class="tw-w-full tw-relative tw-top-16 tw-flex tw-h-[calc(100dvh-4rem)]">
    <div class="tw-h-auto tw-border-r">
      <SlideMenu/>
    </div>
    <div class="tw-grow tw-p-6 tw-overflow-hidden tw-overflow-y-auto">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import SlideMenu from "@/components/slide-menu/index.vue"
import HeaderPage from "@/components/header/index.vue";
</script>

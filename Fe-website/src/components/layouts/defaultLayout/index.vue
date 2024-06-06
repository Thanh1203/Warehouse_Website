<template>
<div class="default-layout">
  <SlideMenu/>
  <div class="body-layout">
    <HeaderPage/>
    <div class="tw-p-4 tw-overflow-hidden tw-overflow-y-auto tw-w-full tw-h-[calc(100vh-70px)]">
      <slot></slot>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import SlideMenu from "@/components/slide-menu/index.vue"
import HeaderPage from "@/components/header/index.vue";
</script>
<style scoped lang="scss">
.default-layout {
  height: 100vh;
  width: 100%;
  overflow: auto;
  display: flex;
  .body-layout {
    flex-grow: 1;
    background-color: #F5F7FE;
    // height: 100dvh;
    // width: 100%;
  }
}
</style>

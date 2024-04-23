<template>
<div class="default-layout">
  <SlideMenu/>
  <div class="body-layout">
    <div>
      <slot></slot>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import SlideMenu from "@/components/slide-menu/index.vue"
</script>
<style scoped lang="scss">
.default-layout {
  height: 100vh;
  width: 100%;
  overflow: auto;
  display: flex;
  .body-layout {
    flex-grow: 1;
    background-color: #efefef;
    height: 100vh;
    width: 100%;
    padding: 24px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>

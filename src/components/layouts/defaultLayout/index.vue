<template>
<div class="flex flex-col h-screen">
  <HeaderPage/>
  <div class="grow flex overflow-hidden">
    <SlideMenu/>
    <div class="w-full p-4 overflow-hidden">
      <slot/>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import SlideMenu from "@/components/slide-menu/index.vue"
import HeaderPage from "@/components/header/index.vue";
</script>

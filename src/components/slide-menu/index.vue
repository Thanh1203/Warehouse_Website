<template>
  <a-menu theme="dark" :items="menuAdmin" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" @click="handleClickMenu" mode="inline" :inline-collapsed="true" class="h-full w-24"/>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue"
import { menuAdmin } from "@/constants/pcMenu";
import { PC_MENU } from "@/constants/index";
const router = useRouter();
const route = useRoute();

const selectedKeys = ref<string[]>(["DASHBOARD"]);
const openKeys = ref<string[]>([]);
const menuPath = structuredClone(PC_MENU);

const handleClickMenu = (ev: any) => {
  const path = menuPath.find((i) => i.key === ev.key);
  router.push(path?.path || "/");
};


const handleSelectMenu = (value: string) => {
  const path: any = menuPath.find((i) => i.path == value);
  selectedKeys.value = [path?.key];
};

onMounted(() => {
  handleSelectMenu(route.path);
});
</script>
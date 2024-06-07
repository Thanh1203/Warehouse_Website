<template>
    <div class="slide-menu tw-bg-[#001529] tw-min-h-dvh">
        <div class="tw-flex tw-items-center tw-justify-center">
            <Logo class="tw-h-[70px]"/>
        </div>
        <a-menu :items="menuAdmin" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" @click="handleClickMenu" mode="inline" :inline-collapsed="true" class="tw-text-[14px] tw-w-[90px]" theme="dark"/>
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue"
import { menuAdmin } from "@/constants/pcMenu";
import { PC_MENU } from "@/constants/index";
import Logo from "@/components/icon-menu/logoIcon.vue";
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
<style lang="scss">
.slide-menu {
    .ant-menu {
        .ant-menu-item-group{
            .ant-menu-item-group-title {
                font-weight: 600;
            }
        }
    }
}
</style>
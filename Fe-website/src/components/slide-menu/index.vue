<template>
    <div class="slide-menu">
        <div class="tw-flex tw-items-center tw-justify-center tw-border-[#EAF0FF] tw-border-0 tw-border-solid tw-border-b-[1px]">
            <img src="/logo.jpg" alt="logo" class="tw-w-20">
        </div>
        <a-menu :items="menuAdmin" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" @click="handleClickMenu" :mode="'vertical'" :inline-collapsed="true" class="tw-w-[100px] tw-text-[14px]"/>
    </div>
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
<style lang="scss">
.slide-menu {
    .ant-menu {
        .ant-menu-item-group{
            .ant-menu-item-group-title {
                font-weight: 600;
                color: #000;
            }
            .ant-menu-item {
                padding: 0 32px;
                margin: 10px 4px;
            }
            .ant-menu-submenu {
                .ant-menu-submenu-title {
                    padding: 0 32px;
                    margin: 10px 4px;
                }
            }
        }
        .ant-menu-item {
            padding: 0 32px;
            margin: 10px 4px;
        }
    }
}
</style>
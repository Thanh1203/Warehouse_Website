<template>
<div class="slide-menu">
    <div class="menu-header">
        <a-dropdown class="tw-w-full tw-h-full tw-px-[12px]" :trigger="['click']" :placement="'rightTop'">
            <div class="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-between">
                <h3 class="tw-font-[400]">Nguyễn Đức Thành</h3> 
                <font-awesome-icon :icon="['fas', 'bars']" style="color: #000;"/>
            </div>
            <template #overlay>
                <a-menu class="tw-ml-[12px]">
                    <a-menu-item>
                        <RouterLink to="/infomation">
                            {{ translate("Information") }}
                        </RouterLink>
                    </a-menu-item>
                    <a-menu-item>
                        <span @click="handleLogOut">
                            {{ translate("Logout") }}
                        </span>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
    <div class="menu-body">
        <a-menu :items="menuAdmin" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" @click="handleClickMenu" :mode="'vertical'"/>
    </div>
    <div class="menu-footer">
        <div class="tw-flex tw-items-center tw-justify-center" @click="handleOpenSetting">
            <font-awesome-icon :icon="['fas', 'gear']" style="color: #000;"/>
            <span class="tw-ml-[12px] tw-leading-6 tw-pt-1">
                {{ translate("Setting") }}
            </span>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { menuAdmin } from '@/constants/pcMenu';
import { PC_MENU } from '@/constants/index';

const router = useRouter();
const route = useRoute();


const selectedKeys = ref<string[]>(['DASHBOARD']);
const openKeys = ref<string[]>([]);

const menuPath = structuredClone(PC_MENU);

const handleClickMenu = (ev: any) => {
    const path = menuPath.find(i => i.key === ev.key);
    router.push(path?.path || "/");
}

const handleLogOut = () => {
    router.push("/login");
};

const handleOpenSetting = () => {
    router.push("/setting");
};

const handleSelectMenu = (value: string) => {
    const path: any = menuPath.find(i => i.path == value);
    selectedKeys.value = [path?.key];
}

onMounted(() => {
    handleSelectMenu(route.path);
})
</script>
<style scoped lang="scss">
.slide-menu {
    background-color: #fff;
    height: 100vh;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .menu-header {
        width: 250px;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
        padding: 12px 0;
    }
    .menu-body {
        flex-grow: 1;
        width: 250px;
    }
    .menu-footer {
        width: 250px;
        padding: 12px 12px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        border-top: 1px solid #f2f2f2;
    }
}
</style>
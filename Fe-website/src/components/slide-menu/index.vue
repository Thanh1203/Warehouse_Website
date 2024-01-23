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
        <AntdMenu :items="menuAdmin" :mode="'vertical'" v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        :force-sub-menu-render="false" :inline-collapsed="false"
        :multiple="false" :selectable="true" :theme="'light'"
        @handle-click="handleClickMenu"
        />
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
import { useRouter } from 'vue-router';
import AntdMenu from '@/components/antd-menu/index.vue'
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { menuAdmin } from '@/utils/common';

const router = useRouter();
const selectedKeys = ref<string[]>(['DASHBOARD']);
const openKeys = ref<string[]>(['DASHBOARD']);

const handleClickMenu = (ev: any) => {
    
    console.log(ev.key);
}

const handleLogOut = () => {
    router.push("/login");
};

const handleOpenSetting = () => {
    router.push("/setting");
};
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
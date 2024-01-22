<template>
<div class="slide-menu">
    <div class="menu-header">
        <a-dropdown class="tw-w-full tw-h-full tw-px-[12px]" :trigger="['click']" :placement="'rightTop'">
            <div class="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-between">
                <font-awesome-icon :icon="['far', 'circle-user']" size="2xl" style="color: #000;"/>
                <h2 class="tw-font-[500]">Nguyễn Văn A</h2> 
                <font-awesome-icon :icon="['fas', 'arrow-right']" style="color: #000;"/>
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
        <AntdMenu :items="itemsMenu"/>
    </div>
    <div class="menu-footer">
        <div class="tw-flex tw-items-center tw-justify-center" @click="handleOpenSetting">
            <font-awesome-icon :icon="['fas', 'gear']" size="xl" style="color: #000;"/>
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
import { h } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartPie, faChartSimple, faUsers, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

const router = useRouter();

const itemsMenu = ref([
    {
        key: 1,
        label: translate("Dashboard"),
        icon: () => h(FontAwesomeIcon, { icon: faChartSimple, size: 'xl' }),
    },
    {
        key: 2,
        label: translate("Personnel"),
        icon: () => h(FontAwesomeIcon, {icon: faUsers, size: 'xl'}),
    },
    {
        key: 3,
        label: translate("Warehouse"),
        icon: () => h(FontAwesomeIcon, {icon: faWarehouse, size: 'xl'}),
    },
    {
        key: 4,
        label: translate("Products"),
        icon: () => h(FontAwesomeIcon, {icon: faProductHunt, size: 'xl'}),
    },
    {
        key: 5,
        label: translate("StatisticsReports"),
        icon: () => h(FontAwesomeIcon, {icon: faChartPie, size: 'xl'}),
    },
])

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
        width: 100%;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
        padding: 24px 0;
    }
    .menu-body {
        flex-grow: 1;
    }
    .menu-footer {
        padding: 24px 12px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        border-top: 1px solid #f2f2f2;
    }
}
</style>
<template>
  <div class="tw-h-[70px] tw-w-full tw-flex tw-justify-end tw-items-center tw-px-4 tw-bg-[#001529] tw-text-[#A5B4BF]">
    <font-awesome-icon :icon="['fas', 'circle-user']" size="2xl" />

    <h1 class="tw-font-[500] tw-mx-3">{{ adminInfo.name }}</h1>

    <a-dropdown :trigger="['click']" >
      <span class="nav-header">
        <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
      </span>

      <template #overlay>
        <a-menu class="tw-w-fit">
          <a-menu-item>
            <div class="tw-flex tw-items-center" @click="handleOpenSetting">
              <font-awesome-icon :icon="['fas', 'gear']" />
              <span class="tw-ml-2">{{ translate('Setting') }}</span>
            </div>
          </a-menu-item>

          <a-menu-item>
            <div class="tw-flex tw-items-center" @click="handleLogOut">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              <span class="tw-ml-2">{{ translate('Logout') }}</span>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();


const adminInfo = computed(() => {
  const info = window.sessionStorage.getItem("adminInfo");
  return JSON.parse(info);
});

const handleLogOut = () => {
  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("adminInfo");
  router.push({ name: "signIn" });
};

const handleOpenSetting = () => {
  router.push("/setting");
};
</script>
<style lang="scss">
.nav-header {
  &:hover {
    color: #1890ff;
  }
}
</style>
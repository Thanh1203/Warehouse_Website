<template>
  <div class="tw-w-full tw-bg-white tw-h-16 tw-z-10 tw-fixed tw-pl-6 tw-pr-10 tw-flex tw-items-center tw-justify-between tw-text-[#666666] tw-border-b tw-border-[#e5e7eb]">
    <div class="tw-flex tw-items-center tw-justify-center tw-h-full tw-pt-2">
      <img src="/src/assets/images/headerIcon/icon.png" alt="icon" class="tw-h-3/4">
      <div class="name-company tw-text-2xl tw-pl-3">My Warehouse</div>
    </div>
    <div class="tw-flex tw-h-full tw-items-center">
      <UserIcon class="tw-text-[#b0b0b0]" />
      <div class="tw-h-full tw-pt-3 tw-mx-4">
        <div class="tw-font-[500]">{{ adminInfo?.Name }}</div>
        <div class="tw-text-sm">Admin</div>
      </div>
      <a-dropdown :trigger="['click']">
        <span class="nav-header">
          <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
        </span>

        <template #overlay>
          <a-menu class="tw-w-fit">
            <a-menu-item>
              <div class="tw-flex tw-items-center" @click="handleOpenSetting">
                <font-awesome-icon :icon="['fas', 'gear']" />
                <span class="tw-ml-2">{{ translate("Setting") }}</span>
              </div>
            </a-menu-item>

            <a-menu-item>
              <div class="tw-flex tw-items-center" @click="handleLogOut">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                <span class="tw-ml-2">{{ translate("Logout") }}</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserIcon from "@/components/icon-menu/userIcon.vue";
import Logo from "@/components/icon-menu/logoIcon.vue";

const router = useRouter();
const route = useRoute();

const adminInfo = computed(() => {
  const info = window.sessionStorage.getItem("userInformation");
  return JSON.parse(info);
});

const handleLogOut = () => {
  window.sessionStorage.removeItem("userInformation");
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

.name-company {
  font-family: "Dancing Script", cursive;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
</style>

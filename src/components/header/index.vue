<template>
  <div class="header-page flex justify-between px-6">
    <div>
      <img src="@/assets/images/warehouse.png" alt="logo" class="h-full" />
    </div>

    <a-dropdown :trigger="['click']" class="cursor-pointer">
      <div class="flex items-center gap-4">
        <font-awesome-icon :icon="['fas', 'circle-user']" size="2xl" />
        <div class="flex justify-start flex-col">
          <div class="font-semibold">{{ userInformation?.Name }}</div>
          <div class="text-xs">{{ userInformation?.Role }}</div>
        </div>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <font-awesome-icon :icon="['far', 'address-card']" />
            <span class="pl-2">{{ translate('Profile') }}</span>
          </a-menu-item>
          <a-menu-item key="1" @click="handleLogOut">
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            <span class="pl-2">{{ translate("Logout") }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { translate } from '@/languages/i18n';
import ConstantAPI from '@/services/ConstantAPI';
import { DataService } from '@/services/request';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const userInformation = computed(() => {
  const info = window.sessionStorage.getItem("userInformation");
  return JSON.parse(info);
});

const handleLogOut = async () => {
  const logout:any = await DataService.callApi(ConstantAPI.login.LOGOUT);
  window.sessionStorage.removeItem("userInformation");
  router.push({ name: "signIn" });
};
</script>

<style scoped></style>

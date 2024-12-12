<template>
  <div class="slide-menu">
    <div class="menu-header">
      <a-dropdown class="w-full h-full px-[12px]" :trigger="['click']" :placement="'rightTop'">
        <div class="w-full h-full flex items-center justify-between">
          <h3 class="font-[400]">{{ userInformation.Name }}</h3>
          <font-awesome-icon :icon="['fas', 'bars']" style="color: #000" />
        </div>
        <template #overlay>
          <a-menu class="ml-[12px]">
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
      <a-menu :items="menuAdmin" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" @click="handleClickMenu" :mode="'vertical'" />
    </div>
    <div class="menu-footer">
      <div class="flex items-center justify-start w-full" @click="handleOpenSetting">
        <font-awesome-icon :icon="['fas', 'gear']" style="color: #000" />
        <span class="ml-[12px] leading-6 pt-1">
          {{ translate("Setting") }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { menuAdmin } from "@/constants/pcMenu";
import { PC_MENU } from "@/constants/index";
import { DataService } from "@/services/request";
import ConstantAPI from "@/services/ConstantAPI";

const router = useRouter();
const route = useRoute();

const adminInfo = computed(() => {
  const info = window.sessionStorage.getItem("adminInfo");
  return JSON.parse(info);
});

const selectedKeys = ref<string[]>(["DASHBOARD"]);
const openKeys = ref<string[]>([]);

const menuPath = structuredClone(PC_MENU);

const handleClickMenu = (ev: any) => {
  const path = menuPath.find((i) => i.key === ev.key);
  router.push(path?.path || "/");
};

const handleLogOut = async () => {
  await DataService.callApi(ConstantAPI.login.LOGOUT);
  window.sessionStorage.removeItem("userInformation");
  router.push({ name: "signIn" });
};

const handleOpenSetting = () => {
  router.push("/setting");
};

const handleSelectMenu = (value: string) => {
  const path: any = menuPath.find((i) => i.path == value);
  selectedKeys.value = [path?.key];
};

const userInformation = computed(() => {
  const info = window.sessionStorage.getItem("userInformation");
  return JSON.parse(info);
});

onMounted(() => {
  handleSelectMenu(route.path);
});
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

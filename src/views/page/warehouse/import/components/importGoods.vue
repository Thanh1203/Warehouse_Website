<template>
  <div class="mb-6">
    <a-breadcrumb separator=">>" class="flex items-center">
      <a-breadcrumb-item>
        <RouterLink to="/">
          <font-awesome-icon :icon="['fas', 'house']" />
        </RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <RouterLink to="/warehouse-import">
          {{ translate('EnterWarehouse') }}
        </RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        {{ translate('ImportGoods') }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>

  <div class="flex flex-col bg-white p-6 rounded-xl">
    <div class="flex items-center gap-6 mb-6">
      <AntdButton type="primary" :ghost="!isNewProduct" @click="() => isNewProduct = !isNewProduct">
        {{ translate('NewProduct') }}
      </AntdButton>
      <AntdButton type="primary" :ghost="isNewProduct" @click="() => isNewProduct = !isNewProduct">
        {{ translate('ProductsInWarehouse') }}
      </AntdButton>
    </div>

    <div class="grow flex flex-col">
      <ImportNewGoods v-if="isNewProduct"/>
      <UpdateQuantity v-else/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import { ref } from "vue";
import ImportNewGoods from "./ImportNewGoods.vue";
import UpdateQuantity from "./UpdateQuantity.vue";

const state = ref(1);
const isNewProduct = ref<boolean>(true);
</script>

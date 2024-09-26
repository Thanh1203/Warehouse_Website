<template>
  <div class="tw-mb-6">
    <a-breadcrumb separator=">>" class="tw-flex tw-items-center">
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

  <div class="tw-flex tw-flex-col tw-bg-white tw-p-6 tw-rounded-xl">
    <div class="tw-flex tw-items-center tw-gap-6 tw-mb-6">
      <AntdButton type="primary" :ghost="!isNewProduct" @click="() => isNewProduct = !isNewProduct">
        {{ translate('NewProduct') }}
      </AntdButton>
      <AntdButton type="primary" :ghost="isNewProduct" @click="() => isNewProduct = !isNewProduct">
        {{ translate('ProductsInWarehouse') }}
      </AntdButton>
    </div>

    <div class="tw-grow tw-flex tw-flex-col">
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

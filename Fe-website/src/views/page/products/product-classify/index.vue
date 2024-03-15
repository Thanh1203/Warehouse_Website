<template>
  <a-form class="tw-flex tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
    <a-form-item class="tw-w-[300px] !tw-mr-3">
      <span class="tw-opacity-70">{{ translate("Search") }}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.Keyword" class="tw-mt-2" />
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
      <AntdButton
        :type="'text'"
        danger
        :disabled="disabledDeleteFilter"
        @click="
          () => {
            filterSearching.Keyword = '';
          }
        "
      >
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate("Delete") }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { computed, reactive } from "vue";

const filterSearching = reactive({
  Keyword: "",
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.Keyword?.length === 0);
</script>

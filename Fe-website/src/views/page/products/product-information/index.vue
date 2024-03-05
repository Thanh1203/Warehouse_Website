<template>
  <a-form class="tw-flex tw-justify-start tw-items-start tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6 filter-section">
    <a-form-item class="tw-w-[250px]">
      <span class="tw-opacity-70">{{ translate('ProductName')}}</span>
      <a-input :placeholder="translate('Search')" v-model:value="filterSearching.keyword" />
    </a-form-item>
    <a-form-item class="tw-w-[200px]">
        <span class="tw-opacity-70">{{translate('ProductCategory')}}</span>
        <a-select :placeholder="translate('ProductCategory')" v-model:value="filterSearching.type" :options="dataFake1.map(ele => ({value: ele.id, label: ele.name}))"/>
    </a-form-item>
    <a-form-item class="tw-w-[200px]">
        <span class="tw-opacity-70">{{translate('Color')}}</span>
        <a-select :placeholder="translate('Color')" v-model:value="filterSearching.color" :options="dataFake2"/>
    </a-form-item>
    <a-form-item class="tw-flex tw-items-end">
      <AntdButton :type="'text'" danger :disabled="disabledDeleteFilter"  @click="handleClearFilter">
        <template #icon>
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </template>
        <span class="tw-ml-2">{{ translate('Delete') }}</span>
      </AntdButton>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import AntdButton from "@/components/antd-button/index.vue";
import { computed, reactive } from "vue";

const filterSearching = reactive({
    keyword: "",
    type: null,
    color: null,
});

// handle filter
const disabledDeleteFilter = computed(() => filterSearching?.keyword?.length === 0 && filterSearching?.type === null && filterSearching?.color === null);

const handleClearFilter = () => {
    filterSearching.keyword = "";
    filterSearching.type = null;
    filterSearching.color = null;
};

const dataFake1 = [
    {
        id: "CL01",
        name: "Bàn phím",
        dateCreated: "01/01/2024",
        listProperty: ["Màu sắc", "Kích thước"],
    },
    {
        id: "CL02",
        name: "Chuột",
        dateCreated: "01/01/2024",
        listProperty: ["Màu sắc", "Kích thước"],
    },
    {
        id: "CL03",
        name: "Tai nghe",
        dateCreated: "01/01/2024",
        listProperty: ["Màu sắc", "Kích thước"],
    }
];


const dataFake2 = [
    {
        value: "Trắng",
        label: "Trắng",
    },
    {
        value: "Đen",
        label: "Đen",
    },
    {
        value: "Hồng",
        label: "Hồng",
    }
]
</script>
<style scoped lang="scss"></style>

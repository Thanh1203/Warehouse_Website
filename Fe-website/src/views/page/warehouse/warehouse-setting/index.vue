<template>
<div>
    <a-form class="tw-flex tw-justify-start tw-items-start tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6 filter-section">
        <a-form-item class="tw-w-[250px]">
            <span class="tw-text-xs">Nhập tên kho hàng</span>
            <a-input />
        </a-form-item>
        <a-form-item class="tw-w-[150px]">
            <span class="tw-text-xs">Chọn khu vực</span>
            <a-select/>
        </a-form-item>
        <a-form-item class="tw-flex tw-items-end">
            <AntdButton :type="'text'" danger>
                <template #icon>
                    <font-awesome-icon :icon="['far', 'trash-can']" />
                </template>
                <span class="tw-ml-2">Xóa</span> 
            </AntdButton>
        </a-form-item>
    </a-form>
    <Section :title="'Danh sách kho'" :sub-title="'Số lượng kho hàng :'" :number="String(datafake?.length)">
        <template #action>
            <AntdButton :type="'text'" danger class="tw-mr-2">
                <template #icon>
                    <font-awesome-icon :icon="['far', 'trash-can']"/>
                </template>
                <span class="tw-text-sm tw-ml-2">Xóa</span>
            </AntdButton>
            <AntdButton :type="'primary'" @click="openModal">
                <template #icon>
                    <font-awesome-icon :icon="['fas', 'plus']"/>
                </template>
                <span class="tw-text-sm tw-ml-2">Thêm mới</span>
            </AntdButton>
        </template>
        <div class="tw-p-5">
            
        </div>
    </Section>
</div>

<!-- modal -->
<ModalCreate :is-visible="isVisibleModalCreate" @close-modal="closeModal" @handle-submit="handleSubmitCreate"/>
</template>
<script setup lang="ts">
import Section from "@/components/section/index.vue";
import { ref, watch, onMounted, defineAsyncComponent } from 'vue';
import AntdButton from "@/components/antd-button/index.vue";

const ModalCreate = defineAsyncComponent(() => import("./components/ModalCreate.vue"));

const datafake = ref<Array<any>>([]);
const isVisibleModalCreate = ref<boolean>(false);

const openModal = () => {
    isVisibleModalCreate.value = true;
};

const closeModal = () => {
    isVisibleModalCreate.value = false;
};

const handleSubmitCreate = () => {
    isVisibleModalCreate.value = false;
};
</script>
<style scoped lang="scss"></style>
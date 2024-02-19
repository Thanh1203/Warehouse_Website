<template>
<BaseModal :visible="isVisible" :after-close="handleClose" :title="translate('CreateWarehouse')">
    <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-center tw-mr-4">
            <span class="tw-mb-2">{{ translate('WarehouseCode') }}<span class="required-star">*</span></span>
            <a-input class="tw-w-full"/>   
        </div>
        <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-center">
            <span class="tw-mb-2">Tên kho hàng<span class="required-star">*</span></span>
            <a-input class="tw-w-full"/>
        </div>
    </div>
    <div class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-center">
        <span class="tw-mb-2">Địa chỉ<span class="required-star">*</span></span>
        <div class="tw-w-full tw-border tw-p-4 tw-rounded-xl">
            <div class="tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-6">
                <div class="tw-basis-1/3 tw-flex tw-flex-col tw-items-start tw-justify-center tw-mr-4">
                    <span class="tw-mb-2">Quốc gia<span class="required-star">*</span></span>
                    <a-select class="tw-w-full"/>
                </div>
                <div class="tw-basis-1/3 tw-flex tw-flex-col tw-items-start tw-justify-center tw-mr-4">
                    <span class="tw-mb-2">Tỉnh / Thành phố<span class="required-star">*</span></span>
                    <a-select class="tw-w-full"/>
                </div>
                <div class="tw-basis-1/3 tw-flex tw-flex-col tw-items-start tw-justify-center">
                    <span class="tw-mb-2">Quận / Huyện<span class="required-star">*</span></span>
                    <a-select class="tw-w-full"/>
                </div>
            </div>
            <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
                <div class="tw-basis-1/3 tw-flex tw-flex-col tw-items-start tw-justify-center tw-mr-4">
                    <span class="tw-mb-2">Phường / Xã<span class="required-star">*</span></span>
                    <a-select class="tw-w-full"/>
                </div>
                <div class="tw-basis-2/3 tw-flex tw-flex-col tw-items-start tw-justify-center tw-mr-4">
                    <span class="tw-mb-2">Đường / Số nhà<span class="required-star">*</span></span>
                    <a-input class="tw-w-full"/>
                </div>
            </div>
        </div>
    </div>
    <template #footer>
        <AntdButton :type="'primary'" @click="handleSubmit">
            <template #icon>
                <font-awesome-icon :icon="['far', 'floppy-disk']" />
            </template>
            <span class="tw-ml-2 tw-text-sm">Lưu</span>
        </AntdButton>
    </template>
</BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import { translate } from "@/languages/i18n";

const emit = defineEmits(['closeModal', 'handleSubmit']);

const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true,
    }
});

const handleClose = () => {
    emit('closeModal');
};

const handleSubmit = async () => {
    emit('handleSubmit');
};
</script>

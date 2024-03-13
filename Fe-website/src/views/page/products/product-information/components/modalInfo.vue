<template>
    <BaseModal
        :width="'600px'"
        :visible="isVisible"
        :title="titleModal"
        :defaultFooter="false"
        @cancel="$emit('closeModal')"
    >
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('ProductCode') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('ProductName') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('ProductCategory') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('ProductClassify') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('Producer') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('Size') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('Material') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('Designs') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
        <div class="tw-mb-4 tw-flex tw-items-start tw-justify-between">
            <div class="tw-w-1/3 tw-flex tw-items-start tw-justify-between">
                <span>{{ translate('Describe') }}</span>
                <span class="tw-mr-4">:</span>
            </div>
        </div>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/antd-modal/index.vue'
import { translate } from '@/languages/i18n';

const emit = defineEmits(['closeModal']);
const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true
    },
    titleModal: {
        type: String,
        required: true
    },
    idProduct: {
        type: String,
        required: true,
    }
});


</script>
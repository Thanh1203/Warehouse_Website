<template>
<BaseModal centered :width="'500px'" :visible="isVisible" :default-footer="true" :closable="false" :mask-closable="false" @cancel="$emit('closeModal')" @ok="$emit('handleSubmit')">
    <div class="tw-w-full tw-flex tw-items-center tw-justify-start">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" size="2xl" style="color: #FFD43B;" />
        <span class="tw-text-xl tw-font-[600] tw-ml-3">{{ titleModal}}</span>
    </div>
    <div class="tw-mt-6 tw-px-10">
        <span class="subConfirmDelete">Dữ liệu bị xóa sẽ không thể khôi phục!</span>
    </div>
</BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import { translate } from "@/languages/i18n";

const emit = defineEmits(['closeModal', 'handleSubmit']);

defineProps({
    isVisible: {
        type: Boolean,
        required: true,
    },
    titleModal: {
        type: String,
        required: true,
    },
});

</script>
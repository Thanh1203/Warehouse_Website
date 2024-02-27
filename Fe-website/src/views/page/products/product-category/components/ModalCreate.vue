<template>
<BaseModal :width="'1000px'" :visible="isVisible" :title="titleModal" :defaultFooter="false" :maskClosable="false" @cancel="$emit('closeModal')">
    <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-mb-6">
        <a-steps :current="currentSteps"
        :items="[
            {
                title: 'Thông tin chung'
            },
            {
                title: 'Thuộc tính'
            },
            {
                title: 'Hoàn thiện'
            }
        ]"/>
    </div>
    <div v-if="currentSteps === 0" class="tw-mb-6">
        <StepOne :state="formStepOne" :step="currentSteps"/>
    </div>
    <!-- <div v-else-if="currentSteps === 1" class="tw-mb-6">
        <StepTwo :state="formStepOne" :step="currentSteps"/>
    </div>
    <div v-else class="tw-mb-6">
        <StepThree :state="formStepOne" :step="currentSteps"/>
    </div> -->
    <template #footer>
        <div class="tw-w-full tw-flex tw-items-center" :class="currentSteps !== 0 ? 'tw-justify-between' : 'tw-justify-end'">
            <AntdButton v-if="currentSteps !== 0 " :type="'primary'" @click="preStep">
                <template #icon>
                    <font-awesome-icon :icon="['fas', 'arrow-left']" />
                </template>
                <span class="tw-text-sm tw-ml-2">Quay lại</span>
            </AntdButton>
            <AntdButton v-if="currentSteps === 2" :type="'primary'">
                <template #icon>
                    <font-awesome-icon :icon="['far', 'floppy-disk']" />
                </template>
                <span class="tw-ml-2 tw-text-sm">Lưu</span>
            </AntdButton>
            <AntdButton v-else :type="'primary'" @click="nextStep">
                <template #icon>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </template>
                <span class="tw-ml-2 tw-text-sm">Tiếp</span>
            </AntdButton>
        </div>
    </template>
</BaseModal>
</template>
<script lang="ts" setup>
import BaseModal from "@/components/antd-modal/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, defineAsyncComponent } from "vue";

const StepOne = defineAsyncComponent(() => import("./stepOne.vue"));
const StepTwo = defineAsyncComponent(() => import("./stepTwo.vue"));
const StepThree = defineAsyncComponent(() => import("./stepThree.vue"));

const emit = defineEmits(['closeModal', 'handleSubmit']);
const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true,
    },
    titleModal: {
        type: String,
        required: true,
    },
})

const formStepOne = ref<any>({
    id: "",
    name: "",
});
const currentSteps = ref<any>(0);


const nextStep = () => {
    currentSteps.value++;
};

const preStep = () => {
    currentSteps.value--;
}
</script>
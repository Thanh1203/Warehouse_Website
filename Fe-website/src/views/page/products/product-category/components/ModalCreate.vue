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
    <a-form >
        <div v-if="currentSteps === 0">
            <StepOne :formState="formStep" @nextStep="nextStep"/>
        </div>
        <div v-else-if="currentSteps === 1" class="tw-mb-6">
            <StepTwo :formState="formStep" @preStep="preStep" @nextStep="nextStep"/>
        </div>
        <div v-else class="tw-mb-6">
            <StepThree :formState="formStep"/>
        </div>
    </a-form>
</BaseModal>
</template>
<script lang="ts" setup>
import BaseModal from "@/components/antd-modal/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, defineAsyncComponent, reactive } from "vue";

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

const formStep = reactive<any>({
    genusId: "",
    genusName: "",
    listProperty: []
});

const currentSteps = ref<any>(0);

const nextStep = (state: any) => {
    if (currentSteps.value === 0) {
        formStep.genusId = state.id;
        formStep.genusName = state.name;
    } else if (currentSteps.value === 1) {
        formStep.listProperty = state.list;
        console.log(formStep)
    }
    currentSteps.value++;
};

const preStep = () => {
    currentSteps.value--;
    if (currentSteps.value === 0) {
        formStep.genusId = "";
        formStep.genusName = "";
        formStep.listProperty = [];
    };
}
</script>
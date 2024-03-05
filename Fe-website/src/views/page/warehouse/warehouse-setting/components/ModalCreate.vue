<template>
<BaseModal :visible="isVisible" :title="titleModal" :defaultFooter="false" @cancel="$emit('closeModal')">
    <a-form @submit.prevent="handleSubmit" class="tw-mb-6">
        <div class="tw-w-full tw-flex tw-items-start tw-justify-between tw-mb-6">
            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
                <span class="tw-mb-2">{{ translate('WarehouseCode') }}<span class="required-star">*</span></span>
                <div v-if="!isEdit" class="tw-w-full">
                    <a-input :placeholder="translate('WarehouseCode')" class="tw-w-full" :status="v$.warehouseId.$error ? 'error' : ''" v-model:value="v$.warehouseId.$model"/>
                    <ErrorMess :params="[64]" :title="translate('WarehouseCode')" :validator="v$.warehouseId.$errors[0]?.$validator"/>
                </div>
                <span v-else>{{ state.warehouseId }}</span>
            </div>
            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start">
                <span class="tw-mb-2">{{ translate('warehouseName') }}<span class="required-star">*</span></span>
                <a-input :placeholder="translate('warehouseName')" class="tw-w-full" :status="v$.warehouseName.$error ? 'error' : ''" v-model:value="v$.warehouseName.$model"/>
                <ErrorMess :params="[64]" :title="translate('warehouseName')" :validator="v$.warehouseName.$errors[0]?.$validator"/>
            </div>
        </div>
        <div class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-mb-6">
            <span class="tw-mb-2">{{ translate('Location') }}<span class="required-star">*</span></span>
            <div class="tw-w-full tw-border tw-p-4 tw-rounded-xl">
                <div class="tw-w-full tw-flex tw-items-start tw-justify-between tw-mb-6">
                    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
                        <span class="tw-mb-2">{{ translate('Nation') }}<span class="required-star">*</span></span>
                        <a-select class="tw-w-full" :placeholder="translate('Nation')" :status="v$.Nation.$error ? 'error' : ''" v-model:value="v$.Nation.$model"/>
                        <ErrorMess :params="[64]" :title="translate('Nation')" :validator="v$.Nation.$errors[0]?.$validator"/>
                    </div>
                    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
                        <span class="tw-mb-2">{{ translate('Area') }}<span class="required-star">*</span></span>
                        <a-select class="tw-w-full" :status="v$.Area.$error ? 'error' : ''" v-model:value="v$.Area.$model" :placeholder="translate('Area')"/>
                        <ErrorMess :params="[64]" :title="translate('Area')" :validator="v$.Nation.$errors[0]?.$validator"/>
                    </div>
                </div>
                <div class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-4">
                    <span class="tw-mb-2">{{ translate('Address') }}<span class="required-star">*</span></span>
                    <a-input :placeholder="translate('Address')" class="tw-w-full" :status="v$.describe.$error ? 'error' : ''" v-model:value="v$.describe.$model"/>
                    <ErrorMess :params="[64]" :title="translate('Address')" :validator="v$.Nation.$errors[0]?.$validator"/>
                </div>
            </div>
        </div>
        <div class="tw-flex tw-items-start tw-justify-between">
            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-center tw-mr-4 tw-w-full">
                <div class="tw-mb-2 tw-flex tw-items-center tw-justify-between tw-w-full">
                    <span>{{ translate('Acreage') }}(m<sup>2</sup>)<span class="required-star">*</span></span>
                    <span class="tw-opacity-70">(A = {{ translate('Length') }} x {{ translate('Width') }})</span>
                </div>
                <a-input :placeholder="translate('Acreage')" class="tw-w-full" :status="v$.Acreage.$error ? 'error' : ''" v-model:value="v$.Acreage.$model"/>
                <ErrorMess :params="[64]" :title="translate('Acreage')" :validator="v$.Nation.$errors[0]?.$validator"/>
            </div>
            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-center tw-w-full">
                <div class="tw-mb-2 tw-flex tw-items-center tw-justify-between tw-w-full">
                    <span>{{ translate('Tankage') }}(m<sup>3</sup>)<span class="required-star">*</span></span>
                    <span class="tw-opacity-70">(V = A x H)</span>
                </div>
                <a-input :placeholder="translate('Tankage')" class="tw-w-full" :status="v$.Tankage.$error ? 'error' : ''" v-model:value="v$.Tankage.$model"/>
                <ErrorMess :params="[64]" :title="translate('Tankage')" :validator="v$.Nation.$errors[0]?.$validator"/>
            </div>
        </div>
    </a-form>
    <template #footer>
        <AntdButton :type="'primary'" @click="handleSubmit()">
            <template #icon>
                <font-awesome-icon :icon="['far', 'floppy-disk']" />
            </template>
            <span class="tw-ml-2 tw-text-sm">{{ translate('Save') }}</span>
        </AntdButton>
    </template>
</BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/antd-modal/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { ref, watch, onMounted, defineAsyncComponent, reactive, computed } from 'vue';

const emit = defineEmits(['closeModal', 'handleSubmit']);

const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true,
    },
    isEdit: {
        type: Boolean,
        required: true,
    },
    form: {
        type: Object,
        required: true,
    },
    titleModal: {
        type: String,
        required: true,
    },
});

const state: any = reactive({
    warehouseId: props?.form?.warehouseId,
    warehouseName: props?.form?.warehouseName,
    Nation: props?.form?.Nation,
    Area: props?.form?.Area,
    describe: props?.form?.describe,
    Acreage: props?.form?.Acreage,
    Tankage: props?.form?.Tankage,
});

const rules = {
    warehouseId: {
        required,
    },
    warehouseName: {
        required,
    },
    Nation: {
        required,
    },
    Area: {
        required,
    },
    describe: {
        required,
    },
    Acreage: {
        required,
    },
    Tankage: {
        required,
    }

};

const v$ = useVuelidate(rules, state);

watch(
  () => props.form,
    (val) => {
    v$.value.$reset();
    (state.warehouseId = val.warehouseId),(state.warehouseName = val.warehouseName), (state.Nation = val.Nation), (state.Area = val.Area), (state.describe = val.describe), (state.Acreage = val.Acreage), (state.Tankage = val.Tankage);
  },
  {
    deep: true,
  },
);

const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        return false;
    }
    emit('handleSubmit', state);
};

</script>

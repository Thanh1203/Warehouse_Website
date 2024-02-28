<template>
<a-form class="tw-w-full tw-flex tw-items-center tw-justify-center tw-mb-6">
    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-3">
       <span class="tw-mb-2">Mã chủ loại</span>
       <a-input v-model:value="v$.id.$model" :status="v$.id.$error ? 'error' : ''"/>
       <ErrorMess :params="[64]" :title="'Mã chủng loại'" :validator="v$.id.$errors[0]?.$validator"/>
    </div>
    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start">
        <span class="tw-mb-2">Tên chủ loại</span>
        <a-input v-model:value="v$.name.$model" :status="v$.name.$error ? 'error' : ''"/> 
       <ErrorMess :params="[64]" :title="'Tên chủng loại'" :validator="v$.name.$errors[0]?.$validator"/>
    </div>
</a-form>
<div class="tw-w-full tw-flex tw-items-center tw-justify-end">
    <AntdButton class="tw-flex tw-items-center tw-flex-row-reverse" :type="'primary'" ghost @click="handleNextStep()">
        <template #icon>
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </template>
        <span class="tw-mr-2">Tiếp</span>
    </AntdButton>
</div>
</template>
<script lang="ts" setup>
import { watch, ref, reactive } from 'vue';
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core';
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from '@/languages/i18n';

const emit = defineEmits(['nextStep']);

const props = defineProps({
    formState: {
        type: Object,
        required: true,
    },
});

const state: any = reactive({
    id: props?.formState?.genusId,
    name: props?.formState?.genusName,
});

const rules = {
    id: {
        required,
    },
    name: {
        required,
    }
};

const v$ = useVuelidate(rules, state);

const handleNextStep = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        return false;
    }
    emit('nextStep', state);
};

watch(
    () => props.formState,
        (val) => {
        v$.value.$reset();
        (state.id = val.genusId), (state.name = val.genusName);
    },
    {
        deep: true,
    },
);
</script>
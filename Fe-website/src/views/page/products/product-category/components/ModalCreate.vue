<template>
<BaseModal :width="'1000px'" :visible="isVisible" :title="titleModal" :defaultFooter="false" :maskClosable="false" @cancel="$emit('closeModal')">
    <a-form class="tw-w-full tw-mb-6">
        <div class="tw-w-full tw-flex tw-items-start tw-justify-center tw-mb-6">
            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-3">
                <span class="tw-mb-2">Mã chủ loại<span class="required-star">*</span></span>
                <a-input v-model:value="v$.genusId.$model" :status="v$.genusId.$error ? 'error' : ''" :placeholder="'Mã chủng loại'"/>
                <ErrorMess :params="[64]" :title="'Mã chủng loại'" :validator="v$.genusId.$errors[0]?.$validator"/>
            </div>
            <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start">
                <span class="tw-mb-2">Tên chủ loại<span class="required-star">*</span></span>
                <a-input v-model:value="v$.genusName.$model" :status="v$.genusName.$error ? 'error' : ''" :placeholder="'Tên chủng loại'"/> 
                <ErrorMess :params="[64]" :title="'Tên chủng loại'" :validator="v$.genusName.$errors[0]?.$validator"/>
            </div>
        </div>
        <div class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-center">
            <span class="tw-mb-2">Thuộc tính<span class="required-star">*</span></span>
            <div class="tw-w-full tw-flex tw-justify-between tw-border tw-rounded-[12px]" :class="formState?.listProperty?.length === 0 ? 'is-invalid' : ''">
                <div class="tw-w-full tw-flex tw-justify-between">
                    <div class="tw-w-1/2 tw-flex tw-flex-col tw-items-center tw-justify-start tw-py-3">
                        <div class="tw-border-b tw-w-full tw-flex tw-items-center tw-justify-center tw-pb-3 tw-text-[16px] tw-font-[600]">
                            <span class="tw-border-r tw-border-[#000] tw-pr-6">Danh sách thuộc tính</span>
                            <span class="tw-pl-6">Số lượng : {{ formState?.listProperty?.length }}</span>
                        </div>
                        <div v-if="formState?.listProperty?.length > 0" class="tw-w-full">
                            <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-p-3 tw-border-0 tw-border-b tw-relative property-list tw-overflow-hidden" v-for="(ele, idx) in formState?.listProperty" :key="idx">
                                <span v-if="!handleCheckEdit(ele)" class="tw-text-[16px]">{{ ele }}</span>
                                <div v-else class="tw-flex tw-items-center">
                                    <div class="tw-w-[250px] tw-mr-4">
                                        <a-input :placeholder="ele" v-model:value="newPropEdit"/>
                                    </div>
                                    <AntdButton :type="'primary'" :disabled="disableBtnSaveEdit" @click="handleSaveEdit(newPropEdit, idx)" class="tw-mr-4">
                                        <span>{{ translate('Save') }}</span>
                                    </AntdButton>
                                    <AntdButton :type="'default'" ghost danger  @click="handleCancelEdit">
                                        <span>{{ translate('Cancel') }}</span>
                                    </AntdButton>
                                </div>
                                <div class="property-list-action" v-if="!isEditProperty">
                                    <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handelEditProperty(ele)">
                                        <font-awesome-icon :icon="['far', 'pen-to-square']" style="color: #001F3F;"/>
                                    </AntdButton>
                                    <AntdButton class="action-btn" :type="'light-hover'" shape="circle" @click="handleDeleteProperty(idx)">
                                        <font-awesome-icon :icon="['far', 'trash-can']" style="color: #FF0000;" />
                                    </AntdButton>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <NoData/>
                        </div>
                    </div>
                    <div class="tw-w-1/2 tw-border-l tw-py-3 tw-pl-3">
                        <div class="tw-w-full tw-flex tw-items-end tw-justify-start">
                            <div class="tw-mr-3">
                                <span class="tw-mb-2">Tên thuộc tính</span>
                                <a-input class="tw-w-full" :placeholder="'Nhập tên thuộc tính'" v-model:value="nameProperty"/>
                            </div>
                            <AntdButton :type="'primary'" ghost :disabled="disableBtnAdd" @click="handleAddProperties()">
                                <template #icon>
                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                </template>
                                <span class="tw-ml-2">Thêm</span>
                            </AntdButton>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorMess :params="[64]" :title="'Thuộc tính'" :validator="isvalidLisProps"/>
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
<script lang="ts" setup>
import BaseModal from "@/components/antd-modal/index.vue";
import AntdButton from "@/components/antd-button/index.vue";
import ErrorMess from "@/components/error-mess/index.vue";
import { translate } from "@/languages/i18n";
import { ref, watch, defineAsyncComponent, reactive, computed } from "vue";
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core';
import NoData from "@/components/NoData/index.vue";
import { STR_UPPER_CASE } from "@/utils/common";

interface FormState {
    genusId: string | number,
    genusName: string,
    listProperty: string[],
};

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
    form: {
        type: Object,
        required: true,
    },
})

const prorpertyEditing = ref<string>("");
const newPropEdit = ref<string>("");
const isEditProperty = ref<boolean>(false);
const nameProperty = ref<string>("");

const formState = reactive<FormState>({
    genusId: props?.form?.genusId,
    genusName: props?.form?.genusName,
    listProperty: props?.form?.listProperty,
});

const rules = {
    genusId: {
        required,
    },
    genusName: {
        required,
    },
};

const v$ = useVuelidate(rules, formState);

const handleCheckEdit = (val: string) => val === prorpertyEditing.value;

const handleSaveEdit = (newVal: string, idx: number) => {
    formState.listProperty[idx] = STR_UPPER_CASE(newVal);
    isEditProperty.value = false;
    prorpertyEditing.value = "";
};

const handleCancelEdit = () => {
    isEditProperty.value = false;
    prorpertyEditing.value = "";
};

const disableBtnAdd = computed(() => nameProperty.value?.length === 0);

const handleAddProperties = () => {
    if (nameProperty.value?.length > 0) {
        formState?.listProperty.push(STR_UPPER_CASE(nameProperty.value));
        nameProperty.value = ""
    };
};

const handelEditProperty = (val: string) => {
    prorpertyEditing.value = val;
    isEditProperty.value = true;
};

const handleDeleteProperty = (idx: number) => {
    formState?.listProperty?.splice(idx, 1);
};

const disableBtnSaveEdit = computed(() => newPropEdit?.value?.length === 0);

const isvalidLisProps = computed(() => { if(formState?.listProperty?.length === 0) return "required" });

const handleSubmit = () => {
    v$.value.$touch();
    if (v$.value.$invalid || formState?.listProperty?.length === 0) {
        return false;
    }
    console.log(formState);
}



</script>
<template>
<div class="tw-w-full tw-flex tw-items-center tw-py-3 tw-border tw-rounded-[12px] tw-mb-6">
    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-center tw-justify-center">
        <span class="tw-text-[14px]">Mã chủng loại</span>
        <span class="tw-text-[18px] tw-font-[600]">{{ state.id }}</span>
    </div>
    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-center tw-justify-center">
        <span class="tw-text-[14px]">Tên chủng loại</span>
        <span class="tw-text-[18px] tw-font-[600]">{{ state.name }}</span>
    </div>
</div>
<div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-mb-6">
    <div class="tw-w-1/2 tw-flex tw-justify-center tw-items-end">
        <div class="tw-mr-6 tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-start">
            <span class="tw-mb-2">Tên thuộc tính</span>            
            <a-input :placeholder="'Nhập tên thuộc tính'" v-model:value="nameProperty"/>
        </div>
        <AntdButton :type="'primary'" ghost :disabled="disableBtnAdd" @click="handleAddProperties()">
            <template #icon>
                <font-awesome-icon :icon="['fas', 'plus']" />
            </template>
            <span class="tw-ml-2">Thêm thuộc tính</span>
        </AntdButton>
    </div>
</div>
<div class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-start tw-border tw-rounded-[12px] tw-mb-6 tw-overflow-hidden">
    <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-bg-[#fafafa] tw-p-4 tw-border-0 tw-border-b">
        <span class="tw-text-xl tw-font-[600]">Bảng thuộc tính</span>
    </div>
    <div v-if="state.list?.length > 0" class="tw-w-full tw-mb-4">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-center tw-p-3 tw-border-0 tw-border-b tw-relative property-list" v-for="(ele, idx) in state.list" :key="idx">
            <span v-if="!handleCheckEdit(ele)" class="tw-text-[16px]">{{ ele }}</span>
            <div v-else class="tw-flex tw-items-center">
                <div class="tw-w-[250px] tw-mr-4">
                    <a-input :placeholder="ele" v-model:value="newPropEdit"/>
                </div>
                <AntdButton :type="'primary'" @click="handleSaveEdit(newPropEdit, idx)" class="tw-mr-4">
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
<div class="tw-w-full tw-flex tw-items-center tw-justify-between">
    <AntdButton :type="'primary'" ghost @click="$emit('preStep')">
        <template #icon>
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </template>
        <span class="tw-ml-2">Quay lại</span>
    </AntdButton>
    <AntdButton class="tw-flex tw-items-center tw-flex-row-reverse" :type="'primary'" ghost @click="handleNextStep" :disabled="disableBtnNextStep">
        <template #icon>
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </template>
        <span class="tw-mr-2">Tiếp</span>
    </AntdButton>
</div>
</template>
<script lang="ts" setup>
import AntdButton from "@/components/antd-button/index.vue";
import { watch , reactive, ref, computed, onMounted } from "vue";
import NoData from "@/components/NoData/index.vue";
import { STR_UPPER_CASE } from "@/utils/common";
import { translate } from "@/languages/i18n";
import { list } from "postcss";

const emit = defineEmits(['nextStep', 'preStep']);

const props = defineProps({
    formState: {
        type: Object,
        required: true,
    },
});

const nameProperty = ref<string>("");
const prorpertyEditing = ref<number | string>("");
const isEditProperty = ref<boolean>(false);
const newPropEdit = ref<string>("");

const state: any = reactive({
    id: props.formState.genusId,
    name: props?.formState?.genusName,
    list: props?.formState?.listProperty,
})

const handleAddProperties = () => {
    if (nameProperty.value?.length > 0) {
        state?.list.push(STR_UPPER_CASE(nameProperty.value));
        nameProperty.value = ""
    }
}

const disableBtnAdd = computed(() => nameProperty.value?.length === 0);

const handleDeleteProperty = (idx: number) => {
    state?.list?.splice(idx, 1);
}

const handelEditProperty = (val: string) => {
    prorpertyEditing.value = val;
    isEditProperty.value = true;
}

const handleCancelEdit = () => {
    isEditProperty.value = false;
    prorpertyEditing.value = "";
}

const handleSaveEdit = (newVal: string, idx: number) => {
    state.list[idx] = STR_UPPER_CASE(newVal);
    isEditProperty.value = false;
    prorpertyEditing.value = "";
}

const handleCheckEdit = (val: string) => val === prorpertyEditing.value;

const disableBtnNextStep = computed(() => state?.list?.length === 0);

const handleNextStep = async () => {
    emit('nextStep', state);
};

const onKeydown = (ev: any) => {
    if (ev.key === "Enter") {
        handleAddProperties();
    }
}

onMounted(async () => {
    document.addEventListener( "keydown", onKeydown );
});
</script>
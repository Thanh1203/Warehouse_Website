<template>
<div>
    <a-form class="tw-flex tw-justify-start tw-items-start tw-rounded-lg tw-bg-white tw-px-6 tw-py-5 tw-mb-6">
        <a-form-item class="tw-w-[250px] tw-h-[62px] !tw-mr-3">
            <span class="tw-text-xs">Nhập tên kho hàng</span>
            <a-input class="tw-mt-2"/>
        </a-form-item>
        <a-form-item class="tw-h-[62px] tw-flex tw-items-end">
            <a-button type="text" danger class="!tw-rounded-lg">
                <font-awesome-icon :icon="['far', 'trash-can']" />
                <span class="tw-ml-2">Xóa</span> 
            </a-button>
        </a-form-item>
    </a-form>
    <Section :title="'Danh sách kho'" :sub-title="'Số lượng kho hàng :'" :number="String(datafake?.length)">
        <template #action>
            <a-button type="text" size="small" class="!tw-rounded-lg tw-mr-3" danger>
                <font-awesome-icon :icon="['far', 'trash-can']" size="xs"/>
                <span class="tw-text-xs tw-ml-2">Xóa</span>
            </a-button>
            <a-button type="primary" size="small" class="!tw-rounded-lg">
                <font-awesome-icon :icon="['fas', 'plus']" size="xs"/>
                <span class="tw-text-xs tw-ml-2">Thêm mới</span>
            </a-button>
        </template>
    </Section>
</div>
</template>
<script setup lang="ts">
import Section from "@/components/section/index.vue";
import { ref, watch, onMounted } from 'vue';


const datafake =  ref<Array<any>>([]);
</script>
<style scoped lang="scss"></style>
<template>
<a-form class="tw-w-full tw-flex tw-items-center tw-justify-center">
    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-mr-3">
       <span class="tw-opacity-70">Mã chủng loại</span>
       <a-input/> 
    </div>
    <div class="tw-basis-1/2 tw-flex tw-flex-col tw-items-start tw-justify-start">
        <span class="tw-opacity-70">Tên chủng loại</span>
        <a-input/> 
    </div>
</a-form>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue';


const props = defineProps({
    state: {
        type: Object,
        required: true,
    },
    step: {
        type: Number,
        required: true,
    }
})

const stateStep = ref<any>(props.step);

watch(
    () => props.step,
    (newData) => {
        stateStep.value = newData;
        alert(stateStep.value)
    }
)

</script>
<template>step two</template>
<script lang="ts" setup>
import { watch } from 'vue';


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

watch(
    () => props.step,
    (val) => {
     console.log("setp" ,val);
    }, {
        immediate: true,
    }
)
</script>
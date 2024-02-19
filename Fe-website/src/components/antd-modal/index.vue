<template>
    <a-modal v-model:open="isVisible" :title="title" :closable="closable" :maskClosable="maskClosable" :afterClose="afterClose" :width="width">
        <slot></slot>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </a-modal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import VueTypes from "vue-types";

const props = defineProps({
    visible: VueTypes.bool.def(true),
    onOk: VueTypes.func.def(() => {}),
    title: VueTypes.string.def(""),
    closable: VueTypes.bool.def(true),
    afterClose: VueTypes.func.def(() => {}),
    maskClosable: VueTypes.bool.def(true),
    width: VueTypes.string.def("800px"),
})

let isVisible = ref(props.visible);

watch(
  () => props.visible,
  (val) => {
    isVisible.value = val;
  },
);

</script>
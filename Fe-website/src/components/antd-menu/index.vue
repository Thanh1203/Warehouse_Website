<template>
    <a-menu
    v-model:openKeys="valueOpenKeys"
    v-model:selectedKeys="valueSelectedKeys"
    :items="props.items"
    @click="clickItem"
    :mode="props.mode"
    :forceSubMenuRender="props.forceSubMenuRender"
    :inlineCollapsed="props.inlineCollapsed"
    :theme="props.theme"
    :selectable="props.selectable"
    />
</template>
<script setup lang="ts">
import VueTypes from "vue-types";
import { ref, watch } from "vue";

const props = defineProps({
    openKeys: VueTypes.array.def([]),
    selectedKeys: VueTypes.array.def([]),
    items: VueTypes.array.def([]),
    mode: VueTypes.string.def("vertical"),
    forceSubMenuRender: VueTypes.bool.def(false),
    inlineCollapsed: VueTypes.bool.def(false),
    multiple: VueTypes.bool.def(false),
    selectable: VueTypes.bool.def(true),
    theme: VueTypes.string.def('light'),
    subMenuCloseDelay: VueTypes.number.def(.1),
    subMenuOpenDelay: VueTypes.number.def(0)
});
const emit = defineEmits(['handleClick']);

const clickItem = (ev: any) => {
    emit('handleClick', ev);
}

const valueOpenKeys = ref(props.openKeys);
const valueSelectedKeys = ref(props.selectedKeys);

watch(
    () => props.openKeys,
    (val) => {
        valueOpenKeys.value = val;
    },
)

watch(
    () => props.selectedKeys,
    (val) => {
        valueSelectedKeys.value = val;
    }
)
</script>
<style lang="scss">
.ant-menu {
    border: none !important;
    .ant-menu-title-content {
        font-size: 16px;
    }
}
</style>
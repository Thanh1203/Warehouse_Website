<template>
    <a-menu
    v-model:openKeys="props.openKeys"
    v-model:selectedKeys="props.selectedKeys"
    :items="props.items"
    @click="$emit('handleClick')"
    :mode="props.mode"
    :forceSubMenuRender="props.forceSubMenuRender"
    :inlineCollapsed="props.inlineCollapsed"
    :theme="props.theme"
    :selectable="props.selectable"
    />
</template>
<script setup lang="ts">
import VueTypes from "vue-types";

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
</script>
<style lang="scss">
.ant-menu {
    .ant-menu-title-content {
        font-size: 16px;
    }
}
</style>
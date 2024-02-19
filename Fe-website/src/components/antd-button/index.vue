<template>
    <a-button :type="type" :disabled="disabled" :loading="loading">
        <template #icon>
            <slot name="icon"></slot>
        </template>
        <slot></slot>
    </a-button>
</template>
<script setup lang="ts">
import VueTypes from "vue-types";

defineProps({
  type: VueTypes.string.def("default"),
  disabled: VueTypes.bool.def(false),
  loading: VueTypes.bool.def(false),
  size: VueTypes.string.def("medium"),
});
</script>
<template>
  <a-modal 
  v-model:open="isVisible" 
  :title="title" 
  :closable="closable" 
  :maskClosable="maskClosable" 
  :afterClose="afterClose"
  :width="width"
  @ok="onOk"
  @cancel="onCancel"
  :okText="okText"
  :cancelText="cancelText"
  :style="style"
  >
    <slot></slot>
    <template #footer v-if="!defaultFooter">
      <slot name="footer"></slot>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
import { translate } from "@/languages/i18n";
import { ref, watch } from "vue";
import VueTypes from "vue-types";

const props = defineProps({
  visible: VueTypes.bool.def(true),
  onOk: VueTypes.func.def(() => {}),
  onCancel: VueTypes.func.def(() => {}),
  title: VueTypes.string.def(""),
  closable: VueTypes.bool.def(true),
  afterClose: VueTypes.func.def(() => { }),
  maskClosable: VueTypes.bool.def(true),
  width: VueTypes.string.def("800px"),
  okText: VueTypes.string.def(translate('Agree')),
  cancelText: VueTypes.string.def(translate('Cancel')),
  defaultFooter: VueTypes.bool.def(false),
  style: VueTypes.object,
});

let isVisible = ref(props.visible);

watch(
  () => props.visible,
  (val) => {
    isVisible.value = val;
  },
);

</script>
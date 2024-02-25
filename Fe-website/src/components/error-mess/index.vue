<template>
    <div v-if="validator === 'required'" class="invalid-feedback">
        {{ translate("validate.requiredInput", title, params).toLocaleLowerCase() }}
    </div>
</template>
<script lang="ts" setup>
import { translate } from "@/languages/i18n";
import { DEFAULT_MAX_LENGTH, DEFAULT_MIN_LENGTH } from "@/constants/index";

defineProps({
  title: String,
  params: {
    type: Array,
    default: () => [DEFAULT_MIN_LENGTH, DEFAULT_MAX_LENGTH],
  },
  validator: String,
});
</script>
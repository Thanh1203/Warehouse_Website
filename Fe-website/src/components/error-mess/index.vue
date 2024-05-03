<template>
  <div v-if="validator === 'required'" class="invalid-feedback">
    {{ toUpperFirstLetter(translate("validate.requiredInput", title, params).toLocaleLowerCase()) }}
  </div>
  <div v-if="validator === 'maxLength'" class="invalid-feedback">
    {{ toUpperFirstLetter(translate("validate.maxString", title, params).toLocaleLowerCase()) }}
  </div>
  <div v-if="validator === 'vi'" class="invalid-feedback">
    {{ toUpperFirstLetter(translate("validate.vi", title, params).toLocaleLowerCase()) }}
  </div>
  <div v-if="validator === 'email'" class="invalid-feedback">
    {{ toUpperFirstLetter(translate("validate.validateEmail", title, params).toLocaleLowerCase()) }}
  </div>
  <div v-if="validator === 'telephone'" class="invalid-feedback">
    {{ toUpperFirstLetter(translate("validate.telephone", title, params).toLocaleLowerCase()) }}
  </div>
  <data v-if="validator === 'positiveInteger'" class="invalid-feedback">
    {{ toUpperFirstLetter(translate("validate.positiveInteger", title, params)) }}
  </data>
  <data v-if="validator === 'maxValue'" class="invalid-feedback">
    {{ toUpperFirstLetter(translate("validate.maxValue", title, params)) }}
  </data>
</template>
<script lang="ts" setup>
import { translate } from "@/languages/i18n";
import { DEFAULT_MAX_LENGTH, DEFAULT_MIN_LENGTH } from "@/constants/index";
import { toUpperFirstLetter } from "@/utils/common";

defineProps({
  title: String,
  params: {
    type: Array,
    default: () => [DEFAULT_MIN_LENGTH, DEFAULT_MAX_LENGTH],
  },
  validator: String,
});
</script>

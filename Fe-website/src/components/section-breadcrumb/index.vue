<template>
  <a-breadcrumb class="tw-mb-4">
    <a-breadcrumb-item><a href="/">{{ translate('Home') }}</a></a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in list">
      <a :href="item.url">{{ item.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup lang="ts">
import { translate } from '@/languages/i18n';
import { PropType } from 'vue';

interface ListItem {
  title: string;
  url: string;
}

const props = defineProps({
  list: {
    type: Array as PropType<ListItem[]>,
    required: true
  }
});
</script>

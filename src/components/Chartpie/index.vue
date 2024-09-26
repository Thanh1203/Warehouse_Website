<template>
  <Pie :data="data" :options="options"/>
</template>
<script lang="ts" setup>
import { ChartOptions } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import VueTypes from 'vue-types';

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.defaults.color = "#fff"

const props = defineProps({
  data: {
    type: null as any,
  },
  showLegend: VueTypes.bool.def(true),
});

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
      display: props.showLegend,
    },
  },
};
</script>
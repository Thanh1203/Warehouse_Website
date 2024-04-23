<template>
  <Pie :data="data" :options="options"/>
</template>
<script lang="ts" setup>
import { ChartOptions } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)
defineProps({
  data: {
    type: null as any,
  },
});

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
      display: true,
    },
  },
};
</script>
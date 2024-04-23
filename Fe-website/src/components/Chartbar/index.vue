<template>
  <Bar :data="data" :options="options"/>
</template>
<script setup lang="ts">
import { BarElement, CategoryScale, Chart, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'vue-chartjs';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

defineProps({
    data: {
        type: null as any,
    },
});

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>
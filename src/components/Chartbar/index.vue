<template>
  <Bar :data="data" :options="options" />
</template>
<script setup lang="ts">
import { BarElement, CategoryScale, Chart, ChartOptions, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "vue-chartjs";
import VueTypes from "vue-types";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
Chart.defaults.color = "#fff";
const props = defineProps({
  data: {
    type: null as any,
  },
  showLegend: VueTypes.bool.def(false),
  
});

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      display: props.showLegend,
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
</script>

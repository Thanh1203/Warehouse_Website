<template>
  <Doughnut :data="data" :options="options"/>
</template>
<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Chart, Doughnut } from "vue-chartjs";
import VueTypes from "vue-types";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

const props = defineProps({
  data: {
    type: null as any,
  },
  showLegend: VueTypes.bool.def(false),
  setCutout: VueTypes.string.def('80%'),
});

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      display: props.showLegend,
    },
  },
  cutout: props.setCutout,
};
</script>

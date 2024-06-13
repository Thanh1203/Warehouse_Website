<template>
<Line :data="data" :options="options"/>
</template>
<script setup lang="ts">
import { CategoryScale, Chart, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'vue-chartjs';
import VueTypes from 'vue-types';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
Chart.defaults.color = "#fff"
const props = defineProps({
    data: {
        type: null as any,
    },
    showLegend: VueTypes.bool.def(false),
});

const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            display: props.showLegend,
        },
    },
    interaction: {
      intersect: false,
      axis: 'x'
    },

};
</script>
<template>
<Line :data="data" :options="options"/>
</template>
<script setup lang="ts">
import { CategoryScale, Chart, ChartOptions, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import VueTypes from 'vue-types';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
Chart.defaults.color = "#fff"
const props = defineProps({
    data: {
        type: null as any,
    },
    showLegend: VueTypes.bool.def(false),
    ticksLimit: VueTypes.number.def(null),
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
    scales: {
        x: {
            ticks: {
                autoSkip: props.ticksLimit ? true : false,
                maxTicksLimit: props.ticksLimit
            }
        }
    }
};

</script>
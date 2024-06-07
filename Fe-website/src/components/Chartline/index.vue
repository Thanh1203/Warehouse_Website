<template>
<Line :data="data" :options="options"/>
</template>
<script setup lang="ts">
import { CategoryScale, Chart, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'vue-chartjs';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
Chart.defaults.color = "#fff"
defineProps({
    data: {
        type: null as any,
    },
});

const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            display: false,
            // labels: {
            //     color: "#fff",
            // }
        },
    },
};
</script>
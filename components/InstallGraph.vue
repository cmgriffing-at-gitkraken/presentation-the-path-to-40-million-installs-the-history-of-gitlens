<script lang="ts">
export default {
  name: "InstallGraph",
};
</script>

<template>
  <div class="chart-container">
    <div class="chart-header">
      <h2 class="chart-title">Install Growth Over Time</h2>
      <div class="accent-bar"></div>
    </div>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="chart-footer">
      <span class="gradient-text">Exponential growth: </span>
      336K → 44M installs (130x increase)
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartCanvas = ref(null);
let chartInstance = null;

const data = [
  { year: "2017", installs: 335781 },
  { year: "2019", installs: 2575950 },
  { year: "2021", installs: 9792349 },
  { year: "2023", installs: 24382077 },
  { year: "2025", installs: 44063971 },
];

const formatInstalls = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + "K";
  }
  return value.toString();
};

const createChart = () => {
  const ctx = chartCanvas.value.getContext("2d");

  // Create gradient for the line
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#60a5fa");
  gradient.addColorStop(0.5, "#a855f7");
  gradient.addColorStop(1, "#06b6d4");

  // Create gradient for the area under the line
  const areaGradient = ctx.createLinearGradient(0, 0, 0, 400);
  areaGradient.addColorStop(0, "rgba(96, 165, 250, 0.3)");
  areaGradient.addColorStop(0.5, "rgba(168, 85, 247, 0.2)");
  areaGradient.addColorStop(1, "rgba(6, 182, 212, 0.1)");

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((d) => d.year),
      datasets: [
        {
          label: "Installs",
          data: data.map((d) => d.installs),
          borderColor: gradient,
          backgroundColor: areaGradient,
          borderWidth: 4,
          pointBackgroundColor: "#60a5fa",
          pointBorderColor: "#1f2937",
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 12,
          pointHoverBorderWidth: 3,
          pointHoverBorderColor: "#60a5fa",
          pointHoverBackgroundColor: "#1f2937",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#1f2937",
          titleColor: "#60a5fa",
          bodyColor: "#f9fafb",
          borderColor: "#374151",
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `Installs: ${formatInstalls(context.raw)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(55, 65, 81, 0.3)",
            drawBorder: true,
            borderColor: "#4b5563",
          },
          ticks: {
            color: "#9ca3af",
            font: {
              size: 13,
            },
          },
        },
        y: {
          grid: {
            color: "rgba(55, 65, 81, 0.3)",
            drawBorder: true,
            borderColor: "#4b5563",
          },
          ticks: {
            color: "#9ca3af",
            font: {
              size: 13,
            },
            callback: function (value) {
              return formatInstalls(value);
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });
};

onMounted(() => {
  createChart();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  border-radius: 1rem;
  border: 1px solid #334155;
}

.chart-header {
  margin-bottom: 2rem;
  text-align: center;
}

.chart-title {
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(90deg, #60a5fa 0%, #a855f7 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.5rem 0;
}

.accent-bar {
  height: 4px;
  width: 6rem;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  margin: 0 auto;
  border-radius: 2px;
}

.chart-wrapper {
  height: 280px;
  position: relative;
}

.chart-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
}

.gradient-text {
  background: linear-gradient(90deg, #60a5fa, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

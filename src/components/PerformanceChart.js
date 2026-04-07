import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function PerformanceChart({ history }) {

  if (!history || history.length < 2) {
    return <p style={{ color: "gray" }}>Loading chart...</p>;
  }

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Runs",
        data: history,
        borderColor: "#ffffff",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#ffffff"
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" }
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default PerformanceChart;
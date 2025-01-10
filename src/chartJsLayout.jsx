import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDate, formatTime } from "./helpers/timeToUtc.js";
import { elementAfterDot } from "./constants/price.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export function ChartJsLayout({ newCrypto, crypto }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: newCrypto ? formatDate(newCrypto.date) : "",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };

  const data = {
    labels: crypto.map((item) => `${formatTime(item.date)}`),
    datasets: [
      {
        label: `${newCrypto.name}`,
        data: crypto.map((item) => Number(item.price).toFixed(elementAfterDot)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          height: "600px",
          width: "100%",
          maxWidth: "800px",
          maxHeight: "600px",
        }}
      >
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

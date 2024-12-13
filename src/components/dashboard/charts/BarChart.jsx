import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const data = {
    labels: [
      "Wind Generation",
      "Solar Energy Consumption",
      "Hydropower Consumption",
      "Biofuel Production",
      "Installed Geothermal Capacity",
    ],
    datasets: [
      {
        label: "Producción de Energía (TWh)",
        data: [200, 150, 300, 100, 50], // Reemplaza con tus datos reales
        backgroundColor: ["#4CAF50", "#FFEB3B", "#2196F3", "#FF5722", "#9C27B0"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

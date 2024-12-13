import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = () => {
  const data = {
    labels: ["2010", "2012", "2014", "2016", "2018", "2020"], // Años
    datasets: [
      {
        label: "Capacidad Instalada de Energía Eólica (GW)",
        data: [50, 75, 100, 125, 150, 200],
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Capacidad Instalada de Energía Solar (GW)",
        data: [10, 25, 50, 75, 100, 150],
        borderColor: "#2196F3",
        fill: false,
      },
      {
        label: "Capacidad Instalada de Energía Geotérmica (GW)",
        data: [5, 10, 15, 20, 25, 30],
        borderColor: "#FF5722",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

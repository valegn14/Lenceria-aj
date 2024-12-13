import React from "react";
import { Line } from "react-chartjs-2";

const AreaChart = () => {
  const data = {
    labels: ["2010", "2012", "2014", "2016", "2018", "2020"], // Años
    datasets: [
      {
        label: "Consumo de Energía Renovable (TWh)",
        data: [100, 200, 300, 400, 500, 600],
        backgroundColor: "rgba(76, 175, 80, 0.5)",
        borderColor: "#4CAF50",
        fill: true,
      },
      {
        label: "Consumo de Energía Convencional (TWh)",
        data: [800, 700, 600, 500, 400, 300],
        backgroundColor: "rgba(244, 67, 54, 0.5)",
        borderColor: "#F44336",
        fill: true,
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

export default AreaChart;

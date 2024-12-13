import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const data = {
    labels: [
      "Renewables",
      "Wind",
      "Solar",
      "Hydro",
    ],
    datasets: [
      {
        data: [40, 25, 20, 15], // Reemplaza con tus datos reales
        backgroundColor: ["#4CAF50", "#FFEB3B", "#2196F3", "#FF5722"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;

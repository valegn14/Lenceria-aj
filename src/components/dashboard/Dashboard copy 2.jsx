import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [jsonData, setJsonData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const csvText = e.target.result;

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const sanitizedData = result.data.map((row) => {
            const sanitizedRow = {};
            Object.keys(row).forEach((key) => {
              sanitizedRow[key.trim()] = row[key]?.trim() || "";
            });
            return sanitizedRow;
          });

          setJsonData(sanitizedData);
          setColumns(Object.keys(sanitizedData[0]));
        },
        error: (err) => {
          console.error("Error al procesar el archivo CSV:", err);
        },
      });
    };

    reader.readAsText(file);
  };

  const generateBarChartData = () => {
    const renewableColumns = columns.filter((col) =>
      col.toLowerCase().includes("generationtwh")
    );

    return {
      labels: jsonData.map((row) => row.entity || "N/A"),
      datasets: renewableColumns.map((col, index) => ({
        label: col,
        data: jsonData.map((row) => parseFloat(row[col]) || 0),
        backgroundColor: `rgba(${100 + index * 30}, ${50 + index * 50}, ${
          200 - index * 50
        }, 0.7)`,
      })),
    };
  };

  const generatePieChartData = () => {
    const shareColumns = columns.filter((col) =>
      col.toLowerCase().includes("electricity")
    );

    const total = shareColumns.map((col) =>
      jsonData.reduce((sum, row) => sum + (parseFloat(row[col]) || 0), 0)
    );

    return {
      labels: shareColumns,
      datasets: [
        {
          data: total,
          backgroundColor: ["#4caf50", "#ff5722", "#2196f3", "#9c27b0"],
        },
      ],
    };
  };

  const generateLineChartData = () => {
    const capacityColumns = columns.filter((col) =>
      col.toLowerCase().includes("capacity")
    );

    return {
      labels: [...new Set(jsonData.map((row) => row.year))].sort(),
      datasets: capacityColumns.map((col, index) => ({
        label: col,
        data: jsonData
          .filter((row) => row[col])
          .map((row) => parseFloat(row[col]) || 0),
        borderColor: `rgba(${100 + index * 30}, ${50 + index * 50}, ${
          200 - index * 50
        }, 0.7)`,
        fill: false,
      })),
    };
  };

  const generateAreaChartData = () => {
    const comparisonColumns = columns.filter((col) =>
      col.toLowerCase().includes("energy")
    );

    return {
      labels: [...new Set(jsonData.map((row) => row.year))].sort(),
      datasets: comparisonColumns.map((col, index) => ({
        label: col,
        data: jsonData
          .filter((row) => row[col])
          .map((row) => parseFloat(row[col]) || 0),
        backgroundColor: `rgba(${100 + index * 30}, ${50 + index * 50}, ${
          200 - index * 50
        }, 0.3)`,
        borderColor: `rgba(${100 + index * 30}, ${50 + index * 50}, ${
          200 - index * 50
        }, 0.7)`,
        fill: true,
      })),
    };
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Dashboard</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mt-4 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
      />

      {jsonData.length > 0 && (
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Gráfico de Barras */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Producción de Energía Renovable por Fuente
            </h2>
            <Bar data={generateBarChartData()} options={{ responsive: true }} />
          </div>

          {/* Gráfico de Torta */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Participación de Energías Renovables
            </h2>
            <Pie data={generatePieChartData()} options={{ responsive: true }} />
          </div>

          {/* Gráfico de Líneas */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Tendencia en la Capacidad Instalada
            </h2>
            <Line
              data={generateLineChartData()}
              options={{ responsive: true }}
            />
          </div>

          {/* Gráfico de Área */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Comparación entre Consumo de Energía Renovable y Convencional
            </h2>
            <Line
              data={generateAreaChartData()}
              options={{
                responsive: true,
                elements: { line: { tension: 0.4 } },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

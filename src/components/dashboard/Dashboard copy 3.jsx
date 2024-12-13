import React, { useState } from "react";
import Papa from "papaparse";
import ColumnFilter from "../table/ColumnFilter";
import CountryFilter from "../table/CountryFilter";
import { Bar, Pie, Line } from "react-chartjs-2";
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

// Registrar los elementos de Chart.js
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
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [yearRange, setYearRange] = useState([0, 0]);

  // Cargar archivo CSV y procesarlo
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data.map((row) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key.trim(), value.trim()])
          )
        );
        setJsonData(data);
        setColumns(Object.keys(data[0]));
        setVisibleColumns(Object.keys(data[0]));

        // Determinar años disponibles
        const years = [...new Set(data.map((row) => parseInt(row.year) || 0))];
        years.sort((a, b) => a - b);
        setYearRange([years[0], years[years.length - 1]]);
        setFilteredData(data);
      },
    });
  };

  // Filtrar datos
  const applyFilters = () => {
    const filtered = jsonData.filter((row) => {
      const year = parseInt(row.year) || 0;
      return (
        (!selectedCountries.length ||
          selectedCountries.includes(row.entity || "")) &&
        year >= yearRange[0] &&
        year <= yearRange[1]
      );
    });
    setFilteredData(filtered);
  };

  // Datos para gráficos
  const generateBarChartData = () => ({
    labels: filteredData.map((row) => row.entity),
    datasets: visibleColumns
      .filter((col) => col.toLowerCase().includes("generation"))
      .map((col, index) => ({
        label: col,
        data: filteredData.map((row) => parseFloat(row[col]) || 0),
        backgroundColor: `rgba(${100 + index * 30}, 99, 132, 0.5)`,
      })),
  });

  const generatePieChartData = () => {
    const total = visibleColumns
      .filter((col) => col.toLowerCase().includes("electricity"))
      .map((col) =>
        filteredData.reduce((sum, row) => sum + (parseFloat(row[col]) || 0), 0)
      );

    return {
      labels: visibleColumns.filter((col) =>
        col.toLowerCase().includes("electricity")
      ),
      datasets: [
        {
          data: total,
          backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
        },
      ],
    };
  };

  const generateLineChartData = () => ({
    labels: [...new Set(filteredData.map((row) => row.year))].sort(),
    datasets: visibleColumns
      .filter((col) => col.toLowerCase().includes("capacity"))
      .map((col, index) => ({
        label: col,
        data: filteredData
          .filter((row) => row[col])
          .map((row) => parseFloat(row[col]) || 0),
        borderColor: `rgba(${100 + index * 30}, 99, 132, 0.7)`,
        fill: false,
      })),
  });

  const generateAreaChartData = () => ({
    labels: [...new Set(filteredData.map((row) => row.year))].sort(),
    datasets: visibleColumns
      .filter((col) => col.toLowerCase().includes("energy"))
      .map((col, index) => ({
        label: col,
        data: filteredData
          .filter((row) => row[col])
          .map((row) => parseFloat(row[col]) || 0),
        backgroundColor: `rgba(${100 + index * 30}, 99, 132, 0.3)`,
        borderColor: `rgba(${100 + index * 30}, 99, 132, 0.7)`,
        fill: true,
      })),
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Dashboard</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-6 w-full p-2 border rounded-lg shadow-md"
      />

      <div className="grid grid-cols-4 gap-6">
        {/* Filtros */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <ColumnFilter
            headers={columns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          <CountryFilter
            uniqueCountries={[...new Set(jsonData.map((row) => row.entity))]}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
          <div className="mt-4">
            <label className="block font-semibold text-gray-600 mb-2">
              Rango de Años:
            </label>
            <input
              type="number"
              className="p-2 border rounded w-full mb-2"
              value={yearRange[0]}
              onChange={(e) =>
                setYearRange([parseInt(e.target.value), yearRange[1]])
              }
            />
            <input
              type="number"
              className="p-2 border rounded w-full"
              value={yearRange[1]}
              onChange={(e) =>
                setYearRange([yearRange[0], parseInt(e.target.value)])
              }
            />
          </div>
          <button
            onClick={applyFilters}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
          >
            Aplicar Filtros
          </button>
        </div>

        {/* Gráficos */}
        <div className="col-span-3 grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Producción de Energía Renovable
            </h3>
            <Bar data={generateBarChartData()} options={{ responsive: true }} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Participación de Energías Renovables
            </h3>
            <Pie data={generatePieChartData()} options={{ responsive: true }} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Tendencia en la Capacidad Instalada
            </h3>
            <Line
              data={generateLineChartData()}
              options={{ responsive: true }}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Comparación de Energías Renovable y Convencional
            </h3>
            <Line
              data={generateAreaChartData()}
              options={{
                responsive: true,
                elements: { line: { tension: 0.4 } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

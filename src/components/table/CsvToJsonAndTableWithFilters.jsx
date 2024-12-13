import React, { useState, useMemo } from "react";
import ColumnFilter from "./ColumnFilter";
import CountryFilter from "./CountryFilter";
import YearRangeFilter from "./YearRangeFilter";
import DataTable from "./DataTable";

const CsvToJsonAndTableWithFilters = React.memo(() => {
  const [jsonData, setJsonData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [yearRange, setYearRange] = useState([0, 0]);
  const [availableYears, setAvailableYears] = useState([0, 0]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const itemsPerPage = 6;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target.result;
      const rows = csvText.split("\n").filter((row) => row.trim() !== "");
      const headers = rows[0].split(",").map((header) => header.trim());
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((acc, header, index) => {
          acc[header] = values[index]?.trim();
          return acc;
        }, {});
      });

      setHeaders(headers);
      setJsonData(data);
      setVisibleColumns(headers);

      // Configurar rango de años dinámico
      const years = [...new Set(data.map((row) => parseInt(row["year"])))].sort(
        (a, b) => a - b
      );
      setAvailableYears([years[0], years[years.length - 1]]);
      setYearRange([years[0], years[years.length - 1]]);

      setCurrentPage(1);
      setFiltersApplied(false);
    };
    reader.readAsText(file);
  };

  const handleApplyFilters = () => {
    if (yearRange[0] === yearRange[1]) {
      setErrorMessage(
        "El rango de años no puede ser igual. Por favor selecciona valores distintos."
      );
      return;
    }
    setErrorMessage(""); // Limpiar el mensaje de error
    setFiltersApplied(true);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const filteredData = useMemo(() => {
    if (!filtersApplied) return jsonData;

    return jsonData.filter((row) => {
      // Filtrar por país
      if (
        selectedCountries.length > 0 &&
        !selectedCountries.includes(row["entity"])
      ) {
        return false;
      }
      // Filtrar por rango de años
      const year = parseInt(row["year"]);
      if (year < yearRange[0] || year > yearRange[1]) {
        return false;
      }
      return true;
    });
  }, [jsonData, selectedCountries, yearRange, filtersApplied]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / itemsPerPage),
    [filteredData.length]
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const uniqueCountries = useMemo(() => {
    return [...new Set(jsonData.map((row) => row["entity"]))].filter(Boolean);
  }, [jsonData]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex">
      {/* Barra lateral de filtros */}
      <div className="w-1/4 bg-white p-4 shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Filtros</h2>
        <ColumnFilter
          headers={headers}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
        <CountryFilter
          uniqueCountries={uniqueCountries}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
        <YearRangeFilter
          yearRange={yearRange}
          availableYears={availableYears}
          setYearRange={setYearRange}
          handleApplyFilters={handleApplyFilters}
          errorMessage={errorMessage}
        />
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mt-4 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* Tabla */}
      <div className="w-3/4 ml-6">
        <DataTable
          visibleColumns={visibleColumns}
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </div>
    </div>
  );
});

export default CsvToJsonAndTableWithFilters;

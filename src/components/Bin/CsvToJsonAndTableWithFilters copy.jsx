import React, { useState, useMemo } from "react";

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

  const itemsPerPage = 10;

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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        Filtros avanzados: CSV a JSON y Tabla
      </h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
      />

      {/* Filtros */}
      {headers.length > 0 && (
        <div className="mb-6 w-full max-w-4xl space-y-6">
          {/* Selector de columnas */}
          <div>
            <label className="block font-semibold text-gray-600 mb-2">
              Columnas a mostrar:
            </label>
            <div className="relative">
              <div className="bg-white border rounded-lg p-4 max-h-40 overflow-y-auto shadow-sm">
                {headers.map((header, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(header)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setVisibleColumns((prev) =>
                          isChecked
                            ? [...prev, header]
                            : prev.filter((col) => col !== header)
                        );
                      }}
                      className="mr-2"
                    />
                    <label>{header}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filtro por país */}
          <div>
            <label className="block font-semibold text-gray-600 mb-2">
              Filtrar por país:
            </label>
            <select
              multiple
              value={selectedCountries}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setSelectedCountries(selectedOptions);
              }}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            >
              {uniqueCountries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por rango de años */}
          <div>
            <label className="block font-semibold text-gray-600 mb-2">
              Rango de años:
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={yearRange[0]}
                min={availableYears[0]}
                max={availableYears[1]}
                onChange={(e) =>
                  setYearRange([parseInt(e.target.value), yearRange[1]])
                }
                className="w-1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <span className="text-gray-500">a</span>
              <input
                type="number"
                value={yearRange[1]}
                min={availableYears[0]}
                max={availableYears[1]}
                onChange={(e) =>
                  setYearRange([yearRange[0], parseInt(e.target.value)])
                }
                className="w-1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Mostrar error si el rango es inválido */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {/* Botón aplicar filtros */}
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none"
          >
            Aplicar Filtros
          </button>
        </div>
      )}

      {/* Tabla */}
      {filteredData.length > 0 && (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-indigo-500 text-white">
                {visibleColumns.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border border-gray-200 text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {visibleColumns.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 border border-gray-200"
                    >
                      {row[header] || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md disabled:bg-gray-300"
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md disabled:bg-gray-300"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CsvToJsonAndTableWithFilters;

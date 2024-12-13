const YearRangeFilter = ({
  yearRange,
  availableYears,
  setYearRange,
  handleApplyFilters,
  errorMessage,
}) => {
  return (
    <div className="mb-6">
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
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      <button
        onClick={handleApplyFilters}
        className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default YearRangeFilter;

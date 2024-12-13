const DataTable = ({
  visibleColumns,
  currentItems,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      {/* Contenedor con scroll interno */}
      <div className="max-h-[500px] overflow-y-auto">
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
      </div>
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
  );
};

export default DataTable;

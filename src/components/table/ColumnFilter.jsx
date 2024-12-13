const ColumnFilter = ({ headers, visibleColumns, setVisibleColumns }) => {
  const handleSelectAll = () => {
    if (visibleColumns.length === headers.length) {
      setVisibleColumns([]); // Deseleccionar todas las columnas
    } else {
      setVisibleColumns(headers); // Seleccionar todas las columnas
    }
  };

  const handleIndividualChange = (header) => {
    setVisibleColumns((prev) =>
      prev.includes(header)
        ? prev.filter((col) => col !== header) // Deseleccionar una columna
        : [...prev, header] // Seleccionar una columna
    );
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold text-gray-600 mb-2">
        Columnas a mostrar:
      </label>
      <div className="bg-white border rounded-lg p-4 max-h-40 overflow-y-auto shadow-sm">
        {/* Opción de seleccionar/deseleccionar todas las columnas */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={visibleColumns.length === headers.length}
            onChange={handleSelectAll}
            className="mr-2"
          />
          <label>
            {visibleColumns.length === headers.length
              ? "Deseleccionar todas"
              : "Seleccionar todas"}
          </label>
        </div>

        {/* Lista de columnas */}
        {headers.map((header, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={visibleColumns.includes(header)}
              onChange={() => handleIndividualChange(header)}
              className="mr-2"
            />
            <label>{header}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnFilter;

import React, { useState } from 'react';

const CsvToJsonAndTableWithPagination = () => {
    const [jsonData, setJsonData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Número de elementos por página

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
            setCurrentPage(1);
        };
        reader.readAsText(file);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = jsonData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(jsonData.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Convertir CSV a JSON y Renderizar Tabla Responsiva</h1>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-4 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />

            {jsonData.length > 0 && (
                <div className="mb-6 w-full max-w-4xl">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Datos en formato JSON:</h2>
                    <pre className="p-4 bg-gray-800 text-white rounded-md overflow-auto text-sm">
                        {JSON.stringify(currentItems, null, 2)}
                    </pre>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md disabled:bg-gray-300"
                        >
                            Anterior
                        </button>
                        <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
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

            {jsonData.length > 0 && (
                <div className="w-full max-w-4xl overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-indigo-500 text-white">
                                {headers.map((header, index) => (
                                    <th key={index} className="px-4 py-2 border border-gray-200 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-100">
                                    {headers.map((header, colIndex) => (
                                        <td key={colIndex} className="px-4 py-2 border border-gray-200">
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
                        <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
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
};

export default CsvToJsonAndTableWithPagination;

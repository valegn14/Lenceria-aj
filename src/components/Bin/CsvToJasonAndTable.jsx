import React, { useState } from 'react';

const CsvToJsonAndTable = () => {
    const [jsonData, setJsonData] = useState([]);
    const [headers, setHeaders] = useState([]);

    // Función para procesar el archivo CSV y convertirlo a JSON
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvText = e.target.result;
            const rows = csvText.split("\n").filter((row) => row.trim() !== "");

            // Extraer encabezados y datos
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
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Convertir CSV a JSON y Renderizar Tabla</h1>
            
            {/* Input para cargar el archivo CSV */}
            <input
                type="file"
                accept="energy_data.csv"
                onChange={handleFileUpload}
                className="mb-4 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />

            {/* Mostrar JSON convertido */}
            {jsonData.length > 0 && (
                <div className="mb-6 w-full max-w-4xl">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Datos en formato JSON:</h2>
                    <pre className="p-4 bg-gray-800 text-white rounded-md overflow-auto text-sm">
                        {JSON.stringify(jsonData, null, 2)}
                    </pre>
                </div>
            )}

            {/* Tabla para mostrar los datos */}
            {jsonData.length > 0 && (
                <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-indigo-500 text-white">
                            {headers.map((header, index) => (
                                <th key={index} className="px-4 py-2 border border-gray-200">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((row, rowIndex) => (
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
            )}
        </div>
    );
};

export default CsvToJsonAndTable;

const CountryFilter = ({
 uniqueCountries,
 selectedCountries,
 setSelectedCountries,
}) => {
 const handleSelectAll = () => {
   if (selectedCountries.length === uniqueCountries.length) {
     setSelectedCountries([]); // Deseleccionar todos
   } else {
     setSelectedCountries(uniqueCountries); // Seleccionar todos
   }
 };

 const handleIndividualChange = (country) => {
   setSelectedCountries((prev) =>
     prev.includes(country)
       ? prev.filter((c) => c !== country) // Deseleccionar un país
       : [...prev, country] // Seleccionar un país
   );
 };

 return (
   <div className="mb-6">
     <label className="block font-semibold text-gray-600 mb-2">
       Filtrar por país:
     </label>
     <div className="bg-white border rounded-lg p-4 max-h-40 overflow-y-auto shadow-sm">
       {/* Opción de seleccionar/deseleccionar todos */}
       <div className="flex items-center mb-2">
         <input
           type="checkbox"
           checked={selectedCountries.length === uniqueCountries.length}
           onChange={handleSelectAll}
           className="mr-2"
         />
         <label>
           {selectedCountries.length === uniqueCountries.length
             ? "Deseleccionar todos"
             : "Seleccionar todos"}
         </label>
       </div>

       {/* Lista de países */}
       {uniqueCountries.map((country, index) => (
         <div key={index} className="flex items-center mb-2">
           <input
             type="checkbox"
             checked={selectedCountries.includes(country)}
             onChange={() => handleIndividualChange(country)}
             className="mr-2"
           />
           <label>{country}</label>
         </div>
       ))}
     </div>
   </div>
 );
};

export default CountryFilter;

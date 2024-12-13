import React from 'react';
import CsvToJsonAndTable2 from './CsvToJsonAndTable2';

const Card = () => {
  return (
    <div className="max-w-g mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
      <header className="bg-gray-100 px-5 py-3 border-b">
        <h2 className="text-gray-800 text-lg">Header del Card</h2>
      </header>
      <div className="p-5">
        <p className="text-gray-600">Este es el contenido principal de la tarjeta. Aquí puedes agregar más información o elementos que desees mostrar dentro de la tarjeta.</p>
      </div>
      <footer className="bg-gray-100 px-5 py-3 border-t">
        <a href="#" className="text-teal-600 hover:text-teal-800">Acción del Footer</a>
      </footer>
      <CsvToJsonAndTable2/>
      


    </div>
  );
};

export default Card;

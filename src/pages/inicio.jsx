import React, { useState } from "react";
import Card from "../database/cards";
import banner from "./pinteres3.png";

const Inicio = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full">
      <div className="w-full 
        h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-80
        overflow-hidden rounded-none sm:rounded-lg shadow-lg mb-4 sm:mb-6 lg:mb-8 mx-auto max-w-7xl px-2 sm:px-4">
        <img
          src={banner}
          alt="Banner de inicio"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="text-center mb-6 px-4">
        {/* Barra de búsqueda con icono de lupa dentro del input */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pink-500 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar productos🔥"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      <Card searchTerm={searchTerm} />
    </div>
  );
};

export default Inicio;

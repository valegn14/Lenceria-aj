import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../database/cards";
import banner from "./pinteres3.png";

const categories = [
  {
    name: "Lencería",
    route: "/categoria/lenceria",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.5,14 C12.5,11.2385763 15.7385763,8 18.5,8 C21.2614237,8 23.5,9.23857625 23.5,12 C23.5,14.7614237 21.2614237,17 18.5,17 C16.6555516,17 14.5982285,16.8935626 13.4352772,16 L11.0647228,16 C9.90177152,16.8935626 7.8444484,17 6,17 C3.23857625,17 1,14.7614237 1,12 C1,9.23857625 3.23857625,8 6,8 C8.76142375,8 12,11.2385763 12,14 L12.5,14 Z" />
      </svg>
    ),
  },
  {
    name: "Juguetes",
    route: "/categoria/juguetes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 64 64" fill="currentColor">
        <rect x="28" y="8" width="8" height="36" rx="4" />
        <rect x="26" y="44" width="12" height="12" rx="6" />
      </svg>
    ),
  },
  {
    name: "Lubricantes",
    route: "/categoria/lubricantes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 16 16" fill="currentColor">
        <path fillRule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
        <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/>
      </svg>
    ),
  },
];

const Inicio = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full">
      {/* Banner */}
      <div
        className="w-full 
          h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-80
          overflow-hidden rounded-none sm:rounded-lg shadow-lg mb-4 sm:mb-6 lg:mb-8 mx-auto max-w-7xl px-2 sm:px-4"
      >
        <img
          src={banner}
          alt="Banner de inicio"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Barra de búsqueda */}
      <div className="text-center mb-6 px-4">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

      {/* Sección de categorías redondas con sombra negra y iconos negros */}
      <div className="mb-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Explora por categoría
          </h2> */}
          <div className="flex justify-center space-x-6">
            {categories.map(cat => (
              <Link
                to={cat.route}
                key={cat.name}
                className="
                  flex flex-col items-center justify-center 
                  bg-gradient-to-br from-pink-400 to-pink-600 
                  rounded-full 
                  w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                  transform transition hover:scale-105
                  shadow-lg shadow-black/50
                "
              >
                <div className="text-black mb-1">
                  {cat.icon}
                </div>
                <span className="text-black text-sm text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Resultados / Cards filtradas */}
      <Card searchTerm={searchTerm} />
    </div>
  );
};

export default Inicio;

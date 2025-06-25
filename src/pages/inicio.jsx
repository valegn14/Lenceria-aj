

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../database/cards";
import banner from "./pinteres3.png";


// Imágenes sensuales para categorías
const lenceriaImg = "https://i.pinimg.com/736x/3e/9a/21/3e9a213fba360f4fefbe8b85e4f1be24.jpg";
const juguetesImg = "https://i.pinimg.com/736x/b9/88/17/b98817646c69337a78d32d0634585379.jpg";

const lubricantesImg = "https://senintimo.com/cdn/shop/files/Oscuro_1.jpg?v=1744314819&width=500";
const promocionesImg = "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const categories = [
  {
    name: "Lencería",
    route: "/lenceria",
    image: lenceriaImg,
    description: "Elegancia que despierta los sentidos",
    color: "from-rose-900/60 to-pink-900/60"
  },
  {
    name: "Juguetes",
    route: "/juguetes",
    image: juguetesImg,
    description: "Placeres que sorprenden",
    color: "from-purple-900/60 to-indigo-900/60"
  },
  {
    name: "Lubricantes",
    route: "/lubricantes",
    image: lubricantesImg,
    description: "Suavidad que intensifica",
    color: "from-blue-900/60 to-teal-900/60"
  },
  {
    name: "Promociones",
    route: "/promociones",
    image: promocionesImg,
    description: "Oportunidades que excitan",
    color: "from-amber-900/60 to-orange-900/60"
  },
];

const Inicio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="w-full bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Banner */}
      <div
        className="w-full 
          h-32 sm:h-40 md:h-48 lg:h-56
          overflow-hidden rounded-none sm:rounded-lg shadow-lg mb-4 mx-auto max-w-7xl px-2 sm:px-4"
      >
        <img
          src={banner}
          alt="Banner de inicio"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-800 mb-2">
            Explora nuestras categorías
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto mb-4"></div>
        </div>
      </div>

      {/* Sensual image-based categories con elementos decorativos restaurados */}
      <div className="mb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <Link
                to={cat.route}
                key={cat.name}
                className="group relative overflow-hidden rounded-lg shadow-md transform transition-all duration-500 hover:shadow-xl"
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Contenedor de imagen */}
                <div className="relative h-48 w-full">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Superposición con menor opacidad */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-80`}></div>
                  
                  {/* Efecto hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 ${
                    hoveredCategory === idx ? 'opacity-80' : 'opacity-50'
                  }`}></div>
                  
                  {/* Elementos decorativos restaurados - posición superior derecha */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transform transition-transform duration-700 group-hover:rotate-45">
                    <div className="w-6 h-6 rounded-full border border-white/30"></div>
                  </div>
                </div>
                
                {/* Información de categoría */}
                <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
                  <h3 className="text-xl font-serif font-light mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm font-light opacity-0 max-h-0 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-20">
                    {cat.description}
                  </p>
                </div>
                
                {/* Indicador de hover */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transform transition-transform duration-500 group-hover:opacity-100 opacity-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Resultados / Cards filtradas */}
      <div className="max-w-7xl mx-auto px-4">
        <Card searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Inicio;
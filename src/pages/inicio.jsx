import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner from "./pinteres3.png";
import Juguetes from "./juguetes"; // Asegúrate de ajustar esta ruta

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


const Inicio = ({ searchTerm }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);


  return (
    <div className="w-full bg-gradient-to-b from-pink-50 to-purple-50 min-h-screen">
      {/* Hero Banner */}
      <div className="w-full sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden  shadow-xl">
            <img
              src={banner}
              alt="Banner de inicio"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
                Bienvenidos al Placer
              </h1>
              <p className="text-sm sm:text-base md:text-lg opacity-90 drop-shadow-md">
                Descubre una experiencia única de sensualidad y elegancia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-800 mb-4">
              Explora nuestras categorías
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <Link
                to={cat.route}
                key={cat.name}
                className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="relative h-40 sm:h-56 lg:h-56 w-full">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center transform transition-transform duration-700 group-hover:rotate-45">
                    <div className="w-6 h-6 rounded-full border border-white/40"></div>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-serif font-light mb-2 transform transition-transform duration-500 group-hover:translate-y-0">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-light opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-20">
                    {cat.description}
                  </p>
                  <div className="mt-3 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm mr-2">Explorar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


        {/* Productos destacados */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-800 mb-4">
            PRODUCTOS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto"></div>
            </div>
            {/* <Card searchTerm={searchTerm} /> */}
            <Juguetes onlyPromos={false} desdeInicio={true} />

          </div>
        </div>
      </div>
  );
};

export default Inicio;

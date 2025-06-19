// src/pages/inicio.jsx
import React from "react";
import Card from "../database/cards"; // ajusta la ruta a donde esté tu Card.jsx
import banner from "./pinteres3.png"; // ruta a tu imagen

const Inicio = () => {
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
      <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
          Encuentra todo tipo de juguetes
        </h2>
      </div>
      <Card />
    </div>
  );
};

export default Inicio;
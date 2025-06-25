import React, { useState, useEffect } from "react";
import Card from "../database/cards";

const Promociones = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-white to-rose-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado animado */}
        {/* <div className={`text-center mb-10 transition-all duration-500 ${isScrolled ? "scale-95" : "scale-100"}`}>
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl sm:text-4l md:text-5xl font-bold text-rose-800 leading-tight relative z-10">
              Promociones Exclusivas
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-rose-200/60 rounded-full z-0"></div>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre nuestras <span className="font-semibold text-rose-700">ofertas especiales</span> en productos seleccionados. 
            Placer de calidad a precios irresistibles.
          </p>
          
          <div className="flex justify-center space-x-4 mb-10">
        
          
          </div>
        </div> */}
        
        {/* Contador de ofertas */}
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl p-6 mb-12 border border-rose-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-rose-500 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-800">Ofertas Activas</h3>
                <p className="text-gray-600">Promociones disponibles por tiempo limitado</p>
              </div>
            </div>
            <div className="bg-white rounded-xl px-6 py-3 shadow-inner border border-rose-200">
              <div className="flex items-center">
              
                <span className="text-lg font-bold text-gray-800">Aprovecha!!! </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección de productos en promoción */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-50 to-transparent z-0"></div>
          <div className="relative z-10">
            <Card onlyPromos />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rose-50 to-transparent z-0"></div>
        </div>
        
        {/* Banner inferior */}

      </div>
    </div>
  );
};

export default Promociones;
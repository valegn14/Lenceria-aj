// import React from "react";
// // import Card from "../database/cards";

// const Juega = () => (
//   <div className="w-full">
//     <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-4">
//       <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
//         Encuentra promociones imperdibles
//       </h2>
//       <p className="text-sm sm:text-base text-gray-600 mt-2">
//         Descuentos especiales en productos seleccionados
//       </p>
//     </div>
//     {/* Sólo mostrará productos con rebaja > 0 */}
//     {/* <Card onlyPromos /> */}
//   </div>
// );

// export default Juega;



import React from 'react';

const Juega = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
          {/* Contenido de texto */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                Nuevo Lanzamiento
              </span>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                Hidralux Pro
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-gray-700 mt-2">
                Lubricante Premium de Larga Duración
              </h2>
            </div>
            
            <p className="text-gray-600 mt-4 leading-relaxed">
              Experimenta la máxima comodidad con nuestra fórmula hipoalergénica a base de agua. 
              Sensación natural, sin residuos y compatible con todos los materiales.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-indigo-200">
                Comprar ahora
              </button>
              <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-full transition-all duration-300 hover:bg-indigo-50">
                Ver detalles
              </button>
            </div>
            
            <div className="mt-8 flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">4.9/5 (342 reseñas)</span>
            </div>
          </div>
          
          {/* Imagen del producto */}
          <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-blue-100 to-indigo-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="bg-white rounded-full p-6 shadow-lg">
                <div className="w-64 h-64 flex items-center justify-center">
                  <div className="relative">
                    {/* Botella del producto */}
                    <div className="w-32 h-48 bg-gradient-to-b from-indigo-300 to-indigo-500 rounded-t-full rounded-b-lg shadow-xl mx-auto">
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-40 bg-gradient-to-b from-indigo-100 to-indigo-300 rounded-t-full rounded-b-lg opacity-70"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-indigo-700 rounded-full"></div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-800 rounded-full"></div>
                    </div>
                    
                    {/* Gotas */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-4 h-6 bg-indigo-400 rounded-full opacity-80 animate-bounce"></div>
                        <div className="w-3 h-5 bg-indigo-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-100">
                  <span className="text-xs font-medium text-indigo-800">100%</span>
                  <span className="text-xs text-gray-700">Hipoalergénico</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-xs font-medium text-indigo-800">0%</span>
                  <span className="text-xs text-gray-700">Residuos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Diseñado para la máxima comodidad y seguridad | Libre de parabenos y glicerina | Compatible con látex y silicona
          </p>
        </div>
      </div>
    </div>
  );
};

export default Juega;
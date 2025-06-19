import React from "react";
import Card from "../database/cards";

const Promociones = () => (
  <div className="w-full">
    <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-4">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
        Encuentra promociones imperdibles
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mt-2">
        Descuentos especiales en productos seleccionados
      </p>
    </div>
    {/* Sólo mostrará productos con rebaja > 0 */}
    <Card onlyPromos />
  </div>
);

export default Promociones;
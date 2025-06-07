// src/pages/inicio.jsx
import React from "react";
import Card from "../database/cards"; // ajusta la ruta a donde esté tu Card.jsx
import banner from "./pinteres3.png"; // ruta a tu imagen

const Inicio = () => {
  return (
      <div >
     <div className="w-full  
                h-48     /* móvil: 12rem de alto */
                md:h-64  /* tablet: 16rem de alto */
                lg:h-80  /* escritorio: 20rem de alto */
                overflow-hidden rounded-lg shadow-lg mb-8">
  <img
    src={banner}
    alt="Banner de inicio"
    className="w-full h-full object-cover"
  />
</div>
<h2 className="text-center text-2xl mb-4">Encuentra todo tipo de juguetes</h2>
        <Card />
      </div>
  );
};

export default Inicio;

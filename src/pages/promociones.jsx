import React, { useEffect, useState } from "react";
import Card from "../database/cards";        // ajusta ruta si es necesario

const Promociones = () => (
  <div>
    <h2 className="text-center text-2xl mb-4">
      Encuentra promociones imperdibles
    </h2>
    {/* Sólo mostrará productos con rebaja > 0 */}
    <Card onlyPromos />
  </div>
);

export default Promociones;



// // src/pages/inicio.jsx
// import React from "react";
// import Card from "../database/cards"; // ajusta la ruta a donde esté tu Card.jsx
// // import banner from "./pinteres3.png"; // ruta a tu imagen

// const Promociones = () => {
//   return (
//       <div >
     
// <h2 className="text-center text-2xl mb-4">Encuentra promociones imperdibles</h2>
//         <Card />
//       </div>
//   );
// };

// export default Promociones;

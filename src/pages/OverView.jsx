import React from "react";
import { SolarOverview } from "../components/solar/SolarOverview";

const Overview = () => {
  return (
    // <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
    //   <header className="bg-gray-100 px-5 py-3 border-b">
    //     <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
    //     <h2 className="text-gray-800 text-lg">Header del Card</h2>
    //   </header>
    //   <div className="p-5">
    //     <p className="text-gray-600">
    //       Este es el contenido principal de la tarjeta. Aquí puedes agregar más
    //       información o elementos que desees mostrar dentro de la tarjeta.
    //     </p>
    //   </div>
    //   <footer className="bg-gray-100 px-5 py-3 border-t">
    //     <a href="#" className="text-teal-600 hover:text-teal-800">
    //       Acción del Footer
    //     </a>
    //   </footer>
    // // </div>
    <SolarOverview />
  );
};

export default Overview;

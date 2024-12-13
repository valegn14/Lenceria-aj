import React from "react";
import ConsumptionAreaChart from "../components/dashboard/charts/AreaChart";
import EnergyBarChart from "../components/dashboard/charts/BarChart";
import CapacityLineChart from "../components/dashboard/charts/LineChart";
// import Dashboard from "../components/dashboard/Dashboard";
// import {Dashboard} from "../components/dashboard/Dashboard"


const Dashboard2 = () => {
  return (
    <>
      {/* <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-gray-100 px-5 py-3 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <h2 className="text-gray-800 text-lg">Header del Card</h2>
        </header>
        <div className="p-5">
          <p className="text-gray-600">
            Este es el contenido principal de la tarjeta. Aquí puedes agregar
            más información o elementos que desees mostrar dentro de la tarjeta.
          </p>
        </div>
        <footer className="bg-gray-100 px-5 py-3 border-t">
          <a href="#" className="text-teal-600 hover:text-teal-800">
            Acción del Footer
          </a>
        </footer>
      </div> */}
      {/* <Dashboard/> */}
      {/* <CapacityLineChart/> */}
        <ConsumptionAreaChart/>
        <EnergyBarChart/>
    </>
  );
};

export default  Dashboard2 ;

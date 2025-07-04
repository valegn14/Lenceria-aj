// Layout.jsx
import Footer2 from "./Footer2"; 
import Header2 from "./Header2";
import React, { useState } from "react";

export default function Layout({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 setSearchTerm={setSearchTerm}/>
      {/* Añadí un contenedor con ancho máximo para evitar desbordamientos */}
      <main className="flex-grow relative bg-main-bg bg-cover bg-center bg-no-repeat">
        <div className="max-w-[100vw] overflow-x-hidden">
           {/* inyectar el prop searchTerm directamente en el componente hijo */}
          {React.cloneElement(children, { searchTerm })} 
        </div>
      </main>
      <Footer2 />
    </div>
  );
}
// Layout.jsx
import Footer2 from "./Footer2";
import Header2 from "./Header2";
import React, { useState } from "react";

export default function Layout({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 setSearchTerm={setSearchTerm}  setShowMobileSearch={setShowMobileSearch}/>
      {/* Añadí un contenedor con ancho máximo para evitar desbordamientos */}
      <main className="">
        <div className="w-full overflow-x-hidden">
          {/* inyectar el prop searchTerm directamente en el componente hijo */}
          {React.cloneElement(children, { searchTerm, showMobileSearch })}
        </div>
      </main>
      <Footer2 />
    </div>
  );
}
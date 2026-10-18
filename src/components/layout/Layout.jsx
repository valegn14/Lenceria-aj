import Footer2 from "./Footer2";
import Header2 from "./Header2";
import React from "react";
import { useLocation } from "react-router-dom";
import NavegacionCategoriasPrincipales from "./NavegacionCategoriasPrincipales";

const RUTAS_CATEGORIAS_PRINCIPALES = {
  "/juguetes": "juguetes",
  "/suplementos": "suplementos",
  "/higiene": "higiene",
  "/lubricantes": "lubricantes",
  "/bronceadores": "bronceadores",
  "/combos": "combos",
  "/promociones": "promociones",
};

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const categoriaActual = RUTAS_CATEGORIAS_PRINCIPALES[pathname];

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />
      <main className="animate-fadeIn">
        <div className="w-full overflow-x-hidden">
          {React.cloneElement(children)}
        </div>
      </main>
      {categoriaActual && (
        <NavegacionCategoriasPrincipales categoriaActual={categoriaActual} />
      )}
      <Footer2 />
    </div>
  );
}

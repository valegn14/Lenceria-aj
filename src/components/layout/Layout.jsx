// Layout.jsx
import Footer2 from "./Footer2"; 
import Header2 from "./Header2";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />
      {/* Añadí un contenedor con ancho máximo para evitar desbordamientos */}
      <main className="flex-grow relative bg-main-bg bg-cover bg-center bg-no-repeat">
        <div className="max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
      </main>
      <Footer2 />
    </div>
  );
}
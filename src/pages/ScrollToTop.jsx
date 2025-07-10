// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Desplaza al top cuando cambia la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No renderiza nada en pantalla
};

export default ScrollToTop;

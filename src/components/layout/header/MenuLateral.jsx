import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Marca from "./Marca";
import { IconoUbicacion } from "./Ubicacion";
import IconoCarrito from "../../ui/IconoCarrito";
import { CATEGORIAS, RUTA_VISITANOS } from "../../../data/categorias";
import { HEADER } from "../../../data/header";

import IconLenceria from "../lenceria.png";
import IconJuguetes from "../juguete.png";
import IconLubricantes from "../lubricante.png";
import IconSuplementos from "../suplementos.png";
import IconHigiene from "../higiene.png";
import IconBronceadores from "../vestido.png";
import IconCombos from "../combo.png";
import IconPromo from "../promo.png";

const ICONOS_CATEGORIA = {
  lenceria: IconLenceria,
  juguetes: IconJuguetes,
  lubricantes: IconLubricantes,
  suplementos: IconSuplementos,
  higiene: IconHigiene,
  bronceadores: IconBronceadores,
  combos: IconCombos,
  promociones: IconPromo,
};

const claseFila = "flex min-h-12 w-full items-center rounded-xl px-4 py-2 text-left transition-colors hover:bg-pink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento";

export const ID_MENU_LATERAL = "menu-lateral";

export default function MenuLateral({ abierto, onCerrar, cartCount, onAbrirCarrito }) {
  const cerrarRef = useRef(null);
  const [expandidas, setExpandidas] = useState({});

  useEffect(() => {
    if (!abierto) return;
    const alPresionarTecla = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionarTecla);
    cerrarRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alPresionarTecla);
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onCerrar} aria-hidden="true" />

      <div
        id={ID_MENU_LATERAL}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className="fixed left-0 top-0 h-full w-[85vw] max-w-sm overflow-y-auto bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl animate-entrarIzquierda"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-pink-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
          <Marca onClick={onCerrar} />
          <button
            ref={cerrarRef}
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="flex h-11 w-11 items-center justify-center rounded-full text-header-icono transition-colors hover:bg-pink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Ubicación de la tienda física */}
        <div className="border-b border-pink-200 px-2 py-3">
          <Link to={RUTA_VISITANOS} onClick={onCerrar} className={`${claseFila} gap-3 text-header-texto`}>
            <IconoUbicacion className="h-6 w-6 shrink-0 text-header-icono" />
            <span className="text-base font-semibold">{HEADER.ubicacion.texto}</span>
          </Link>
        </div>

        {/* Categorías */}
        <nav aria-label="Categorías" className="px-2 py-4">
          <ul className="space-y-1 text-gray-800">
            {CATEGORIAS.map(({ key, nombre, ruta, subcategorias }) => (
              <li key={key}>
                <div className="flex items-center">
                  <Link to={ruta} onClick={onCerrar} className={`${claseFila} group gap-4 flex-1`}>
                    <img src={ICONOS_CATEGORIA[key]} alt="" className="h-7 w-7 transition-transform group-hover:scale-110" />
                    <span className="text-base font-medium tracking-wide group-hover:text-header-icono">{nombre}</span>
                  </Link>
                  {subcategorias && (
                    <button
                      onClick={() => setExpandidas((v) => ({ ...v, [key]: !v[key] }))}
                      aria-expanded={!!expandidas[key]}
                      aria-controls={`sub-${key}`}
                      aria-label={`Ver subcategorías de ${nombre}`}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-header-icono transition-colors hover:bg-pink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandidas[key] ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                {subcategorias && expandidas[key] && (
                  <ul id={`sub-${key}`} className="mb-2 ml-14 space-y-1 border-l-2 border-pink-200 pl-2">
                    {subcategorias.map((sub) => (
                      <li key={sub.ruta}>
                        <Link to={sub.ruta} onClick={onCerrar} className={`${claseFila} text-base hover:text-header-icono`}>
                          {sub.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Carrito */}
        <div className="border-t border-pink-200 px-2 py-4">
          <button
            onClick={() => {
              onAbrirCarrito();
              onCerrar();
            }}
            className={`${claseFila} group gap-4`}
          >
            <span className="flex h-7 w-7 items-center justify-center transition-transform group-hover:scale-110">
              <IconoCarrito className="w-7 text-pink-600" />
            </span>
            <span className="flex-1 text-base font-medium tracking-wide text-gray-800 group-hover:text-header-icono">Carrito</span>
            {cartCount > 0 && (
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-pink-600 px-1 text-sm font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

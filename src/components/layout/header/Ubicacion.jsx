import { NavLink } from "react-router-dom";
import { HEADER } from "../../../data/header";
import { RUTA_VISITANOS } from "../../../data/categorias";

export const IconoUbicacion = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Escritorio: ícono + "Visítanos", lleva a la ubicación de la tienda física
export function EnlaceUbicacion() {
  return (
    <NavLink
      to={RUTA_VISITANOS}
      className="flex min-h-11 max-w-full items-center gap-1.5 rounded-lg px-1 text-sm font-semibold text-header-texto transition-colors hover:text-header-icono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento"
    >
      <IconoUbicacion className="w-6 h-6 shrink-0 text-header-icono" />
      <span className="truncate">{HEADER.ubicacion.texto}</span>
    </NavLink>
  );
}

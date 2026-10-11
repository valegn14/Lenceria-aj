import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cargarProductosDesdeSheets } from "../../../database/sheets";
import { ProductList } from "../../ProductGrid";
import Cargando from "../../ui/Cargando";
import { HEADER } from "../../../data/header";
import { normalizarTexto } from "../../../utils/productos";

const MAX_RESULTADOS = 40;

const IconoLupa = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Buscador siempre visible: los resultados aparecen en un panel debajo del campo
export default function Buscador({ className = "" }) {
  const [termino, setTermino] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [productos, setProductos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const contenedorRef = useRef(null);
  const inputRef = useRef(null);
  const { pathname } = useLocation();
  const inputId = useId();
  const panelId = useId();

  // Los productos se piden la primera vez que la persona usa el buscador
  const cargarProductos = async () => {
    if (productos || cargando) return;
    setCargando(true);
    try {
      setProductos(await cargarProductosDesdeSheets());
    } finally {
      setCargando(false);
    }
  };

  // Al cambiar de página se cierra y limpia el buscador
  useEffect(() => {
    setAbierto(false);
    setTermino("");
  }, [pathname]);

  useEffect(() => {
    if (!abierto) return;
    const alClicFuera = (e) => {
      if (!contenedorRef.current?.contains(e.target)) setAbierto(false);
    };
    document.addEventListener("pointerdown", alClicFuera);
    return () => document.removeEventListener("pointerdown", alClicFuera);
  }, [abierto]);

  const busqueda = normalizarTexto(termino.trim());
  const resultados = busqueda && productos
    ? productos.filter((p) => normalizarTexto(p.nombre).includes(busqueda))
    : [];
  const mostrarPanel = abierto && busqueda !== "";

  const cerrar = () => {
    setAbierto(false);
    setTermino("");
  };

  return (
    // El panel de resultados se posiciona respecto al header completo (no solo el campo),
    // para que las tarjetas tengan todo el ancho disponible
    <div ref={contenedorRef} className={className}>
      <form
        role="search"
        aria-label="Buscar productos"
        onSubmit={(e) => {
          e.preventDefault();
          cargarProductos();
          setAbierto(true);
        }}
        className="flex h-12 lg:h-14 items-stretch overflow-hidden rounded-lg border-2 border-transparent bg-white shadow-md transition-colors focus-within:border-header-acento"
      >
        <label htmlFor={inputId} className="sr-only">
          Buscar productos
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={termino}
          autoComplete="off"
          placeholder={HEADER.placeholderBuscador}
          aria-controls={panelId}
          onFocus={() => {
            cargarProductos();
            setAbierto(true);
          }}
          onChange={(e) => {
            setTermino(e.target.value);
            setAbierto(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setAbierto(false);
          }}
          className="min-w-0 flex-1 bg-transparent pl-4 pr-2 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {termino && (
          <button
            type="button"
            onClick={() => {
              setTermino("");
              inputRef.current?.focus();
            }}
            aria-label="Borrar búsqueda"
            className="flex w-11 shrink-0 items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          aria-label="Buscar"
          className="relative flex w-12 lg:w-14 shrink-0 items-center justify-center text-gray-500 before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-gray-200 transition-colors hover:text-header-icono focus-visible:text-header-icono focus-visible:outline-none"
        >
          <IconoLupa />
        </button>
      </form>

      {mostrarPanel && (
        <div
          id={panelId}
          role="region"
          aria-label="Resultados de búsqueda"
          className="absolute inset-x-4 lg:inset-x-6 top-full z-50 mt-1 max-h-[65vh] overflow-y-auto rounded-xl border border-pink-100 bg-white shadow-2xl animate-slideDown"
        >
          {cargando || !productos ? (
            <Cargando className="" />
          ) : resultados.length === 0 ? (
            <p className="px-4 py-10 text-center text-base text-gray-500" aria-live="polite">
              No encontramos &ldquo;{termino.trim()}&rdquo;. Prueba con otra palabra.
            </p>
          ) : (
            <div className="p-3 sm:p-4">
              <p className="mb-3 text-sm text-gray-600" aria-live="polite">
                {resultados.length > MAX_RESULTADOS
                  ? `Mostrando ${MAX_RESULTADOS} de ${resultados.length} resultados. Escribe más para afinar.`
                  : `${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"}`}
              </p>
              <ProductList productos={resultados.slice(0, MAX_RESULTADOS)} onSelect={cerrar} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

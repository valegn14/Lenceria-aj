import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cargarPromocionesDesdeSheets } from "../../../database/sheets";
import { HEADER } from "../../../data/header";
import { rutaProducto } from "../../../utils/productos";

const PROMO_FIJA = { ...HEADER.promoPorDefecto, imagen: "", estado: undefined };

// El header se vuelve a montar en cada página: se recuerdan las ofertas ya cargadas
let promosEnMemoria = null;

// Productos en oferta (rebaja > 0 y con stock). La primera vez se cargan un poco después de
// abrir la página para no competir con el contenido principal; mientras tanto se muestra la promo fija.
export function usePromoHeader() {
  const [promos, setPromos] = useState(promosEnMemoria || []);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    let activo = true;
    const timer = setTimeout(() => {
      cargarPromocionesDesdeSheets()
        .then((productos) => {
          promosEnMemoria = productos.filter((p) => p.stock > 0);
          if (activo) setPromos(promosEnMemoria);
        })
        .catch(() => {});
    }, promosEnMemoria ? 0 : 1500);
    return () => {
      activo = false;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (promos.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndice((i) => (i + 1) % promos.length), HEADER.segundosPorPromo * 1000);
    return () => clearInterval(id);
  }, [promos.length]);

  if (!promos.length) return PROMO_FIJA;

  const producto = promos[indice % promos.length];
  return {
    etiqueta: `-${producto.rebaja}%`,
    texto: producto.nombre,
    enlace: rutaProducto(producto),
    llamado: "Ver oferta",
    imagen: producto.imagen,
    estado: producto,
  };
}

const Chevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

// Escritorio: píldora a la derecha del buscador
export function PildoraPromo({ promo, className = "" }) {
  return (
    <Link
      to={promo.enlace}
      state={promo.estado}
      aria-label={`${promo.etiqueta}: ${promo.texto}. ${promo.llamado}`}
      className={`flex items-center gap-3 h-12 rounded-full border border-pink-300/70 bg-header-promo pl-1.5 pr-4 transition-colors hover:border-header-icono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento ${className}`}
    >
      {promo.imagen ? (
        <img src={promo.imagen} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover bg-white" />
      ) : null}
      <span className={`shrink-0 rounded-full bg-header-franja px-2 py-0.5 text-xs font-bold text-white ${promo.imagen ? "" : "ml-1.5"}`}>
        {promo.etiqueta}
      </span>
      <span key={promo.texto} className="min-w-0 flex-1 truncate text-sm font-medium text-header-texto animate-fadeIn">
        {promo.texto}
      </span>
      <span className="flex shrink-0 items-center text-sm font-semibold text-header-icono">
        {promo.llamado}
        <Chevron />
      </span>
    </Link>
  );
}

// Celular y tablet: franja delgada a todo el ancho, encima del header
export function FranjaPromo({ promo }) {
  return (
    <Link
      to={promo.enlace}
      state={promo.estado}
      aria-label={`${promo.etiqueta}: ${promo.texto}. ${promo.llamado}`}
      className="flex min-h-11 items-center justify-center gap-2 bg-header-franja px-4 py-1 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
    >
      <span className="shrink-0 font-bold">{promo.etiqueta}</span>
      <span key={promo.texto} className="min-w-0 truncate animate-fadeIn">{promo.texto}</span>
      <span className="flex shrink-0 items-center font-semibold underline underline-offset-2">
        {promo.llamado}
        <Chevron />
      </span>
    </Link>
  );
}

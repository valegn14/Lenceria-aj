import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { CATEGORIAS } from "../../../data/categorias";

const claseEnlace = ({ isActive }) =>
  `inline-flex items-center min-h-11 rounded px-1 text-sm font-medium whitespace-nowrap text-header-texto transition-colors hover:text-header-icono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento ${
    isActive ? "font-semibold underline decoration-2 underline-offset-8" : ""
  }`;

// En escritorio no caben todas las categorías en 1024 px: las que sobran van a "Más"
// lg (1024+): 4 visibles · xl (1280+): 6 visibles · 2xl (1536+): todas
const visibleDesde = (i) => (i < 4 ? "" : i < 6 ? "hidden xl:block" : "hidden 2xl:block");
const ocultaEnMas = (i) => (i < 6 ? "xl:hidden" : "");

const Chevron = ({ abierto }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${abierto ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// Elemento con submenú: se abre al pasar el mouse, con clic en el chevron o con el teclado
function Desplegable({ etiqueta, ruta, items, className = "" }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);
  const botonRef = useRef(null);
  const id = useId();

  useEffect(() => {
    if (!abierto) return;
    const alClicFuera = (e) => {
      if (!ref.current?.contains(e.target)) setAbierto(false);
    };
    const alPresionarTecla = (e) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", alClicFuera);
    document.addEventListener("keydown", alPresionarTecla);
    return () => {
      document.removeEventListener("pointerdown", alClicFuera);
      document.removeEventListener("keydown", alPresionarTecla);
    };
  }, [abierto]);

  return (
    <li
      ref={ref}
      className={`relative ${className}`}
      /* Solo con mouse: en pantallas táctiles se abre con el chevron */
      onPointerEnter={(e) => e.pointerType === "mouse" && setAbierto(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setAbierto(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget)) setAbierto(false);
      }}
    >
      <div className="flex items-center">
        {ruta && (
          <NavLink to={ruta} className={claseEnlace}>
            {etiqueta}
          </NavLink>
        )}
        <button
          ref={botonRef}
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls={id}
          aria-label={ruta ? `Ver subcategorías de ${etiqueta}` : undefined}
          className="inline-flex min-h-11 items-center gap-1 rounded px-1 text-sm font-medium text-header-texto transition-colors hover:text-header-icono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento"
        >
          {!ruta && etiqueta}
          <Chevron abierto={abierto} />
        </button>
      </div>

      {abierto && (
        <div className="absolute left-0 top-full z-50 pt-1">
          <ul id={id} className="grid max-h-[calc(100vh-6rem)] min-w-[28rem] grid-cols-2 overflow-y-auto overflow-x-hidden rounded-xl border border-pink-100 bg-white py-1 shadow-xl animate-slideDown">
            {items.map(({ nombre, ruta: rutaItem, className: claseItem = "" }) => (
              <li key={rutaItem} className={claseItem}>
                <NavLink
                  to={rutaItem}
                  onClick={() => setAbierto(false)}
                  className={({ isActive }) =>
                    `flex min-h-11 items-center px-4 text-sm whitespace-nowrap transition-colors hover:bg-pink-50 hover:text-header-icono focus-visible:bg-pink-50 focus-visible:outline-none ${
                      isActive ? "font-semibold text-header-icono" : "text-gray-800"
                    }`
                  }
                >
                  {nombre}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// Escritorio: una fila alineada con el buscador
export function MenuCategoriasEscritorio({ className = "" }) {
  const sobrantes = CATEGORIAS.map((cat, i) => ({ ...cat, className: ocultaEnMas(i) })).slice(4);

  return (
    <nav aria-label="Categorías" className={className}>
      <ul className="flex items-center gap-x-4 xl:gap-x-5">
        {CATEGORIAS.map((cat, i) =>
          cat.subcategorias ? (
            <Desplegable key={cat.key} etiqueta={cat.nombre} ruta={cat.ruta} items={cat.subcategorias} className={visibleDesde(i)} />
          ) : (
            <li key={cat.key} className={visibleDesde(i)}>
              <NavLink to={cat.ruta} className={claseEnlace}>
                {cat.nombre}
              </NavLink>
            </li>
          )
        )}
        <Desplegable etiqueta="Más" items={sobrantes} className="2xl:hidden" />
      </ul>
    </nav>
  );
}

// Flecha que indica que hay más categorías para deslizar
const FlechaScroll = ({ lado, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    tabIndex={-1}
    aria-hidden="true"
    className={`absolute inset-y-0 z-10 flex w-12 items-center ${
      lado === "derecha"
        ? "right-0 justify-end pr-2 bg-gradient-to-l from-header-hasta from-50% to-transparent"
        : "left-0 justify-start pl-2 bg-gradient-to-r from-header-desde from-50% to-transparent"
    }`}
  >
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-header-icono shadow">
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${lado === "izquierda" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  </button>
);

// Celular y tablet: una sola fila sin bordes. En tablet caben todas; en pantallas
// estrechas se desliza horizontalmente y aparece una flecha indicando que hay más.
export function MenuCategoriasMovil({ className = "" }) {
  const listaRef = useRef(null);
  const [flechas, setFlechas] = useState({ izquierda: false, derecha: false });

  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;
    const actualizar = () => {
      const { scrollLeft, scrollWidth, clientWidth } = lista;
      setFlechas({
        izquierda: scrollLeft > 4,
        derecha: scrollLeft + clientWidth < scrollWidth - 4,
      });
    };
    actualizar();
    lista.addEventListener("scroll", actualizar, { passive: true });
    const observador = new ResizeObserver(actualizar);
    observador.observe(lista);
    return () => {
      lista.removeEventListener("scroll", actualizar);
      observador.disconnect();
    };
  }, []);

  const desplazar = (direccion) =>
    listaRef.current?.scrollBy({ left: direccion * listaRef.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <nav aria-label="Categorías" className={`relative ${className}`}>
      <ul ref={listaRef} className="sin-scrollbar flex snap-x snap-proximity scroll-px-4 overflow-x-auto px-2 md:justify-between">
        {CATEGORIAS.map((cat) => (
          <li key={cat.key} className="shrink-0 snap-start">
            <NavLink
              to={cat.ruta}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center rounded-full px-2.5 text-sm whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento ${
                  isActive
                    ? "bg-header-promo font-semibold text-header-texto"
                    : "font-medium text-header-texto hover:text-header-icono"
                }`
              }
            >
              {cat.nombre}
            </NavLink>
          </li>
        ))}
      </ul>
      {flechas.izquierda && <FlechaScroll lado="izquierda" onClick={() => desplazar(-1)} />}
      {flechas.derecha && <FlechaScroll lado="derecha" onClick={() => desplazar(1)} />}
    </nav>
  );
}

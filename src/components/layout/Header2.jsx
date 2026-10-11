import { useCallback, useRef, useState } from "react";
import SolarOverview from "../solar/carrito";
import { useCart } from "../solar/CartContext";
import IconoCarrito from "../ui/IconoCarrito";
import Marca from "./header/Marca";
import Buscador from "./header/Buscador";
import { FranjaPromo, PildoraPromo, usePromoHeader } from "./header/Promo";
import { EnlaceUbicacion } from "./header/Ubicacion";
import { MenuCategoriasEscritorio, MenuCategoriasMovil } from "./header/MenuCategorias";
import MenuLateral, { ID_MENU_LATERAL } from "./header/MenuLateral";

/*
  Distribución (CSS grid con áreas):
  · Celular (< 768):   [menú | logo | carrito]  /  [buscador a todo el ancho]  /  [categorías con scroll]
  · Tablet (768-1023): [menú | logo | buscador | carrito]  /  [categorías con scroll]
  · Escritorio (1024+):[logo | buscador | promo]  /  [ubicación | categorías | carrito]
  La franja de promo (celular/tablet) va encima. El header no es fijo: se va con el scroll.
*/
const CLASES_GRID = [
  "grid items-center gap-x-2 gap-y-2 md:gap-x-4 lg:gap-x-6",
  "grid-cols-[auto_1fr_auto] [grid-template-areas:'menu_logo_acciones'_'buscador_buscador_buscador'_'cats_cats_cats']",
  "md:grid-cols-[auto_auto_1fr_auto] md:[grid-template-areas:'menu_logo_buscador_acciones'_'cats_cats_cats_cats']",
  "lg:grid-cols-[200px_1fr_auto] lg:[grid-template-areas:'logo_buscador_promo'_'ubicacion_cats_acciones']",
].join(" ");

const claseIconoBoton =
  "relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-header-icono transition-colors hover:bg-white/40 hover:text-header-texto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento";

function BotonCarrito({ cantidad, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={cantidad > 0 ? `Abrir carrito, ${cantidad} ${cantidad === 1 ? "producto" : "productos"}` : "Abrir carrito"}
      className={claseIconoBoton}
    >
      <IconoCarrito className="w-8" />
      {cantidad > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-header-acento px-1 text-xs font-bold text-white"
        >
          {cantidad > 99 ? "99+" : cantidad}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const botonMenuRef = useRef(null);
  const promo = usePromoHeader();

  const { cartItems } = useCart();
  const cantidadCarrito = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cerrarMenu = useCallback(() => {
    setMenuAbierto(false);
    botonMenuRef.current?.focus();
  }, []);

  return (
    <>
      <header className="relative z-40 bg-gradient-to-r from-header-desde to-header-hasta shadow-sm">
        {/* Promo: franja delgada en celular y tablet */}
        <div className="lg:hidden">
          <FranjaPromo promo={promo} />
        </div>

        <div className={`relative mx-auto max-w-screen-2xl px-4 py-2 lg:px-6 lg:py-3 ${CLASES_GRID}`}>
          {/* Menú hamburguesa (celular y tablet) */}
          <button
            ref={botonMenuRef}
            type="button"
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            aria-controls={ID_MENU_LATERAL}
            className={`${claseIconoBoton} [grid-area:menu] -ml-2 lg:hidden`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>

          <div className="[grid-area:logo] min-w-0">
            <Marca />
          </div>

          {/* Buscador: protagonista y siempre visible */}
          <Buscador className="[grid-area:buscador] min-w-0" />

          {/* Promo: píldora en escritorio */}
          <PildoraPromo
            promo={promo}
            className="[grid-area:promo] hidden lg:flex w-[360px] xl:w-[440px] 2xl:w-[475px]"
          />

          {/* Ubicación de la tienda física (escritorio) */}
          <div className="[grid-area:ubicacion] hidden lg:block min-w-0">
            <EnlaceUbicacion />
          </div>

          {/* Categorías */}
          <div className="[grid-area:cats] min-w-0">
            <MenuCategoriasMovil className="-mx-4 lg:hidden" />
            <MenuCategoriasEscritorio className="hidden lg:block" />
          </div>

          {/* Carrito */}
          <div className="[grid-area:acciones] flex items-center justify-self-end">
            <BotonCarrito cantidad={cantidadCarrito} onClick={() => setCarritoAbierto(true)} />
          </div>
        </div>
      </header>

      <MenuLateral
        abierto={menuAbierto}
        onCerrar={cerrarMenu}
        cartCount={cantidadCarrito}
        onAbrirCarrito={() => setCarritoAbierto(true)}
      />

      {carritoAbierto && <SolarOverview open={carritoAbierto} setOpen={setCarritoAbierto} />}
    </>
  );
}

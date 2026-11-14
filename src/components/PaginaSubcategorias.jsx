/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import DecorativeHearts from "./DecorativeHearts";
import BotonVolver from "./ui/BotonVolver";
import { slugDeRuta } from "../utils/subcategorias";

// Filtros de color sobre la imagen del banner
const FILTROS_BANNER = {
  rosa: "bg-gradient-to-t from-[#D98FA5]/70 via-[#E8B8C6]/30 to-transparent",
  azul: "bg-gradient-to-t from-blue-900/70 via-blue-700/45 to-sky-500/35",
};

// Banner alto en la página principal de la categoría y más bajo en las subcategorías,
// para que los productos aparezcan antes
const Banner = ({ imagen, titulo, descripcion, compacto = false, filtro = "rosa" }) => (
  <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
    <DecorativeHearts fixed={false} count={36} />
    <div className={`relative w-full overflow-hidden shadow-xl ${compacto ? "h-28 sm:h-36 md:h-40 lg:h-48" : "h-40 sm:h-56 md:h-72 lg:h-96"}`}>
      <img
        src={imagen}
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 min-w-full"
      />
      <div className={`absolute inset-0 ${FILTROS_BANNER[filtro] || FILTROS_BANNER.rosa}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className={`font-semibold text-white drop-shadow-lg ${compacto ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
            {titulo}
          </h1>
          <p className={`text-sm sm:text-base text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] ${compacto ? "mt-1" : "mt-2"}`}>{descripcion}</p>
        </div>
      </div>
    </div>
  </div>
);

const Selector = ({ opciones, slugActivo, etiqueta, estiloLista = false }) => {
  const navigate = useNavigate();

  return (
    <nav
      aria-label={estiloLista ? `Más categorías de ${etiqueta}` : `Subcategorías de ${etiqueta}`}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <ul className={`flex flex-wrap justify-center ${estiloLista ? "gap-x-5 gap-y-2" : "gap-3"}`}>
        {opciones.map(({ nombre, ruta }) => {
          const activa = slugDeRuta(ruta) === slugActivo;
          return (
            <li key={ruta}>
              <button
                type="button"
                onClick={() => navigate(ruta, { state: { scrollToProducts: true } })}
                aria-current={activa ? "page" : undefined}
                className={
                  estiloLista
                    ? `min-h-11 text-sm font-medium text-pink-800 transition hover:underline hover:underline-offset-4 ${
                        activa ? "underline decoration-2 underline-offset-4" : ""
                      }`
                    : `rounded-full px-5 py-2.5 text-base font-medium transition ${
                        activa
                          ? "bg-pink-600 text-white"
                          : "border border-pink-600 bg-white text-pink-600 hover:bg-pink-600 hover:text-white"
                      }`
                }
              >
                {nombre}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// Página de categoría con subcategorías (lencería, lubricantes, juguetes).
// La subcategoría activa sale de la ruta /categoria/:sub; si no coincide con ninguna opción
// se muestra la página principal con los productos de la opción landing.slug.
const PaginaSubcategorias = ({ imagen, etiqueta, landing, opciones, productos, searchTerm, onlyPromos }) => {
  const { sub } = useParams();
  const location = useLocation();
  const productosRef = useRef(null);

  const slug = (sub || "").toLowerCase();
  const opcionSub = opciones.find((opcion) => slugDeRuta(opcion.ruta) === slug);
  const esLanding = !opcionSub;
  const slugActivo = esLanding ? landing.slug : slug;
  const opcionActiva =
    opcionSub || opciones.find((opcion) => slugDeRuta(opcion.ruta) === landing.slug) || opciones[0];

  useEffect(() => {
    if (!location.state?.scrollToProducts || !productosRef.current) return undefined;

    const frame = requestAnimationFrame(() => {
      const top = productosRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.state]);

  if (esLanding) {
    return (
      <>
        <Banner imagen={imagen} titulo={landing.titulo} descripcion={landing.descripcion} />

        <div className="min-h-screen bg-white px-4 pb-8 sm:px-6 lg:px-8 relative">
          <div className="mt-8">
            <Selector opciones={opciones} slugActivo={slugActivo} etiqueta={etiqueta} />
          </div>

          <div ref={productosRef} className="mt-8">
            <ProductGrid
              key={slugActivo}
              fetchFn={opcionActiva.fetchFn}
              productos={productos}
              loadingMessage={opcionActiva.loadingMessage}
              searchTerm={searchTerm}
              onlyPromos={onlyPromos}
              showBackButton={false}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner
        imagen={imagen}
        titulo={opcionActiva.titulo}
        descripcion={opcionActiva.descripcion}
        compacto
        filtro={opcionActiva.filtro}
      />

      <div className="min-h-screen bg-white px-4 pt-6 pb-8 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <BotonVolver to="/" texto="Volver al inicio" className="" />
        </div>

        <div className="mt-6">
          <Selector opciones={opciones} slugActivo={slugActivo} etiqueta={etiqueta} />
        </div>

        <div ref={productosRef} className="relative z-10 scroll-mt-28">
          <ProductGrid
            key={slugActivo}
            fetchFn={opcionActiva.fetchFn}
            productos={productos}
            loadingMessage={opcionActiva.loadingMessage}
            searchTerm={searchTerm}
            onlyPromos={onlyPromos}
            showBackButton={false}
          />
        </div>

        <div className="mt-8 border-t border-pink-100 pt-5">
          <h2 className="mb-3 text-center text-base font-semibold text-pink-800">
            Explora más categorías
          </h2>
          <Selector opciones={opciones} slugActivo={slugActivo} etiqueta={etiqueta} estiloLista />
        </div>
      </div>
    </>
  );
};

export default PaginaSubcategorias;

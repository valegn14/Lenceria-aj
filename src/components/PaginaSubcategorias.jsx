/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import Banner from "./BannerCategoria";
import BotonVolver from "./ui/BotonVolver";
import { slugDeRuta } from "../utils/subcategorias";

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

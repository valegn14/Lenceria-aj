/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  cargarLenceriaDesdeSheets,
  cargarLenceriaHombreDesdeSheets,
  cargarHoja,
} from "../database/sheets";
import ProductGrid from "../components/ProductGrid";
import DecorativeHearts from "../components/DecorativeHearts";
import Cargando from "../components/ui/Cargando";
import BotonVolver from "../components/ui/BotonVolver";
import { LENCERIA_SUBCATEGORIAS } from "../data/categorias";

const OPCIONES_LENCERIA = [
  { nombre: "Lencería mujer", ruta: "/lenceria/mujer", categoria: "mujer" },
  { nombre: "Lencería hombre", ruta: "/lenceria/hombre", categoria: "hombre" },
  ...LENCERIA_SUBCATEGORIAS.map(({ nombre, ruta }) => ({
    nombre,
    ruta,
    categoria: nombre.toLowerCase(),
  })),
];

const categoryMap = {
  todo: {
    title: "Lencería para Mujer",
    description: "Explora nuestra colección de lencería femenina.",
    fetchFn: null,
    loadingMessage: "Descubriendo lencería femenina...",
  },
  mujer: {
    title: "Lencería para Mujer",
    description: "Explora la colección femenina con la calidad y estilo que conoces.",
    fetchFn: cargarLenceriaDesdeSheets,
    loadingMessage: "Descubriendo lencería femenina...",
  },
  hombre: {
    title: "Lencería para Hombre",
    description: "Encuentra prendas masculinas diseñadas para comodidad y estilo.",
    fetchFn: cargarLenceriaHombreDesdeSheets,
    loadingMessage: "Descubriendo lencería masculina...",
  },
  ...Object.fromEntries(
    LENCERIA_SUBCATEGORIAS.map(({ nombre, hoja }) => {
      const slug = nombre.toLowerCase();
      return [
        slug,
        {
          title: nombre,
          description: `Explora nuestra colección de ${nombre.toLowerCase()}.`,
          fetchFn: () => cargarHoja(hoja),
          loadingMessage: `Cargando ${nombre.toLowerCase()}...`,
        },
      ];
    })
  ),
};

const BANNER_SRC = "/bannerlenceria.png";

// Filtros de color sobre la imagen del banner
const FILTROS_BANNER = {
  rosa: "bg-gradient-to-t from-[#D98FA5]/70 via-[#E8B8C6]/30 to-transparent",
  azul: "bg-gradient-to-t from-blue-900/70 via-blue-700/45 to-sky-500/35",
};

// Banner de lencería: alto en "Toda la lencería" y más bajo en las subcategorías,
// para que los productos aparezcan antes
const BannerLenceria = ({ titulo, descripcion, compacto = false, filtro = "rosa" }) => (
  <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
    <DecorativeHearts fixed={false} count={36} />
    <div className={`relative w-full overflow-hidden shadow-xl ${compacto ? "h-28 sm:h-36 md:h-40 lg:h-48" : "h-40 sm:h-56 md:h-72 lg:h-96"}`}>
      <img
        src={BANNER_SRC}
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 min-w-full"
      />
      <div className={`absolute inset-0 ${FILTROS_BANNER[filtro]}`} />
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

const SelectorLenceria = ({ categoriaActiva, estiloLista = false }) => {
  const navigate = useNavigate();

  return (
    <nav
      aria-label={estiloLista ? "Más categorías de lencería" : "Subcategorías de lencería"}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <ul className={`flex flex-wrap justify-center ${estiloLista ? "gap-x-5 gap-y-2" : "gap-3"}`}>
        {OPCIONES_LENCERIA.map(({ nombre, ruta, categoria }) => {
          const activa = categoria === categoriaActiva;
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

const Lenceria = ({ onlyPromos, productos, searchTerm }) => {
  const { gender } = useParams();
  const location = useLocation();
  const productosRef = useRef(null);
  const normalizedGender = (gender || "todo").toLowerCase();
  const selectedCategory = categoryMap[normalizedGender] || categoryMap.todo;
  const isLanding = normalizedGender === "todo" || !categoryMap[normalizedGender];
  const [mujerList, setMujerList] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);

  useEffect(() => {
    if (!location.state?.scrollToProducts || !productosRef.current) return undefined;

    const frame = requestAnimationFrame(() => {
      const top = productosRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.state]);

  useEffect(() => {
    if (!isLanding) return;
    const obtenerListas = async () => {
      setLoadingLists(true);
      try {
        const mujer = await cargarLenceriaDesdeSheets();
        setMujerList(mujer || []);
      } catch (error) {
        console.error("Error al cargar listas de lencería:", error);
      } finally {
        setLoadingLists(false);
      }
    };

    obtenerListas();
  }, [isLanding]);

  if (isLanding) {
    return (
      <>
        <BannerLenceria
          titulo="Lencería"
          descripcion="Explora nuestra selección de lencería femenina y masculina."
        />

        <div className="min-h-screen bg-white px-4 pb-8 sm:px-6 lg:px-8 relative">
          <div className="mt-8">
            <SelectorLenceria categoriaActiva="mujer" />
          </div>

          <div className="mt-8">
            {loadingLists ? (
              <Cargando mensaje={selectedCategory.loadingMessage} />
            ) : (
              <ProductGrid
                productos={mujerList}
                searchTerm={searchTerm}
                onlyPromos={onlyPromos}
                showBackButton={false}
              />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BannerLenceria
        titulo={selectedCategory.title}
        descripcion={selectedCategory.description}
        compacto
        filtro={normalizedGender === "hombre" ? "azul" : "rosa"}
      />

      <div className="min-h-screen bg-white px-4 pt-6 pb-8 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <BotonVolver to="/" texto="Volver al inicio" className="" />
        </div>

        <div className="mt-6">
          <SelectorLenceria categoriaActiva={normalizedGender} />
        </div>

        <div ref={productosRef} className="relative z-10 scroll-mt-28">
          <ProductGrid
            key={normalizedGender}
            fetchFn={selectedCategory.fetchFn}
            productos={productos}
            loadingMessage={selectedCategory.loadingMessage}
            searchTerm={searchTerm}
            onlyPromos={onlyPromos}
            showBackButton={false}
          />
        </div>

        <div className="mt-8 border-t border-pink-100 pt-5">
          <h2 className="mb-3 text-center text-base font-semibold text-pink-800">
            Explora más categorias
          </h2>
          <SelectorLenceria categoriaActiva={normalizedGender} estiloLista />
        </div>
      </div>
    </>
  );
};

export default Lenceria;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  cargarLenceriaDesdeSheets,
  cargarLenceriaHombreDesdeSheets,
} from "../database/sheets";
import ProductGrid from "../components/ProductGrid";
import DecorativeHearts from "../components/DecorativeHearts";
import Cargando from "../components/ui/Cargando";
import BotonVolver from "../components/ui/BotonVolver";

const categoryMap = {
  todo: {
    title: "Toda la lencería",
    description: "Explora nuestra colección completa de lencería femenina y masculina.",
    fetchFn: null,
    loadingMessage: "Cargando toda la lencería...",
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

const Lenceria = ({ onlyPromos, productos, searchTerm }) => {
  const navigate = useNavigate();
  const { gender } = useParams();
  const normalizedGender = (gender || "todo").toLowerCase();
  const selectedCategory = categoryMap[normalizedGender] || categoryMap.todo;
  const [mujerList, setMujerList] = useState([]);
  const [hombreList, setHombreList] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'mujer' | 'hombre'

  useEffect(() => {
    const nextFilter =
      normalizedGender === "mujer" ? "mujer" : normalizedGender === "hombre" ? "hombre" : "all";
    setActiveFilter(nextFilter);
  }, [normalizedGender]);

  useEffect(() => {
    const obtenerListas = async () => {
      try {
        const [mujer, hombre] = await Promise.all([
          cargarLenceriaDesdeSheets(),
          cargarLenceriaHombreDesdeSheets(),
        ]);
        setMujerList(mujer || []);
        setHombreList(hombre || []);
      } catch (error) {
        console.error("Error al cargar listas de lencería:", error);
      } finally {
        setLoadingLists(false);
      }
    };

    obtenerListas();
  }, []);

  if (normalizedGender === "todo" || !categoryMap[normalizedGender]) {
    const combined = [...mujerList, ...hombreList];
    const displayed =
      activeFilter === "all"
        ? combined
        : activeFilter === "mujer"
        ? mujerList
        : hombreList;

    return (
      <>
        <BannerLenceria
          titulo="Lencería"
          descripcion="Explora nuestra selección de lencería femenina y masculina."
        />

        <div className="min-h-screen bg-white px-4 pb-8 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-7xl">
            <div className="mt-8 flex justify-center">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/lenceria/todo")}
                  className={`rounded-full px-5 py-2.5 text-base font-medium transition ${
                    activeFilter === "all"
                      ? "bg-pink-600 text-white"
                      : "bg-white text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white"
                  }`}
                >
                  Ver toda la lencería
                </button>

                <button
                  onClick={() => navigate("/lenceria/mujer")}
                  className={`rounded-full px-5 py-2.5 text-base font-medium transition ${
                    activeFilter === "mujer"
                      ? "bg-pink-600 text-white"
                      : "bg-white text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white"
                  }`}
                >
                  Lencería mujer
                </button>

                <button
                  onClick={() => navigate("/lenceria/hombre")}
                  className={`rounded-full px-5 py-2.5 text-base font-medium transition ${
                    activeFilter === "hombre"
                      ? "bg-pink-600 text-white"
                      : "bg-white text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white"
                  }`}
                >
                  Lencería hombre
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {loadingLists ? (
              <Cargando mensaje={selectedCategory.loadingMessage} />
            ) : (
              <ProductGrid
                productos={displayed}
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
          <BotonVolver to="/lenceria" texto="Volver a lencería" className="" />
        </div>

        <div className="relative z-10">
          <ProductGrid
            fetchFn={selectedCategory.fetchFn}
            productos={productos}
            loadingMessage={selectedCategory.loadingMessage}
            searchTerm={searchTerm}
            onlyPromos={onlyPromos}
            showBackButton={false}
          />
        </div>
      </div>
    </>
  );
};

export default Lenceria;

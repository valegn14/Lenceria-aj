/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  cargarLenceriaDesdeSheets,
  cargarLenceriaHombreDesdeSheets,
} from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const categoryMap = {
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

const Lenceria = ({ onlyPromos, productos, searchTerm }) => {
  const navigate = useNavigate();
  const { gender } = useParams();
  const selectedCategory = categoryMap[gender?.toLowerCase()];
  const [mujerList, setMujerList] = useState([]);
  const [hombreList, setHombreList] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'mujer' | 'hombre'

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
const [bannerSrc] = useState('/bannerlenceria.png');

  if (!selectedCategory) {
    const combined = [...mujerList, ...hombreList];
    const displayed =
      activeFilter === "all"
        ? combined
        : activeFilter === "mujer"
        ? mujerList
        : hombreList;

    return (
      <>
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="relative w-full h-40 sm:h-56 md:h-72 lg:h-96 overflow-hidden shadow-xl">
            <img
              src={bannerSrc}
              alt="Banner lencería"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 min-w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#D98FA5]/70 via-[#E8B8C6]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white drop-shadow-lg">Lencería</h1>
                <p className="mt-2 text-sm sm:text-base text-[#FFF8FA]">Explora nuestra selección de lencería femenina y masculina.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-white px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mt-8 flex justify-center">
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`rounded-full px-5 py-2.5 text-base font-medium transition ${
                    activeFilter === "all"
                      ? "bg-pink-600 text-white"
                      : "bg-white text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white"
                  }`}
                >
                  Ver toda la lencería
                </button>

                <button
                  onClick={() => setActiveFilter("mujer")}
                  className={`rounded-full px-5 py-2.5 text-base font-medium transition ${
                    activeFilter === "mujer"
                      ? "bg-pink-600 text-white"
                      : "bg-white text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white"
                  }`}
                >
                  Lencería mujer
                </button>

                <button
                  onClick={() => setActiveFilter("hombre")}
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
              <div className="text-center text-gray-500">Cargando productos...</div>
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
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => navigate("/lenceria")}
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
            >
              ← Volver a categorías
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              {selectedCategory.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              {selectedCategory.description}
            </p>
          </div>
        </div>
      </div>

      <ProductGrid
        fetchFn={selectedCategory.fetchFn}
        productos={productos}
        loadingMessage={selectedCategory.loadingMessage}
        searchTerm={searchTerm}
        onlyPromos={onlyPromos}
        showBackButton={false}
      />
    </div>
  );
};

export default Lenceria;

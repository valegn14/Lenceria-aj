import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cargarJuguetesDesdeSheets } from "../database/sheets";
import { useCart } from "../components/solar/CartContext";

const normalizarTexto = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const slugify = (id, nombre) =>
  `${id}-${normalizarTexto(nombre).replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")}`;

const Juguetes = ({ onlyPromos = false, productos: propProductos, searchTerm = "", desdeInicio = false }) => {
  const [productos, setProductos] = useState(propProductos || []);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(!propProductos);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (propProductos) {
      setProductos(propProductos);
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        const data = await cargarJuguetesDesdeSheets();
        const lista = onlyPromos
          ? data.filter((p) => Number(p.rebaja) > 0)
          : data;
        setProductos(lista);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [onlyPromos, propProductos]);

  useEffect(() => {
    const term = normalizarTexto(searchTerm);
    const filtrados = productos.filter((producto) =>
      normalizarTexto(producto.nombre).includes(term)
    );
    setProductosFiltrados(filtrados);
  }, [searchTerm, productos]);

  if (loading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-900">Descubriendo tus placeres...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <p className="text-center text-red-600 text-lg">{error}</p>
      </div>
    );
return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 py-8">
      {/* Botón volver (si no se está en inicio) */}
      {!desdeInicio && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-600 hover:text-pink-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
      )}

      {/* Si no hay productos */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg sm:text-xl">
            No encontramos lo que buscas. Prueba con otra palabra.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {productosFiltrados.map((producto, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer bg-white overflow-hidden rounded-xl border border-gray-200 hover:border-fuchsia-500 transition-all duration-300 hover:shadow-lg"
              onClick={() => navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })}
            >
              {/* Imagen */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <div className="relative h-full w-full">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />

                  {producto.rebaja && Number(producto.rebaja) > 0 && (
                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
                      -{producto.rebaja}%
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        ...producto,
                        quantity: 1,
                        selectedSize: producto.selectedSize || null,
                      });
                    }}
                    className="hidden md:flex absolute top-2 right-2 w-12 h-12 bg-white text-pink-600 border border-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-pink-700 hover:text-white hover:scale-105 shadow-md items-center justify-center"
                    aria-label="Agregar al carrito"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight min-h-[2.5rem]">
                  {producto.nombre}
                </h3>

                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-base sm:text-lg font-bold text-pink-800">
                      ${producto.precio}
                    </p>
                    {producto.rebaja && Number(producto.rebaja) > 0 && (
                      <p className="text-gray-400 line-through text-sm sm:text-base">
                        ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-snug mb-3">
                  {producto.descripcion}
                </p>

                {/* Móvil */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      ...producto,
                      quantity: 1,
                      selectedSize: producto.selectedSize || null,
                    });
                  }}
                  className="md:hidden w-full py-2 sm:py-3 bg-pink-700 text-white text-center text-sm sm:text-base font-medium rounded-lg hover:bg-pink-800 transition duration-200"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Juguetes;
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cargarProductosDesdeSheets } from "./sheets";
import { useCart } from "../components/solar/CartContext";

// Utilidad para convertir string en forma comparable (sin acentos y en minúscula)
const normalizarTexto = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const slugify = (id, nombre) =>
  `${id}-${normalizarTexto(nombre).replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")}`;

const Card = ({ onlyPromos = false, productos: propProductos, searchTerm = "" }) => {
  const [productos, setProductos] = useState(propProductos || []);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(!propProductos); //spinner cargando
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); //paginacion
  const [productsPerPage] = useState(8);
  const productsGridRef = useRef(null); // Ref para el contenedor de productos
  //scrool a los productos
  const navigate = useNavigate(); //detalle producto
  const { addToCart } = useCart();

  useEffect(() => {
    if (propProductos) {
      setProductos(propProductos);
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        const data = await cargarProductosDesdeSheets();
        const lista = onlyPromos
          ? data.filter((p) => Number(p.rebaja) > 0)
          : data;
        setProductos(lista);
      } catch (err) {
        setError("Error al cargar productoos");
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
    setCurrentPage(1); // Resetear a página 1 al filtrar
  }, [searchTerm, productos]);

  // Scroll a los productos cuando cambia de página
  useEffect(() => {
    if (productsGridRef.current) {
      // Calcula posición relativa para un scroll más preciso
      const topPosition = productsGridRef.current.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth"
      });
    }
  }, [currentPage]);

  // Cálculos de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);

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
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-center text-gray-800 text-lg">{error}</p>
        </div>
      </div>
    );

  return ( //Dibuja la cuadrícula de productos (tarjetas).
    <div className="w-full">
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-800 text-lg sm:text-xl">
            No encontramos lo que buscas. Prueba con otra palabra.
          </p>
        </div>
      ) : (
        <>
          {/* Añadimos la referencia aquí al contenedor de productos */}
          <div ref={productsGridRef} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {currentProducts.map((producto, idx) => (
              <div
                key={idx}
                className="group relative cursor-pointer bg-white overflow-hidden rounded-xl border border-gray-200 hover:border-fuchsia-500 transition-all duration-300 hover:shadow-lg"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "auto" }); // 👈 fuerza scroll arriba antes de navegar
                  navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto });
                }}
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 4h14M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Info producto */}
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

                  {/* Botón agregar al carrito (solo móvil) */}
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

          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8 mb-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
              >
                Anterior
              </button>

              {[...Array(totalPages).keys()].map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num + 1)}
                  className={`w-10 h-10 rounded-full ${currentPage === num + 1
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  {num + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
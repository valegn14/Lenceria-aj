


// Lubricantes.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cargarLubricantesDesdeSheets } from "../database/sheets";
import { useCart } from "../components/solar/CartContext";

// Utilidad para convertir string en forma comparable (sin acentos y en minúscula)
const normalizarTexto = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const slugify = (id, nombre) =>
  `${id}-${normalizarTexto(nombre).replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")}`;

const Lubricantes = ({ onlyPromos = false, productos: propProductos, searchTerm = "" }) => {
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
        const data = await cargarLubricantesDesdeSheets();
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
          <p className="text-lg text-gray-600">Descubriendo tus placeres...</p>
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
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            No encontramos lo que buscas. Prueba con otra palabra.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {productosFiltrados.map((producto, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer bg-white overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5"
              onClick={() =>
                navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })
              }
            >
              {/* Contenedor principal con efecto sensual */}
              <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="relative h-full w-full">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Etiqueta de descuento sensual */}
                  {producto.rebaja && Number(producto.rebaja) > 0 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                      -{producto.rebaja}%
                    </div>
                  )}
                  
                  {/* Botón de carrito sensual */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        ...producto,
                        quantity: 1,
                        selectedSize: producto.selectedSize || null,
                      });
                    }}
                    className="
                      absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10
                      w-11/12 py-3
                      bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center font-medium text-sm
                      rounded-lg
                      opacity-0 group-hover:translate-y-3 group-hover:opacity-100
                      transition-all duration-400
                      hover:from-pink-600 hover:to-purple-700
                      shadow-lg
                      z-20
                    "
                  >
                    Agregar al carrito
                  </button>
                  
                  {/* Overlay sensual */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Información del producto con diseño elegante */}
              <div className="p-4 relative z-10 bg-white">
                <h3 className="text-base lg:text-lg font-medium text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2 leading-snug">
                  {producto.nombre}
                </h3>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-pink-600 font-bold text-lg">
                      ${producto.precio}
                    </p>
                    {producto.rebaja && Number(producto.rebaja) > 0 && (
                      <p className="text-gray-400 line-through text-sm">
                        ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        ...producto,
                        quantity: 1,
                        selectedSize: producto.selectedSize || null,
                      });
                    }}
                    className="md:hidden p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
                    aria-label="Agregar al carrito"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed min-h-[3.5rem]">
                  {producto.descripcion}
                </p>
                
                {/* Detalle decorativo sensual */}
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">4.8</span>
                </div>
              </div>
              
              {/* Efecto de borde sensual al pasar el mouse */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-300 rounded-xl pointer-events-none transition-all duration-500"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lubricantes;

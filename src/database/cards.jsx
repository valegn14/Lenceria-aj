import React, { useEffect, useState } from "react";
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
        const data = await cargarProductosDesdeSheets();
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
          <p className="text-base sm:text-lg text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-center text-red-600 text-base sm:text-lg">{error}</p>
      </div>
    );

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {productosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500 text-base sm:text-lg">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {productosFiltrados.map((producto, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer bg-white overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() =>
                navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })
              }
            >
              <div className="relative bg-gray-100 aspect-square overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {producto.rebaja && Number(producto.rebaja) > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
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
                  className="
                    absolute bottom-0 left-0 right-0
                    w-full py-2 sm:py-3
                    bg-pink-500 text-white text-center font-medium text-xs sm:text-sm
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    hover:bg-pink-600
                  "
                >
                  Agregar al carrito
                </button>
              </div>

              <div className="p-2 sm:p-3 lg:p-4">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 line-clamp-2 leading-tight">
                  {producto.nombre}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-pink-600 font-bold text-sm sm:text-base lg:text-lg">
                    ${producto.precio}
                  </p>
                  {producto.rebaja && Number(producto.rebaja) > 0 && (
                    <p className="text-gray-400 line-through text-xs sm:text-sm">
                      ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
                    </p>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {producto.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { cargarProductosDesdeSheets } from "./sheets";
// import { useCart } from '../components/solar/CartContext';

// const slugify = (id, nombre) =>
//   `${id}-${nombre
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "")}`;

// const Card = ({ onlyPromos = false, productos: propProductos }) => {
//   const [productos, setProductos] = useState(propProductos || []);
//   const [loading, setLoading]   = useState(!propProductos);
//   const [error, setError]       = useState(null);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     // Si recibimos productos por prop, no recargamos de Sheets
//     if (propProductos) {
//       setLoading(false);
//       return;
//     }

//     const cargar = async () => {
//       try {
//         const data = await cargarProductosDesdeSheets();
//         const lista = onlyPromos
//           ? data.filter(p => Number(p.rebaja) > 0)
//           : data;
//         setProductos(lista);
//       } catch (err) {
//         setError("Error al cargar productos");
//       } finally {
//         setLoading(false);
//       }
//     };

//     cargar();
//   }, [onlyPromos, propProductos]);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="text-center">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
//         <p className="text-base sm:text-lg text-gray-600">Cargando productos...</p>
//       </div>
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <p className="text-center text-red-600 text-base sm:text-lg">{error}</p>
//     </div>
//   );

//   return (
//     <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
//       <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
//         {productos.map((producto, idx) => (
//           <div
//             key={idx}
//             className="group relative cursor-pointer bg-white overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             onClick={() =>
//               navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })
//             }
//           >
//             {/* Imagen */}
//             <div className="relative bg-gray-100 aspect-square overflow-hidden">
//               <img
//                 src={producto.imagen}
//                 alt={producto.nombre}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 loading="lazy"
//               />

//               {/* Badge de descuento */}
//               {producto.rebaja && Number(producto.rebaja) > 0 && (
//                 <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                   -{producto.rebaja}%
//                 </div>
//               )}

//               {/* Botón Agregar al carrito */}
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   addToCart({
//                     ...producto,
//                     quantity: 1,
//                     selectedSize: producto.selectedSize || null
//                   });
//                 }}
//                 className="
//                   absolute bottom-0 left-0 right-0
//                   w-full py-2 sm:py-3
//                   bg-pink-500 text-white text-center font-medium text-xs sm:text-sm
//                   opacity-0 group-hover:opacity-100
//                   transition-opacity duration-300
//                   hover:bg-pink-600
//                 "
//               >
//                 Agregar al carrito
//               </button>
//             </div>

//             {/* Contenido */}
//             <div className="p-2 sm:p-3 lg:p-4">
//               <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 line-clamp-2 leading-tight">
//                 {producto.nombre}
//               </h3>
//               <div className="flex items-center gap-2 mb-2">
//                 <p className="text-pink-600 font-bold text-sm sm:text-base lg:text-lg">
//                   ${producto.precio}
//                 </p>
//                 {producto.rebaja && Number(producto.rebaja) > 0 && (
//                   <p className="text-gray-400 line-through text-xs sm:text-sm">
//                     ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
//                   </p>
//                 )}
//               </div>
//               <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
//                 {producto.descripcion}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Card;
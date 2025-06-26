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

  return (
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {productosFiltrados.map((producto, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer bg-white overflow-hidden rounded-xl border border-gray-200 hover:border-fuchsia-500 transition-all duration-300 hover:shadow-lg"
              onClick={() =>
                navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })
              }
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

                  {/* Botón + (solo escritorio) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        ...producto,
                        quantity: 1,
                        selectedSize: producto.selectedSize || null,
                      });
                    }}
                    className="hidden md:flex absolute top-2 right-2 w-9 h-9 bg-white text-fuchsia-500 border border-fuchsia-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-fuchsia-500 hover:text-white items-center justify-center"
                    aria-label="Agregar al carrito"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
      )}
    </div>
  );
};

export default Card;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { cargarProductosDesdeSheets } from "./sheets";
// import { useCart } from "../components/solar/CartContext";

// // Utilidad para convertir string en forma comparable (sin acentos y en minúscula)
// const normalizarTexto = (texto) =>
//   texto
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "");

// const slugify = (id, nombre) =>
//   `${id}-${normalizarTexto(nombre).replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")}`;

// const Card = ({ onlyPromos = false, productos: propProductos, searchTerm = "" }) => {
//   const [productos, setProductos] = useState(propProductos || []);
//   const [productosFiltrados, setProductosFiltrados] = useState([]);
//   const [loading, setLoading] = useState(!propProductos);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     if (propProductos) {
//       setProductos(propProductos);
//       setLoading(false);
//       return;
//     }

//     const cargar = async () => {
//       try {
//         const data = await cargarProductosDesdeSheets();
//         const lista = onlyPromos
//           ? data.filter((p) => Number(p.rebaja) > 0)
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

//   useEffect(() => {
//     const term = normalizarTexto(searchTerm);
//     const filtrados = productos.filter((producto) =>
//       normalizarTexto(producto.nombre).includes(term)
//     );
//     setProductosFiltrados(filtrados);
//   }, [searchTerm, productos]);

//   if (loading)
//     return (
//       <div className="min-h-[50vh] flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 mb-6"></div>
//           <p className="text-lg sm:text-xl text-gray-900">Descubriendo tus placeres...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-[50vh] flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//           <p className="text-center text-gray-800 text-lg">{error}</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="w-full">
//       {productosFiltrados.length === 0 ? (
//         <div className="text-center py-16">
//           <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <p className="text-gray-800 text-lg sm:text-xl">
//             No encontramos lo que buscas. Prueba con otra palabra.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//           {productosFiltrados.map((producto, idx) => (
//             <div
//               key={idx}
//               className="group relative cursor-pointer bg-white overflow-hidden rounded-xl border border-gray-200 hover:border-fuchsia-500 transition-all duration-300 hover:shadow-lg"
//               onClick={() =>
//                 navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })
//               }
//             >
//               {/* Image Container */}
//               <div className="relative aspect-square overflow-hidden bg-gray-50">
//                 <div className="relative h-full w-full">
//                   <img
//                     src={producto.imagen}
//                     alt={producto.nombre}
//                     className="w-full h-full object-contain"
//                     loading="lazy"
//                   />
                  
//                   {/* Discount Badge */}
//                   {producto.rebaja && Number(producto.rebaja) > 0 && (
//                     <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
//                       -{producto.rebaja}%
//                     </div>
//                   )}
                  
//                   {/* Quick Add Button - Desktop */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart({
//                         ...producto,
//                         quantity: 1,
//                         selectedSize: producto.selectedSize || null,
//                       });
//                     }}
//                     className="
//                       hidden md:block
//                       absolute top-3 right-3
//                       w-10 h-10
//                       bg-white text-fuchsia-500 border border-fuchsia-500
//                       rounded-full
//                       opacity-0 group-hover:opacity-100
//                       transition-opacity duration-300
//                       hover:bg-fuchsia-500 hover:text-white
//                       flex items-center justify-center
//                     "
//                     aria-label="Agregar al carrito"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="p-4 sm:p-5">
//                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 line-clamp-2 leading-snug min-h-[2.5rem] sm:min-h-[3rem]">
//                   {producto.nombre}
//                 </h3>
                
//                 <div className="flex justify-between items-center mb-4">
//                   <div className="flex items-center gap-2">
//                     <p className="text-lg sm:text-xl font-bold text-pink-800">
//                       ${producto.precio}
//                     </p>
//                     {producto.rebaja && Number(producto.rebaja) > 0 && (
//                       <p className="text-gray-400 line-through text-sm sm:text-base">
//                         ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
//                       </p>
//                     )}
//                   </div>
                  
//                   {/* Mobile Add Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart({
//                         ...producto,
//                         quantity: 1,
//                         selectedSize: producto.selectedSize || null,
//                       });
//                     }}
//                     className="md:hidden w-8 h-8 rounded-full border border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white flex items-center justify-center transition-colors duration-200"
//                     aria-label="Agregar al carrito"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   </button>
//                 </div>
                
//                 <p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed min-h-[4rem] sm:min-h-[4.5rem] mb-4">
//                   {producto.descripcion}
//                 </p>

//                 {/* Mobile Add to Cart Button */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart({
//                       ...producto,
//                       quantity: 1,
//                       selectedSize: producto.selectedSize || null,
//                     });
//                   }}
//                   className="
//                     md:hidden
//                     w-full py-3
//                     bg-pink-700 text-white text-center font-medium
//                     rounded-lg
//                     hover:bg-pink-800
//                     transition-colors duration-200
//                   "
//                 >
//                   Agregar al carrito
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;
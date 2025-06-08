import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cargarProductosDesdeSheets } from "./sheets";
import { useCart } from '../components/solar/CartContext';

const slugify = (id, nombre) =>
  `${id}-${nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")}`;

const Card = ({ onlyPromos = false, productos: propProductos }) => {
  const [productos, setProductos] = useState(propProductos || []);
  const [loading, setLoading]   = useState(!propProductos);
  const [error, setError]       = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    // Si recibimos productos por prop, no recargamos de Sheets
    if (propProductos) {
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        const data = await cargarProductosDesdeSheets();
        const lista = onlyPromos
          ? data.filter(p => Number(p.rebaja) > 0)
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
        <p className="text-lg text-gray-600">Cargando productos...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-red-600 text-lg">{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto, idx) => (
          <div
            key={idx}
            className="group relative cursor-pointer bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={() =>
              navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })
            }
          >
            {/* Imagen */}
            <div className="relative loading=lazy h-64 bg-gray-100">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Botón Agregar al carrito */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart({
                    ...producto,
                    quantity: 1,
                    selectedSize: producto.selectedSize || null
                  });
                }}
                className="
                  absolute bottom-0 left-0 right-0
                  w-full py-2
                  bg-pink-500 text-white text-center font-medium
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  rounded-none
                "
              >
                Agregar al carrito
              </button>
            </div>

            {/* Contenido */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {producto.nombre}
              </h3>
              <p className="text-pink-600 font-medium">${producto.precio}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {producto.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { cargarProductosDesdeSheets } from "./sheets";
// // import { useCart } from "./CartContext";   // <-- importamos el hook
// import { useCart } from '../components/solar/CartContext';

// const slugify = (id, nombre) =>
//   `${id}-${nombre
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "")}`;

// const Card = () => {
//   const [productos, setProductos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();  // <-- obtenemos addToCart

//   useEffect(() => {
//     const cargar = async () => {
//       try {
//         const data = await cargarProductosDesdeSheets();
//         setProductos(data);
//       } catch (err) {
//         setError("Error al cargar productos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     cargar();
//   }, []);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
//         <p className="text-lg text-gray-600">Cargando productos...</p>
//       </div>
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-center text-red-600 text-lg">{error}</p>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {productos.map((producto, index) => (
//           <div
//             key={index}
//             className="group relative cursor-pointer bg-white rounded-none overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
//             onClick={() =>
//               navigate(`/${slugify(producto.id, producto.nombre)}`, {
//                 state: producto,
//               })
//             }
//           >
//             {/* Imagen */}
//             <div className="relative h-64 bg-gray-100">
//               <img
//                 src={producto.imagen}
//                 alt={producto.nombre}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               />

//               {/* Botón Agregar al carrito */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();  
//                   // Añadimos cantidad inicial y, si aplica, talla
//                   addToCart({ 
//                     ...producto, 
//                     quantity: 1, 
//                     selectedSize: producto.selectedSize || null 
//                   });
//                 }}
//                 className="
//                   absolute bottom-0 left-0 right-0
//                   w-full py-2
//                   bg-pink-500 text-white text-center font-medium
//                   opacity-0 group-hover:opacity-100
//                   transition-opacity duration-300
//                   rounded-none
//                 "
//               >
//                 Agregar al carrito
//               </button>
//             </div>

//             {/* Contenido */}
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                 {producto.nombre}
//               </h3>
//               <p className="text-pink-600 font-medium">${producto.precio}</p>
//               <p className="text-sm text-gray-600 mt-2 line-clamp-2">
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

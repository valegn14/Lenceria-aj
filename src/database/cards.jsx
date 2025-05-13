import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cargarProductosDesdeSheets } from "./sheets";

const slugify = (id, nombre) =>
  `${id}-${nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")}`;

const Card = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await cargarProductosDesdeSheets();
        setProductos(data);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

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
        {productos.map((producto, index) => (
          <div
            key={index}
            onClick={() => navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })}
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 bg-gray-100">
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{producto.nombre}</h3>
              <p className="text-pink-600 font-medium">${producto.precio}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{producto.descripcion}</p>
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

// const slugify = (id, nombre) =>
//   `${id}-${nombre
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "")}`;

// const ITEMS_POR_PAGINA = 12;

// const Card = () => {
//   const [productos, setProductos] = useState([]);
//   const [paginaActual, setPaginaActual] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

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

//   const totalPaginas = Math.ceil(productos.length / ITEMS_POR_PAGINA);
//   const productosPagina = productos.slice(
//     (paginaActual - 1) * ITEMS_POR_PAGINA,
//     paginaActual * ITEMS_POR_PAGINA
//   );

//   const cambiarPagina = (nuevaPagina) => {
//     if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
//       setPaginaActual(nuevaPagina);
//     }
//   };

//   if (loading) return <p className="text-center mt-4">Cargando...</p>;
//   if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

//   return (
//     <div className="p-4">
//       <div className="flex flex-wrap justify-center gap-4">
//         {productosPagina.map((producto, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })}
//             className="cursor-pointer w-60 border p-4 rounded-lg shadow-md hover:shadow-lg transition"
//           >
//             <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover rounded mb-2" />
//             <h3 className="text-lg font-semibold">{producto.nombre}</h3>
//             <p className="text-sm text-gray-700">Precio: ${producto.precio}</p>
//             <p className="text-sm text-gray-600 truncate">{producto.descripcion}</p>
//           </div>
//         ))}
//       </div>

//       {/* Paginación */}
//       <div className="flex justify-center items-center mt-6 gap-2">
//         <button
//           onClick={() => cambiarPagina(paginaActual - 1)}
//           disabled={paginaActual === 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Anterior
//         </button>
//         <span className="text-sm">Página {paginaActual} de {totalPaginas}</span>
//         <button
//           onClick={() => cambiarPagina(paginaActual + 1)}
//           disabled={paginaActual === totalPaginas}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Siguiente
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;
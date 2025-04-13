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

const ITEMS_POR_PAGINA = 12;

const Card = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
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

  const totalPaginas = Math.ceil(productos.length / ITEMS_POR_PAGINA);
  const productosPagina = productos.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {productosPagina.map((producto, index) => (
          <div
            key={index}
            onClick={() => navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })}
            className="cursor-pointer w-60 border p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p className="text-sm text-gray-700">Precio: ${producto.precio}</p>
            <p className="text-sm text-gray-600 truncate">{producto.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm">Página {paginaActual} de {totalPaginas}</span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Card;










// import React, { useEffect, useState } from "react";
// import { cargarProductosDesdeSheets } from "./sheets"; // Asegúrate de ajustar la ruta

// const ITEMS_POR_PAGINA = 12; // Número de productos por página

// const Card = () => {
//   const [productos, setProductos] = useState([]);
//   const [paginaActual, setPaginaActual] = useState(1);
//   const [productoSeleccionado, setProductoSeleccionado] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const cargar = async () => {
//       try {
//         const data = await cargarProductosDesdeSheets();
//         setProductos(data);
//       } catch (err) {
//         console.error(err);
//         setError("Error al cargar los productos.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     cargar();
//   }, []);

//   const totalPaginas = Math.ceil(productos.length / ITEMS_POR_PAGINA);
//   const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
//   const productosPagina = productos.slice(indiceInicio, indiceInicio + ITEMS_POR_PAGINA);

//   const cambiarPagina = (nuevaPagina) => {
//     if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
//       setPaginaActual(nuevaPagina);
//     }
//   };

//   const volverALista = () => setProductoSeleccionado(null);

//   if (loading) return <p className="text-center mt-4">Cargando productos...</p>;
//   if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

//   // Vista de detalle
//   if (productoSeleccionado) {
//     return (
//       <div className="max-w-md mx-auto mt-8 border p-6 rounded-lg shadow-lg">
//         <img
//           src={productoSeleccionado.imagen}
//           alt={productoSeleccionado.nombre}
//           className="w-full h-60 object-cover rounded mb-4"
//         />
//         <h2 className="text-2xl font-bold">{productoSeleccionado.nombre}</h2>
//         <p className="text-lg text-gray-700 mb-2">
//           <strong>Precio:</strong> ${productoSeleccionado.precio}
//         </p>
//         <p className="text-gray-600 mb-4">{productoSeleccionado.descripcion}</p>
//         <button
//           onClick={volverALista}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Volver a la lista
//         </button>
//       </div>
//     );
//   }

//   // Vista de lista/paginación
//   return (
//     <div className="p-4">
//       <div className="flex flex-wrap justify-center gap-4">
//         {productosPagina.map((producto, index) => (
//           <div
//             key={index}
//             onClick={() => setProductoSeleccionado(producto)}
//             className="cursor-pointer w-60 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition"
//           >
//             <img
//               src={producto.imagen}
//               alt={producto.nombre}
//               className="w-full h-40 object-cover rounded mb-2"
//             />
//             <h3 className="text-lg font-semibold">{producto.nombre}</h3>
//             <p className="text-sm text-gray-700">
//               <strong>Precio:</strong> ${producto.precio}
//             </p>
//             <p className="text-sm text-gray-600 truncate">{producto.descripcion}</p>
//           </div>
//         ))}
//       </div>

//       {/* Controles de paginación */}
//       <div className="flex justify-center items-center mt-6 gap-2">
//         <button
//           onClick={() => cambiarPagina(paginaActual - 1)}
//           disabled={paginaActual === 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Anterior
//         </button>
//         <span className="text-sm">
//           Página {paginaActual} de {totalPaginas}
//         </span>
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





// import React, { useEffect, useState } from "react";
// import { cargarProductosDesdeSheets } from "./sheets"; // Asegúrate que la ruta esté correcta

// const Card = () => {
//   const [productos, setProductos] = useState([]);
//   const [cargando, setCargando] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const cargar = async () => {
//       try {
//         const data = await cargarProductosDesdeSheets();
//         setProductos(data);
//       } catch (err) {
//         setError("Error al cargar los productos.");
//       } finally {
//         setCargando(false);
//       }
//     };

//     cargar();
//   }, []);

//   if (cargando) return <div className="text-center p-4">Cargando productos...</div>;
//   if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
//   if (productos.length === 0) return <div className="text-center p-4">No se encontraron productos.</div>;

//   return (
//     <div id="content" className="p-4 flex flex-wrap justify-center">
//       {productos.map((producto, index) => (
//         <div
//           key={index}
//           className="border border-gray-300 rounded-lg shadow-md p-4 m-2 w-60"
//         >
//           <img
//             src={producto.imagen}
//             alt={producto.nombre}
//             className="w-full h-36 object-cover rounded"
//           />
//           <h3 className="mt-2 text-lg font-semibold">{producto.nombre}</h3>
//           <p className="text-sm text-gray-600">
//             <strong>Precio:</strong> ${producto.precio}
//           </p>
//           <p className="text-sm mt-1">{producto.descripcion}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Card;






// import React, { useEffect } from "react";

// const renderCards = (productos) => {
//   const container = document.getElementById("content");
//   if (!container) return;

//   container.innerHTML = ''; // Limpia contenido previo

//   productos.forEach(producto => {
//     const card = document.createElement('div');
//     card.style.border = '1px solid #ccc';
//     card.style.padding = '10px';
//     card.style.margin = '10px';
//     card.style.width = '250px';
//     card.style.display = 'inline-block';
//     card.style.verticalAlign = 'top';
//     card.style.borderRadius = '8px';
//     card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

//     card.innerHTML = `
//       <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; height:150px; object-fit:cover; border-radius:6px;">
//       <h3>${producto.nombre}</h3>
//       <p><strong>Precio:</strong> $${producto.precio}</p>
//       <p>${producto.descripcion}</p>
//     `;

//     container.appendChild(card);
//   });
// };

// const Card = () => {
//   useEffect(() => {
//     // Asignar la función al objeto global una vez que el componente se monta
//     window.renderCards = renderCards;
//   }, []);

//   // Aquí se crea el div 'content' donde se renderizarán las tarjetas
//   return <div id="content" className="p-4 flex flex-wrap justify-center" />;
// };

// export default Card;







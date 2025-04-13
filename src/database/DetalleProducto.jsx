import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { cargarProductosDesdeSheets } from "./sheets";

const DetalleProducto = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(location.state || null);

  const idSlug = slug?.split("-")[0];

  useEffect(() => {
    const cargar = async () => {
      if (!producto && idSlug) {
        const data = await cargarProductosDesdeSheets();
        const encontrado = data.find((p) => String(p.id) === idSlug);
        setProducto(encontrado || null);
      }
    };
    cargar();
  }, [producto, idSlug]);

  if (!producto) return <p className="text-center mt-10 text-xl text-gray-600">Cargando producto...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Imagen del producto */}
          <div className="md:w-1/2 lg:w-2/5 p-6 flex items-center justify-center bg-gray-100">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-auto max-h-[500px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Detalles del producto */}
          <div className="md:w-1/2 lg:w-3/5 p-8 flex flex-col">
            <div className="flex-grow">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{producto.nombre}</h2>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-semibold text-pink-600">${producto.precio}</span>
                {producto.precioOriginal && (
                  <span className="ml-3 text-lg text-gray-400 line-through">${producto.precioOriginal}</span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900">Descripción</h3>
                <p className="mt-2 text-gray-600">{producto.descripcion}</p>
              </div>

              {/* Tallas (opcional) */}
              {producto.tallas && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-900">Tallas disponibles</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {producto.tallas.split(',').map(talla => (
                      <button 
                        key={talla}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-pink-500"
                      >
                        {talla.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="mt-auto space-y-4 pt-6">
              <button
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg"
              >
                Agregar al carrito
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-lg font-medium transition duration-300"
              >
                Ver más productos
              </button>
            </div>
          </div>
        </div>

        {/* Sección de productos relacionados (opcional) */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Productos similares</h3>
          {/* Aquí podrías añadir un carrusel o grid de productos relacionados */}
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
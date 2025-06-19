import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { cargarProductosDesdeSheets } from "./sheets";
import { useCart } from '../components/solar/CartContext';

const DetalleProducto = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(location.state || null);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

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

  const handleAddToCart = () => {
    if (producto.tallas && !selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    
    addToCart({
      ...producto,
      selectedSize,
      quantity: 1
    });
  };

  if (!producto) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <p className="text-center text-lg sm:text-xl text-gray-600">Cargando producto...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Imagen del producto */}
          <div className="lg:w-1/2 xl:w-2/5 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md lg:max-w-lg">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="lg:w-1/2 xl:w-3/5 p-4 sm:p-6 lg:p-8 flex flex-col">
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
                {producto.nombre}
              </h2>
              
              <div className="flex items-center mb-4 lg:mb-6 gap-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-pink-600">
                  ${producto.precio}
                </span>
                {producto.rebaja && Number(producto.rebaja) > 0 && (
                  <>
                    <span className="text-base sm:text-lg lg:text-xl text-gray-400 line-through">
                      ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
                    </span>
                    <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
                      -{producto.rebaja}%
                    </span>
                  </>
                )}
              </div>

              <div className="mb-6 lg:mb-8">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">Descripción</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {producto.descripcion}
                </p>
              </div>

              {/* Tallas */}
              {producto.tallas && (
                <div className="mb-6 lg:mb-8">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3">Tallas disponibles</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {producto.tallas.split(',').map(talla => (
                      <button 
                        key={talla}
                        onClick={() => setSelectedSize(talla.trim())}
                        className={`px-3 sm:px-4 py-2 border rounded-md text-sm sm:text-base hover:bg-gray-100 focus:ring-2 focus:ring-pink-500 transition-colors ${
                          selectedSize === talla.trim() ? 'bg-pink-100 border-pink-500 text-pink-700' : 'border-gray-300'
                        }`}
                      >
                        {talla.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="mt-auto space-y-3 sm:space-y-4 pt-4 lg:pt-6">
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 sm:py-4 px-6 rounded-lg font-medium text-sm sm:text-base transition duration-300 shadow-md hover:shadow-lg"
              >
                Agregar al carrito
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 sm:py-4 px-6 rounded-lg font-medium text-sm sm:text-base transition duration-300"
              >
                Ver más productos
              </button>
            </div>
          </div>
        </div>

        {/* Sección de productos relacionados */}
        <div className="mt-12 lg:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">
            Productos similares
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
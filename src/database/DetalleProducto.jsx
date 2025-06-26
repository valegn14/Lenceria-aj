import React, { useEffect, useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      quantity
    });

    // Show success feedback
    const button = document.getElementById('add-to-cart-btn');
    if (button) {
      const originalText = button.textContent;
      button.textContent = '¡Agregado!';
      button.classList.add('bg-green-500', 'hover:bg-green-600');
      button.classList.remove('bg-pink-600', 'hover:bg-pink-700');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-500', 'hover:bg-green-600');
        button.classList.add('bg-pink-600', 'hover:bg-pink-700');
      }, 2000);
    }
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (!producto) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-6"></div>
        <p className="text-lg sm:text-xl text-gray-600">Cargando producto...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-pink-600 hover:text-pink-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 xl:w-2/5 p-6 sm:p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="w-full max-w-md lg:max-w-lg relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                  </div>
                )}
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className={`w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] object-contain transition-all duration-500 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Discount Badge */}
                {producto.rebaja && Number(producto.rebaja) > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    -{producto.rebaja}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 xl:w-3/5 p-6 sm:p-8 lg:p-12 flex flex-col">
              <div className="flex-grow">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                  {producto.nombre}
                </h1>
                
                {/* Price Section */}
                <div className="flex items-center mb-6 lg:mb-8 gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-600">
                    ${producto.precio}
                  </span>
                  {producto.rebaja && Number(producto.rebaja) > 0 && (
                    <>
                      <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 line-through">
                        ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
                      </span>
                      <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        Ahorra ${((parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)) - parseFloat(producto.precio)).toFixed(0)}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {producto.descripcion}
                  </p>
                </div>

                {/* Size Selection */}
                {producto.tallas && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tallas disponibles</h3>
                    <div className="flex flex-wrap gap-3">
                      {producto.tallas.split(',').map(talla => (
                        <button 
                          key={talla}
                          onClick={() => setSelectedSize(talla.trim())}
                          className={`px-4 py-3 border-2 rounded-xl text-base font-medium transition-all duration-200 ${
                            selectedSize === talla.trim() 
                              ? 'bg-pink-100 border-pink-500 text-pink-700 scale-105' 
                              : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                        >
                          {talla.trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cantidad</h3>
                  <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden w-fit">
                    <button
                      onClick={() => updateQuantity(quantity - 1)}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-6 py-3 text-gray-700 font-semibold bg-gray-50 min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(quantity + 1)}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <button
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Agregar al carrito - ${(parseFloat(producto.precio) * quantity).toFixed(2)}
                </button>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate("/")}
                    className="w-full bg-white border-2 border-gray-300 hover:border-pink-300 hover:bg-pink-50 text-gray-800 py-3 px-6 rounded-xl font-medium transition-all duration-300"
                  >
                    Ver más productos
                  </button>
                  
                  <button
                    onClick={() => navigate("/promociones")}
                    className="w-full bg-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300"
                  >
                    Ver promociones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            ¿Por qué elegir este producto?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Calidad Premium</h4>
              <p className="text-gray-600 text-sm">Productos de la más alta calidad para tu satisfacción</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Envío Discreto</h4>
              <p className="text-gray-600 text-sm">Empaque discreto y entrega confidencial</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Satisfacción Garantizada</h4>
              <p className="text-gray-600 text-sm">Tu placer es nuestra prioridad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
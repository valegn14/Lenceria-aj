import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cargarProductosDesdeSheets } from '../database/sheets';

const DetalleProducto = () => {
  const navigate = useNavigate();
  const { slug } = useParams(); // ✅ usar slug, no id
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

useEffect(() => {
  const cargarProducto = async () => {
    try {
      setLoading(true);
      const productos = await cargarProductosDesdeSheets();

      // ✅ Extraer el ID del slug (ej: "1-panty-vibrador-por-app" → "1")
      const id = slug?.split('-')[0];

      const productoEncontrado = productos.find(
        p => String(p.id).trim() === String(id).trim()
      );

      if (!productoEncontrado) {
        console.warn("⚠️ Producto no encontrado con ID extraído:", id);
        setError('Producto no encontrado');
        return;
      }

      setProducto(productoEncontrado);
    } catch (err) {
      console.error('❌ Error al cargar producto:', err);
      setError('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (slug) {
    cargarProducto();
  } else {
    setError('Slug de producto no válido');
    setLoading(false);
  }
}, [slug]);


  // Verificar si el producto tiene imágenes adicionales
  const tieneImagenesAdicionales = producto?.imagen2 && producto.imagen2.trim() !== '';

  // Array de todas las imágenes disponibles
  const todasLasImagenes = producto ? [
    producto.imagen,
    ...(tieneImagenesAdicionales ? [producto.imagen2] : [])
  ].filter(img => img && img.trim() !== '') : [];

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!producto) return;
    
    // Lógica existente para agregar al carrito
    console.log('Producto agregado al carrito:', {
      ...producto,
      cantidad: quantity,
      talla: selectedSize
    });
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">⚠️ {error || 'Producto no disponible'}</div>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button Minimalista */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Product Image Gallery */}
          <div className="lg:w-1/2">
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnails - Solo si hay múltiples imágenes */}
              {todasLasImagenes.length > 1 && (
                <div className="flex lg:flex-col gap-2 lg:gap-3 order-2 lg:order-1">
                  {todasLasImagenes.map((imagen, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 lg:w-20 lg:h-20 border-2 transition-all duration-200 overflow-hidden ${
                        selectedImage === index 
                          ? 'border-black scale-105' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={imagen}
                        alt={`Vista ${index + 1} de ${producto.nombre}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Container */}
              <div className={`relative ${todasLasImagenes.length > 1 ? 'lg:flex-1 order-1 lg:order-2' : 'w-full'}`}>
                <div className="relative aspect-square w-full max-w-2xl mx-auto">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                    </div>
                  )}
                  
                  {/* Contenedor con hover zoom */}
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={todasLasImagenes[selectedImage]}
                      alt={producto.nombre}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      } hover:scale-105 cursor-zoom-in`}
                      onLoad={() => setImageLoaded(true)}
                      onError={(e) => {
                        console.error('Error loading image:', todasLasImagenes[selectedImage]);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Discount Badge Minimalista */}
                  {producto.rebaja && Number(producto.rebaja) > 0 && (
                    <div className="absolute top-4 right-4 bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
                      -{producto.rebaja}%
                    </div>
                  )}

                  {/* Image Counter - Solo si hay múltiples imágenes */}
                  {todasLasImagenes.length > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {selectedImage + 1} / {todasLasImagenes.length}
                    </div>
                  )}

                  {/* Navigation Arrows - Solo si hay múltiples imágenes */}
                  {todasLasImagenes.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage(prev => 
                          prev > 0 ? prev - 1 : todasLasImagenes.length - 1
                        )}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSelectedImage(prev => 
                          prev < todasLasImagenes.length - 1 ? prev + 1 : 0
                        )}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 max-w-2xl">
            <div className="space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight tracking-tight">
                  {producto.nombre}
                </h1>
                
                {/* Price Section */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl lg:text-3xl font-medium text-gray-900">
                    ${producto.precio}
                  </span>
                  {producto.rebaja && Number(producto.rebaja) > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
                      </span>
                      <span className="text-sm text-red-600 font-medium">
                        Ahorras ${((parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)) - parseFloat(producto.precio)).toFixed(0)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div className="w-12 h-px bg-gray-300"></div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {producto.descripcion}
                </p>
              </div>

              {/* Size Selection */}
              {producto.tallas && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">TALLA</span>
                    <div className="w-8 h-px bg-gray-300"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {producto.tallas.split(',').map(talla => (
                      <button 
                        key={talla}
                        onClick={() => setSelectedSize(talla.trim())}
                        className={`px-4 py-2 border text-sm transition-all duration-200 ${
                          selectedSize === talla.trim() 
                            ? 'border-black text-black bg-white' 
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {talla.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">CANTIDAD</span>
                  <div className="w-8 h-px bg-gray-300"></div>
                </div>
                <div className="flex items-center border border-gray-300 w-fit">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-6 py-2 text-gray-900 font-medium min-w-[3rem] text-center border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 px-8 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Agregar al carrito - ${(parseFloat(producto.precio) * quantity).toFixed(2)}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/")}
                    className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 font-medium transition-colors"
                  >
                    Continuar comprando
                  </button>
                  
                  <button
                    onClick={() => navigate("/promociones")}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 font-medium transition-colors"
                  >
                    Ver promociones
                  </button>
                </div>
              </div>

              {/* Minimal Features */}
              <div className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="w-6 h-6 mx-auto text-gray-400">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500 block">Calidad Premium</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-6 h-6 mx-auto text-gray-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500 block">Envío Discreto</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-6 h-6 mx-auto text-gray-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500 block">Garantía</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="text-center space-y-2 mb-12">
          <h3 className="text-lg font-light text-gray-900">PRODUCTOS RELACIONADOS</h3>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 font-medium transition-colors"
          >
            Descubrir más productos
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default DetalleProducto;


// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { cargarProductosDesdeSheets } from "./sheets";
// import { useCart } from '../components/solar/CartContext';

// const DetalleProducto = () => {
//   const { slug } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [producto, setProducto] = useState(location.state || null);
//   const { addToCart } = useCart();
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const idSlug = slug?.split("-")[0];

//   useEffect(() => {
//     const cargar = async () => {
//       if (!producto && idSlug) {
//         const data = await cargarProductosDesdeSheets();
//         const encontrado = data.find((p) => String(p.id) === idSlug);
//         setProducto(encontrado || null);
//       }
//     };
//     cargar();
//   }, [producto, idSlug]);

//   const handleAddToCart = () => {
//     if (producto.tallas && !selectedSize) {
//       alert("Por favor selecciona una talla");
//       return;
//     }
    
//     addToCart({
//       ...producto,
//       selectedSize,
//       quantity
//     });

//     // Show success feedback
//     const button = document.getElementById('add-to-cart-btn');
//     if (button) {
//       const originalText = button.textContent;
//       button.textContent = '¡Agregado!';
//       button.classList.add('bg-green-500', 'hover:bg-green-600');
//       button.classList.remove('bg-pink-600', 'hover:bg-pink-700');
      
//       setTimeout(() => {
//         button.textContent = originalText;
//         button.classList.remove('bg-green-500', 'hover:bg-green-600');
//         button.classList.add('bg-pink-600', 'hover:bg-pink-700');
//       }, 2000);
//     }
//   };

//   const updateQuantity = (newQuantity) => {
//     if (newQuantity >= 1) {
//       setQuantity(newQuantity);
//     }
//   };

//   if (!producto) return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="text-center">
//         <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-6"></div>
//         <p className="text-lg sm:text-xl text-gray-600">Cargando producto...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Back Button Minimalista */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//           Volver
//         </button>
//       </div>

//       {/* Product Layout - Sin contenedor visible */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
//           {/* Product Image - Sin espacios en blanco */}
//           <div className="lg:w-1/2 relative overflow-hidden">
//             <div className="relative aspect-square w-full max-w-2xl mx-auto">
//               {!imageLoaded && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//                 </div>
//               )}
              
//               {/* Contenedor con hover zoom */}
//               <div className="w-full h-full overflow-hidden rounded-none">
//                 <img
//                   src={producto.imagen}
//                   alt={producto.nombre}
//                   className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
//                     imageLoaded ? 'opacity-100' : 'opacity-0'
//                   } hover:scale-105 cursor-zoom-in`}
//                   onLoad={() => setImageLoaded(true)}
//                 />
//               </div>
              
//               {/* Discount Badge Minimalista */}
//               {producto.rebaja && Number(producto.rebaja) > 0 && (
//                 <div className="absolute top-4 right-4 bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
//                   -{producto.rebaja}%
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Details - Minimalista */}
//           <div className="lg:w-1/2 max-w-2xl">
//             <div className="space-y-8">
//               {/* Header Section */}
//               <div className="space-y-4">
//                 <h1 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight tracking-tight">
//                   {producto.nombre}
//                 </h1>
                
//                 {/* Price Section - Minimalista */}
//                 <div className="flex items-center gap-3">
//                   <span className="text-2xl lg:text-3xl font-medium text-gray-900">
//                     ${producto.precio}
//                   </span>
//                   {producto.rebaja && Number(producto.rebaja) > 0 && (
//                     <>
//                       <span className="text-lg text-gray-500 line-through">
//                         ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
//                       </span>
//                       <span className="text-sm text-red-600 font-medium">
//                         Ahorras ${((parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)) - parseFloat(producto.precio)).toFixed(0)}
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Description - Texto más limpio */}
//               <div className="space-y-3">
//                 <div className="w-12 h-px bg-gray-300"></div>
//                 <p className="text-gray-600 leading-relaxed text-lg">
//                   {producto.descripcion}
//                 </p>
//               </div>

//               {/* Size Selection - Más sutil */}
//               {producto.tallas && (
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-medium text-gray-900">TALLA</span>
//                     <div className="w-8 h-px bg-gray-300"></div>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {producto.tallas.split(',').map(talla => (
//                       <button 
//                         key={talla}
//                         onClick={() => setSelectedSize(talla.trim())}
//                         className={`px-4 py-2 border text-sm transition-all duration-200 ${
//                           selectedSize === talla.trim() 
//                             ? 'border-black text-black bg-white' 
//                             : 'border-gray-300 text-gray-600 hover:border-gray-400'
//                         }`}
//                       >
//                         {talla.trim()}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Quantity Selector - Minimalista */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium text-gray-900">CANTIDAD</span>
//                   <div className="w-8 h-px bg-gray-300"></div>
//                 </div>
//                 <div className="flex items-center border border-gray-300 w-fit">
//                   <button
//                     onClick={() => updateQuantity(quantity - 1)}
//                     className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-50"
//                     disabled={quantity <= 1}
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//                     </svg>
//                   </button>
//                   <span className="px-6 py-2 text-gray-900 font-medium min-w-[3rem] text-center border-l border-r border-gray-300">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => updateQuantity(quantity + 1)}
//                     className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-50"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* Action Buttons - Más limpios */}
//               <div className="space-y-3 pt-4">
//                 <button
//                   id="add-to-cart-btn"
//                   onClick={handleAddToCart}
//                   className="w-full bg-black hover:bg-gray-800 text-white py-4 px-8 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   Agregar al carrito - ${(parseFloat(producto.precio) * quantity).toFixed(2)}
//                 </button>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => navigate("/")}
//                     className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 font-medium transition-colors"
//                   >
//                     Continuar comprando
//                   </button>
                  
//                   <button
//                     onClick={() => navigate("/promociones")}
//                     className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 font-medium transition-colors"
//                   >
//                     Ver promociones
//                   </button>
//                 </div>
//               </div>

//               {/* Minimal Features */}
//               <div className="pt-6 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//                   <div className="space-y-2">
//                     <div className="w-6 h-6 mx-auto text-gray-400">
//                       <svg fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <span className="text-xs text-gray-500 block">Calidad Premium</span>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="w-6 h-6 mx-auto text-gray-400">
//                       <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                       </svg>
//                     </div>
//                     <span className="text-xs text-gray-500 block">Envío Discreto</span>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="w-6 h-6 mx-auto text-gray-400">
//                       <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                       </svg>
//                     </div>
//                     <span className="text-xs text-gray-500 block">Garantía</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products Section - Opcional y minimalista */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
//         <div className="text-center space-y-2 mb-12">
//           <h3 className="text-lg font-light text-gray-900">PRODUCTOS RELACIONADOS</h3>
//           <div className="w-12 h-px bg-gray-300 mx-auto"></div>
//         </div>
        
//         {/* Aquí irían los productos relacionados con diseño similar */}
//         <div className="text-center">
//           <button
//             onClick={() => navigate("/")}
//             className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 font-medium transition-colors"
//           >
//             Descubrir más productos
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetalleProducto;
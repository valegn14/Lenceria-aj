import React, { useEffect, useState } from "react";
import { cargarCombosDesdeSheets } from "../database/sheets";
import { useCart } from "../components/solar/CartContext";

const Combos = () => {
  const [combos, setCombos] = useState([]);
  const [hoveredCombo, setHoveredCombo] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function cargarCombos() {
      try {
        const datos = await cargarCombosDesdeSheets();
        setCombos(datos);
      } catch (error) {
        console.error("Error al cargar combos:", error);
      }
    }
    cargarCombos();
  }, []);

  const handleAddToCart = (e, combo, comboIndex) => {
    e.stopPropagation();
    
    // Generar nombre y seleccionar imagen
    const comboName = `Combo #${combo.id || (comboIndex + 1)}`;
    const comboImage = combo.imagenes[0]; // Primera imagen del combo

    addToCart({
      ...combo,
      id: combo.id || `combo-${comboIndex}`, // Asegurar ID único
      nombre: comboName,
      imagen: comboImage,
      quantity: 1,
      isCombo: true,
    });
    
    // Feedback visual
    const button = e.currentTarget;
    button.classList.add('bg-green-500', 'hover:bg-green-600');
    button.innerHTML = `
      <span>¡Agregado!</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    `;
    
    setTimeout(() => {
      button.classList.remove('bg-green-500', 'hover:bg-green-600');
      button.innerHTML = `
        <span>Agregar al carrito</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      `;
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5l font-bold text-rose-700 mb-4 tracking-wide">
            Combos Imperdibles
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-400 to-fuchsia-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            Descubre nuestras exclusivas combinaciones diseñadas para elevar tus experiencias íntimas. 
            Cada combo ha sido cuidadosamente seleccionado para ofrecerte la máxima satisfacción.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {combos.map((combo, comboIndex) => (
            <div
              key={`combo-${comboIndex}`}
              className={`relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg border border-rose-100 transform transition-all duration-300 ${
                hoveredCombo === comboIndex 
                  ? "scale-[1.02] border-rose-300 shadow-xl shadow-rose-100" 
                  : "scale-100"
              }`}
              onMouseEnter={() => setHoveredCombo(comboIndex)}
              onMouseLeave={() => setHoveredCombo(null)}
            >
              {/* Decoración sensual sutil */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNkZDk0YjIiIHN0cm9rZS13aWR0aD0iMC41IiBkPSJNIDAgMCBMIDAgNTAgTCA1MCA1MCBMIDUwIDAgTCAwIDAgTSA1IDUgTCA1IDQ1IEwgNDUgNDUgTCA0NSA1IEwgNSA1Ii8+PC9zdmc+')]"></div>
              
              <div className="p-6 flex flex-col h-full">
                {/* Encabezado del combo */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-rose-800 bg-rose-100 px-4 py-2 rounded-lg inline-block">
                      Combo #{combo.id || comboIndex + 1}
                    </h3>
                    {combo.descripcion && (
                      <p className="mt-2 text-gray-600 italic font-light">
                        {combo.descripcion}
                      </p>
                    )}
                  </div>
                  <div className="bg-pink-600 text-white font-bold py-2 px-4 rounded-full text-xl shadow-md">
                    ${combo.precio}
                  </div>
                </div>
                
                {/* Galería de imágenes */}
                <div className="mb-6">
                  <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-3">
                    {combo.imagenes.map((imgUrl, imgIndex) => (
                      <div 
                        key={`combo-${comboIndex}-img-${imgIndex}`}
                        className="flex-shrink-0 relative group"
                      >
                        <div className="w-32 h-32 rounded-xl overflow-hidden border border-rose-200 shadow-sm transition-all duration-300 group-hover:border-rose-300 group-hover:shadow-md">
                          <img
                            src={imgUrl}
                            alt={`Producto ${imgIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                          <span className="text-white text-xs font-medium">Producto {imgIndex + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Lista de productos */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-rose-100 shadow-inner">
                  <h4 className="text-rose-700 font-semibold mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Contenido del Combo:
                  </h4>
                  <ul className="space-y-2">
                    {combo.productos.map((p, i) => (
                      <li 
                        key={`combo-${comboIndex}-prod-${i}`} 
                        className="text-gray-700 flex items-start"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 mr-2 text-rose-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-800">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Botón de acción */}
                <button 
                  onClick={(e) => handleAddToCart(e, combo, comboIndex)}
                  className="w-full bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-600 hover:to-fuchsia-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                  <span>Agregar al carrito</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Combos;

// import React, { useEffect, useState } from "react";
// import { cargarCombosDesdeSheets } from "../database/sheets";

// const Combos = () => {
//   const [combos, setCombos] = useState([]);
//   const [hoveredCombo, setHoveredCombo] = useState(null);

//   useEffect(() => {
//     async function cargarCombos() {
//       try {
//         const datos = await cargarCombosDesdeSheets();
//         setCombos(datos);
//       } catch (error) {
//         console.error("Error al cargar combos:", error);
//       }
//     }
//     cargarCombos();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-5l font-bold text-rose-700 mb-4 tracking-wide">
//             Combos Imperdibles
//           </h2>
//           <div className="w-32 h-1 bg-gradient-to-r from-rose-400 to-fuchsia-500 mx-auto rounded-full"></div>
//           <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
//             Descubre nuestras exclusivas combinaciones diseñadas para elevar tus experiencias íntimas. 
//             Cada combo ha sido cuidadosamente seleccionado para ofrecerte la máxima satisfacción.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {combos.map((combo, comboIndex) => (
//             <div
//               key={`combo-${comboIndex}`}
//               className={`relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg border border-rose-100 transform transition-all duration-300 ${
//                 hoveredCombo === comboIndex 
//                   ? "scale-[1.02] border-rose-300 shadow-xl shadow-rose-100" 
//                   : "scale-100"
//               }`}
//               onMouseEnter={() => setHoveredCombo(comboIndex)}
//               onMouseLeave={() => setHoveredCombo(null)}
//             >
//               {/* Decoración sensual sutil */}
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
//               <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNkZDk0YjIiIHN0cm9rZS13aWR0aD0iMC41IiBkPSJNIDAgMCBMIDAgNTAgTCA1MCA1MCBMIDUwIDAgTCAwIDAgTSA1IDUgTCA1IDQ1IEwgNDUgNDUgTCA0NSA1IEwgNSA1Ii8+PC9zdmc+')]"></div>
              
//               <div className="p-6 flex flex-col h-full">
//                 {/* Encabezado del combo */}
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold text-rose-800 bg-rose-100 px-4 py-2 rounded-lg inline-block">
//                       Combo #{combo.id || comboIndex + 1}
//                     </h3>
//                     {combo.descripcion && (
//                       <p className="mt-2 text-gray-600 italic font-light">
//                         {combo.descripcion}
//                       </p>
//                     )}
//                   </div>
//                   <div className="bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold py-2 px-4 rounded-full text-xl shadow-md">
//                     ${combo.precio}
//                   </div>
//                 </div>
                
//                 {/* Galería de imágenes */}
//                 <div className="mb-6">
//                   <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-3">
//                     {combo.imagenes.map((imgUrl, imgIndex) => (
//                       <div 
//                         key={`combo-${comboIndex}-img-${imgIndex}`}
//                         className="flex-shrink-0 relative group"
//                       >
//                         <div className="w-32 h-32 rounded-xl overflow-hidden border border-rose-200 shadow-sm transition-all duration-300 group-hover:border-rose-300 group-hover:shadow-md">
//                           <img
//                             src={imgUrl}
//                             alt={`Producto ${imgIndex + 1}`}
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                           />
//                         </div>
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
//                           <span className="text-white text-xs font-medium">Producto {imgIndex + 1}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Lista de productos */}
//                 <div className="bg-white rounded-xl p-4 mb-6 border border-rose-100 shadow-inner">
//                   <h4 className="text-rose-700 font-semibold mb-3 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Contenido del Combo:
//                   </h4>
//                   <ul className="space-y-2">
//                     {combo.productos.map((p, i) => (
//                       <li 
//                         key={`combo-${comboIndex}-prod-${i}`} 
//                         className="text-gray-700 flex items-start"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 mr-2 text-rose-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         <span className="text-gray-800">{p}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 {/* Botón de acción */}
//                 <button className="w-full bg-pink-500  hover:from-rose-600 hover:to-fuchsia-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center group">
//                   <span>Agregar al carrito</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Combos;
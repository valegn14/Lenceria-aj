
'use client'
import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from './CartContext';

export default function SolarOverview({ open, setOpen }) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    cartTotal,
    cartCount 
  } = useCart();

  const generarMensajeWhatsApp = () => {
    let mensaje = '🛒 *Resumen de mi compra:*%0A';
    cartItems.forEach((item, index) => {
      mensaje += `%0A${index + 1}. ${item.nombre}`;
      if (item.selectedSize) mensaje += ` (Talla: ${item.selectedSize})`;
      mensaje += `%0A   Cantidad: ${item.quantity}`;
      mensaje += `%0A   Precio unitario: $${item.precio}`;
      mensaje += `%0A   Subtotal: $${item.precio * item.quantity}%0A`;
    });
    mensaje += `%0A*Total:* $${cartTotal}`;
    return `https://wa.me/573113630754?text=${mensaje}`; // ← Cambia el número por el tuyo
  };
  const generarMensajeWhatsApp2 = () => {
    let mensaje = '🛒 *Hola quiero un domicilio:*%0A';
    cartItems.forEach((item, index) => {
      mensaje += `%0A${index + 1}. ${item.nombre}`;
      if (item.selectedSize) mensaje += ` (Talla: ${item.selectedSize})`;
      mensaje += `%0A   Cantidad: ${item.quantity}`;
      mensaje += `%0A   Precio unitario: $${item.precio}`;
      mensaje += `%0A   Subtotal: $${item.precio * item.quantity}%0A`;
    });
    mensaje += `%0A*Total:* $${cartTotal}`;
    return `https://wa.me/573113630754?text=${mensaje}`; // ← Cambia el número por el tuyo
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Carrito de compras ({cartCount})
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Cerrar</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <p className="text-gray-500 py-6 text-center">Tu carrito está vacío</p>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((product) => (
                            <li key={`${product.id}-${product.selectedSize}`} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img 
                                  src={product.imagen} 
                                  alt={product.nombre} 
                                  className="size-full object-cover" 
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.nombre}</h3>
                                    <p className="ml-4">${product.precio}</p>
                                  </div>
                                  {product.selectedSize && (
                                    <p className="mt-1 text-sm text-gray-500">Talla: {product.selectedSize}</p>
                                  )}
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button 
                                      onClick={() => updateQuantity(
                                        product.id, 
                                        product.selectedSize, 
                                        product.quantity - 1
                                      )}
                                      className="px-2 text-gray-500"
                                    >
                                      -
                                    </button>
                                    <p className="text-gray-500 mx-2">{product.quantity}</p>
                                    <button 
                                      onClick={() => updateQuantity(
                                        product.id, 
                                        product.selectedSize, 
                                        product.quantity + 1
                                      )}
                                      className="px-2 text-gray-500"
                                    >
                                      +
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button 
                                      type="button" 
                                      onClick={() => removeFromCart(product.id, product.selectedSize)}
                                      className="font-medium text-pink-600 hover:text-pink-500"
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cartTotal}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Envío e impuestos calculados al finalizar la compra.
                    </p>
                    <div className="mt-6 flex flex-col gap-4">
                      <a
                       href={generarMensajeWhatsApp2()}
                        className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-pink-700"
                      >
                        Pedir domicilio
                      </a>
                      <a
                        href={generarMensajeWhatsApp()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-md border border-green-500 bg-green-500 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-green-600"
                      >
                        Recoger en tienda
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        o{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-pink-600 hover:text-pink-500"
                        >
                          Continuar comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}


// 'use client'
// import React from 'react';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { useCart } from './CartContext';

// export default function SolarOverview({ open, setOpen }) {
//   const { 
//     cartItems, 
//     removeFromCart, 
//     updateQuantity,
//     cartTotal,
//     cartCount 
//   } = useCart();

//   return (
//     <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
//       <DialogBackdrop
//         transition
//         className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
//       />

//       <div className="fixed inset-0 overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//             <DialogPanel
//               transition
//               className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
//             >
//               <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                 <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                   <div className="flex items-start justify-between">
//                     <DialogTitle className="text-lg font-medium text-gray-900">
//                       Carrito de compras ({cartCount})
//                     </DialogTitle>
//                     <div className="ml-3 flex h-7 items-center">
//                       <button
//                         type="button"
//                         onClick={() => setOpen(false)}
//                         className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                       >
//                         <span className="absolute -inset-0.5" />
//                         <span className="sr-only">Cerrar</span>
//                         <XMarkIcon aria-hidden="true" className="size-6" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <div className="flow-root">
//                       {cartItems.length === 0 ? (
//                         <p className="text-gray-500 py-6 text-center">Tu carrito está vacío</p>
//                       ) : (
//                         <ul role="list" className="-my-6 divide-y divide-gray-200">
//                           {cartItems.map((product) => (
//                             <li key={`${product.id}-${product.selectedSize}`} className="flex py-6">
//                               <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                                 <img 
//                                   src={product.imagen} 
//                                   alt={product.nombre} 
//                                   className="size-full object-cover" 
//                                 />
//                               </div>

//                               <div className="ml-4 flex flex-1 flex-col">
//                                 <div>
//                                   <div className="flex justify-between text-base font-medium text-gray-900">
//                                     <h3>
//                                       {product.nombre}
//                                     </h3>
//                                     <p className="ml-4">${product.precio}</p>
//                                   </div>
//                                   {product.selectedSize && (
//                                     <p className="mt-1 text-sm text-gray-500">Talla: {product.selectedSize}</p>
//                                   )}
//                                 </div>
//                                 <div className="flex flex-1 items-end justify-between text-sm">
//                                   <div className="flex items-center">
//                                     <button 
//                                       onClick={() => updateQuantity(
//                                         product.id, 
//                                         product.selectedSize, 
//                                         product.quantity - 1
//                                       )}
//                                       className="px-2 text-gray-500"
//                                     >
//                                       -
//                                     </button>
//                                     <p className="text-gray-500 mx-2">{product.quantity}</p>
//                                     <button 
//                                       onClick={() => updateQuantity(
//                                         product.id, 
//                                         product.selectedSize, 
//                                         product.quantity + 1
//                                       )}
//                                       className="px-2 text-gray-500"
//                                     >
//                                       +
//                                     </button>
//                                   </div>

//                                   <div className="flex">
//                                     <button 
//                                       type="button" 
//                                       onClick={() => removeFromCart(product.id, product.selectedSize)}
//                                       className="font-medium text-pink-600 hover:text-pink-500"
//                                     >
//                                       Eliminar
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {cartItems.length > 0 && (
//                   <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <p>Subtotal</p>
//                       <p>${cartTotal}</p>
//                     </div>
//                     <p className="mt-0.5 text-sm text-gray-500">
//                       Envío e impuestos calculados al finalizar la compra.
//                     </p>
//                     <div className="mt-6">
//                       <a
//                         href="#"
//                         className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-pink-700"
//                       >
//                         Finalizar compra
//                       </a>
//                     </div>
//                     <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                       <p>
//                         o{' '}
//                         <button
//                           type="button"
//                           onClick={() => setOpen(false)}
//                           className="font-medium text-pink-600 hover:text-pink-500"
//                         >
//                           Continuar comprando
//                           <span aria-hidden="true"> &rarr;</span>
//                         </button>
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </DialogPanel>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// }
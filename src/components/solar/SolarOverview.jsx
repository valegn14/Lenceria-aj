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
    return `https://wa.me/573113630754?text=${mensaje}`;
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
    return `https://wa.me/573113630754?text=${mensaje}`;
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-sm sm:max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                {/* Header */}
                <div className="flex-shrink-0 px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-200">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                      Carrito de compras
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-pink-100 rounded-full transition-colors"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Cerrar</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                  {cartCount > 0 && (
                    <p className="mt-1 text-sm text-gray-600">
                      {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
                    </p>
                  )}
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                  <div className="flow-root">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12 sm:py-16">
                        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
                        <p className="text-sm sm:text-base text-gray-500">Agrega algunos productos para comenzar</p>
                      </div>
                    ) : (
                      <ul role="list" className="-my-4 sm:-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li key={`${product.id}-${product.selectedSize}`} className="flex py-6">
                            {/* Product Image */}
                            <div className="size-20 sm:size-24 lg:size-28 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                              <img 
                                src={product.imagen} 
                                alt={product.nombre} 
                                className="size-full object-contain" 
                              />
                            </div>

                            {/* Product Details */}
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3 className="line-clamp-2 leading-tight pr-2">{product.nombre}</h3>
                                  <p className="ml-2 flex-shrink-0 font-bold text-pink-600">${product.precio}</p>
                                </div>
                                {product.selectedSize && (
                                  <p className="mt-1 text-sm text-gray-500">Talla: {product.selectedSize}</p>
                                )}
                              </div>
                              
                              {/* Quantity and Remove */}
                              <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                  <button 
                                    onClick={() => updateQuantity(
                                      product.id, 
                                      product.selectedSize, 
                                      product.quantity - 1
                                    )}
                                    className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                                    disabled={product.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <span className="px-4 py-2 text-gray-700 font-medium bg-gray-50 min-w-[3rem] text-center">
                                    {product.quantity}
                                  </span>
                                  <button 
                                    onClick={() => updateQuantity(
                                      product.id, 
                                      product.selectedSize, 
                                      product.quantity + 1
                                    )}
                                    className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>

                                <button 
                                  type="button" 
                                  onClick={() => removeFromCart(product.id, product.selectedSize)}
                                  className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
                                >
                                  Eliminar
                                </button>
                              </div>
                              
                              {/* Subtotal */}
                              <div className="mt-2 text-right">
                                <p className="text-sm text-gray-600">
                                  Subtotal: <span className="font-medium text-gray-900">${(product.precio * product.quantity).toFixed(2)}</span>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Footer with Total and Actions */}
                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 px-4 sm:px-6 py-6 bg-gray-50">
                    <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                      <p>Total</p>
                      <p className="text-pink-600">${cartTotal}</p>
                    </div>
                    
                    <p className="mt-0.5 text-sm text-gray-500 mb-6 text-center">
                      Envío e impuestos calculados al finalizar la compra.
                    </p>
                    
                    <div className="space-y-4">
                      <a
                        href={generarMensajeWhatsApp2()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-xl border border-transparent bg-pink-600 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-pink-700 transition-colors w-full"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        Pedir domicilio
                      </a>
                      
                      <a
                        href={generarMensajeWhatsApp()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-xl border-2 border-green-500 bg-green-500 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-green-600 transition-colors w-full"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
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
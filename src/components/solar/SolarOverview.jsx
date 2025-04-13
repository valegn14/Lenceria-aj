'use client'
import React from 'react';
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

export default function SolarOverview({ open, setOpen }) {
  // const [open, setOpen] = useState(true)

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
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {products.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Qty {product.quantity}</p>

                                <div className="flex">
                                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}



// import React from 'react';
// import { Sun, Leaf, DollarSign } from 'lucide-react';

// export function SolarOverview() {
//   return (
//     <section className="py-16">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
//           Solar Energy: Powering a Sustainable Future
//         </h2>
        
//         <div className="grid md:grid-cols-3 gap-8 mb-12">
//           <div className="bg-amber-200 p-6 rounded-xl shadow-md">
//             <Sun className="h-12 w-12 text-yellow-500 mb-4" />
//             <h3 className="text-xl font-semibold mb-3">How It Works</h3>
//             <p className="text-gray-600">
//               Solar panels convert sunlight into electricity through photovoltaic cells, 
//               providing clean, renewable energy directly from the sun.
//             </p>
//           </div>

//           <div className="bg-lime-200 p-6 rounded-xl shadow-md">
//             <Leaf className="h-12 w-12 text-green-500 mb-4" />
//             <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
//             <p className="text-gray-600">
//               Solar energy reduces carbon emissions, requires minimal water usage, 
//               and helps combat climate change with zero pollution during operation.
//             </p>
//           </div>

//           <div className="bg-cyan-200 p-6 rounded-xl shadow-md">
//             <DollarSign className="h-12 w-12 text-blue-500 mb-4" />
//             <h3 className="text-xl font-semibold mb-3">Economic Benefits</h3>
//             <p className="text-gray-600">
//               Investing in solar power reduces electricity bills, provides energy independence, 
//               and often comes with tax incentives and rebates.
//             </p>
//           </div>
//         </div>

//         <div className="bg-gray-500 rounded-2xl p-8 shadow-lg">
//           <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Statistics</h3>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="bg-white p-4 rounded-lg shadow">
//               <p className="text-3xl font-bold text-yellow-500">1,000+ GW</p>
//               <p className="text-gray-600">Global Solar Capacity</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow">
//               <p className="text-3xl font-bold text-yellow-500">3%</p>
//               <p className="text-gray-600">Global Electricity Share</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow">
//               <p className="text-3xl font-bold text-yellow-500">70%</p>
//               <p className="text-gray-600">Cost Reduction Since 2010</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow">
//               <p className="text-3xl font-bold text-yellow-500">25+ Years</p>
//               <p className="text-gray-600">Average Panel Lifespan</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

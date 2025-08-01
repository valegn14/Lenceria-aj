import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/solar/CartContext";
import { cargarProductosDesdeSheets } from "../database/sheets";
const normalizarTexto = (texto) =>
    texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

const slugify = (id, nombre) =>
    `${id}-${normalizarTexto(nombre).replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")}`;

const FiltroInicio = ({ onlyPromos = false, productos: propProductos, searchTerm = "" }) => {
    const [productos, setProductos] = useState(propProductos || []);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [loading, setLoading] = useState(
        !propProductos || propProductos.length === 0
    ); const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        if (propProductos && propProductos.length > 0) {
            setProductos(propProductos);
            setLoading(false);
            return;
        }

        const cargar = async () => {
            try {
                const data = await cargarProductosDesdeSheets();
                const lista = onlyPromos ? data.filter((p) => Number(p.rebaja) > 0) : data;
                setProductos(lista);
            } catch (err) {
                setError("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };

        cargar();
    }, [propProductos]);

    useEffect(() => {
        if (!searchTerm) {
            setProductosFiltrados(productos);
            return;
        }

        const term = normalizarTexto(searchTerm);
        const filtrados = productos.filter((producto) =>
            normalizarTexto(producto.nombre).includes(term)
        );
        setProductosFiltrados(filtrados);
    }, [searchTerm, productos]);

    if (loading)
        return (
            <div className="min-h-[50vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fuchsia-500 mb-6"></div>
                    <p className="text-lg sm:text-xl text-gray-900">cargando todos los productos...</p>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-[50vh] flex items-center justify-center px-4">
                <p className="text-center text-red-600 text-lg">{error}</p>
            </div>
        );

    return (
        <div className="w-full px-4 py-8">
            {productosFiltrados.length === 0 ? (
                <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                        No encontramos lo que buscas. Prueba con otra palabra.
                    </p>
                </div>
                // aqui empieza amostrarse los productos
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                    {productosFiltrados.map((producto, idx) => (
                        <div
                            key={idx}
                            className={`group relative cursor-pointer bg-white overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${producto.stock <= 0 ? "opacity-90" : ""
                                }`}
                            onClick={() => producto.stock > 0 && navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto })}
                        >
                            <div className="relative h-48 overflow-hidden bg-gray-50">
                                <div className="relative h-full w-full">
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className={`w-full h-full object-contain ${producto.stock <= 0 ? "grayscale-[30%]" : ""
                                            }`}
                                        loading="lazy"
                                    />

                                    {producto.stock <= 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="w-full bg-black bg-opacity-50 text-white text-center py-3">
                                                <span className="text-lg font-bold">SIN EXISTENCIAS</span>
                                            </div>
                                        </div>
                                    )}

                                    {producto.rebaja && Number(producto.rebaja) > 0 && (
                                        <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
                                            -{producto.rebaja}%
                                        </div>
                                    )}

                                    {producto.stock > 0 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart({
                                                    ...producto,
                                                    quantity: 1,
                                                    selectedSize: producto.selectedSize || null,
                                                });

                                                const button = e.currentTarget;
                                                const originalContent = button.innerHTML;

                                                // Cambiar a icono de confirmación
                                                button.innerHTML = `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M5 13l4 4L19 7" 
        />
      </svg>
    `;

                                                // Cambiar clases para estilo de confirmación
                                                button.classList.remove(
                                                    'bg-white',
                                                    'text-pink-600',
                                                    'border-pink-600',
                                                    'hover:bg-pink-700',
                                                    'hover:text-white'
                                                );
                                                button.classList.add(
                                                    'bg-green-500',
                                                    'text-white',
                                                    'border-green-500',
                                                    'cursor-not-allowed'
                                                );

                                                // Restaurar después de 2 segundos
                                                setTimeout(() => {
                                                    button.innerHTML = originalContent;
                                                    button.classList.remove(
                                                        'bg-green-500',
                                                        'text-white',
                                                        'border-green-500',
                                                        'cursor-not-allowed'
                                                    );
                                                    button.classList.add(
                                                        'bg-white',
                                                        'text-pink-600',
                                                        'border-pink-600',
                                                        'hover:bg-pink-700',
                                                        'hover:text-white'
                                                    );
                                                }, 2000);
                                            }}
                                            className="hidden md:flex absolute top-2 right-2 w-12 h-12 bg-white text-pink-600 border border-pink-600 rounded-full opacity-100 transition duration-300 hover:bg-pink-700 hover:text-white hover:scale-105 shadow-md items-center justify-center"
                                            aria-label="Agregar al carrito"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-3 sm:p-4">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight min-h-[2.5rem]">
                                    {producto.nombre}
                                </h3>

                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <p className="text-base sm:text-lg font-bold text-pink-800">
                                            ${producto.precio}
                                        </p>
                                        {producto.rebaja && Number(producto.rebaja) > 0 && (
                                            <p className="text-gray-400 line-through text-sm sm:text-base">
                                                ${(parseFloat(producto.precio) / (1 - Number(producto.rebaja) / 100)).toFixed(0)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-snug mb-3">
                                    {producto.descripcion}
                                </p>

                                {producto.stock > 0 ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart({ ...producto, quantity: 1 });

                                            const button = e.currentTarget;
                                            const originalText = button.innerHTML;

                                            button.innerHTML = `
      <span class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Agregado
      </span>
    `;

                                            button.classList.remove('bg-pink-700', 'hover:bg-pink-800');
                                            button.classList.add('bg-green-600', 'cursor-not-allowed');

                                            setTimeout(() => {
                                                button.innerHTML = originalText;
                                                button.classList.remove('bg-green-600', 'cursor-not-allowed');
                                                button.classList.add('bg-pink-700', 'hover:bg-pink-800');
                                            }, 2000);
                                        }}
                                        className="md:hidden w-full py-2 sm:py-3 bg-pink-700 text-white text-center text-sm sm:text-base font-medium rounded-lg hover:bg-pink-800 transition duration-200"
                                    >
                                        Agregar al carrito
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="md:hidden w-full py-2 sm:py-3 bg-gray-400 text-white text-center text-sm sm:text-base font-medium rounded-lg cursor-not-allowed"
                                    >
                                        Sin existencias
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default FiltroInicio;
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cargarProductosDesdeSheets } from '../database/sheets';
import { useCart } from "../components/solar/CartContext";
import Cargando from "../components/ui/Cargando";
import BotonVolver from "../components/ui/BotonVolver";
import IconoCarrito from "../components/ui/IconoCarrito";
import { formatearPrecio, precioANumero, precioOriginal, tieneRebaja } from "../utils/productos";

const Flecha = ({ direccion }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direccion === "izquierda" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
  </svg>
);

const BENEFICIOS = [
  {
    texto: "Calidad Premium",
    icono: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  },
  {
    texto: "Envío Discreto",
    icono: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  },
  {
    texto: "Garantía",
    icono: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
  },
];

const DetalleProducto = () => {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [agregado, setAgregado] = useState(false);
  const timerRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        const productos = await cargarProductosDesdeSheets();

        // El ID va al inicio del slug (ej: "1-panty-vibrador-por-app" → "1")
        const id = slug?.split('-')[0];
        const productoEncontrado = productos.find(
          p => String(p.id).trim() === String(id).trim()
        );

        if (!productoEncontrado) {
          setError('Producto no encontrado');
          return;
        }

        setProducto(productoEncontrado);
        setSelectedImage(0);
        setQuantity(1);
        setImageLoaded(false);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      cargarProducto();
    } else {
      setError('Producto no válido');
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const todasLasImagenes = producto
    ? [producto.imagen, producto.imagen2].filter(img => img && img.trim() !== '')
    : [];
  const variasImagenes = todasLasImagenes.length > 1;

  const cambiarImagen = (indice) => {
    if (indice === selectedImage) return;
    setImageLoaded(false);
    setSelectedImage((indice + todasLasImagenes.length) % todasLasImagenes.length);
  };

  const handleAddToCart = () => {
    if (producto.tallas && !selectedSize) {
      alert("Selecciona una talla");
      return;
    }

    addToCart({
      ...producto,
      quantity,
      selectedSize: selectedSize || null,
    });

    setAgregado(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAgregado(false), 2000);
  };

  if (loading) {
    return <Cargando mensaje="Cargando producto..." className="min-h-screen" />;
  }

  if (error || !producto) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50 px-4">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg mb-6">{error || 'Producto no disponible'}</p>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 rounded-xl transition-colors"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const agotado = producto.stock <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <BotonVolver />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería */}
          <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4">
            {variasImagenes && (
              <div className="flex lg:flex-col gap-3">
                {todasLasImagenes.map((imagen, index) => (
                  <button
                    key={imagen}
                    onClick={() => cambiarImagen(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                    className={`w-16 h-16 lg:w-20 lg:h-20 overflow-hidden rounded-xl bg-white border-2 transition-colors ${
                      selectedImage === index ? 'border-pink-500' : 'border-transparent hover:border-pink-200'
                    }`}
                  >
                    <img src={imagen} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex-1 aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
                </div>
              )}

              <img
                src={todasLasImagenes[selectedImage]}
                alt={producto.nombre}
                className={`w-full h-full object-cover transition-all duration-700 ease-out hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${agotado ? 'grayscale-[30%]' : ''}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.style.display = 'none';
                  setImageLoaded(true);
                }}
              />

              {tieneRebaja(producto) && (
                <div className="absolute top-3 left-3 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{producto.rebaja}%
                </div>
              )}

              {agotado && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white text-center py-3">
                  <span className="text-lg font-bold">SIN EXISTENCIAS</span>
                </div>
              )}

              {variasImagenes && (
                <>
                  <div className="absolute bottom-3 right-3 bg-white/90 text-pink-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                    {selectedImage + 1} / {todasLasImagenes.length}
                  </div>
                  <button
                    onClick={() => cambiarImagen(selectedImage - 1)}
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-pink-600 shadow-md transition-colors hover:bg-pink-600 hover:text-white"
                  >
                    <Flecha direccion="izquierda" />
                  </button>
                  <button
                    onClick={() => cambiarImagen(selectedImage + 1)}
                    aria-label="Imagen siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-pink-600 shadow-md transition-colors hover:bg-pink-600 hover:text-white"
                  >
                    <Flecha direccion="derecha" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Información */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-md p-5 sm:p-8 h-fit">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
              {producto.nombre}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-bold text-pink-800">
                {formatearPrecio(producto.precio)}
              </span>
              {tieneRebaja(producto) && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatearPrecio(precioOriginal(producto))}
                  </span>
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
                    Ahorras {formatearPrecio(precioOriginal(producto) - precioANumero(producto.precio))}
                  </span>
                </>
              )}
            </div>

            {producto.descripcion && (
              <p className="mt-6 text-gray-600 leading-relaxed whitespace-pre-line">
                {producto.descripcion}
              </p>
            )}

            {/* Tallas */}
            {producto.tallas && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">Talla</p>
                <div className="flex flex-wrap gap-2">
                  {producto.tallas.split(',').map(talla => (
                    <button
                      key={talla}
                      onClick={() => setSelectedSize(talla.trim())}
                      className={`min-h-11 min-w-11 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedSize === talla.trim()
                          ? 'border-pink-600 bg-pink-50 text-pink-700'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {talla.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad + agregar */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              {!agotado && (
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900">Cantidad</span>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Restar uno"
                      className="h-11 w-11 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="h-11 min-w-[3rem] flex items-center justify-center bg-gray-50 font-bold text-gray-700" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      aria-label="Sumar uno"
                      className="h-11 w-11 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {agotado ? (
                <button
                  disabled
                  className="w-full min-h-12 rounded-xl bg-gray-400 text-white font-semibold cursor-not-allowed"
                >
                  Sin existencias
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className={`w-full min-h-12 flex items-center justify-center gap-3 rounded-xl text-white font-semibold shadow-md transition-colors ${
                    agregado ? 'bg-green-600' : 'bg-pink-700 hover:bg-pink-800'
                  }`}
                >
                  {agregado ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Agregado!
                    </>
                  ) : (
                    <>
                      <IconoCarrito className="w-7" strokeWidth={10} />
                      Agregar al carrito
                    </>
                  )}
                </button>
              )}

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/"
                  className="flex min-h-11 items-center justify-center rounded-xl border border-pink-600 px-3 text-center text-sm font-semibold text-pink-700 transition-colors hover:bg-pink-50"
                >
                  Continuar comprando
                </Link>
                <Link
                  to="/promociones"
                  className="flex min-h-11 items-center justify-center rounded-xl bg-pink-100 px-3 text-center text-sm font-semibold text-pink-800 transition-colors hover:bg-pink-200"
                >
                  Ver promociones
                </Link>
              </div>
            </div>

            {/* Beneficios */}
            <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-gray-100 pt-6 text-center">
              {BENEFICIOS.map(({ texto, icono }) => (
                <li key={texto} className="flex flex-col items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {icono}
                    </svg>
                  </span>
                  <span className="text-xs text-gray-600">{texto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./solar/CartContext";
import Cargando from "./ui/Cargando";
import BotonVolver from "./ui/BotonVolver";
import IconoCarrito from "./ui/IconoCarrito";
import {
  formatearPrecio,
  normalizarTexto,
  precioOriginal,
  rutaProducto,
  tieneRebaja,
} from "../utils/productos";

const CheckIconSvg = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Tarjeta de producto única: se usa en categorías, promociones, inicio y búsqueda.
// Con sinBorde (inicio) no lleva borde ni sombra: la imagen y el texto quedan sobre el fondo.
export const ProductCard = ({ producto, onSelect, sinBorde = false }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [agregado, setAgregado] = useState(false);
  const timerRef = useRef(null);
  const agotado = producto.stock <= 0;

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const abrirDetalle = () => {
    if (agotado) return;
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(rutaProducto(producto), { state: producto });
    onSelect?.(producto);
  };

  const agregar = (e) => {
    e.stopPropagation();
    if (agregado) return;
    addToCart({ ...producto, quantity: 1, selectedSize: null });
    setAgregado(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <div
      className={`group relative ${
        sinBorde
          ? ""
          : "bg-white overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 hover:border-pink-300"
      } ${
        agotado ? "opacity-90" : "cursor-pointer"
      }`}
      onClick={abrirDetalle}
    >
      <div className={`relative h-56 sm:h-72 lg:h-80 overflow-hidden bg-white ${sinBorde ? "rounded-md border border-gray-200 transition-colors group-hover:border-pink-300" : ""}`}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={`w-full h-full object-cover ${agotado ? "grayscale-[30%]" : ""} ${
            sinBorde ? "transition-transform duration-500 group-hover:scale-105" : ""
          }`}
          loading="lazy"
        />

        {agotado && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-full bg-black bg-opacity-50 text-white text-center py-3">
              <span className="text-lg font-bold">SIN EXISTENCIAS</span>
            </div>
          </div>
        )}

        {tieneRebaja(producto) && (
          <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
            -{producto.rebaja}%
          </div>
        )}

        {!agotado && (
          <button
            onClick={agregar}
            className={`hidden md:flex absolute top-2 right-2 w-12 h-12 border rounded-full transition duration-300 shadow-md items-center justify-center ${
              agregado
                ? "bg-green-500 text-white border-green-500 cursor-default"
                : "bg-white text-pink-600 border-pink-600 hover:bg-pink-700 hover:text-white hover:scale-105"
            }`}
            aria-label="Agregar al carrito"
          >
            {agregado ? <CheckIconSvg /> : <IconoCarrito className="w-[26px]" />}
          </button>
        )}
      </div>

      <div className={sinBorde ? "pt-3" : "p-3"}>
        <h3 className="uppercase text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight min-h-[2rem]">
          {producto.nombre}
        </h3>

        <div className="flex items-center gap-2 mb-1">
          <p className="text-base font-bold text-pink-800">{formatearPrecio(producto.precio)}</p>
          {tieneRebaja(producto) && (
            <p className="text-gray-400 line-through text-sm">{formatearPrecio(precioOriginal(producto))}</p>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 leading-snug mb-2">{producto.descripcion}</p>

        {agotado ? (
          <button disabled className="md:hidden w-full py-2 bg-gray-400 text-white text-center text-sm font-medium rounded-lg cursor-not-allowed">
            Sin existencias
          </button>
        ) : (
          <button
            onClick={agregar}
            className={`md:hidden w-full py-2 text-white text-center text-sm font-medium rounded-lg transition duration-200 ${
              agregado ? "bg-green-600" : "bg-pink-700 hover:bg-pink-800"
            }`}
          >
            {agregado ? (
              <span className="flex items-center justify-center">
                <CheckIconSvg className="h-4 w-4 mr-1" />
                Agregado
              </span>
            ) : (
              "Agregar"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export const ProductList = ({ productos, onSelect }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
    {productos.map((producto) => (
      <ProductCard key={producto.id} producto={producto} onSelect={onSelect} />
    ))}
  </div>
);

const Paginacion = ({ paginaActual, totalPaginas, onCambiar }) => {
  const claseFlecha = (deshabilitado) =>
    `px-4 py-2 rounded-lg ${deshabilitado ? "bg-gray-200 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700 text-white"}`;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8 mb-4">
      <button onClick={() => onCambiar(paginaActual - 1)} disabled={paginaActual === 1} className={claseFlecha(paginaActual === 1)}>
        Anterior
      </button>
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onCambiar(num)}
          className={`w-10 h-10 rounded-full ${paginaActual === num ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {num}
        </button>
      ))}
      <button onClick={() => onCambiar(paginaActual + 1)} disabled={paginaActual === totalPaginas} className={claseFlecha(paginaActual === totalPaginas)}>
        Siguiente
      </button>
    </div>
  );
};

const ProductGrid = ({
  fetchFn,
  productos: propProductos,
  loadingMessage = "Cargando productos...",
  searchTerm = "",
  onlyPromos = false,
  showBackButton = true,
  productosPorPagina,
  mensajeVacio = "No encontramos lo que buscas. Prueba con otra palabra.",
}) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(!propProductos);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const gridRef = useRef(null);

  useEffect(() => {
    const filtrarPromos = (data) => (onlyPromos ? data.filter(tieneRebaja) : data);

    if (propProductos) {
      setProductos(filtrarPromos(propProductos));
      setLoading(false);
      return;
    }
    if (!fetchFn) return;
    const cargar = async () => {
      try {
        const data = await fetchFn();
        setProductos(filtrarPromos(data));
      } catch {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [fetchFn, onlyPromos, propProductos]);

  const term = normalizarTexto(searchTerm);
  const productosFiltrados = term
    ? productos.filter((producto) => normalizarTexto(producto.nombre).includes(term))
    : productos;

  const totalPaginas = productosPorPagina ? Math.ceil(productosFiltrados.length / productosPorPagina) : 1;
  const pagina = Math.min(paginaActual, Math.max(totalPaginas, 1));
  const visibles = productosPorPagina
    ? productosFiltrados.slice((pagina - 1) * productosPorPagina, pagina * productosPorPagina)
    : productosFiltrados;

  const cambiarPagina = (pagina) => {
    setPaginaActual(Math.min(Math.max(pagina, 1), totalPaginas));
    if (gridRef.current) {
      const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (loading) return <Cargando mensaje={loadingMessage} />;

  if (error)
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <p className="text-center text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div ref={gridRef} className="w-full max-w-screen-2xl mx-auto px-4 py-8">
      {showBackButton && <BotonVolver />}

      {productosFiltrados.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg sm:text-xl">{mensajeVacio}</p>
        </div>
      ) : (
        <>
          <ProductList productos={visibles} />
          {totalPaginas > 1 && (
            <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} onCambiar={cambiarPagina} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;

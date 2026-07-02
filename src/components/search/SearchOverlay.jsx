import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../solar/CartContext";
import { ProductCard } from "../ProductGrid";
import { cargarProductosDesdeSheets } from "../../database/sheets";

const normalizarTexto = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const slugify = (id, nombre) =>
  `${id}-${normalizarTexto(nombre).replace(/\s+/g, "-").replace(/[^\w-]+/g, "")}`;

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    setSearchTerm("");
    setProductos([]);
    const load = async () => {
      try {
        setLoading(true);
        const data = await cargarProductosDesdeSheets();
        setProductos(data);
      } catch (e) {
        console.error("Error loading products for search:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
    setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtrados = searchTerm.trim()
    ? productos.filter((p) => normalizarTexto(p.nombre).includes(normalizarTexto(searchTerm)))
    : [];

  const handleNavigate = (producto) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(`/${slugify(producto.id, producto.nombre)}`, { state: producto });
    onClose();
  };

  const handleAddToCart = (producto, e) => {
    addToCart({ ...producto, quantity: 1, selectedSize: producto.selectedSize || null });
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
    btn.classList.remove("bg-white", "text-pink-600", "border-pink-600", "hover:bg-pink-700", "hover:text-white");
    btn.classList.add("bg-green-500", "text-white", "border-green-500");
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove("bg-green-500", "text-white", "border-green-500");
      btn.classList.add("bg-white", "text-pink-600", "border-pink-600", "hover:bg-pink-700", "hover:text-white");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-30" role="dialog" aria-modal="true" aria-label="Búsqueda de productos">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div
        className="fixed left-0 right-0 mx-auto w-full max-w-5xl px-3 sm:px-4 animate-slideDown"
        style={{ top: "max(5rem, 10vh)" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-pink-100">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-12 py-3 sm:py-4 text-base sm:text-lg border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all bg-pink-50/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-pink-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all"
                aria-label="Cerrar búsqueda"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 10rem)" }}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-fuchsia-500" />
                <p className="text-gray-500 text-sm">Cargando productos...</p>
              </div>
            ) : searchTerm.trim() && filtrados.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No encontramos lo que buscas</p>
                <p className="text-gray-400 text-sm mt-1">Prueba con otra palabra</p>
              </div>
            ) : searchTerm.trim() ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-3 sm:p-4">
                {filtrados.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    compact
                    onNavigate={handleNavigate}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4">
                <div className="mx-auto w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg">Escribe para buscar productos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

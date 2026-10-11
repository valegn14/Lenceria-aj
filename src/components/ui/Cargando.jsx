// Indicador de carga único para todo el sitio
const Cargando = ({ mensaje = "Cargando productos...", className = "min-h-[50vh]" }) => (
  <div className={`flex items-center justify-center px-4 py-12 ${className}`} role="status">
    <div className="text-center">
      <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
      <p className="text-base sm:text-lg text-gray-600">{mensaje}</p>
    </div>
  </div>
);

export default Cargando;

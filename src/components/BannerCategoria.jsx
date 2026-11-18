/* eslint-disable react/prop-types */
import DecorativeHearts from "./DecorativeHearts";

// Filtros de color sobre la imagen del banner
const FILTROS_BANNER = {
  rosa: "bg-gradient-to-t from-[#D98FA5]/70 via-[#E8B8C6]/30 to-transparent",
  azul: "bg-gradient-to-t from-blue-900/70 via-blue-700/45 to-sky-500/35",
};

// Banner a todo el ancho, pegado al header: alto en la página principal de una categoría
// y más bajo (compacto) en las subcategorías, para que los productos aparezcan antes.
// Mientras no hay imagen (por ejemplo, cargando) se ve un fondo rosado.
const BannerCategoria = ({ imagen, titulo, descripcion, compacto = false, filtro = "rosa" }) => (
  <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
    <DecorativeHearts fixed={false} count={36} />
    <div className={`relative w-full overflow-hidden bg-pink-200 shadow-xl ${compacto ? "h-28 sm:h-36 md:h-40 lg:h-48" : "h-40 sm:h-56 md:h-72 lg:h-96"}`}>
      {imagen && (
        <img
          src={imagen}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 min-w-full"
        />
      )}
      <div className={`absolute inset-0 ${FILTROS_BANNER[filtro] || FILTROS_BANNER.rosa}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className={`font-semibold text-white drop-shadow-lg ${compacto ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
            {titulo}
          </h1>
          {descripcion && (
            <p className={`text-sm sm:text-base text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] ${compacto ? "mt-1" : "mt-2"}`}>{descripcion}</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default BannerCategoria;

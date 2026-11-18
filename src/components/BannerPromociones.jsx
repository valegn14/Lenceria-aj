/* eslint-disable react/prop-types */
import DecorativeHearts from "./DecorativeHearts";

// Mínimo de fotos por copia de la franja, para que siempre cubra todo el ancho de la pantalla
const MIN_FOTOS = 10;
// Segundos que tarda cada foto en pasar (controla la velocidad del carrusel)
const SEGUNDOS_POR_FOTO = 4;

// Repite las fotos hasta llegar a MIN_FOTOS (por si hay pocas promociones)
const completarFotos = (imagenes) => {
  if (!imagenes.length) return [];
  const fotos = [];
  while (fotos.length < MIN_FOTOS) fotos.push(...imagenes);
  return fotos;
};

// Banner a todo el ancho, pegado al header, con las fotos de los productos en promoción
// deslizándose solas hacia la izquierda. Se detiene al pasar el mouse y no se mueve si el
// usuario pidió reducir el movimiento en su sistema.
const BannerPromociones = ({ imagenes = [], titulo, descripcion }) => {
  const fotos = completarFotos(imagenes);

  return (
    <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <DecorativeHearts fixed={false} count={36} />
      <div className="group relative h-36 w-full overflow-hidden bg-pink-200 shadow-xl sm:h-48 md:h-56 lg:h-64">
        {fotos.length > 0 && (
          <div
            aria-hidden="true"
            className="flex h-full w-max animate-deslizarCarrusel group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: `${fotos.length * SEGUNDOS_POR_FOTO}s` }}
          >
            {/* Dos copias seguidas de las fotos para que el movimiento no tenga fin */}
            {[...fotos, ...fotos].map((src, i) => (
              <div key={i} className="h-full w-[50vw] shrink-0 px-0.5 sm:w-[33.333vw] md:w-[25vw] lg:w-[20vw]">
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {/* Filtro rosado más fuerte en el centro para que el título resalte sobre las fotos */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D98FA5]/80 via-[#E8B8C6]/40 to-pink-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(131,24,67,0.45),transparent_65%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center px-4 text-center">
            <h1 className="text-4xl font-extrabold uppercase tracking-[0.12em] text-white drop-shadow-[0_3px_10px_rgba(131,24,67,0.75)] sm:text-5xl md:text-6xl lg:text-7xl">
              {titulo}
            </h1>
            {descripcion && (
              <p className="mt-1 text-sm font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] sm:mt-2 sm:text-base">
                {descripcion}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPromociones;

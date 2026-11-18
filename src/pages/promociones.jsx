import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import BannerPromociones from "../components/BannerPromociones";
import BotonVolver from "../components/ui/BotonVolver";
import Cargando from "../components/ui/Cargando";
import { cargarPromocionesDesdeSheets } from "../database/sheets";

// Fotos del carrusel del banner: las de las promociones con imagen, de mayor a menor descuento
const imagenesBanner = (promos) =>
  promos
    .filter((producto) => producto.imagen)
    .sort((a, b) => (Number(b.rebaja) || 0) - (Number(a.rebaja) || 0))
    .map((producto) => producto.imagen);

const descripcionBanner = (promos) => {
  if (!promos.length) return "";
  const maxima = Math.max(...promos.map((producto) => Number(producto.rebaja) || 0));
  return `Hasta ${maxima}% OFF`;
};

const Promociones = () => {
  const [promos, setPromos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let vigente = true;
    cargarPromocionesDesdeSheets()
      .then((data) => vigente && setPromos(data))
      .catch((error) => console.error("Error al cargar promociones:", error))
      .finally(() => vigente && setCargando(false));
    return () => {
      vigente = false;
    };
  }, []);

  const imagenes = useMemo(() => imagenesBanner(promos), [promos]);

  return (
    <>
      {/* Banner pegado al header, como en lencería, con un carrusel de las fotos en promoción */}
      <BannerPromociones imagenes={imagenes} titulo="Promociones" descripcion={descripcionBanner(promos)} />

      <div className="min-h-screen bg-white px-4 pt-6 pb-8 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <BotonVolver to="/" texto="Volver al inicio" className="" />

          {cargando ? (
            <Cargando mensaje="Cargando promociones..." />
          ) : promos.length === 0 ? (
            <p className="py-16 text-center text-lg text-gray-500 sm:text-xl">
              No hay promociones activas en este momento.
            </p>
          ) : (
            <ProductGrid productos={promos} showBackButton={false} estiloOferta />
          )}
        </div>
      </div>
    </>
  );
};

export default Promociones;

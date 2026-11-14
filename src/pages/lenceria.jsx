/* eslint-disable react/prop-types */
import { cargarLenceriaDesdeSheets, cargarLenceriaHombreDesdeSheets } from "../database/sheets";
import PaginaSubcategorias from "../components/PaginaSubcategorias";
import { LENCERIA_SUBCATEGORIAS } from "../data/categorias";
import { opcionesDesdeHojas } from "../utils/subcategorias";

// A nivel de módulo para que fetchFn no cambie en cada render
const OPCIONES = [
  {
    nombre: "Lencería mujer",
    ruta: "/lenceria/mujer",
    titulo: "Lencería para Mujer",
    descripcion: "Explora la colección femenina con la calidad y estilo que conoces.",
    fetchFn: cargarLenceriaDesdeSheets,
    loadingMessage: "Descubriendo lencería femenina...",
  },
  {
    nombre: "Lencería hombre",
    ruta: "/lenceria/hombre",
    titulo: "Lencería para Hombre",
    descripcion: "Encuentra prendas masculinas diseñadas para comodidad y estilo.",
    fetchFn: cargarLenceriaHombreDesdeSheets,
    loadingMessage: "Descubriendo lencería masculina...",
    filtro: "azul",
  },
  ...opcionesDesdeHojas(LENCERIA_SUBCATEGORIAS),
];

const LANDING = {
  titulo: "Lencería",
  descripcion: "Explora nuestra selección de lencería femenina y masculina.",
  slug: "mujer",
};

const Lenceria = ({ onlyPromos, productos, searchTerm }) => (
  <PaginaSubcategorias
    imagen="/bannerlenceria.png"
    etiqueta="lencería"
    landing={LANDING}
    opciones={OPCIONES}
    productos={productos}
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
  />
);

export default Lenceria;

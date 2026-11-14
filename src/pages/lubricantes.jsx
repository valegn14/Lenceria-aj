/* eslint-disable react/prop-types */
import { cargarLubricantesDesdeSheets } from "../database/sheets";
import PaginaSubcategorias from "../components/PaginaSubcategorias";
import { CATEGORIAS, LUBRICANTES_SUBCATEGORIAS } from "../data/categorias";
import { opcionesDesdeHojas } from "../utils/subcategorias";

// A nivel de módulo para que fetchFn no cambie en cada render
const OPCIONES = [
  {
    nombre: "Todos los lubricantes",
    ruta: "/lubricantes",
    titulo: "Lubricantes",
    descripcion: "Explora toda nuestra colección de lubricantes.",
    fetchFn: cargarLubricantesDesdeSheets,
    loadingMessage: "Descubriendo tus placeres...",
  },
  ...opcionesDesdeHojas(LUBRICANTES_SUBCATEGORIAS),
];

const LANDING = {
  titulo: "Lubricantes",
  descripcion: "Explora nuestra selección de lubricantes.",
  slug: "lubricantes",
};

const IMAGEN = CATEGORIAS.find((cat) => cat.key === "lubricantes")?.imagen;

const Lubricantes = ({ onlyPromos, productos, searchTerm }) => (
  <PaginaSubcategorias
    imagen={IMAGEN}
    etiqueta="lubricantes"
    landing={LANDING}
    opciones={OPCIONES}
    productos={productos}
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
  />
);

export default Lubricantes;

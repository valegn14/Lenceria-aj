/* eslint-disable react/prop-types */
import { cargarJuguetesDesdeSheets } from "../database/sheets";
import PaginaSubcategorias from "../components/PaginaSubcategorias";
import { CATEGORIAS, JUGUETES_SUBCATEGORIAS } from "../data/categorias";
import { opcionesDesdeHojas } from "../utils/subcategorias";

// A nivel de módulo para que fetchFn no cambie en cada render
const OPCIONES = [
  {
    nombre: "Todos los juguetes",
    ruta: "/juguetes",
    titulo: "Juguetes",
    descripcion: "Explora toda nuestra colección de juguetes.",
    fetchFn: cargarJuguetesDesdeSheets,
    loadingMessage: "Descubriendo tus placeres...",
  },
  ...opcionesDesdeHojas(JUGUETES_SUBCATEGORIAS),
];

const LANDING = {
  titulo: "Juguetes",
  descripcion: "Explora nuestra selección de juguetes.",
  slug: "juguetes",
};

const IMAGEN = CATEGORIAS.find((cat) => cat.key === "juguetes")?.imagen;

const Juguetes = ({ onlyPromos, productos, searchTerm }) => (
  <PaginaSubcategorias
    imagen={IMAGEN}
    etiqueta="juguetes"
    landing={LANDING}
    opciones={OPCIONES}
    productos={productos}
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
  />
);

export default Juguetes;

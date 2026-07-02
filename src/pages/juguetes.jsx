import { cargarJuguetesDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Juguetes = ({ onlyPromos, productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarJuguetesDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo tus placeres..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Juguetes;

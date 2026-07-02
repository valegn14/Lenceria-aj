import { cargarSuplementosDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Suplementos = ({ onlyPromos, productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarSuplementosDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo suplementos..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Suplementos;

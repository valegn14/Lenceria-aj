import { cargarLenceriaDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Lenceria = ({ onlyPromos, productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarLenceriaDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo tu mejor versión..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Lenceria;

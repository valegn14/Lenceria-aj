import { cargarHigieneDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Higiene = ({ onlyPromos, productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarHigieneDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo productos de higiene..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Higiene;

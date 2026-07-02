import { cargarProductosDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const FiltroInicio = ({ onlyPromos, productos, searchTerm }) => (
  <ProductGrid
    fetchFn={cargarProductosDesdeSheets}
    productos={productos}
    loadingMessage="cargando todos los productos..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    compact
    showBackButton={false}
  />
);

export default FiltroInicio;

import { cargarBronceadoresDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const BronceadoresPage = ({ onlyPromos, productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarBronceadoresDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo Bronceadores..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default BronceadoresPage;

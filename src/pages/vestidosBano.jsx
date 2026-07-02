import { cargarVestidosBanoDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const VestidosBano = ({ onlyPromos, productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarVestidosBanoDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo vestidos de baño..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default VestidosBano;

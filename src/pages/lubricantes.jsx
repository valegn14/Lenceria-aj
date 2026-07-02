import { cargarLubricantesDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Lubricantes = ({ onlyPromos, productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarLubricantesDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo tus placeres..."
    searchTerm={searchTerm}
    onlyPromos={onlyPromos}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Lubricantes;

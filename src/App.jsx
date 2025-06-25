import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Promociones from "./pages/promociones";
import Inicio from "./pages/inicio";
import Juega from "./pages/juega";
import Juguetes from "./pages/juguetes";
import Lenceria from "./pages/lenceria";
import Lubricantes from "./pages/lubricantes";

// import Overview from "./pages/OverView";
import Contacto from "./pages/contacto";
import Combos from "./pages/Combos";
// import Card from "./components/Bin/Card";
// import Card from "./database/cards";
import DetalleProducto from "./database/DetalleProducto"; // ajusta según tu estructura
import { CartProvider } from './components/solar/CartContext';
//import CsvToJsonAndTableWithAdvancedFilters from "./components/table/CsvToJsonAndTableWithFilters";

function App() {
  return (
    <div className="italic">
      <CartProvider>
      <Router>
        <Layout className="flex-grow  flex-col min-h-screen ">
          <Routes>

            <Route path="/promociones" element={<Promociones />} />
            <Route path="/contacto" element={<Contacto />} />
                        <Route path="/Juega" element={<Juega />} />
            <Route path="/Combos" element={<Combos />} />
            <Route path="/juguetes" element={<Juguetes />} />
            <Route path="/lenceria" element={<Lenceria />} />
            <Route path="/lubricantes" element={<Lubricantes />} />


            {/* //aqui se muestran los productos */}
            {/* <Route path="/" element={<Card/>} />   */}
            <Route path="/" element={<Inicio />} />  

            <Route path="/:slug" element={<DetalleProducto />} />
          </Routes>    
        </Layout>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;

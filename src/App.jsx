import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Promociones from "./pages/promociones";
import Inicio from "./pages/inicio";

// import Overview from "./pages/OverView";
import Contacto from "./pages/contacto";
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
        <Layout className="flex-grow bg-red-500 flex-col min-h-screen">
          <Routes>

            <Route path="/promociones" element={<Promociones />} />
            <Route path="/contacto" element={<Contacto />} />
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

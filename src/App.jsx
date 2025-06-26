// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Promociones from "./pages/promociones";
import Inicio from "./pages/inicio";
import Juega from "./pages/juega";
import Juguetes from "./pages/juguetes";
import Lenceria from "./pages/lenceria";
import Lubricantes from "./pages/lubricantes";
import Contacto from "./pages/contacto";
import Combos from "./pages/Combos";
import DetalleProducto from "./database/DetalleProducto";
import { CartProvider } from './components/solar/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/Juega" element={<Juega />} />
            <Route path="/Combos" element={<Combos />} />
            <Route path="/juguetes" element={<Juguetes />} />
            <Route path="/lenceria" element={<Lenceria />} />
            <Route path="/lubricantes" element={<Lubricantes />} />
            <Route path="/:slug" element={<DetalleProducto />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;

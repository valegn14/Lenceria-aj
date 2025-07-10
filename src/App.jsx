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
import Domicilio from "./pages/domicilio";
import ScrollToTop from "./pages/ScrollToTop";
function App() {
  return (
    <CartProvider>
      <Router>
              <ScrollToTop />

        <Routes>
          <Route path="/" element={<Layout><Inicio /></Layout>} />
          <Route path="/promociones" element={<Layout><Promociones /></Layout>} />
          <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
          <Route path="/juega" element={<Layout><Juega /></Layout>} />
          <Route path="/combos" element={<Layout><Combos /></Layout>} />
          <Route path="/juguetes" element={<Layout><Juguetes /></Layout>} />
          <Route path="/lenceria" element={<Layout><Lenceria /></Layout>} />
          <Route path="/lubricantes" element={<Layout><Lubricantes /></Layout>} />
          <Route path="/domicilio" element={<Layout><Domicilio /></Layout>} />
          <Route path="/:slug" element={<Layout><DetalleProducto /></Layout>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

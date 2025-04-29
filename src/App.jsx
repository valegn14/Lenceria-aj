import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import  Dashboard  from "./components/dashboard/Dashboard";
// import Overview from "./pages/OverView";
import Calculator from "./pages/Calculator";
// import Card from "./components/Bin/Card";
import Card from "./database/cards";
import DetalleProducto from "./database/DetalleProducto"; // ajusta según tu estructura
import { CartProvider } from './components/solar/CartContext';


import CsvToJsonAndTableWithAdvancedFilters from "./components/table/CsvToJsonAndTableWithFilters";

function App() {
  return (
    <div className="italic">
      <CartProvider>
      <Router>
        <Layout className="flex-grow flex-col min-h-screen">
          <Routes>
            {/* <Route path="/table" element={<CsvToJsonAndTableWithAdvancedFilters />} /> */}
            {/* <Route path="/" element={<Overview />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            {/* //aqui se muestran los productos */}
            <Route path="/" element={<Card/>} />  
            <Route path="/:slug" element={<DetalleProducto />} />

          </Routes>
         
        </Layout>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;

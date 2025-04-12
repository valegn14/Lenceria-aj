import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import  Dashboard  from "./components/dashboard/Dashboard";
import Overview from "./pages/OverView";
import Calculator from "./pages/Calculator";
// import Card from "./components/Bin/Card";
import Card from "./database/cards";


import CsvToJsonAndTableWithAdvancedFilters from "./components/table/CsvToJsonAndTableWithFilters";

function App() {
  return (
    <div className="italic">
      <Router>
        <Layout className="flex-grow flex-col min-h-screen">
          <Routes>
            <Route path="/table" element={<CsvToJsonAndTableWithAdvancedFilters />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/" element={<Card/>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

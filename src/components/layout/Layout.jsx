import Footer2 from "./Footer2";
import Header2 from "./Header2";
// import Anuncio from "./Anuncio";

import { useLocation } from "react-router-dom";
export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen ">
     
      <Header2 />
      {/* <Anuncio /> */}



      
      <main className="flex-grow bg-main-bg bg-cover bg-center bg-pink-100 bg-no-repeat m-0 p-0 ">
        {children}
      </main>

      <Footer2 />
    </div>
  );
}

    {/* Div que estará siempre en el DOM, pero visible solo en "/" */}
      {/* <div
        id="content"
        style={{
          display: location.pathname === "/" ? "block" : "none",
          padding: "20px",
        }}
      ></div> */}
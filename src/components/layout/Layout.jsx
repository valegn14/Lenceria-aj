// Layout.jsx
import Footer2 from "./Footer2"; 
import Header2 from "./Header2";
// import HeaderMini from "./HeaderMini";

import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />
      {/* Main crece para llenar el espacio y es relativo */}
      <main className="flex-grow relative bg-main-bg bg-cover bg-center bg-no-repeat m-0 p-0">
        {/* Este div ocupa todo el espacio de main y es relativo para que overlays absolutos hijos lo cubran */}
        <div className="relative w-full h-full">
          {children}
        </div>
      </main>
      <Footer2 />
    </div>
  );
}


// import Footer2 from "./Footer2";
// import Header2 from "./Header2";
// // import Anuncio from "./Anuncio";

// import { useLocation } from "react-router-dom";
// export default function Layout({ children }) {
//   const location = useLocation();

//   return (
//     <div className="flex flex-col min-h-screen ">
     
//       <Header2 />
//       {/* <Anuncio /> */}



      
//       <main className="flex-grow bg-main-bg bg-cover bg-center bg-red-600 bg-no-repeat m-0 p-0 ">
//         {children}
//       </main>

//       <Footer2 />
//     </div>
//   );
// }


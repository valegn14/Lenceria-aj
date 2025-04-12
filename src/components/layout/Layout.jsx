// import React from "react";

// const WhatsAppButton = () => {
//   const phoneNumber = "1234567890"; // Reemplázalo con el número de teléfono de destino
//   const message = "¡Hola! Quiero más información sobre tus productos"; // Mensaje que se preescribe

//   const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//   return (
//     <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
//       <button
//         style={{
//           position: "fixed",
//           bottom: "20px", // Asegúrate de ajustar la posición según tu preferencia
//           right: "20px",
//           padding: "15px 20px",
//           backgroundColor: "#25D366",
//           color: "white",
//           border: "none",
//           borderRadius: "50%",
//           fontSize: "20px",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//           cursor: "pointer",
//           zIndex: 1000, // Asegura que se muestre por encima de otros elementos
//         }}
//       >
//         <i className="fa fa-whatsapp"></i> {/* Puedes usar un ícono de WhatsApp */}
//       </button>
//     </a>
//   );
// };

// export default WhatsAppButton;



import Footer2 from "./Footer2";
import Header2 from "./Header2";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />

      {/* Div que estará siempre en el DOM, pero visible solo en "/" */}
      <div
        id="content"
        style={{
          display: location.pathname === "/" ? "block" : "none",
          padding: "20px",
        }}
      ></div>

      <main className="flex-grow h-full bg-main-bg bg-cover bg-center bg-no-repeat m-0 p-0">
        {children}
      </main>

      <Footer2 />
    </div>
  );
}

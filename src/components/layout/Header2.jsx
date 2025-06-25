import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SolarOverview from "../solar/SolarOverview";
import logo from "/public/logo_lenceria.png";

function Brand() {
  return (
    <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
      <img
        src={logo}
        alt="Logo Lencería AJ"
        className="w-14 h-12 sm:w-16 sm:h-14 md:w-20 md:h-16 transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
      />
      <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-pink-600 hover:text-pink-900 transition-colors">
        LENCERÍA AJ
      </h1>
    </Link>
  );
}

const MenuIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7 text-pink-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    {isOpen ? (
      <path d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path d="M3 12h18M3 6h18M3 18h18" />
    )}
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-pink-600 hover:text-pink-800 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
    />
  </svg>
);

const menuLinks = [
  { to: "/Juega", label: "Juega", icon: "🎲" },
  { to: "/Promociones", label: "Promociones", icon: "🎁" },
  { to: "/Combos", label: "Combos", icon: "🔥" },
  { to: "/lenceria", label: "Lencería", icon: "👙" },
  { to: "/juguetes", label: "Juguetes", icon: "🎀" },
  { to: "/lubricantes", label: "Lubricantes", icon: "💧" },
];

function SideMenu({ isOpen, onClose, onCartClick }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed top-0 left-0 h-full w-72 sm:w-80 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 ease-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="p-4 border-b border-pink-200 flex justify-between items-center">
          <Brand />
          <button
            onClick={onClose}
            className="p-2 text-pink-600 hover:text-pink-800"
            aria-label="Cerrar menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="py-4 px-3 text-gray-700 max-h-[calc(100vh-120px)] overflow-y-auto">
          {menuLinks.map(({ to, label, icon }) => (
            <li key={label}>
              <Link
                to={to}
                onClick={onClose}
                className="flex items-center py-3 px-4 hover:bg-pink-100 rounded-lg transition-colors group"
              >
                <span className="text-xl mr-3 group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                <span className="font-medium tracking-wider group-hover:text-pink-700">
                  {label}
                </span>
              </Link>
            </li>
          ))}

          <li className="mt-6 border-t border-pink-200 pt-4">
            <button
              onClick={() => {
                onCartClick();
                onClose();
              }}
              className="flex items-center w-full py-3 px-4 hover:bg-pink-100 rounded-lg transition-colors group"
            >
              <span className="text-xl mr-3 group-hover:scale-110 transition-transform">
                🛒
              </span>
              <span className="font-medium tracking-wider group-hover:text-pink-700">
                Carrito
              </span>
              <span className="ml-auto bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </li>
        </ul>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="text-center text-xs text-gray-500 italic">
            Descubre tu placer interior
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md py-6"
            : "bg-gradient-to-r from-pink-50 to-purple-50 py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            className="focus:outline-none p-2"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>

          <div className="flex-1 flex justify-center">
            <Brand />
          </div>

          <button
            onClick={() => setShowCart(true)}
            aria-label="Abrir carrito"
            className="p-2 relative"
          >
            <CartIcon />
            <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </header>

      {/* Espaciado ajustado por header más alto */}
      <div className="pt-32"></div>

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onCartClick={() => setShowCart(true)}
      />

      {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
    </>
  );
}
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SolarOverview from "../solar/SolarOverview";
// import logo from "/public/logo_lenceria.png";

// function Brand() {
//   return (
//     <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
//       <img
//         src={logo}
//         alt="Logo Lencería AJ"
//         className="w-10 h-8 sm:w-12 sm:h-10 md:w-14 md:h-12 transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
//       />
//       <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-pink-600 hover:text-pink-900 transition-colors">
//         LENCERÍA AJ
//       </h1>
//     </Link>
//   );
// }

// // Icono de menú sensual
// const MenuIcon = ({ isOpen }) => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     className="w-6 h-6 text-pink-600"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//   >
//     {isOpen ? (
//       <path d="M6 18L18 6M6 6l12 12" />
//     ) : (
//       <path d="M3 12h18M3 6h18M3 18h18" />
//     )}
//   </svg>
// );

// // Icono de carrito sensual
// const CartIcon = () => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     className="w-5 h-5 text-pink-600 hover:text-pink-800 transition-colors"
//     fill="none" 
//     viewBox="0 0 24 24" 
//     stroke="currentColor"
//     strokeWidth="1.8"
//   >
//     <path 
//       strokeLinecap="round" 
//       strokeLinejoin="round" 
//       d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" 
//     />
//   </svg>
// );

// const menuLinks = [
//   { to: "/Juega", label: "Juega", icon: "🎲" },
//   { to: "/Promociones", label: "Promociones", icon: "🎁" },
//   { to: "/Combos", label: "Combos", icon: "🔥" },
//   { to: "/categoria/lenceria", label: "Lencería", icon: "👙" },
//   { to: "/categoria/juguetes", label: "Juguetes", icon: "🎀" },
//   { to: "/categoria/lubricantes", label: "Lubricantes", icon: "💧" }
// ];

// // Menú lateral sensual para todos los dispositivos
// function SideMenu({ isOpen, onClose, onCartClick }) {
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape" && isOpen) onClose();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-40">
//       {/* Fondo semitransparente */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       {/* Menú lateral sensual */}
//       <div 
//         className="fixed top-0 left-0 h-full w-72 sm:w-80 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 ease-out"
//         style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
//       >
//         <div className="p-4 border-b border-pink-200 flex justify-between items-center">
//           <Brand />
//           <button 
//             onClick={onClose}
//             className="p-2 text-pink-600 hover:text-pink-800"
//             aria-label="Cerrar menú"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         <ul className="py-4 px-3 text-gray-700 max-h-[calc(100vh-120px)] overflow-y-auto">
//           {menuLinks.map(({ to, label, icon }) => (
//             <li key={label}>
//               <Link
//                 to={to}
//                 onClick={onClose}
//                 className="flex items-center py-3 px-4 hover:bg-pink-100 rounded-lg transition-colors group"
//               >
//                 <span className="text-xl mr-3 group-hover:scale-110 transition-transform">{icon}</span>
//                 <span className="font-medium tracking-wider group-hover:text-pink-700">{label}</span>
//               </Link>
//             </li>
//           ))}
          
//           <li className="mt-6 border-t border-pink-200 pt-4">
//             <button
//               onClick={() => { onCartClick(); onClose(); }}
//               className="flex items-center w-full py-3 px-4 hover:bg-pink-100 rounded-lg transition-colors group"
//             >
//               <span className="text-xl mr-3 group-hover:scale-110 transition-transform">🛒</span>
//               <span className="font-medium tracking-wider group-hover:text-pink-700">Carrito</span>
//               <span className="ml-auto bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 0
//               </span>
//             </button>
//           </li>
//         </ul>
        
//         <div className="absolute bottom-4 left-0 w-full px-4">
//           <div className="text-center text-xs text-gray-500 italic">
//             Descubre tu placer interior
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Header principal con diseño sensual y responsive
// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
//         scrolled 
//           ? 'bg-white/95 backdrop-blur-sm shadow-md py-4' 
//           : 'bg-gradient-to-r from-pink-50 to-purple-50 py-5 sm:py-4'
//       }`}>
//         <div className="container mx-auto px-4 flex items-center justify-between">
//           {/* Botón de menú hamburguesa - visible en todos los dispositivos */}
//           <button
//             className="focus:outline-none p-2"
//             aria-label="Abrir menú"
//             aria-expanded={isMenuOpen}
//             onClick={() => setIsMenuOpen(true)}
//           >
//             <MenuIcon isOpen={isMenuOpen} />
//           </button>
          
//           {/* Logo - centrado */}
//           <div className="flex-1 flex justify-center">
//             <Brand />
//           </div>
          
//           {/* Carrito */}
//           <button
//             onClick={() => setShowCart(true)}
//             aria-label="Abrir carrito"
//             className="p-2 relative"
//           >
//             <CartIcon />
//             <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               0
//             </span>
//           </button>
//         </div>
//       </header>

//       {/* Espacio para el contenido debajo del header */}
//       <div className="pt-20 md:pt-24"></div>

//       {/* Menú lateral para todos los dispositivos */}
//       <SideMenu
//         isOpen={isMenuOpen}
//         onClose={() => setIsMenuOpen(false)}
//         onCartClick={() => setShowCart(true)}
//       />

//       {/* Carrito */}
//       {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
//     </>
//   );
// }

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SolarOverview from "../solar/carrito";
import logo from "/public/logo_lenceria.png";
import { useCart } from "../solar/CartContext";

import IconJ from "./juguete.png";
import IconV from './ubicacion.png';
import IconPromo from './promo.png';
import IconCombos from './combo.png';
import IconLenceria from './lenceria.png';
import IconLubricantes from './lubricante.png';
import IconCart from './carrito.png';

function Brand() {
  return (
    <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
      <img
        src={logo}
        alt="Logo Lencería AJ"
        className="w-12 h-10 sm:w-14 sm:h-12 md:w-16 md:h-14 transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
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
    className="w-8 h-8 text-pink-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    {isOpen ? (
      <path d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path d="M3 12h18M3 6h18M3 18h18" />
    )}
  </svg>
);

const SearchIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 text-pink-600 hover:text-pink-800 rounded-full transition-colors"
    aria-label="Buscar"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </button>
);

const CartIcon = ({ itemCount }) => (
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7 text-pink-600 hover:text-pink-800 transition-colors"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
      />
    </svg>
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold ">
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    )}
  </div>
);

const menuLinks = [
  { to: "/juguetes", label: "Juguetes", icon: IconJ },
  { to: "/lubricantes", label: "Lubricantes", icon: IconLubricantes },
  { to: "/lenceria", label: "Lencería", icon: IconLenceria },
  { to: "/Promociones", label: "Promociones", icon: IconPromo },
  { to: "/Combos", label: "Combos", icon: IconCombos }
  // ,
  // { to: "/Visitanos", label: "Visitanos", icon: IconV },
];

function SideMenu({ isOpen, onClose, onCartClick, cartCount }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className="fixed top-0 left-0 h-full w-80 sm:w-96 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="p-6 border-b border-pink-200 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0">
          <Brand />
          <button
            onClick={onClose}
            className="p-2 text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-full transition-colors"
            aria-label="Cerrar menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="py-6 px-4 text-gray-700">
          {menuLinks.map(({ to, label, icon }) => (
            <li key={label} className="mb-2">
              <Link
                to={to}
                onClick={onClose}
                className="flex items-center py-4 px-4 hover:bg-pink-100 rounded-xl transition-all duration-200 group"
              >
                <img
                  src={icon}
                  alt={label}
                  className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform"
                />

                <span className="font-medium text-lg tracking-wider group-hover:text-pink-700">
                  {label}
                </span>
              </Link>
            </li>
          ))}

          <li className="mt-8 border-t border-pink-200 pt-6">
            <button
              onClick={() => {
                onCartClick();
                onClose();
              }}
              className="flex items-center w-full py-4 px-4 hover:bg-pink-100 rounded-xl transition-all duration-200 group"
            >
              <img
                src={IconCart}
                alt="Carrito"
                className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform"
              />

              <span className="font-medium text-lg tracking-wider group-hover:text-pink-700 flex-1 text-left">
                Carrito
              </span>
              {cartCount > 0 && (
                <span className="bg-pink-500 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Header({ setSearchTerm, setShowMobileSearch }) {
  const [page, setpage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-r from-pink-50 to-purple-50 py-3 md:py-4"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Menú button - visible solo en móviles */}
            <button
              className="md:hidden focus:outline-none p-2 hover:bg-pink-100 rounded-full transition-colors"
              aria-label="Abrir menú"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>

            {/* Logo y enlaces agrupados */}
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0">
                <Brand />
              </div>

              {/* Enlaces de navegación - solo en PC */}
              <nav className="hidden md:flex items-center md:ml-16"> {/* Reducido margen izquierdo */}
                <ul className="flex space-x-9"> {/* Aumentado espacio entre enlaces */}
                  {menuLinks
                    .filter(link => link.label !== "Visitanos")
                    .map(({ to, label }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="text-pink-600 hover:text-pink-800 font-medium text-sm uppercase tracking-wider transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
            {/* ----------------------------------------------------------------------------- */}
            {/* buscador */}
            {page && (
              <div className="hidden lg:block  py-2 ">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full p-3 border border-pink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* Search icon - mobile */}
              <div>
                <SearchIcon onClick={() => {
                  setpage(!page);
                  setShowMobileSearch(page);
                }} />
              </div>

              {/* Cart button */}
              <button
                onClick={() => setShowCart(true)}
                aria-label="Abrir carrito"
                className="p-2 hover:bg-pink-100 rounded-full transition-colors"
              >
                <CartIcon itemCount={cartCount} />
              </button>
            </div>
          </div>
          {/* Mobile search - aparece al hacer click en la lupa */}
          {page && (
            <div className="md:hidden py-2">
              <input
                type="text"
                placeholder="🔍 Buscar productos..."
                className="w-full p-3 border border-pink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}
        </div>
      </header>

      {/*  Spacer for fixed header */}
      <div className={`h-16 ${page ? 'md:h-16' : 'md:h-20'} ${scrolled ? '!md:h-16' : ''}`}></div>

      {/* Side Menu */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onCartClick={() => setShowCart(true)}
        cartCount={cartCount}
      />

      {/* Cart */}
      {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
    </>
  );
}


// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SolarOverview from "../solar/SolarOverview";
// import logo from "/public/logo_lenceria.png";
// import { useCart } from "../solar/CartContext";
// import IconJ from "./juguete.png";
// import IconV from './ubicacion.png';
// import IconPromo from './promo.png';
// import IconCombos from './combo.png';
// import IconLenceria from './lenceria.png';
// import IconLubricantes from './lubricante.png';
// import IconCart from './carrito.png';


// function Brand() {
//   return (
//     <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
//       <img
//         src={logo}
//         alt="Logo Lencería AJ"
//         className="w-12 h-10 sm:w-14 sm:h-12 md:w-16 md:h-14 transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
//       />
//       <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-pink-600 hover:text-pink-900 transition-colors">
//         LENCERÍA AJ
//       </h1>
//     </Link>
//   );
// }

// const MenuIcon = ({ isOpen }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-8 h-8 text-pink-600"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//   >
//     {isOpen ? (
//       <path d="M6 18L18 6M6 6l12 12" />
//     ) : (
//       <path d="M3 12h18M3 6h18M3 18h18" />
//     )}
//   </svg>
// );

// const SearchIcon = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="p-2 text-pink-600 hover:text-pink-800 rounded-full transition-colors"
//     aria-label="Buscar"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-6 h-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//       />
//     </svg>
//   </button>
// );

// const CartIcon = ({ itemCount }) => (
//   <div className="relative">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-7 h-7 text-pink-600 hover:text-pink-800 transition-colors"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
//       />
//     </svg>
//     {itemCount > 0 && (
//       <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold ">
//         {itemCount > 99 ? '99+' : itemCount}
//       </span>
//     )}
//   </div>
// );

// const menuLinks = [
//     { to: "/juguetes", label: "Juguetes", icon: IconJ },
//   { to: "/lubricantes", label: "Lubricantes", icon: IconLubricantes },
//   { to: "/lenceria", label: "Lencería", icon: IconLenceria },
//   { to: "/Promociones", label: "Promociones", icon: IconPromo },
//   { to: "/Combos", label: "Combos", icon: IconCombos },
//   { to: "/Visitanos", label: "Visitanos", icon: IconV },
// ];


// function SideMenu({ isOpen, onClose, onCartClick, cartCount }) {
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape" && isOpen) onClose();
//     };

//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     window.addEventListener("keydown", handleKey);
//     return () => {
//       window.removeEventListener("keydown", handleKey);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       <div
//         className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
//         onClick={onClose}
//       />
//       <div
//         className="fixed top-0 left-0 h-full w-80 sm:w-96 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto"
//         style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
//       >
//         <div className="p-6 border-b border-pink-200 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0">
//           <Brand />
//           <button
//             onClick={onClose}
//             className="p-2 text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-full transition-colors"
//             aria-label="Cerrar menú"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <ul className="py-6 px-4 text-gray-700">
//           {menuLinks.map(({ to, label, icon }) => (
//             <li key={label} className="mb-2">
//               <Link
//                 to={to}
//                 onClick={onClose}
//                 className="flex items-center py-4 px-4 hover:bg-pink-100 rounded-xl transition-all duration-200 group"
//               >
//                <img
//   src={icon}
//   alt={label}
//   className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform"
// />

//                 <span className="font-medium text-lg tracking-wider group-hover:text-pink-700">
//                   {label}
//                 </span>
//               </Link>
//             </li>
//           ))}

//           <li className="mt-8 border-t border-pink-200 pt-6">
//             <button
//               onClick={() => {
//                 onCartClick();
//                 onClose();
//               }}
//               className="flex items-center w-full py-4 px-4 hover:bg-pink-100 rounded-xl transition-all duration-200 group"
//             >
//              <img
//   src={IconCart}
//   alt="Carrito"
//   className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform"
// />

//               <span className="font-medium text-lg tracking-wider group-hover:text-pink-700 flex-1 text-left">
//                 Carrito
//               </span>
//               {cartCount > 0 && (
//                 <span className="bg-pink-500 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center font-bold">
//                   {cartCount > 99 ? '99+' : cartCount}
//                 </span>
//               )}
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default function Header({ setSearchTerm }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const { cartItems } = useCart();
//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <header
//         className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
//             : "bg-gradient-to-r from-pink-50 to-purple-50 py-3 md:py-4"
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Menú button - visible en todos los dispositivos */}
//             <button
//               className="focus:outline-none p-2 hover:bg-pink-100 rounded-full transition-colors"
//               aria-label="Abrir menú"
//               onClick={() => setIsMenuOpen(true)}
//             >
//               <MenuIcon isOpen={isMenuOpen} />
//             </button>

//             {/* Logo - centrado */}
//             <div className="flex-1 flex justify-center md:justify-start md:ml-4">
//               <Brand />
//             </div>

//             {/* Search - desktop (centrado entre logo y carrito) */}
//             <div className="hidden md:flex flex-1 max-w-md mx-4">
//               <input
//                 type="text"
//                 placeholder="🔍 Buscar productos..."
//                 className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Right side icons */}
//             <div className="flex items-center space-x-2">
//               {/* Search icon - mobile */}
//               <div className="md:hidden">
//                 <SearchIcon onClick={() => setShowMobileSearch(!showMobileSearch)} />
//               </div>

//               {/* Cart button */}
//               <button
//                 onClick={() => setShowCart(true)}
//                 aria-label="Abrir carrito"
//                 className="p-2 hover:bg-pink-100 rounded-full transition-colors"
//               >
//                 <CartIcon itemCount={cartCount} />
//               </button>
//             </div>
//           </div>

//           {/* Mobile search - aparece al hacer click en la lupa */}
//           {showMobileSearch && (
//             <div className="md:hidden py-2">
//               <input
//                 type="text"
//                 placeholder="🔍 Buscar productos..."
//                 className="w-full p-3 border border-pink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 autoFocus
//               />
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Spacer for fixed header */}
//       <div className={`h-16 ${showMobileSearch ? 'md:h-16' : 'md:h-20'} ${scrolled ? '!md:h-16' : ''}`}></div>

//       {/* Side Menu */}
//       <SideMenu
//         isOpen={isMenuOpen}
//         onClose={() => setIsMenuOpen(false)}
//         onCartClick={() => setShowCart(true)}
//         cartCount={cartCount}
//       />

//       {/* Cart */}
//       {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
//     </>
//   );
// }

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SolarOverview from "../solar/SolarOverview";
// import logo from "/public/logo_lenceria.png";
// import { useCart } from "../solar/CartContext";

// function Brand() {
//   return (
//     <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
//       <img
//         src={logo}
//         alt="Logo Lencería AJ"
//         className="w-12 h-10 sm:w-14 sm:h-12 md:w-16 md:h-14 transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
//       />
//       <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-pink-600 hover:text-pink-900 transition-colors">
//         LENCERÍA AJ
//       </h1>
//     </Link>
//   );
// }

// const MenuIcon = ({ isOpen }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-8 h-8 text-pink-600"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//   >
//     {isOpen ? (
//       <path d="M6 18L18 6M6 6l12 12" />
//     ) : (
//       <path d="M3 12h18M3 6h18M3 18h18" />
//     )}
//   </svg>
// );

// const CartIcon = ({ itemCount }) => (
//   <div className="relative">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-7 h-7 text-pink-600 hover:text-pink-800 transition-colors"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
//       />
//     </svg>
//     {itemCount > 0 && (
//       <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold ">
//         {itemCount > 99 ? '99+' : itemCount}
//       </span>
//     )}
//   </div>
// );

// const menuLinks = [
//   { to: "/Juega", label: "Juega", icon: "🎲" },
//   { to: "/Promociones", label: "Promociones", icon: "🎁" },
//   { to: "/Combos", label: "Combos", icon: "🔥" },
//   { to: "/lenceria", label: "Lencería", icon: "👙" },
//   { to: "/juguetes", label: "Juguetes", icon: "🎀" },
//   { to: "/lubricantes", label: "Lubricantes", icon: "💧" },
// ];

// function SideMenu({ isOpen, onClose, onCartClick, cartCount }) {
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape" && isOpen) onClose();
//     };

//     // Prevent body scroll when menu is open
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     window.addEventListener("keydown", handleKey);
//     return () => {
//       window.removeEventListener("keydown", handleKey);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       <div
//         className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
//         onClick={onClose}
//       />
//       <div
//         className="fixed top-0 left-0 h-full w-80 sm:w-96 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto"
//         style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
//       >
//         {/* Header del menú */}
//         <div className="p-6 border-b border-pink-200 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0">
//           <Brand />
//           <button
//             onClick={onClose}
//             className="p-2 text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-full transition-colors"
//             aria-label="Cerrar menú"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Enlaces del menú */}
//         <ul className="py-6 px-4 text-gray-700">
//           {menuLinks.map(({ to, label, icon }) => (
//             <li key={label} className="mb-2">
//               <Link
//                 to={to}
//                 onClick={onClose}
//                 className="flex items-center py-4 px-4 hover:bg-pink-100 rounded-xl transition-all duration-200 group"
//               >
//                 <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">
//                   {icon}
//                 </span>
//                 <span className="font-medium text-lg tracking-wider group-hover:text-pink-700">
//                   {label}
//                 </span>
//               </Link>
//             </li>
//           ))}

//           {/* Carrito en el menú */}
//           <li className="mt-8 border-t border-pink-200 pt-6">
//             <button
//               onClick={() => {
//                 onCartClick();
//                 onClose();
//               }}
//               className="flex items-center w-full py-4 px-4 hover:bg-pink-100 rounded-xl transition-all duration-200 group"
//             >
//               <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">
//                 🛒
//               </span>
//               <span className="font-medium text-lg tracking-wider group-hover:text-pink-700 flex-1 text-left">
//                 Carrito
//               </span>
//               {cartCount > 0 && (
//                 <span className="bg-pink-500 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center font-bold">
//                   {cartCount > 99 ? '99+' : cartCount}
//                 </span>
//               )}
//             </button>
//           </li>
//         </ul>

//         {/* Footer del menú */}

//       </div>
//     </div>
//   );
// }

// export default function Header({ setSearchTerm }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Mock cart count - replace with actual cart context
//   const { cartItems } = useCart();
//   // Sumar cantidades de todos los productos
//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <header
//         className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 ${scrolled
//           ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
//           : "bg-gradient-to-r from-pink-50 to-purple-50 py-4"
//           }`}
//       >
//         <div className="container mx-auto px-2 flex items-center justify-between h-16">
//           {/* Menu Button */}
//           <button
//             className="focus:outline-none p-3 hover:bg-pink-100 rounded-full transition-colors"
//             aria-label="Abrir menú"
//             aria-expanded={isMenuOpen}
//             onClick={() => setIsMenuOpen(true)}
//           >
//             <MenuIcon isOpen={isMenuOpen} />
//           </button>

//           {/* Logo - Centered */}
//           <div className=" flex justify-center">
//             <Brand />
//           </div>

//           {/* buscador */}
//           <div>
//             <input
//               type="text"
//               placeholder="🔍Buscar producto..."
//               className="p-5 border border-pink-300 rounded-md w-full"
//               //value={busqueda} //el contenido se sincroniza con usestate
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Cart Button */}
//           <button
//             onClick={() => setShowCart(true)}
//             aria-label="Abrir carrito"
//             className="p-3 hover:bg-pink-100 rounded-full transition-colors"
//           >
//             <CartIcon itemCount={cartCount} />
//           </button>
//         </div>
//       </header>

//       {/* Spacer for fixed header */}
//       <div className="h-20 sm:h-24"></div>

//       {/* Side Menu */}
//       <SideMenu
//         isOpen={isMenuOpen}
//         onClose={() => setIsMenuOpen(false)}
//         onCartClick={() => setShowCart(true)}
//         cartCount={cartCount}
//       />

//       {/* Cart */}
//       {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
//     </>
//   );
// }
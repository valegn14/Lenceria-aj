import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SolarOverview from "../solar/SolarOverview";
import logo from "/public/logo_lenceria.png";

// Componente para la marca (logo + título)
function Brand() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img
        src={logo}
        alt="Logo Lencería AJ"
        width={60}
        height={40}
        className="transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
      />
      <h1 className="text-s font-bold tracking-widest text-pink-600 hover:text-pink-900 transition-colors">
        LENCERÍA AJ
      </h1>
    </Link>
  );
}

// Iconos SVG para los links
const Icons = {
  Juega: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.248v7.504a1 1 0 001.234.97l6.518-1.89a1 1 0 00.748-.97v-3.656a1 1 0 00-.748-.97z" />
    </svg>
  ),
  
  Promociones: (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24" fill="#FFD700">
    <path d="M12 2C10 5 6 7 6 13c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.5-1.5-4-3-5.5C14.5 6 13 4 12 2z" />
  </svg>
),

  Populares: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927C9.349 2.09 10.65 2.09 10.951 2.927l1.286 3.997a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.405 2.472a1 1 0 00-.364 1.118l1.287 3.997c.3.828-.755 1.519-1.54 1.118l-3.405-2.472a1 1 0 00-1.176 0l-3.405 2.472c-.784.401-1.84-.29-1.54-1.118l1.287-3.997a1 1 0 00-.364-1.118L2.225 9.424c-.783-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.997z" />
    </svg>
  )
};

const links = [
  { to: "/", label: "Juega" },
  { to: "/Promociones", label: "Promociones" },
  { to: "/contacto", label: "Populares" }
];

// Navegación de escritorio
function DesktopNav({ onCartClick }) {
  return (
    <ul className="hidden sm:flex space-x-8 items-center text-gray-800">
      {links.map(({ to, label }) => (
        <li key={label}>
          <Link
            to={to}
            className="flex items-center text-sm uppercase tracking-wider hover:text-pink-500 transition-colors font-semibold"
          >
            {Icons[label]}
            {label}
          </Link>
        </li>
      ))}
      <li>
        <button
          onClick={onCartClick}
          aria-label="Abrir carrito"
          className="ml-4 hover:text-pink-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>
      </li>
    </ul>
  );
}

// Navegación móvil
function MobileNav({ isOpen, onClose, onCartClick }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="sm:hidden absolute top-full left-0 w-full bg-white backdrop-blur-md shadow-md">
      <ul className="flex flex-col p-4 space-y-4 text-gray-800">
        {links.map(({ to, label }) => (
          <li key={label}>
            <Link
              to={to}
              onClick={onClose}
              className="flex items-center text-sm uppercase tracking-wider hover:text-pink-500 transition-colors font-semibold"
            >
              {Icons[label]}
              {label}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={() => { onCartClick(); onClose(); }}
            aria-label="Abrir carrito"
            className="flex items-center hover:text-pink-500 transition-colors font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
            Carrito
          </button>
        </li>
      </ul>
    </div>
  );
}

// Header principal siempre fijo con fondo blanco
export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Brand />
          <nav className="relative">
            <DesktopNav onCartClick={() => setShowCart(true)} />
            <button
              className="sm:hidden focus:outline-none text-gray-800 hover:text-pink-500"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                } />
              </svg>
            </button>
            <MobileNav
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onCartClick={() => setShowCart(true)}
            />
          </nav>
        </div>
      </header>

      {/* Para que el contenido no quede cubierto por el header */}
      <div className="pt-[64px]"></div>

      {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
    </>
  );
}



/*
Cambios a tener en cuenta:
- Retiré la lógica de aparición por scroll para que el header siempre esté fijo.
- Agregué iconos SVG al lado de cada link (Juega, Promociones, Populares).
- Añadí un margen superior (`pt-[64px]`) al contenido para evitar que quede oculto tras el header.
*/

/*
Cambios a tener en cuenta:
- Instalar `lodash` para usar `throttle`: `npm install lodash`.
- Las clases de Tailwind usan transform/translate en lugar de padding dinámico; revisa el layout si necesitas ajustar el espacio superior para compensar.
- El header queda fuera del flujo (position fixed) y ya no bloquea clics en estado oculto, verifica solapamientos.
- Se añadieron atributos ARIA y manejo de Escape en móvil; revisa accesibilidad con NVDA/VoiceOver.
*/



// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SolarOverview from "../solar/SolarOverview";
// import logo from "/public/logo_lenceria.png";

// export default function Header2() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [showHeader, setShowHeader] = useState(false);

//   useEffect(() => {
//     function handleScroll() {
//       if (window.scrollY > 50) {
//         setShowHeader(true);
//       } else {
//         setShowHeader(false);
//       }
//     }

//     window.addEventListener("scroll", handleScroll);

//     // Limpieza del event listener
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <header
//         className={`fixed w-full left-0 z-50 text-pink-50 backdrop-blur-sm border-b border-pink-300/20 transition-all duration-300 ${
//           showHeader
//             ? "bg-pink-900/40 py-3"
//             : "bg-transparent py-0 pointer-events-none"
//         }`}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between">
//             <Link to="/" className="flex items-center space-x-2">
//               <img
//                 src={logo}
//                 alt="alejandra padilla"
//                 width={60}
//                 height={40}
//   className="transition-transform hover:scale-105 drop-shadow-[0_4px_4px_rgba(255,255,255,0.6)]"
//               />
//               <h1 className="text-s font-light tracking-widest hover:text-pink-200 transition-colors">
//                 LENCERÍA AJ
//               </h1>
//             </Link>

//             <nav>
//               <ul className="hidden sm:flex space-x-6">
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-sm uppercase tracking-wider hover:text-pink-200 transition-colors font-light"
//                   >
//                     Juega
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/Contacto"
//                     className="text-sm uppercase tracking-wider hover:text-pink-200 transition-colors font-light"
//                   >
//                     Promociones
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/ubicacion"
//                     className="text-sm uppercase tracking-wider hover:text-pink-200 transition-colors font-light"
//                   >
//                     Populares
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => setShowCart(true)}
//                     className="ml-4 hover:text-pink-200 transition-colors"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//                       />
//                     </svg>
//                   </button>
//                 </li>
//               </ul>

//               <button
//                 className="sm:hidden focus:outline-none text-pink-100 hover:text-pink-300"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d={
//                       isMenuOpen
//                         ? "M6 18L18 6M6 6l12 12"
//                         : "M4 6h16M4 12h16m-7 6h7"
//                     }
//                   />
//                 </svg>
//               </button>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
//     </>
//   );
// }

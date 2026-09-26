
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SolarOverview from "../solar/carrito";
import logo from "/logo_lenceria.png";
import { useCart } from "../solar/CartContext";

import IconJ from "./juguete.png";
import IconV from './ubicacion.png';
import IconPromo from './promo.png';
import IconCombos from './combo.png';
import IconLenceria from './lenceria.png';
import IconLubricantes from './lubricante.png';
import IconCart from './carrito.png';
import IconSuplementos from './suplementos.png';
import IconHigiene from './higiene.png';
import IconVestido from './vestido.png';



function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 min-w-0 shrink-0">
      <img
        src={logo}
        alt="Logo Lencería AJ"
        className="w-10 h-8 sm:w-12 sm:h-10 md:w-14 md:h-12 lg:w-16 lg:h-14 transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
      />
      <h1 className="text-[0.68rem] sm:text-sm md:text-base lg:text-lg font-bold tracking-wider text-pink-600 hover:text-pink-900 transition-colors whitespace-nowrap truncate max-w-[10rem] sm:max-w-none">
        LENCERÍA AJ
      </h1>
    </Link>
  );
}
const VisitIcon = () => (
  <Link
    to="/Visitanos"
    className="p-2 text-pink-600 hover:text-pink-800 rounded-full transition-colors"
    aria-label="Visítanos"
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
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </Link>
);
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

const primaryLinks = [
  { to: "/juguetes", label: "Juguetes", icon: IconJ },
  { to: "/lubricantes", label: "Lubricantes", icon: IconLubricantes },
  { to: "/lenceria", label: "Lencería", icon: IconLenceria },
];

const moreLinks = [
  
  { to: "/suplementos", label: "Suplementos", icon: IconSuplementos },
  { to: "/higiene", label: "Higiene", icon: IconHigiene },
  { to: "/bronceadores", label: "Bronceadores" , icon: IconVestido },
    { to: "/Combos", label: "Combos", icon: IconCombos },

  { to: "/Promociones", label: "Promos", icon: IconPromo }
];

const menuLinks = [...primaryLinks, ...moreLinks]

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
        className="fixed top-0 left-0 h-full w-[85vw] max-w-sm sm:w-96 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto"
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
                  {icon ? (
                    <img
                      src={icon}
                      alt={label}
                      className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <span className="w-7 h-7 mr-4 flex items-center justify-center text-pink-400 text-lg">•</span>
                  )}
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

export default function Header({ onSearchOpen }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreMenuRef = useRef(null);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;

    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreOpen]);

  return (
    <>
      <header
        className={`fixed w-full z-[100] transition-all duration-500 overflow-visible relative ${scrolled
          ? "bg-pink-200/80 backdrop-blur-xl shadow-lg py-2"
          : "bg-gradient-to-r from-pink-300 to-purple-50 py-3 md:py-4"
          }`}
      >
        <div className="w-full px-2 sm:px-4">
          <div className="flex items-center justify-between gap-2 h-16 min-w-0">
            {/* Menú button - visible solo en móviles */}
            <button
              className="md:hidden focus:outline-none p-2 hover:bg-pink-100 rounded-full transition-colors shrink-0"
              aria-label="Abrir menú"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>

            {/* Logo y enlaces agrupados */}
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-shrink-0 min-w-0">
                <Brand />
              </div>

              <nav className="hidden md:flex items-center md:ml-6 lg:ml-10 min-w-0 overflow-visible">
                <ul className="flex items-center gap-4 lg:gap-6 min-w-0 overflow-visible">
                  {/* Enlaces principales */}
                  {primaryLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-pink-600 hover:text-pink-800 font-medium text-sm uppercase tracking-wider transition-colors"
                      >
                        {label}
                      </Link>
                    </li>

                  ))}
                  {moreLinks.map(({ to, label }) => (
                    <li key={to} className="hidden xl:block">
                      <Link
                        to={to}
                        className="text-pink-600 hover:text-pink-800 font-medium text-sm uppercase tracking-wider transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}

                  {/* Menú desplegable para los demás */}
                  <li ref={moreMenuRef} className="relative xl:hidden font-medium">
                    <button
                      onClick={() => setMoreOpen(!moreOpen)}
                      className="text-pink-600 hover:text-pink-800 text-sm uppercase tracking-wider transition-colors flex items-center gap-1">
                      Más
                      <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {moreOpen && (
                      <div className="absolute top-full left-0 mt-2 z-[110]">
                        <ul className="min-w-44 bg-pink-100/95 backdrop-blur-sm rounded-xl shadow-2xl border border-pink-200 overflow-hidden">
                          {moreLinks.map(({ to, label }) => (
                            <li key={to} className="border-b border-pink-200 last:border-b-0">
                              <Link
                                to={to}
                                className="block px-4 py-3 text-sm text-pink-700 hover:bg-pink-200 uppercase tracking-wider hover:text-pink-900 transition-colors whitespace-nowrap"
                                onClick={() => setMoreOpen(false)}
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                  <div className="invisible w-[80px]"></div>
                </ul>
              </nav>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div>
                <SearchIcon onClick={onSearchOpen} />
              </div>
              <VisitIcon />

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
        </div>
      </header>

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

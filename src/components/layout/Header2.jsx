import { Link } from "react-router-dom";
import { useState } from "react";
import SolarOverview from "../solar/SolarOverview"; // Asegúrate que la ruta es correcta
import logo from "/public/logo_lenceria.png"

export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false); // Nuevo estado para el carrito

  return (
    <>
      <header className="bg-gradient-to-l from-pink-400 to-amber-200 shadow-lg text-pink-900">
        <div className="container mx-auto mt-0 px-4 py-4">
          <div className="flex items-center mx-auto justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="alejandra padilla"
                width={80}
                height={50}
                className="icon"
              />
              <h1 className="text-2xl font-bold hover:text-red">LENCERIA_AJ</h1>
            </Link>
            <nav>
              <ul className="hidden sm:flex space-x-6 text-xl">
                <li className="hover:text-[#2b01e7]">
                  <Link to="/">Productos</Link>
                </li>
                <li className="hover:text-[#2b01e7]">
                  <Link to="/Contacto">Contactanos</Link>
                </li>
                <li className="hover:text-[#2b01e7]">
                  <Link to="/ubicacion">Visitanos</Link>
                </li>
                <li>
                  <button onClick={() => setShowCart(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </button>
                </li>
              </ul>
              <button
                className="sm:hidden focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {showCart && <SolarOverview open={showCart} setOpen={setShowCart} />}
    </>
  );
}

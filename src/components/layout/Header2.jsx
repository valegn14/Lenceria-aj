import { Link } from "react-router-dom";
import { useState } from "react";
import SolarOverview from "../solar/SolarOverview"; // Asegúrate que la ruta es correcta

export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false); // Nuevo estado para el carrito

  return (
    <>
      <header className="bg-gradient-to-b from-[#FFFFFFs] to-[#FFFFFF] shadow-lg text-pink-900">
        <div className="container mx-auto mt-0 px-4 py-4">
          <div className="flex items-center mx-auto justify-between">
            <Link to="/" className="flex items-center space-x-3">
              {/* <svg
                fill="yellow"
                filter="drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))"
                width="50px"
                height="50px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              > */}
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>

{/* 
                <path d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7z" />
              </svg>
               */}
              <h1 className="text-2xl font-bold hover:text-red">Lenceria_aj</h1>
            </Link>
            <nav>
              <ul className="hidden sm:flex space-x-6 text-xl">
                <li className="hover:text-[#2b01e7]">
                  <Link to="/">Productos</Link>
                </li>
                <li className="hover:text-[#2b01e7]">
                  <Link to="/Calculator">Contactanos</Link>
                </li>
                <li className="hover:text-[#2b01e7]">
                  <Link to="/Dashboard">Visitanos</Link>
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

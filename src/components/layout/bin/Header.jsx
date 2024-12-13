import { Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  // Función para determinar si una ruta está activa

  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* <!-- Icono o Logo --> */}
            <svg
              className="h-8 w-8 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c-.3-.92-1.603-.92-1.902 0L5.975 12.454c-.3.921.252 1.873 1.236 1.873H16.79c.984 0 1.536-.952 1.236-1.873l-3.172-9.527z"
              ></path>
            </svg>
            <span className="text-gray-800 text-lg font-semibold ml-3">
              Mi Sitio Web
            </span>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-800 hover:text-teal-600">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-teal-600">
                Acerca de
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-teal-600">
                Servicios
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-teal-600">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </header>

    </>
  );
}

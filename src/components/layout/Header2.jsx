import { Link, useLocation } from "react-router-dom";

export default function Header2() {
  return (
    <header className="bg-gradient-to-b from-sky-500 to-cyan-950 shadow-lg">
      <div className="container  mx-auto mt-0 px-4 py-6">
        <div className="flex items-center mx-auto justify-between ">
          {/* <Link to="/" className="flex items-center space-x-3 "> */}
          {/* <!-- Icono o Logo --> */}
          


          {/* Título del sitio */}
          {/* <h1 className="text-2xl font-bold"> EcoEnergy Insights</h1> */}
          {/* </Link> */}
          <h1 className="text-2xl text-white  hover:text-black font-bold">
            {" "}
            EcoEnergy Insights
          </h1>
          {/* Botón de inicio de sesión */}
          {/* ``          <Link to="/login" className="text-white hover:text-gray-300">
            Iniciar Sesión
          </Link>`` */}

          {/* Navegación */}
          <nav >
            <ul className="flex space-x-6 text-xl text-slate-50 font-bold ">
            <li className="hover:text-black ">
                {/* Opcion 0 : table */}
                <Link
                 to="/table"
                >
                Table
                </Link>
                {/* Overview */}
              </li>
              <li className="hover:text-black ">
                {/* Opcion 1 : Overview */}
                <Link
                 to="/overview"
                >
                Overview
                </Link>
                {/* Overview */}
              </li>

              {/* PAsamos los colores en formato hex */}
              <li className="hover:text-[#43e6bd]">
                {/* Opcion 2 : Calculator */}
                <Link
                 to="/calculator"
                >
                Calculator
                </Link>
                {/* Calculator */}
              </li>

              <li className="hover:text-red-600 ">
                {/* Opcion 3 : Dashboard */}
                <Link
                 to="/dashboard"
                >
                 Dashboard
                </Link>
                {/* Dashboard */}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

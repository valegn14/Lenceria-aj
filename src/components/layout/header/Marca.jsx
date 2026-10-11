import { Link } from "react-router-dom";
import logo from "/logo_lenceria.png";

// Logo + nombre. En pantallas muy estrechas (< 360 px) solo se ve el ícono.
export default function Marca({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Lencería AJ, ir al inicio"
      className="flex min-h-11 items-center gap-2 min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-acento"
    >
      <img
        src={logo}
        alt=""
        className="h-9 lg:h-12 w-auto shrink-0 transition-transform hover:scale-105 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
      />
      <span className="hidden min-[360px]:inline text-[1.2rem] lg:text-[1.35rem] font-bold tracking-wider text-header-marca whitespace-nowrap">
        LENCERÍA AJ
      </span>
    </Link>
  );
}

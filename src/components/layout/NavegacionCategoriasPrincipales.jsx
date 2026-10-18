import { NavLink } from "react-router-dom";
import { CATEGORIAS } from "../../data/categorias";

const ORDEN_CATEGORIAS = [
  "juguetes",
  "suplementos",
  "higiene",
  "lubricantes",
  "bronceadores",
  "combos",
  "promociones",
  "lenceria",
];

const CATEGORIAS_NAVEGACION = ORDEN_CATEGORIAS.map((key) =>
  CATEGORIAS.find((categoria) => categoria.key === key)
).filter(Boolean);

export default function NavegacionCategoriasPrincipales({ categoriaActual }) {
  return (
    <section className="mt-8 border-t border-pink-100 py-5">
      <h2 className="mb-3 text-center text-base font-semibold text-pink-800">
        Explora otras categorías
      </h2>
      <nav aria-label="Otras categorías" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {CATEGORIAS_NAVEGACION.map(({ key, nombre, ruta }) => (
            <li key={key}>
              <NavLink
                to={ruta}
                end
                aria-current={key === categoriaActual ? "page" : undefined}
                className={`inline-flex min-h-11 items-center text-sm font-medium text-pink-800 transition hover:underline hover:underline-offset-4 ${
                  key === categoriaActual ? "underline decoration-2 underline-offset-4" : ""
                }`}
              >
                {nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
